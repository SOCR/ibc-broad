
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { TradeIndicator } from "@/types/market";
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowUp, CircleMinus } from 'lucide-react';

interface TradeIndicatorsControlProps {
  tradeIndicators: TradeIndicator[];
  setTradeIndicators: (indicators: TradeIndicator[]) => void;
}

export const TradeIndicatorsControl: React.FC<TradeIndicatorsControlProps> = ({
  tradeIndicators,
  setTradeIndicators
}) => {
  const updateIndicator = (id: string, newValue: number) => {
    const updatedIndicators = tradeIndicators.map(indicator => {
      if (indicator.id === id) {
        // Determine impact based on the change
        let impact: 'positive' | 'negative' | 'neutral';
        const change = newValue - indicator.currentValue;
        
        // Custom logic per indicator type
        switch(id) {
          case 'trade-volume':
          case 'supply-chain':
          case 'trade-agreements':
            // For these, higher is better
            impact = change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';
            break;
          case 'shipping-costs':
          case 'tariffs':
            // For these, lower is better
            impact = change < 0 ? 'positive' : change > 0 ? 'negative' : 'neutral';
            break;
          default:
            impact = 'neutral';
        }
        
        return {
          ...indicator,
          projected: newValue,
          impact
        };
      }
      return indicator;
    });
    
    setTradeIndicators(updatedIndicators);
  };

  return (
    <div className="space-y-4">
      {tradeIndicators.map((indicator) => (
        <Card key={indicator.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{indicator.name}</CardTitle>
              <Badge
                variant={
                  indicator.impact === 'positive' ? 'default' :
                  indicator.impact === 'negative' ? 'destructive' : 'outline'
                }
                className="ml-2"
              >
                {indicator.impact === 'positive' ? (
                  <><ArrowUp className="mr-1 h-3 w-3" /> Positive</>
                ) : indicator.impact === 'negative' ? (
                  <><ArrowDown className="mr-1 h-3 w-3" /> Negative</>
                ) : (
                  <><CircleMinus className="mr-1 h-3 w-3" /> Neutral</>
                )}
              </Badge>
            </div>
            <CardDescription>{indicator.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Current: {indicator.currentValue.toFixed(1)}</span>
                <span className="font-medium">Projected: {indicator.projected.toFixed(1)}</span>
              </div>
              <Slider
                defaultValue={[indicator.projected]}
                max={10}
                min={1}
                step={0.1}
                onValueChange={(value) => updateIndicator(indicator.id, value[0])}
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
