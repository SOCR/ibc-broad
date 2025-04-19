
import { SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface NavigationItem {
  title: string;
  path: string;
  icon: LucideIcon;
}

interface NavigationGroupProps {
  title: string;
  items: NavigationItem[];
}

export const NavigationGroup: React.FC<NavigationGroupProps> = ({ title, items }) => {
  return (
    <SidebarGroup>
      <div className="mb-2 px-4 text-sm font-semibold tracking-tight">
        {title}
      </div>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.path}>
            <SidebarMenuButton asChild>
              <Link to={item.path}>
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
