import { Provider, ServiceCategory } from './types';

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: '1',
    name: 'John Smith',
    businessName: 'Smith Plumbing Solutions',
    category: ServiceCategory.PLUMBING,
    description: 'Expert plumber with 15 years of experience in leak detection and pipe repair.',
    location: 'Downtown District',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    phone: '+1 (555) 012-3456',
    email: 'john@smithplumbing.com',
    rating: 4.8,
    reviewCount: 124,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop', // Man portrait
    portfolioImages: [
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=800&auto=format&fit=crop', // Plumbing pipes
      'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?q=80&w=800&auto=format&fit=crop' // Sink repair
    ],
    isAvailable: true,
    hourlyRate: 85,
    reviews: [
      { id: 'r1', userId: 'u1', userName: 'Alice', rating: 5, comment: 'Fixed my leak in minutes!', date: '2023-10-05' },
      { id: 'r2', userId: 'u2', userName: 'Bob', rating: 4, comment: 'Great service but slightly pricey.', date: '2023-09-12' }
    ]
  },
  {
    id: '2',
    name: 'Sarah Jenkins',
    businessName: 'Sparkle Cleaners',
    category: ServiceCategory.CLEANING,
    description: 'Professional home cleaning services. We use eco-friendly products.',
    location: 'Westside Suburbs',
    coordinates: { lat: 40.7300, lng: -74.0500 },
    phone: '+1 (555) 098-7654',
    email: 'contact@sparkleclean.com',
    rating: 4.9,
    reviewCount: 89,
    imageUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656ec?q=80&w=200&auto=format&fit=crop', // Woman portrait
    portfolioImages: [
      'https://images.unsplash.com/photo-1581578731117-104f2a863a30?q=80&w=800&auto=format&fit=crop', // Clean room
      'https://images.unsplash.com/photo-1527515664-6277754394b0?q=80&w=800&auto=format&fit=crop' // Cleaning supplies
    ],
    isAvailable: true,
    hourlyRate: 40,
    reviews: [
      { id: 'r3', userId: 'u3', userName: 'Charlie', rating: 5, comment: 'House looks brand new.', date: '2023-11-01' }
    ]
  },
  {
    id: '3',
    name: 'Mike Ross',
    businessName: 'Volt Electric',
    category: ServiceCategory.ELECTRICAL,
    description: 'Licensed electrician specializing in home wiring and smart home setups.',
    location: 'North Hills',
    coordinates: { lat: 40.7500, lng: -73.9800 },
    phone: '+1 (555) 111-2222',
    email: 'mike@voltelectric.com',
    rating: 4.7,
    reviewCount: 56,
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop', // Man portrait
    portfolioImages: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop', // Electrical wires
      'https://images.unsplash.com/photo-1558402091-7688501235b0?q=80&w=800&auto=format&fit=crop' // Electrician working
    ],
    isAvailable: false,
    hourlyRate: 95,
    reviews: []
  },
  {
    id: '4',
    name: 'Emma Stone',
    businessName: 'Color World Painting',
    category: ServiceCategory.PAINTING,
    description: 'Interior and exterior painting. High attention to detail.',
    location: 'East Village',
    coordinates: { lat: 40.7200, lng: -73.9900 },
    phone: '+1 (555) 333-4444',
    email: 'emma@colorworld.com',
    rating: 4.6,
    reviewCount: 42,
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop', // Woman portrait
    portfolioImages: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop', // Painting wall
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop' // Paint buckets
    ],
    isAvailable: true,
    hourlyRate: 60,
    reviews: []
  },
  {
    id: '5',
    name: 'David Wood',
    businessName: 'WoodWorks Carpentry',
    category: ServiceCategory.CARPENTRY,
    description: 'Custom furniture and cabinet repairs.',
    location: 'Uptown',
    coordinates: { lat: 40.7800, lng: -73.9600 },
    phone: '+1 (555) 555-6666',
    email: 'dave@woodworks.com',
    rating: 4.9,
    reviewCount: 15,
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop', // Man portrait
    portfolioImages: [
      'https://images.unsplash.com/photo-1611244419377-b0a760c19719?q=80&w=800&auto=format&fit=crop', // Woodworking
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop' // Carpenter tools
    ],
    isAvailable: true,
    hourlyRate: 75,
    reviews: []
  },
  {
    id: '6',
    name: 'Linda Green',
    businessName: 'Green Thumb Gardening',
    category: ServiceCategory.GARDENING,
    description: 'Landscaping, lawn maintenance, and garden design.',
    location: 'Suburbs',
    coordinates: { lat: 40.8000, lng: -74.1000 },
    phone: '+1 (555) 777-8888',
    email: 'linda@greenthumb.com',
    rating: 4.5,
    reviewCount: 30,
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop', // Woman portrait
    portfolioImages: [
      'https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=800&auto=format&fit=crop', // Gardening
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop' // Backyard
    ],
    isAvailable: true,
    hourlyRate: 50,
    reviews: []
  }
];

export const CATEGORIES = Object.values(ServiceCategory);