
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlobalRecommendation } from "@/types/market";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertCircle, 
  TrendingUp, 
  Layers, 
  Globe, 
  BriefcaseBusiness,
  Clock,
  BarChart3,
  CheckCircle2,
  Info
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

interface InvestmentRecommendationsProps {
  recommendations: GlobalRecommendation[];
  forecastPeriod: number;
}

export const InvestmentRecommendations: React.FC<InvestmentRecommendationsProps> = ({
  recommendations,
  forecastPeriod
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedRecommendation, setSelectedRecommendation] = useState<GlobalRecommendation | null>(
    recommendations.length > 0 ? recommendations[0] : null
  );

  // Colors for risk levels
  const riskColors = {
    low: "bg-green-100 text-green-800 border-green-300",
    moderate: "bg-amber-100 text-amber-800 border-amber-300",
    high: "bg-red-100 text-red-800 border-red-300"
  };
  
  // Colors for timeframes
  const timeframeColors = {
    short: "bg-blue-100 text-blue-800 border-blue-300",
    medium: "bg-purple-100 text-purple-800 border-purple-300",
    long: "bg-indigo-100 text-indigo-800 border-indigo-300"
  };

  // Generate projected returns data
  const generateProjectedReturns = (recommendation: GlobalRecommendation) => {
    const baseReturn = recommendation.potentialReturn / 100;
    const months = Array.from({ length: forecastPeriod }, (_, i) => i + 1);
    
    // Adjust volatility based on risk level
    const volatility = 
      recommendation.riskLevel === 'high' ? 0.08 : 
      recommendation.riskLevel === 'moderate' ? 0.05 : 0.03;
    
    // Generate cumulative returns with some random fluctuation
    return months.map(month => {
      // Monthly return rate with random component
      const monthlyBaseReturn = baseReturn / 12;
      const randomFactor = (Math.random() - 0.5) * volatility;
      const monthlyReturn = monthlyBaseReturn + randomFactor;
      
      // Cumulative return for this month (compounded)
      const cumulativeReturn = Math.pow(1 + monthlyReturn, month) - 1;
      
      return {
        month,
        return: cumulativeReturn * 100
      };
    });
  };
  
  // Generate allocation data
  const generateAllocationData = (recommendation: GlobalRecommendation) => {
    // Create allocation based on sectors and risk level
    const sectors = [...new Set(recommendation.sectors)];
    
    // Basic allocations based on risk level
    let equityAllocation = 
      recommendation.riskLevel === 'high' ? 0.75 : 
      recommendation.riskLevel === 'moderate' ? 0.60 : 0.45;
    
    let bondAllocation = 
      recommendation.riskLevel === 'high' ? 0.15 : 
      recommendation.riskLevel === 'moderate' ? 0.25 : 0.40;
    
    let alternativesAllocation = 
      recommendation.riskLevel === 'high' ? 0.10 : 
      recommendation.riskLevel === 'moderate' ? 0.15 : 0.15;
    
    // Adjust based on timeframe
    if (recommendation.timeframe === 'long') {
      equityAllocation += 0.05;
      bondAllocation -= 0.05;
    } else if (recommendation.timeframe === 'short') {
      equityAllocation -= 0.05;
      bondAllocation += 0.05;
    }
    
    return [
      { name: 'Equities', value: equityAllocation * 100 },
      { name: 'Bonds', value: bondAllocation * 100 },
      { name: 'Alternatives', value: alternativesAllocation * 100 }
    ];
  };
  
  const ALLOCATION_COLORS = ['#18453B', '#7A9B76', '#A2AAAD'];
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Investment Recommendations</h2>
      <p className="text-muted-foreground">
        Based on your market projections, here are the investment recommendations 
        for the next {forecastPeriod} months:
      </p>
      
      <div className="grid gap-6 md:grid-cols-3">
        {recommendations.slice(0, 3).map((recommendation) => (
          <Card 
            key={recommendation.id}
            className={`cursor-pointer transition-all hover:border-primary ${
              selectedRecommendation?.id === recommendation.id ? 'border-2 border-primary' : ''
            }`}
            onClick={() => setSelectedRecommendation(recommendation)}
          >
            <CardHeader>
              <CardTitle>{recommendation.title}</CardTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className={`inline-flex text-xs items-center rounded-full border px-2.5 py-0.5 ${riskColors[recommendation.riskLevel]}`}>
                  <AlertCircle className="mr-1 h-3 w-3" />
                  {recommendation.riskLevel.charAt(0).toUpperCase() + recommendation.riskLevel.slice(1)} Risk
                </span>
                <span className={`inline-flex text-xs items-center rounded-full border px-2.5 py-0.5 ${timeframeColors[recommendation.timeframe]}`}>
                  <Clock className="mr-1 h-3 w-3" />
                  {recommendation.timeframe.charAt(0).toUpperCase() + recommendation.timeframe.slice(1)} Term
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {recommendation.description}
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Potential Return:</span>
                  <span className="font-bold text-green-600">
                    {recommendation.potentialReturn.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Confidence Score:</span>
                  <div className="flex items-center">
                    <span className="font-bold">{recommendation.confidenceScore}%</span>
                    <div className="h-2 w-16 bg-gray-200 rounded-full ml-2">
                      <div 
                        className="h-2 bg-blue-500 rounded-full" 
                        style={{ width: `${recommendation.confidenceScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {selectedRecommendation && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{selectedRecommendation.title}</CardTitle>
            <CardDescription>{selectedRecommendation.description}</CardDescription>
          </CardHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="px-6">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="overview">
                  <Info className="mr-2 h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="returns">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Projected Returns
                </TabsTrigger>
                <TabsTrigger value="allocation">
                  <PieChart className="mr-2 h-4 w-4" />
                  Allocation
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="overview" className="px-6 pb-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <Globe className="mr-2 h-4 w-4" />
                      Target Regions
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedRecommendation.regions.map((region, i) => (
                        <Badge key={i} variant="outline">{region}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium flex items-center">
                      <BriefcaseBusiness className="mr-2 h-4 w-4" />
                      Target Sectors
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedRecommendation.sectors.map((sector, i) => (
                        <Badge key={i} variant="secondary">{sector}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium flex items-center">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Key Metrics
                    </h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Potential Return:</span>
                        <span className="font-bold text-green-600">
                          {selectedRecommendation.potentialReturn.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Risk Level:</span>
                        <span className={`inline-flex text-sm items-center rounded-full border px-2.5 py-0.5 ${riskColors[selectedRecommendation.riskLevel]}`}>
                          {selectedRecommendation.riskLevel.charAt(0).toUpperCase() + selectedRecommendation.riskLevel.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Time Horizon:</span>
                        <span className={`inline-flex text-sm items-center rounded-full border px-2.5 py-0.5 ${timeframeColors[selectedRecommendation.timeframe]}`}>
                          {selectedRecommendation.timeframe.charAt(0).toUpperCase() + selectedRecommendation.timeframe.slice(1)} Term
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Confidence Score:</span>
                        <div className="flex items-center">
                          <span className="font-bold">{selectedRecommendation.confidenceScore}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium flex items-center mb-2">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Key Factors
                  </h3>
                  <div className="space-y-2 bg-gray-50 rounded-md p-4">
                    {selectedRecommendation.factors.map((factor, i) => (
                      <div key={i} className="flex items-start">
                        <span className="text-sm">{factor}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium">Recommendations</h3>
                    <p className="mt-2 text-sm">
                      Consider allocating investments to the {selectedRecommendation.sectors.join(', ')} sectors in the {selectedRecommendation.regions.join(', ')} {selectedRecommendation.regions.length > 1 ? 'regions' : 'region'}.
                      This {selectedRecommendation.riskLevel} risk strategy has a {selectedRecommendation.potentialReturn.toFixed(1)}% potential return over the {forecastPeriod}-month period.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="returns" className="px-6 pb-6">
              <div className="space-y-4">
                <h3 className="font-medium">Projected Returns ({forecastPeriod} Month Forecast)</h3>
                <div className="h-[300px]">
                  <ChartContainer config={{}} className="h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={generateProjectedReturns(selectedRecommendation)}
                        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
                        <YAxis label={{ value: 'Return (%)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value) => [`${parseFloat(value as string).toFixed(2)}%`, 'Projected Return']} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="return" 
                          name="Cumulative Return" 
                          stroke="#18453B" 
                          strokeWidth={2} 
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="grid gap-4 md:grid-cols-3 mt-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">Short-term Outlook</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedRecommendation.riskLevel === 'high' ? 
                        'Initial volatility expected with gradual stabilization.' : 
                        'Relatively stable performance with moderate growth trajectory.'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">Mid-term Outlook</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedRecommendation.confidenceScore > 65 ?
                        'Accelerating returns as market factors align favorably.' :
                        'Potential fluctuations based on evolving market conditions.'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">Long-term Outlook</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedRecommendation.potentialReturn > 8 ?
                        'Strong compounding potential with above-average returns.' :
                        'Steady growth aligned with global economic recovery.'}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="allocation" className="px-6 pb-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-4">Recommended Asset Allocation</h3>
                  <div className="h-[250px]">
                    <ChartContainer config={{}} className="h-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={generateAllocationData(selectedRecommendation)}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {generateAllocationData(selectedRecommendation).map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={ALLOCATION_COLORS[index % ALLOCATION_COLORS.length]} 
                              />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-4">Allocation Strategy</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="text-sm font-medium">Equities</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Focus on {selectedRecommendation.sectors.join(', ')} sectors with exposure to
                        {selectedRecommendation.regions.map((r, i) => (
                          <span key={i}>{i === 0 ? ' ' : i === selectedRecommendation.regions.length - 1 ? ' and ' : ', '}{r}</span>
                        ))}.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="text-sm font-medium">Bonds</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedRecommendation.riskLevel === 'high' ?
                          'Limited allocation to high-grade sovereign and corporate debt for stability.' :
                          selectedRecommendation.riskLevel === 'moderate' ?
                          'Balanced mix of sovereign, corporate, and inflation-protected securities.' :
                          'Larger allocation to diverse bond portfolio for capital preservation.'}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="text-sm font-medium">Alternatives</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedRecommendation.riskLevel === 'high' ?
                          'Strategic allocation to REITs, commodities, and private equity for diversification.' :
                          'Selective exposure to REITs and infrastructure investments for stable income.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <CardFooter className="flex justify-end">
            <Button variant="outline">Export Report</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
