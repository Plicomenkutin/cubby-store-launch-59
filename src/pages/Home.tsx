import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const plans = [
    {
      name: 'Starter',
      price: 'R$ 29',
      period: '/mês',
      description: 'Perfeito para começar sua loja online',
      features: [
        'Até 50 produtos',
        'Loja personalizada',
        'WhatsApp integrado',
        'Suporte por email',
        'Analytics básico'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: 'R$ 59',
      period: '/mês',
      description: 'Para lojas em crescimento',
      features: [
        'Produtos ilimitados',
        'Domínio personalizado',
        'WhatsApp automático',
        'Suporte prioritário',
        'Analytics avançado',
        'Múltiplas fotos',
        'Promoções automáticas'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'R$ 99',
      period: '/mês',
      description: 'Para grandes operações',
      features: [
        'Tudo do Professional',
        'API personalizada',
        'Integrações avançadas',
        'Suporte 24/7',
        'Relatórios personalizados',
        'Múltiplas lojas',
        'Gerente dedicado'
      ],
      popular: false
    }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Setup em Minutos',
      description: 'Crie sua loja em menos de 5 minutos com nosso processo simplificado'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'WhatsApp Integrado',
      description: 'Receba pedidos diretamente no WhatsApp de forma automática'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Design Profissional',
      description: 'Templates lindos e responsivos que convertem visitantes em clientes'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">M</span>
              </div>
              <span className="font-bold text-xl text-foreground">MiniLojas</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#recursos" className="text-foreground hover:text-primary transition-colors">
                Recursos
              </a>
              <a href="#planos" className="text-foreground hover:text-primary transition-colors">
                Planos
              </a>
              <Link to="/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link to="/register">
                <Button>Criar Conta</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge className="bg-primary/10 text-primary border-primary/20 text-sm px-4 py-1">
              🚀 Lance sua loja online hoje mesmo
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground">
              Crie sua
              <span className="text-transparent bg-clip-text bg-gradient-hero"> Mini-Loja </span>
              em minutos
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Plataforma completa para criar, gerenciar e vender através da sua loja online personalizada
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/register">
                <Button variant="hero" size="lg" className="text-lg px-8 py-6 h-auto">
                  Começar Grátis
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
                Ver Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tudo que você precisa para vender online
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ferramentas poderosas e simples para transformar seu negócio
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Planos que crescem com você
            </h2>
            <p className="text-xl text-muted-foreground">
              Escolha o plano ideal para seu negócio
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative border-2 transition-all duration-300 hover:-translate-y-1 ${
                plan.popular ? 'border-primary shadow-hero' : 'border-border shadow-card hover:shadow-xl'
              }`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Mais Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="flex items-baseline justify-center gap-1 mt-4">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-success" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    Começar Agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Pronto para começar a vender?
            </h2>
            <p className="text-xl text-white/90">
              Junte-se a milhares de empreendedores que já transformaram seus negócios
            </p>
            <Link to="/register">
              <Button variant="secondary" size="lg" className="text-lg px-8 py-6 h-auto">
                Criar Minha Loja Grátis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">M</span>
              </div>
              <span className="font-bold text-xl text-foreground">MiniLojas</span>
            </div>
            <p className="text-muted-foreground text-center md:text-right">
              © 2024 MiniLojas. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}