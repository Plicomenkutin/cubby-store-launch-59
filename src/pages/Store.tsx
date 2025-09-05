import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { SearchBar } from '@/components/SearchBar';
import { CategoryTabs } from '@/components/CategoryTabs';
import { ProductCard } from '@/components/ProductCard';
import { Cart } from '@/components/Cart';
import { mockStore, mockCategories, mockProducts } from '@/data/mockData';

export default function Store() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'todos' || product.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header store={mockStore} onCartClick={() => setIsCartOpen(true)} />
      
      <Hero store={mockStore} />
      
      {/* Menu Section */}
      <section id="cardapio" className="py-12">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {/* Search Bar */}
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            
            {/* Category Tabs */}
            <CategoryTabs 
              categories={mockCategories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            
            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Nenhum produto encontrado para "{searchQuery}" na categoria "{activeCategory}"
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-border py-8 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{mockStore.name}</h3>
            {mockStore.socialLinks && (
              <div className="flex justify-center gap-4">
                {mockStore.socialLinks.instagram && (
                  <a href={`https://instagram.com/${mockStore.socialLinks.instagram}`} 
                     className="text-primary hover:text-primary-dark transition-colors">
                    Instagram
                  </a>
                )}
                {mockStore.socialLinks.whatsapp && (
                  <a href={`https://wa.me/${mockStore.socialLinks.whatsapp}`}
                     className="text-primary hover:text-primary-dark transition-colors">
                    WhatsApp
                  </a>
                )}
              </div>
            )}
            <p className="text-muted-foreground text-sm">
              © 2024 {mockStore.name}. Feito com ❤️ pela MiniLojas
            </p>
          </div>
        </div>
      </footer>
      
      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}