import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Palette, Save } from 'lucide-react';
import { mockStore } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export function Settings() {
  const [storeSettings, setStoreSettings] = useState({
    name: mockStore.name,
    themeColor: mockStore.themeColor,
    deliveryInfo: mockStore.deliveryInfo || '',
    phone: mockStore.phone || '',
    instagram: mockStore.socialLinks?.instagram || '',
    facebook: mockStore.socialLinks?.facebook || '',
    whatsapp: mockStore.socialLinks?.whatsapp || '',
  });
  
  const { toast } = useToast();

  const handleSave = () => {
    // Aqui você salvaria as configurações no backend
    toast({
      title: "Configurações salvas",
      description: "As configurações da loja foram atualizadas com sucesso.",
    });
  };

  const colorPresets = [
    '#D43F6D', // Rosa/Pink
    '#3B82F6', // Azul
    '#10B981', // Verde
    '#F59E0B', // Amarelo/Laranja
    '#8B5CF6', // Roxo
    '#EF4444', // Vermelho
    '#06B6D4', // Ciano
    '#84CC16', // Lima
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Configurações</h2>
      
      <div className="grid gap-6">
        {/* Informações da Loja */}
        <Card>
          <CardHeader>
            <CardTitle>Informações da Loja</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="store-name">Nome da Loja</Label>
              <Input
                id="store-name"
                value={storeSettings.name}
                onChange={(e) => setStoreSettings(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nome da sua loja"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="delivery-info">Informações de Entrega</Label>
              <Textarea
                id="delivery-info"
                value={storeSettings.deliveryInfo}
                onChange={(e) => setStoreSettings(prev => ({ ...prev, deliveryInfo: e.target.value }))}
                placeholder="Ex: Entrega grátis acima de R$ 50"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={storeSettings.phone}
                onChange={(e) => setStoreSettings(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="(11) 99999-9999"
              />
            </div>
          </CardContent>
        </Card>

        {/* Cor da Loja */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Cor da Loja
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme-color">Cor Principal</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="theme-color"
                  type="color"
                  value={storeSettings.themeColor}
                  onChange={(e) => setStoreSettings(prev => ({ ...prev, themeColor: e.target.value }))}
                  className="w-16 h-10 border rounded cursor-pointer"
                />
                <Input
                  value={storeSettings.themeColor}
                  onChange={(e) => setStoreSettings(prev => ({ ...prev, themeColor: e.target.value }))}
                  placeholder="#D43F6D"
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Cores Predefinidas</Label>
              <div className="grid grid-cols-8 gap-2">
                {colorPresets.map((color) => (
                  <button
                    key={color}
                    onClick={() => setStoreSettings(prev => ({ ...prev, themeColor: color }))}
                    className={`w-10 h-10 rounded border-2 transition-all hover:scale-110 ${
                      storeSettings.themeColor === color 
                        ? 'border-foreground shadow-lg' 
                        : 'border-muted hover:border-foreground/50'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Redes Sociais */}
        <Card>
          <CardHeader>
            <CardTitle>Redes Sociais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={storeSettings.instagram}
                onChange={(e) => setStoreSettings(prev => ({ ...prev, instagram: e.target.value }))}
                placeholder="@suaempresa"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                value={storeSettings.facebook}
                onChange={(e) => setStoreSettings(prev => ({ ...prev, facebook: e.target.value }))}
                placeholder="facebook.com/suaempresa"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                value={storeSettings.whatsapp}
                onChange={(e) => setStoreSettings(prev => ({ ...prev, whatsapp: e.target.value }))}
                placeholder="5511999999999"
              />
            </div>
          </CardContent>
        </Card>

        {/* Salvar Configurações */}
        <Card>
          <CardContent className="pt-6">
            <Button onClick={handleSave} className="w-full gap-2">
              <Save className="w-4 h-4" />
              Salvar Configurações
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}