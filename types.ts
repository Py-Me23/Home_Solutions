export enum ServiceCategory {
  PLUMBING = 'Plumbing',
  ELECTRICAL = 'Electrical',
  PAINTING = 'Painting',
  CLEANING = 'Cleaning',
  CARPENTRY = 'Carpentry',
  MOVING = 'Moving',
  DECORATING = 'Decorating',
  GARDENING = 'Gardening',
  OTHER = 'Other'
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export interface Provider {
  id: string;
  name: string;
  businessName?: string;
  category: ServiceCategory;
  description: string;
  location: string;
  coordinates: { lat: number; lng: number }; // For distance calculation mock
  distance?: number; // Calculated at runtime
  phone: string;
  email: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  imageUrl: string;
  portfolioImages: string[];
  isAvailable: boolean;
  hourlyRate: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'CLIENT' | 'PROVIDER';
}

export type SearchFilters = {
  category: ServiceCategory | 'All';
  query: string;
};