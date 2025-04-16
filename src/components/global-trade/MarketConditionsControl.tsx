
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { MarketFactors } from "@/types/market";

interface MarketConditionsControlProps {
  marketFactors: MarketFactors;
  setMarketFactors: (factors: MarketFactors) => void;
}

export const MarketConditionsControl: React.FC<MarketConditionsControlProps> = ({
  marketFactors,
  setMarketFactors
}) => {
  const updateFactor = (key: keyof MarketFactors, value: number[]) => {
    setMarketFactors({
      ...marketFactors,
      [key]: value[0]
    });
  };

  const factors = [
    {
      key: 'interestRates' as keyof MarketFactors,
      title: 'Interest Rates',
      min: 0,
      max: 10,
      step: 0.1,
      description: 'Base interest rates, higher values indicate higher rates',
      lowLabel: 'Low',
      highLabel: 'High'
    },
    {
      key: 'inflation' as keyof MarketFactors,
      title: 'Inflation',
      min: 0,
      max: 15,
      step: 0.1,
      description: 'Current inflation rates (%)',
      lowLabel: 'Low',
      highLabel: 'High'
    },
    {
      key: 'currencyVolatility' as keyof MarketFactors,
      title: 'Currency Volatility',
      min: 0,
      max: 10,
      step: 0.1,
      description: 'Volatility in exchange rates',
      lowLabel: 'Stable',
      highLabel: 'Volatile'
    },
    {
      key: 'commodityPrices' as keyof MarketFactors,
      title: 'Commodity Prices',
      min: 0,
      max: 10,
      step: 0.1,
      description: 'Level of global commodity prices',
      lowLabel: 'Low',
      highLabel: 'High'
    },
    {
      key: 'geopoliticalRisk' as keyof MarketFactors,
      title: 'Geopolitical Risk',
      min: 0,
      max: 10,
      step: 0.1,
      description: 'Level of geopolitical tensions and risks',
      lowLabel: 'Low',
      highLabel: 'High'
    },
    {
      key: 'consumerConfidence' as keyof MarketFactors,
      title: 'Consumer Confidence',
      min: 0,
      max: 10,
      step: 0.1,
      description: 'Level of consumer confidence in the economy',
      lowLabel: 'Low',
      highLabel: 'High'
    },
    {
      key: 'manufacturingOutput' as keyof MarketFactors,
      title: 'Manufacturing Output',
      min: 0,
      max: 10,
      step: 0.1,
      description: 'Level of global manufacturing activity',
      lowLabel: 'Contracting',
      highLabel: 'Expanding'
    },
    {
      key: 'energyPrices' as keyof MarketFactors,
      title: 'Energy Prices',
      min: 0,
      max: 10,
      step: 0.1,
      description: 'Current energy price levels',
      lowLabel: 'Low',
      highLabel: 'High'
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {factors.map((factor) => (
        <Card key={factor.key}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{factor.title}</CardTitle>
            <CardDescription>{factor.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{factor.lowLabel}</span>
                <span className="font-medium">
                  {factor.key === 'inflation' 
                    ? `${marketFactors[factor.key].toFixed(1)}%` 
                    : marketFactors[factor.key].toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground">{factor.highLabel}</span>
              </div>
              <Slider
                defaultValue={[marketFactors[factor.key]]}
                max={factor.max}
                min={factor.min}
                step={factor.step}
                onValueChange={(value) => updateFactor(factor.key, value)}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
