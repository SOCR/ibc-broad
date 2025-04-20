
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader,
} from "@/components/ui/sidebar";
import { MsuLogo } from "./sidebar/Logo";
import { NavigationGroup } from "./sidebar/NavigationGroup";
import { 
  Home,
  BarChart3,
  LineChart,
  TrendingUp,
  DollarSign,
  BarChart2,
  GlobeIcon,
  TruckIcon,
  ShipIcon,
  Calculator,
  GraduationCap,
  Users,
  BookOpen,
  InfoIcon,
  FileText
} from "lucide-react";

const dashboardItems = [
  { title: "Overview", path: "/", icon: Home },
  { title: "IBEX Analysis", path: "/ibex-analysis", icon: BarChart3 },
  { title: "Market Data", path: "/market-data", icon: LineChart },
];

const financialItems = [
  { title: "Stock Exchanges", path: "/stock-exchanges", icon: TrendingUp },
  { title: "Exchange Rates", path: "/exchange-rates", icon: DollarSign },
  { title: "Economic Indicators", path: "/economic-indicators", icon: BarChart2 },
];

const tradeItems = [
  { title: "Global Trade", path: "/global-trade", icon: GlobeIcon },
  { title: "Supply Chain", path: "/supply-chain", icon: TruckIcon },
  { title: "International Trade", path: "/international-trade", icon: ShipIcon },
];

const resourceItems = [
  { title: "Broad Courses", path: "/broad-courses", icon: GraduationCap },
  { title: "IBC Team", path: "/team", icon: Users },
  { title: "Tutorial", path: "/tutorial", icon: BookOpen },
  { title: "About", path: "/about", icon: InfoIcon },
];

const caseStudiesItems = [
  { title: "Case Studies", path: "/case-studies", icon: FileText }
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <MsuLogo />
      </SidebarHeader>
      
      <SidebarContent>
        <NavigationGroup title="Dashboard" items={dashboardItems} />
        <NavigationGroup title="Financial Data" items={financialItems} />
        <NavigationGroup title="Trade & Supply Chain" items={tradeItems} />
        <NavigationGroup title="Case Studies" items={caseStudiesItems} />
        <NavigationGroup title="Resources" items={resourceItems} />
      </SidebarContent>
      
      <SidebarFooter>
        <div className="text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MSU Broad College IBC</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
