import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { X, Upload, Plus } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/contexts/StoreContext';
import { useToast } from '@/hooks/use-toast';

interface ProductFormProps {
  product?: Product;
  onSave: () => void;
  onCancel: () => void;
}

interface WholesaleTier {
  minQuantity: number;
  price: number;
}

export function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const { categories, addProduct, updateProduct } = useStore();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product ? (product.price / 100).toString() : '',
    category: product?.category || '',
    preparationTime: product?.preparationTime || '',
    stock: product?.stock.toString() || '0',
    image: product?.image || '',
    isPromo: product?.isPromo || false,
    promoText: product?.promoText || '',
  });

  const [wholesaleTiers, setWholesaleTiers] = useState<WholesaleTier[]>(
    product?.wholesaleTiers || []
  );

  const [newTier, setNewTier] = useState({ minQuantity: '', price: '' });
  const [imagePreview, setImagePreview] = useState<string>(product?.image || '');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addWholesaleTier = () => {
    const minQuantity = parseInt(newTier.minQuantity);
    const price = parseFloat(newTier.price);
    
    if (minQuantity > 0 && price > 0) {
      setWholesaleTiers(prev => [...prev, { minQuantity, price: Math.round(price * 100) }]);
      setNewTier({ minQuantity: '', price: '' });
    }
  };

  const removeWholesaleTier = (index: number) => {
    setWholesaleTiers(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const productData = {
      name: formData.name,
      description: formData.description,
      price: Math.round(parseFloat(formData.price) * 100),
      category: formData.category,
      preparationTime: formData.preparationTime,
      stock: parseInt(formData.stock),
      image: formData.image,
      isPromo: formData.isPromo,
      promoText: formData.promoText,
      wholesaleTiers: wholesaleTiers.length > 0 ? wholesaleTiers : undefined,
    };

    if (product) {
      updateProduct(product.id, productData);
      toast({
        title: "Produto atualizado",
        description: `O produto "${formData.name}" foi atualizado com sucesso.`,
      });
    } else {
      addProduct(productData);
      toast({
        title: "Produto adicionado",
        description: `O produto "${formData.name}" foi adicionado com sucesso.`,
      });
    }

    onSave();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product ? 'Editar Produto' : 'Adicionar Novo Produto'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome do Produto */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Produto *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ex: Bolo de Chocolate Premium"
              required
            />
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição curta (até 2 linhas) *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descrição que aparecerá no card do produto"
              rows={3}
              required
            />
          </div>

          {/* Foto Principal */}
          <div className="space-y-2">
            <Label>Foto Principal</Label>
            <div className="space-y-4">
              {imagePreview && (
                <div className="relative w-32 h-32">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={() => {
                      setImagePreview('');
                      setFormData(prev => ({ ...prev, image: '' }));
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Escolher Imagem
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Categoria e Preço */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Categoria *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.filter(cat => cat.slug !== 'todos').map((category) => (
                    <SelectItem key={category.id} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Preço Unitário (R$) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="0,00"
                required
              />
            </div>
          </div>

          {/* Tempo de Preparo e Estoque */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="preparationTime">Tempo de Preparo</Label>
              <Input
                id="preparationTime"
                value={formData.preparationTime}
                onChange={(e) => setFormData(prev => ({ ...prev, preparationTime: e.target.value }))}
                placeholder="Ex: 2-3 dias"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Estoque Disponível</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                placeholder="0"
              />
            </div>
          </div>

          {/* Promoção */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="isPromo"
                checked={formData.isPromo}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPromo: checked }))}
              />
              <Label htmlFor="isPromo">Produto em promoção</Label>
            </div>

            {formData.isPromo && (
              <div className="space-y-2">
                <Label htmlFor="promoText">Texto da Promoção</Label>
                <Input
                  id="promoText"
                  value={formData.promoText}
                  onChange={(e) => setFormData(prev => ({ ...prev, promoText: e.target.value }))}
                  placeholder="Ex: 20% OFF, Entrega Rápida"
                />
              </div>
            )}
          </div>

          {/* Preços Promocionais por Quantidade */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Preços Promocionais por Quantidade</Label>
            
            {wholesaleTiers.length > 0 && (
              <div className="space-y-2">
                {wholesaleTiers.map((tier, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Badge variant="outline" className="flex-1">
                      {tier.minQuantity}+ unidades: R$ {(tier.price / 100).toFixed(2)}
                    </Badge>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeWholesaleTier(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Input
                type="number"
                min="2"
                placeholder="Quantidade mínima"
                value={newTier.minQuantity}
                onChange={(e) => setNewTier(prev => ({ ...prev, minQuantity: e.target.value }))}
              />
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="Preço (R$)"
                value={newTier.price}
                onChange={(e) => setNewTier(prev => ({ ...prev, price: e.target.value }))}
              />
              <Button
                type="button"
                variant="outline"
                onClick={addWholesaleTier}
                disabled={!newTier.minQuantity || !newTier.price}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">
              {product ? 'Atualizar' : 'Adicionar'} Produto
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}