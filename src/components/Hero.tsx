import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowDown } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';
import { Store } from '@/types';

interface HeroProps {
  store: Store;
}

export function Hero({ store }: HeroProps) {
  const scrollToMenu = () => {
    document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="space-y-6 animate-in fade-in duration-1000">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Doces que
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-pink-200">
              Encantam
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Sabores únicos e momentos especiais criados com carinho especialmente para você
          </p>
          
          {store.deliveryInfo && (
            <Badge className="bg-white/20 text-white border-white/30 text-base px-4 py-2 backdrop-blur-sm">
              🚚 {store.deliveryInfo}
            </Badge>
          )}
          
          <div className="pt-4">
            <Button 
              variant="hero" 
              size="lg"
              onClick={scrollToMenu}
              className="text-lg px-8 py-6 h-auto"
            >
              Ver Cardápio
              <ArrowDown className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}