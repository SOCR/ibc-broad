
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { 
  BarChart3, 
  GlobeIcon, 
  Home, 
  LineChart, 
  Users, 
  BookOpen,
  BarChart2,
  DollarSign,
  TrendingUp,
  Compass,
  BookIcon,
  GraduationCap,
  TruckIcon,
  ShipIcon,
  BriefcaseIcon,
  InfoIcon,
  Calculator,
  Building
} from "lucide-react";

// MSU logo component
const MsuLogo = () => {
  const { isOpen } = useSidebar();
  
  return (
    <div className="flex items-center">
      {!isOpen ? (
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-msu-green">
          <span className="text-white font-bold text-sm">MSU</span>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-msu-green mr-2">
            <span className="text-white font-bold text-sm">MSU</span>
          </div>
          <span className="font-semibold text-msu-green">
            IBC Dashboard
          </span>
        </div>
      )}
    </div>
  );
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <MsuLogo />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <div className="mb-2 px-4 text-sm font-semibold tracking-tight">
            Dashboard
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/">
                  <Home className="h-5 w-5 mr-3" />
                  <span>Overview</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/ibex-analysis">
                  <BarChart3 className="h-5 w-5 mr-3" />
                  <span>IBEX Analysis</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/market-data">
                  <LineChart className="h-5 w-5 mr-3" />
                  <span>Market Data</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        
        <SidebarGroup>
          <div className="mb-2 px-4 text-sm font-semibold tracking-tight">
            Financial Data
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/stock-exchanges">
                  <TrendingUp className="h-5 w-5 mr-3" />
                  <span>Stock Exchanges</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/exchange-rates">
                  <DollarSign className="h-5 w-5 mr-3" />
                  <span>Exchange Rates</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/economic-indicators">
                  <BarChart2 className="h-5 w-5 mr-3" />
                  <span>Economic Indicators</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        
        <SidebarGroup>
          <div className="mb-2 px-4 text-sm font-semibold tracking-tight">
            Trade & Supply Chain
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/global-trade">
                  <GlobeIcon className="h-5 w-5 mr-3" />
                  <span>Global Trade</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/supply-chain">
                  <TruckIcon className="h-5 w-5 mr-3" />
                  <span>Supply Chain</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/international-trade">
                  <ShipIcon className="h-5 w-5 mr-3" />
                  <span>International Trade</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        
        <SidebarGroup>
          <div className="mb-2 px-4 text-sm font-semibold tracking-tight">
            Case Studies
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/cfp-consulting">
                  <Calculator className="h-5 w-5 mr-3" />
                  <span>CFP Consulting</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        
        <SidebarGroup>
          <div className="mb-2 px-4 text-sm font-semibold tracking-tight">
            Resources
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/broad-courses">
                  <GraduationCap className="h-5 w-5 mr-3" />
                  <span>Broad Courses</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/team">
                  <Users className="h-5 w-5 mr-3" />
                  <span>IBC Team</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/tutorial">
                  <BookOpen className="h-5 w-5 mr-3" />
                  <span>Tutorial</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/about">
                  <InfoIcon className="h-5 w-5 mr-3" />
                  <span>About</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MSU Broad College IBC</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
