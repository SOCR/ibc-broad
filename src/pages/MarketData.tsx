
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "@/components/market/OverviewTab";
import { EconomicTab } from "@/components/market/EconomicTab";

const MarketData: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Global Market Data</h1>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Market Overview</TabsTrigger>
          <TabsTrigger value="economic">Economic Indicators</TabsTrigger>
          <TabsTrigger value="trends">Market Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <OverviewTab />
        </TabsContent>
        
        <TabsContent value="economic" className="space-y-6 mt-6">
          <EconomicTab />
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-6 mt-6">
          <EconomicTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketData;
