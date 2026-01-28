export interface Product {
  id: string;
  name: string;
  brick: string;
  subType: string;
  useCases: string[];
  recommendations: string[];
}

export interface Flavor {
  planCode: string;
  invoiceName: string;
  specs: {
    cpu?: number;
    memory?: string;
    storage?: string;
    gpu?: string;
  };
  pricing: {
    hourly?: number;
    monthly?: number;
    formattedPrice: string;
  };
}

export interface CartItem {
  product: Product;
  flavor: Flavor;
  quantity: number;
  duration: number; // en heures
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  suggestions?: string[];
  products?: Product[];
}

