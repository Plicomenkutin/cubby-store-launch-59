import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Package } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import { ProductForm } from './ProductForm';
import { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';

export function Products() {
  const { products, categories, deleteProduct } = useStore();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const formatPrice = (price: number) => {
    return `R$ ${(price / 100).toFixed(2).replace('.', ',')}`;
  };

  const getCategoryName = (categorySlug: string) => {
    const category = categories.find(cat => cat.slug === categorySlug);
    return category?.name || categorySlug;
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (product: Product) => {
    deleteProduct(product.id);
    toast({
      title: "Produto removido",
      description: `O produto "${product.name}" foi removido com sucesso.`,
    });
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleFormClose}>
            ← Voltar
          </Button>
          <h2 className="text-2xl font-bold">
            {editingProduct ? 'Editar Produto' : 'Adicionar Produto'}
          </h2>
        </div>
        
        <ProductForm
          product={editingProduct || undefined}
          onSave={handleFormClose}
          onCancel={handleFormClose}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Produtos</h2>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Adicionar Produto
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Gerenciar Produtos ({products.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                Nenhum produto encontrado. Adicione seu primeiro produto!
              </p>
              <Button onClick={() => setShowForm(true)}>
                Adicionar Primeiro Produto
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{product.name}</h3>
                      {product.isPromo && product.promoText && (
                        <Badge variant="secondary" className="text-xs">
                          {product.promoText}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-semibold text-primary">
                        {formatPrice(product.price)}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {getCategoryName(product.category)}
                      </Badge>
                      <span className="text-muted-foreground">
                        Estoque: {product.stock}
                      </span>
                      {product.preparationTime && (
                        <span className="text-muted-foreground">
                          {product.preparationTime}
                        </span>
                      )}
                    </div>
                    {product.wholesaleTiers && product.wholesaleTiers.length > 0 && (
                      <div className="flex gap-1 flex-wrap">
                        {product.wholesaleTiers.map((tier, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tier.minQuantity}+: {formatPrice(tier.price)}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(product)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(product)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}