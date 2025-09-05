import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Orders() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Pedidos</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Funcionalidade em desenvolvimento...</p>
        </CardContent>
      </Card>
    </div>
  );
}