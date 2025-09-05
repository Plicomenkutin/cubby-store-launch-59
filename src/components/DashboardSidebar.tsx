import { Home, Package, ShoppingBag, Settings, BarChart3, Users, Tag } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  { id: 'overview', title: 'Visão Geral', icon: Home },
  { id: 'products', title: 'Produtos', icon: Package },
  { id: 'categories', title: 'Categorias', icon: Tag },
  { id: 'orders', title: 'Pedidos', icon: ShoppingBag },
  { id: 'analytics', title: 'Relatórios', icon: BarChart3 },
  { id: 'customers', title: 'Clientes', icon: Users },
  { id: 'settings', title: 'Configurações', icon: Settings },
];

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function DashboardSidebar({ activeTab, onTabChange }: DashboardSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-60"}>
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => onTabChange(item.id)}
                    className={`cursor-pointer ${
                      activeTab === item.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-accent'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {!collapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}