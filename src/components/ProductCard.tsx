import { Heart, Clock, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  
  const formatPrice = (price: number) => {
    return `R$ ${(price / 100).toFixed(2).replace('.', ',')}`;
  };

  return (
    <div className="bg-card rounded-lg shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.isPromo && product.promoText && (
          <Badge className="absolute top-2 left-2 bg-warning text-warning-foreground">
            {product.promoText}
          </Badge>
        )}
        <button className="absolute top-2 right-2 p-2 bg-black/20 rounded-full hover:bg-black/40 transition-colors">
          <Heart className="w-4 h-4 text-white" />
        </button>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-card-foreground line-clamp-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
        </div>
        
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span className="text-xs">{product.preparationTime}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <Button 
            variant="cart" 
            size="sm"
            onClick={() => addToCart(product)}
            className="gap-1"
          >
            <ShoppingCart className="w-3 h-3" />
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
}