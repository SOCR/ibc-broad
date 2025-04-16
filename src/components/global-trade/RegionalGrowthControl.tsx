
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { RegionalGrowth } from "@/types/market";
import { Badge } from '@/components/ui/badge';
import { TrendingDown, TrendingUp, ArrowRight } from 'lucide-react';

interface RegionalGrowthControlProps {
  regionalGrowth: RegionalGrowth[];
  setRegionalGrowth: (growth: RegionalGrowth[]) => void;
}

export const RegionalGrowthControl: React.FC<RegionalGrowthControlProps> = ({
  regionalGrowth,
  setRegionalGrowth
}) => {
  const [activeRegion, setActiveRegion] = useState(regionalGrowth[0]?.region || "");
  
  const handleRegionChange = (region: string) => {
    setActiveRegion(region);
  };
  
  const updateRegionalFactor = (region: string, factor: 'projectedGrowth' | 'tradeVolume' | 'marketAccessibility' | 'stability', value: number[]) => {
    const updated = regionalGrowth.map(r => {
      if (r.region === region) {
        return {
          ...r,
          [factor]: value[0]
        };
      }
      return r;
    });
    
    setRegionalGrowth(updated);
  };
  
  const updateIndustryStrength = (region: string, industryName: string, value: number[]) => {
    const updated = regionalGrowth.map(r => {
      if (r.region === region) {
        return {
          ...r,
          industries: r.industries.map(industry => {
            if (industry.name === industryName) {
              // Determine outlook based on strength
              let outlook: 'positive' | 'neutral' | 'negative';
              if (value[0] >= 8) outlook = 'positive';
              else if (value[0] >= 5) outlook = 'neutral';
              else outlook = 'negative';
              
              return {
                ...industry,
                strength: value[0],
                outlook
              };
            }
            return industry;
          })
        };
      }
      return r;
    });
    
    setRegionalGrowth(updated);
  };
  
  return (
    <div className="space-y-4">
      <Tabs 
        value={activeRegion} 
        onValueChange={handleRegionChange}
        defaultValue={regionalGrowth[0]?.region}
      >
        <TabsList className="flex w-full overflow-x-auto">
          {regionalGrowth.map(region => (
            <TabsTrigger key={region.region} value={region.region}>
              {region.region}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {regionalGrowth.map(region => (
          <TabsContent key={region.region} value={region.region} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  {region.region} 
                  <Badge className="ml-2" variant="outline">
                    {region.currentGrowth}% <ArrowRight className="mx-1 h-3 w-3" /> {region.projectedGrowth}%
                  </Badge>
                </CardTitle>
                <CardDescription>Current and projected economic growth</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>GDP Growth (%)</span>
                    <span className="font-medium">{region.projectedGrowth.toFixed(1)}%</span>
                  </div>
                  <Slider
                    defaultValue={[region.projectedGrowth]}
                    min={-2}
                    max={10}
                    step={0.1}
                    onValueChange={(value) => updateRegionalFactor(region.region, 'projectedGrowth', value)}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Decline</span>
                    <span>Strong Growth</span>
                  </div>
                </div>
                
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Trade Volume</span>
                    <span className="font-medium">{region.tradeVolume.toFixed(1)}/10</span>
                  </div>
                  <Slider
                    defaultValue={[region.tradeVolume]}
                    min={0}
                    max={10}
                    step={0.1}
                    onValueChange={(value) => updateRegionalFactor(region.region, 'tradeVolume', value)}
                  />
                </div>
                
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Market Accessibility</span>
                    <span className="font-medium">{region.marketAccessibility.toFixed(1)}/10</span>
                  </div>
                  <Slider
                    defaultValue={[region.marketAccessibility]}
                    min={0}
                    max={10}
                    step={0.1}
                    onValueChange={(value) => updateRegionalFactor(region.region, 'marketAccessibility', value)}
                  />
                </div>
                
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Political & Economic Stability</span>
                    <span className="font-medium">{region.stability.toFixed(1)}/10</span>
                  </div>
                  <Slider
                    defaultValue={[region.stability]}
                    min={0}
                    max={10}
                    step={0.1}
                    onValueChange={(value) => updateRegionalFactor(region.region, 'stability', value)}
                  />
                </div>
              </CardContent>
            </Card>
            
            <div className="grid gap-4 md:grid-cols-2">
              {region.industries.map(industry => (
                <Card key={industry.name}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{industry.name}</CardTitle>
                      <Badge
                        variant={
                          industry.outlook === 'positive' ? 'default' :
                          industry.outlook === 'negative' ? 'destructive' : 'outline'
                        }
                      >
                        {industry.outlook === 'positive' ? (
                          <><TrendingUp className="mr-1 h-3 w-3" /> Positive</>
                        ) : industry.outlook === 'negative' ? (
                          <><TrendingDown className="mr-1 h-3 w-3" /> Negative</>
                        ) : 'Neutral'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Industry Strength</span>
                        <span className="font-medium">{industry.strength}/10</span>
                      </div>
                      <Slider
                        defaultValue={[industry.strength]}
                        max={10}
                        min={1}
                        step={0.5}
                        onValueChange={(value) => updateIndustryStrength(region.region, industry.name, value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
