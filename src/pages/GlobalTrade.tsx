
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarketConditionsControl } from "@/components/global-trade/MarketConditionsControl";
import { TradeIndicatorsControl } from "@/components/global-trade/TradeIndicatorsControl";
import { RegionalGrowthControl } from "@/components/global-trade/RegionalGrowthControl";
import { InvestmentRecommendations } from "@/components/global-trade/InvestmentRecommendations";
import { MarketFactors, TradeIndicator, RegionalGrowth, GlobalRecommendation } from "@/types/market";
import { defaultMarketFactors, defaultTradeIndicators, defaultRegionalGrowth, generateRecommendations } from "@/utils/global-trade";

const GlobalTrade = () => {
  // State for all configurable parameters
  const [marketFactors, setMarketFactors] = useState<MarketFactors>(defaultMarketFactors);
  const [tradeIndicators, setTradeIndicators] = useState<TradeIndicator[]>(defaultTradeIndicators);
  const [regionalGrowth, setRegionalGrowth] = useState<RegionalGrowth[]>(defaultRegionalGrowth);
  const [forecastPeriod, setForecastPeriod] = useState<number>(6); // Default 6 months
  const [recommendations, setRecommendations] = useState<GlobalRecommendation[]>(
    generateRecommendations(defaultMarketFactors, defaultTradeIndicators, defaultRegionalGrowth, 6)
  );

  // Update recommendations when any factor changes
  const updateRecommendations = () => {
    const newRecommendations = generateRecommendations(
      marketFactors, 
      tradeIndicators,
      regionalGrowth,
      forecastPeriod
    );
    setRecommendations(newRecommendations);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Global Trade Analysis</h1>
        <p className="text-muted-foreground">
          Adjust market conditions, global trade indicators, and regional economic factors to generate
          investment recommendations for the next {forecastPeriod} months.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Forecast Period</CardTitle>
          <CardDescription>Select the timeframe for your analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>3 months</span>
              <span>{forecastPeriod} months</span>
              <span>18 months</span>
            </div>
            <input 
              type="range" 
              min="3" 
              max="18" 
              value={forecastPeriod}
              onChange={(e) => {
                setForecastPeriod(parseInt(e.target.value));
                updateRecommendations();
              }}
              className="w-full"
              step="3"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="market-conditions">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="market-conditions">Market Conditions</TabsTrigger>
          <TabsTrigger value="trade-indicators">Global Trade Indicators</TabsTrigger>
          <TabsTrigger value="regional-growth">Regional Growth Factors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="market-conditions">
          <MarketConditionsControl 
            marketFactors={marketFactors} 
            setMarketFactors={(factors) => {
              setMarketFactors(factors);
              updateRecommendations();
            }}
          />
        </TabsContent>
        
        <TabsContent value="trade-indicators">
          <TradeIndicatorsControl 
            tradeIndicators={tradeIndicators} 
            setTradeIndicators={(indicators) => {
              setTradeIndicators(indicators);
              updateRecommendations();
            }}
          />
        </TabsContent>
        
        <TabsContent value="regional-growth">
          <RegionalGrowthControl 
            regionalGrowth={regionalGrowth} 
            setRegionalGrowth={(growth) => {
              setRegionalGrowth(growth);
              updateRecommendations();
            }}
          />
        </TabsContent>
      </Tabs>
      
      <InvestmentRecommendations 
        recommendations={recommendations} 
        forecastPeriod={forecastPeriod}
      />
    </div>
  );
};

export default GlobalTrade;
