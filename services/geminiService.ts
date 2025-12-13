import { GoogleGenAI, Type } from "@google/genai";
import { ServiceCategory } from '../types';

let ai: GoogleGenAI | null = null;

if (process.env.API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export interface AIRecommendation {
  category: ServiceCategory | 'Unknown';
  reasoning: string;
}

export const getServiceRecommendation = async (userQuery: string): Promise<AIRecommendation> => {
  if (!ai) {
    console.warn("Gemini API Key not found. Returning default.");
    return { category: 'Unknown', reasoning: 'AI service unavailable.' };
  }

  try {
    const categoriesList = Object.values(ServiceCategory).join(', ');
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `User needs help with home services. Query: "${userQuery}". 
      Available Categories: ${categoriesList}.
      Identify the best matching category. 
      If it doesn't fit clearly, return 'Other'.
      Provide a short, friendly reasoning.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            reasoning: { type: Type.STRING }
          }
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return data as AIRecommendation;
    }
    
    return { category: 'Unknown', reasoning: 'Could not analyze request.' };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { category: 'Unknown', reasoning: 'Sorry, I encountered an error analyzing your request.' };
  }
};
