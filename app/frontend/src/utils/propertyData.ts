
export interface Property {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  description: string;
  features: string[];
  images: string[];
  yearBuilt: number;
  neighborhood: string;
  type: 'house' | 'apartment' | 'condo' | 'townhouse';
  status: 'for-sale' | 'for-rent' | 'pending' | 'sold';
}

// Mock data for properties
export const properties: Property[] = [
  {
    id: '1',
    address: '123 Maple Street, San Francisco, CA 94102',
    price: 1250000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1800,
    description: 'Modern home with open floor plan in Pacific Heights. Features high ceilings, hardwood floors, and a chef\'s kitchen with stainless steel appliances. Private garden and patio area perfect for entertaining.',
    features: ['Hardwood floors', 'Open floor plan', 'High ceilings', 'Garden', 'Modern kitchen'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    yearBuilt: 2015,
    neighborhood: 'Pacific Heights',
    type: 'house',
    status: 'for-sale'
  },
  {
    id: '2',
    address: '456 Ocean Avenue, San Francisco, CA 94112',
    price: 950000,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    description: 'Stunning ocean view condo with floor-to-ceiling windows. Completely renovated with high-end finishes. Includes access to building amenities such as gym, pool, and 24-hour concierge.',
    features: ['Ocean view', 'Floor-to-ceiling windows', 'High-end finishes', 'Building amenities', 'Concierge'],
    images: [
      'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622015663319-e97e7f937e0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    yearBuilt: 2010,
    neighborhood: 'Sunset District',
    type: 'condo',
    status: 'for-sale'
  },
  {
    id: '3',
    address: '789 Market Street #502, San Francisco, CA 94103',
    price: 3500,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 850,
    description: 'Luxury downtown apartment in the heart of the financial district. Modern design with smart home features. Building includes rooftop terrace with panoramic city views.',
    features: ['Downtown location', 'Smart home', 'Rooftop terrace', 'City views', 'Modern design'],
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    yearBuilt: 2018,
    neighborhood: 'Financial District',
    type: 'apartment',
    status: 'for-rent'
  },
  {
    id: '4',
    address: '1010 Green Street, San Francisco, CA 94133',
    price: 1750000,
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 2200,
    description: 'Classic Victorian home with modern updates. Features original architectural details, gourmet kitchen, and spacious primary suite. Private backyard with mature landscaping.',
    features: ['Victorian architecture', 'Original details', 'Gourmet kitchen', 'Private backyard', 'Mature landscaping'],
    images: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    yearBuilt: 1908,
    neighborhood: 'Russian Hill',
    type: 'house',
    status: 'for-sale'
  },
  {
    id: '5',
    address: '222 Beachside Drive, San Francisco, CA 94121',
    price: 2100000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2800,
    description: 'Contemporary beachside home with panoramic ocean views. Open concept living with walls of glass. Gourmet kitchen, entertainment room, and rooftop deck.',
    features: ['Beachside', 'Panoramic views', 'Walls of glass', 'Rooftop deck', 'Entertainment room'],
    images: [
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    yearBuilt: 2020,
    neighborhood: 'Outer Richmond',
    type: 'house',
    status: 'for-sale'
  },
  {
    id: '6',
    address: '333 Valencia Street #204, San Francisco, CA 94103',
    price: 2800,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1100,
    description: 'Trendy loft in the heart of the Mission District. Industrial chic with exposed brick, high ceilings, and oversized windows. Updated kitchen and bathrooms.',
    features: ['Loft', 'Exposed brick', 'Industrial chic', 'High ceilings', 'Updated kitchen'],
    images: [
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    yearBuilt: 2005,
    neighborhood: 'Mission District',
    type: 'apartment',
    status: 'for-rent'
  },
  {
    id: '7',
    address: '444 Union Street, San Francisco, CA 94133',
    price: 1650000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1950,
    description: 'Charming townhouse with European-inspired design. Custom cabinetry, marble countertops, and herringbone floors. Private courtyard and roof deck with city views.',
    features: ['European-inspired', 'Custom cabinetry', 'Marble countertops', 'Herringbone floors', 'Roof deck'],
    images: [
      'https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    yearBuilt: 2000,
    neighborhood: 'North Beach',
    type: 'townhouse',
    status: 'for-sale'
  },
  {
    id: '8',
    address: '555 Hayes Street, San Francisco, CA 94102',
    price: 3200,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 800,
    description: 'Stylish apartment in Hayes Valley. Nestled on a tree-lined street near boutiques and restaurants. Features modern finishes, in-unit laundry, and a private balcony.',
    features: ['Hayes Valley', 'Modern finishes', 'In-unit laundry', 'Private balcony', 'Tree-lined street'],
    images: [
      'https://images.unsplash.com/photo-1560185008-a33f5c7b1663?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    yearBuilt: 2016,
    neighborhood: 'Hayes Valley',
    type: 'apartment',
    status: 'for-rent'
  }
];
