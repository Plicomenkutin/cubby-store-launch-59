import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Package, ShoppingBag, Users, DollarSign } from 'lucide-react';

export function Overview() {
  const stats = [
    {
      title: 'Vendas do Mês',
      value: 'R$ 2.847,50',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign
    },
    {
      title: 'Pedidos Hoje',
      value: '8',
      change: '+2.3%',
      trend: 'up',
      icon: ShoppingBag
    },
    {
      title: 'Produtos Ativos',
      value: '24',
      change: '0%',
      trend: 'neutral',
      icon: Package
    },
    {
      title: 'Clientes Únicos',
      value: '156',
      change: '+8.1%',
      trend: 'up',
      icon: Users
    }
  ];

  const recentOrders = [
    { id: '1', customer: 'Maria Silva', amount: 'R$ 45,00', status: 'pending', time: '5 min atrás' },
    { id: '2', customer: 'João Santos', amount: 'R$ 32,00', status: 'ready', time: '15 min atrás' },
    { id: '3', customer: 'Ana Costa', amount: 'R$ 78,50', status: 'delivered', time: '1h atrás' },
    { id: '4', customer: 'Pedro Lima', amount: 'R$ 22,00', status: 'preparing', time: '2h atrás' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning';
      case 'preparing': return 'bg-primary';
      case 'ready': return 'bg-success';
      case 'delivered': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'preparing': return 'Preparando';
      case 'ready': return 'Pronto';
      case 'delivered': return 'Entregue';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Visão Geral</h2>
        <p className="text-muted-foreground">Dashboard da sua loja online</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-card hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-success" />
                ) : stat.trend === 'down' ? (
                  <TrendingDown className="h-3 w-3 text-destructive" />
                ) : null}
                <p className={`text-xs ${
                  stat.trend === 'up' ? 'text-success' : 
                  stat.trend === 'down' ? 'text-destructive' : 
                  'text-muted-foreground'
                }`}>
                  {stat.change} vs mês anterior
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
            <CardDescription>Últimos pedidos da sua loja</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium text-sm">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                    <span className="font-semibold text-primary">{order.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Tarefas importantes para hoje</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
                <p className="text-sm font-medium">3 produtos com estoque baixo</p>
                <p className="text-xs text-muted-foreground">Revisar estoque de Bolo de Chocolate, Macarons...</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm font-medium">2 pedidos aguardando confirmação</p>
                <p className="text-xs text-muted-foreground">Confirmar pedidos pendentes</p>
              </div>
              <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                <p className="text-sm font-medium">Meta mensal: 85% concluída</p>
                <p className="text-xs text-muted-foreground">R$ 425,50 para atingir R$ 3.000</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}