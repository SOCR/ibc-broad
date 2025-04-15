
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard"; 
import IBEXAnalysis from "./pages/IBEXAnalysis";
import MarketData from "./pages/MarketData";
import BroadCourses from "./pages/BroadCourses";
import GlobalTrade from "./pages/GlobalTrade";
import StockExchanges from "./pages/StockExchanges";
import ExchangeRates from "./pages/ExchangeRates";
import EconomicIndicators from "./pages/EconomicIndicators";
import SupplyChain from "./pages/SupplyChain";
import InternationalTrade from "./pages/InternationalTrade";
import Team from "./pages/Team";
import Tutorial from "./pages/Tutorial";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ibex-analysis" element={<IBEXAnalysis />} />
            <Route path="/market-data" element={<MarketData />} />
            <Route path="/stock-exchanges" element={<StockExchanges />} />
            <Route path="/exchange-rates" element={<ExchangeRates />} />
            <Route path="/economic-indicators" element={<EconomicIndicators />} />
            <Route path="/global-trade" element={<GlobalTrade />} />
            <Route path="/supply-chain" element={<SupplyChain />} />
            <Route path="/international-trade" element={<InternationalTrade />} />
            <Route path="/broad-courses" element={<BroadCourses />} />
            <Route path="/team" element={<Team />} />
            <Route path="/tutorial" element={<Tutorial />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
