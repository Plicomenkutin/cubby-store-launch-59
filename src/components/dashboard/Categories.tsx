import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { mockCategories } from '@/data/mockData';
import { Category } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

export function Categories() {
  const [categories, setCategories] = useState<Category[]>(mockCategories.filter(cat => cat.slug !== 'todos'));
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const { toast } = useToast();

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const newCategory: Category = {
      id: Date.now().toString(),
      name: newCategoryName,
      slug: newCategoryName.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
    };
    
    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setIsAddDialogOpen(false);
    
    toast({
      title: "Categoria adicionada",
      description: `A categoria "${newCategoryName}" foi adicionada com sucesso.`,
    });
  };

  const handleEditCategory = () => {
    if (!editingCategory || !newCategoryName.trim()) return;
    
    setCategories(categories.map(cat => 
      cat.id === editingCategory.id 
        ? { ...cat, name: newCategoryName, slug: newCategoryName.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '') }
        : cat
    ));
    
    toast({
      title: "Categoria atualizada",
      description: `A categoria foi atualizada para "${newCategoryName}".`,
    });
    
    setEditingCategory(null);
    setNewCategoryName('');
    setIsEditDialogOpen(false);
  };

  const handleDeleteCategory = (categoryId: string, categoryName: string) => {
    setCategories(categories.filter(cat => cat.id !== categoryId));
    
    toast({
      title: "Categoria removida",
      description: `A categoria "${categoryName}" foi removida com sucesso.`,
    });
  };

  const startEditCategory = (category: Category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Categorias</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Adicionar Categoria
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Nova Categoria</DialogTitle>
              <DialogDescription>
                Crie uma nova categoria para organizar seus produtos.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category-name">Nome da Categoria</Label>
                <Input
                  id="category-name"
                  placeholder="Ex: Sobremesas"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddCategory}>
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Categorias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">{category.name}</Badge>
                  <span className="text-sm text-muted-foreground">
                    Slug: {category.slug}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEditCategory(category)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteCategory(category.id, category.name)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {categories.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Nenhuma categoria encontrada. Adicione sua primeira categoria!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Categoria</DialogTitle>
            <DialogDescription>
              Modifique o nome da categoria selecionada.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-category-name">Nome da Categoria</Label>
              <Input
                id="edit-category-name"
                placeholder="Ex: Sobremesas"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditCategory}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}