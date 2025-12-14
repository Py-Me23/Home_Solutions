import API_BASE_URL from "./api";
import { Provider } from "../types";

export async function getProviders(): Promise<Provider[]> {
  const res = await fetch(`${API_BASE_URL}/providers`);
  if (!res.ok) throw new Error("Failed to fetch providers");
  return res.json();
}

export async function getProviderById(id: string): Promise<Provider> {
  const res = await fetch(`${API_BASE_URL}/providers/${id}`);
  if (!res.ok) throw new Error("Provider not found");
  return res.json();
}
