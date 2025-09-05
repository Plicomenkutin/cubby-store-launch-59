import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Category, Store } from '@/types';
import { mockProducts, mockCategories, mockStore } from '@/data/mockData';

interface StoreContextType {
  products: Product[];
  categories: Category[];
  store: Store;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  updateStore: (store: Partial<Store>) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('store-products');
    return saved ? JSON.parse(saved) : mockProducts;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('store-categories');
    return saved ? JSON.parse(saved) : mockCategories;
  });

  const [store, setStore] = useState<Store>(() => {
    const saved = localStorage.getItem('store-config');
    return saved ? JSON.parse(saved) : mockStore;
  });

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('store-products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('store-categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('store-config', JSON.stringify(store));
  }, [store]);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...productData } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: Date.now().toString(),
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: string, categoryData: Partial<Category>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...categoryData } : c));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const updateStore = (storeData: Partial<Store>) => {
    setStore(prev => ({ ...prev, ...storeData }));
  };

  return (
    <StoreContext.Provider value={{
      products,
      categories,
      store,
      addProduct,
      updateProduct,
      deleteProduct,
      addCategory,
      updateCategory,
      deleteCategory,
      updateStore,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}