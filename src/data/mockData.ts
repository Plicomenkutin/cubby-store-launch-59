import { Product, Store, Order, Category } from '@/types';
import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';

export const mockStore: Store = {
  id: '1',
  name: 'Delícia de Bolos',
  slug: 'delicia-de-bolos',
  themeColor: '#D43F6D',
  deliveryInfo: 'Entrega Grátis acima de R$ 50',
  phone: '(11) 99999-9999',
  socialLinks: {
    instagram: '@deliciadebolossabor',
    whatsapp: '5511999999999'
  }
};

export const mockCategories: Category[] = [
  { id: '1', name: 'Todos', slug: 'todos' },
  { id: '2', name: 'Bolos', slug: 'bolos' },
  { id: '3', name: 'Docinhos', slug: 'docinhos' },
  { id: '4', name: 'Tortas', slug: 'tortas' },
  { id: '5', name: 'Salgados', slug: 'salgados' },
  { id: '6', name: 'Bebidas', slug: 'bebidas' }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Bolo de Chocolate Premium',
    description: 'Delicioso bolo de chocolate com cobertura de ganache e morangos frescos',
    price: 4500,
    image: product1,
    category: 'bolos',
    preparationTime: '2-3 dias',
    stock: 5,
    isPromo: true,
    promoText: 'Promo 20%',
    wholesaleTiers: [
      { minQuantity: 3, price: 4000 },
      { minQuantity: 5, price: 3800 }
    ]
  },
  {
    id: '2',
    name: 'Macarons Sortidos',
    description: 'Caixa com 12 macarons de sabores variados: baunilha, chocolate, morango',
    price: 2800,
    image: product2,
    category: 'docinhos',
    preparationTime: '1-2 dias',
    stock: 8,
    isPromo: false
  },
  {
    id: '3',
    name: 'Torta de Morango',
    description: 'Torta cremosa com morangos frescos e chantilly, massa amanteigada',
    price: 3200,
    image: product3,
    category: 'tortas',
    preparationTime: '10 minutos',
    stock: 3,
    isPromo: true,
    promoText: 'Entrega Rápida'
  },
  {
    id: '4',
    name: 'Brigadeiros Gourmet',
    description: 'Brigadeiros artesanais com cobertura de chocolate belga',
    price: 1800,
    image: product1,
    category: 'docinhos',
    preparationTime: '1 dia',
    stock: 12
  },
  {
    id: '5',
    name: 'Bolo Red Velvet',
    description: 'Clássico bolo red velvet com cream cheese e frutas vermelhas',
    price: 5500,
    image: product2,
    category: 'bolos',
    preparationTime: '2-3 dias',
    stock: 2,
    isPromo: true,
    promoText: 'Limitado'
  },
  {
    id: '6',
    name: 'Cheesecake de Frutas',
    description: 'Cheesecake cremoso com calda de frutas vermelhas',
    price: 3800,
    image: product3,
    category: 'tortas',
    preparationTime: '1-2 dias',
    stock: 6
  }
];

export const mockOrders: Order[] = [
  {
    id: '1',
    customerName: 'Maria Silva',
    phone: '(11) 98765-4321',
    address: 'Rua das Flores, 123 - Centro',
    items: [
      { product: mockProducts[0], quantity: 1 },
      { product: mockProducts[1], quantity: 2 }
    ],
    subtotal: 10100,
    status: 'pending',
    createdAt: '2024-01-15T10:30:00Z',
    observations: 'Entregar até 18h'
  },
  {
    id: '2',
    customerName: 'João Santos',
    phone: '(11) 99887-6655',
    items: [
      { product: mockProducts[2], quantity: 1 }
    ],
    subtotal: 3200,
    status: 'ready',
    createdAt: '2024-01-15T14:20:00Z'
  }
];