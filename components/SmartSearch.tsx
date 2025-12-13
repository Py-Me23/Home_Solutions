import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, Search } from 'lucide-react';
import { getServiceRecommendation } from '../services/geminiService';
import { ServiceCategory } from '../types';

interface SmartSearchProps {
  onCategorySelect: (category: ServiceCategory) => void;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({ onCategorySelect }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ category: string; reasoning: string } | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setResult(null);
    
    const recommendation = await getServiceRecommendation(query);
    
    setIsLoading(false);
    setResult(recommendation);
  };

  const applyCategory = () => {
    if (result && result.category !== 'Unknown' && result.category !== 'Other') {
      onCategorySelect(result.category as ServiceCategory);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="glass-panel rounded-2xl p-2 shadow-2xl transform transition-all hover:scale-[1.01]">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 transition-colors duration-300">
          <div className="flex items-center space-x-2 mb-6">
            <div className="bg-indigo-100 dark:bg-indigo-900/50 p-1.5 rounded-full">
              <Sparkles className="text-indigo-600 dark:text-indigo-400 w-4 h-4" />
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 tracking-wide uppercase text-xs">AI Smart Match</h3>
          </div>
          
          <h3 className="text-2xl font-serif text-slate-900 dark:text-white mb-2">What service do you need?</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6 font-light">
            Describe your problem (e.g., "My kitchen sink is leaking") and our AI will find the perfect expert.
          </p>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
            <div className="relative flex flex-col md:flex-row gap-3 bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm transition-colors duration-300">
              <div className="flex-1 flex items-center px-4">
                <Search className="text-slate-400 w-5 h-5 mr-3" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Type your issue here..."
                  className="w-full py-3 bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none text-lg"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={isLoading || !query}
                className="bg-slate-900 dark:bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
              >
                {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Find Pro'}
              </button>
            </div>
          </div>

          {result && (
            <div className="mt-6 bg-indigo-50/50 dark:bg-indigo-900/20 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800 animate-fade-in-up">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-indigo-800 dark:text-indigo-300 font-semibold text-lg mb-1">
                    Best Match: {result.category}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {result.reasoning}
                  </p>
                </div>
                {result.category !== 'Unknown' && (
                  <button
                    onClick={applyCategory}
                    className="whitespace-nowrap flex items-center justify-center px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md text-sm font-medium group"
                  >
                    View Pros <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};