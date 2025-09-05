export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  preparationTime: string;
  stock: number;
  isPromo?: boolean;
  promoText?: string;
  wholesaleTiers?: Array<{
    minQuantity: number;
    price: number;
  }>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Store {
  id: string;
  name: string;
  slug: string;
  banner?: string;
  themeColor: string;
  deliveryInfo?: string;
  phone?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address?: string;
  items: CartItem[];
  subtotal: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  createdAt: string;
  observations?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}