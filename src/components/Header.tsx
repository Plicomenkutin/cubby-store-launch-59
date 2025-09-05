import { ShoppingCart, Phone, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { Store } from '@/types';

interface HeaderProps {
  store: Store;
  onCartClick: () => void;
}

export function Header({ store, onCartClick }: HeaderProps) {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Store Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                {store.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="font-bold text-lg text-foreground">{store.name}</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#cardapio" className="text-foreground hover:text-primary transition-colors">
              Cardápio
            </a>
            <a href="#pedidos" className="text-foreground hover:text-primary transition-colors">
              Meus Pedidos
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {store.phone && (
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Phone className="w-4 h-4" />
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart className="w-4 h-4" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-primary text-primary-foreground min-w-5 h-5 flex items-center justify-center text-xs p-0">
                  {totalItems}
                </Badge>
              )}
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}