
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { investmentAllocations } from "@/data/marketData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, BarChart3, TrendingUp, AlertTriangle, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PortfolioAllocationProps {
  riskTolerance: 'low' | 'medium' | 'high';
}

export function PortfolioAllocation({ riskTolerance }: PortfolioAllocationProps) {
  const [selectedAllocation, setSelectedAllocation] = useState(() => {
    // Default allocation based on risk tolerance
    if (riskTolerance === 'low') return "Conservative";
    if (riskTolerance === 'medium') return "Balanced";
    return "Moderately Aggressive";
  });
  
  const COLORS = ['#18453B', '#7A9B76', '#A2AAAD', '#FF6B35', '#4361EE', '#FFCA28'];
  
  const allocationData = React.useMemo(() => {
    const allocation = investmentAllocations.find(a => a.name === selectedAllocation);
    if (!allocation) return [];
    
    return [
      { name: 'Bonds', value: allocation.allocation.bonds },
      { name: 'Large Cap', value: allocation.allocation.largeCap },
      { name: 'Mid Cap', value: allocation.allocation.midCap },
      { name: 'Small Cap', value: allocation.allocation.smallCap },
      { name: 'International', value: allocation.allocation.international },
      { name: 'Alternatives', value: allocation.allocation.alternatives },
    ];
  }, [selectedAllocation]);

  const currentAllocation = investmentAllocations.find(a => a.name === selectedAllocation);
  
  // Historical performance data by asset class (simulated)
  const historicalPerformanceData = [
    { year: '2018', Bonds: 0.5, 'Large Cap': -4.4, 'Mid Cap': -9.1, 'Small Cap': -11.1, International: -13.8, Alternatives: -3.5 },
    { year: '2019', Bonds: 8.7, 'Large Cap': 31.5, 'Mid Cap': 30.5, 'Small Cap': 25.5, International: 21.5, Alternatives: 10.7 },
    { year: '2020', Bonds: 7.5, 'Large Cap': 18.4, 'Mid Cap': 17.1, 'Small Cap': 19.9, International: 7.8, Alternatives: -1.9 },
    { year: '2021', Bonds: -1.5, 'Large Cap': 28.7, 'Mid Cap': 24.8, 'Small Cap': 14.8, International: 7.8, Alternatives: 27.1 },
    { year: '2022', Bonds: -13.0, 'Large Cap': -18.1, 'Mid Cap': -17.3, 'Small Cap': -20.4, International: -16.0, Alternatives: -12.8 },
    { year: '2023', Bonds: 5.5, 'Large Cap': 26.3, 'Mid Cap': 16.9, 'Small Cap': 16.1, International: 17.7, Alternatives: 11.1 },
  ];

  // Calculate historical portfolio performance based on selected allocation
  const portfolioPerformance = historicalPerformanceData.map(yearData => {
    if (!currentAllocation) return { year: yearData.year, return: 0 };
    
    const portfolioReturn = (
      (yearData.Bonds * currentAllocation.allocation.bonds / 100) +
      (yearData['Large Cap'] * currentAllocation.allocation.largeCap / 100) +
      (yearData['Mid Cap'] * currentAllocation.allocation.midCap / 100) +
      (yearData['Small Cap'] * currentAllocation.allocation.smallCap / 100) +
      (yearData.International * currentAllocation.allocation.international / 100) +
      (yearData.Alternatives * currentAllocation.allocation.alternatives / 100)
    );
    
    return {
      year: yearData.year,
      return: parseFloat(portfolioReturn.toFixed(2)),
      conservative: portfolioReturn * 0.7,
      balanced: portfolioReturn * 0.9,
      aggressive: portfolioReturn * 1.1,
    };
  });
  
  // Risk-adjusted metrics for the selected portfolio
  const riskAdjustedMetrics = {
    sharpeRatio: currentAllocation ? (currentAllocation.expectedReturn / currentAllocation.volatility).toFixed(2) : '0',
    sortinoRatio: '1.45',
    informationRatio: '0.87',
    treynorRatio: '0.72',
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Portfolio Allocation</CardTitle>
          <Select value={selectedAllocation} onValueChange={setSelectedAllocation}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Strategy" />
            </SelectTrigger>
            <SelectContent>
              {investmentAllocations.map(allocation => (
                <SelectItem key={allocation.name} value={allocation.name}>
                  {allocation.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CardDescription>
          Recommended asset allocation based on risk profile
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="allocation">
          <TabsList className="mb-4">
            <TabsTrigger value="allocation">Allocation</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="metrics">Risk Metrics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="allocation" className="space-y-4">
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {currentAllocation && (
              <div className="bg-gray-50 rounded-md p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Expected Return</div>
                    <div className="font-semibold flex items-center">
                      {currentAllocation.expectedReturn}%
                      <ArrowRight className="h-4 w-4 mx-1 text-msu-green" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Risk Level</div>
                    <div className="font-semibold">{currentAllocation.risk}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Volatility</div>
                    <div className="font-semibold">{currentAllocation.volatility}%</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-muted-foreground">Strategy Description</div>
                  <div className="text-sm">{currentAllocation.description}</div>
                </div>
                
                <div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <BarChart3 className="h-3 w-3 mr-1" /> Max Historical Drawdown
                  </div>
                  <div className="font-semibold text-amber-600">-{currentAllocation.maxDrawdown}%</div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="performance">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={portfolioPerformance}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Bar dataKey="return" name={`${selectedAllocation} Portfolio`} fill="#18453B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-5 w-5 mr-2 text-msu-green" />
                <h4 className="font-medium">Performance Analysis</h4>
              </div>
              <p className="text-sm text-gray-700">
                {selectedAllocation === "Conservative" 
                  ? "This portfolio has historically provided more stable returns with lower drawdowns during market corrections, but may lag during bull markets."
                  : selectedAllocation === "Balanced" 
                  ? "This portfolio balances growth and stability, offering moderate upside potential while limiting downside risk during market turbulence."
                  : "This growth-oriented portfolio can capture significant upside during bull markets, but expect higher volatility and deeper drawdowns during corrections."}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="bg-gray-100">
                  <span className="font-medium text-xs">6-Year Avg: </span>
                  <span className="ml-1 text-xs">{(portfolioPerformance.reduce((acc, val) => acc + val.return, 0) / portfolioPerformance.length).toFixed(1)}%</span>
                </Badge>
                
                <Badge variant="outline" className="bg-gray-100">
                  <span className="font-medium text-xs">Best Year: </span>
                  <span className="ml-1 text-xs text-green-600">+{Math.max(...portfolioPerformance.map(p => p.return))}%</span>
                </Badge>
                
                <Badge variant="outline" className="bg-gray-100">
                  <span className="font-medium text-xs">Worst Year: </span>
                  <span className="ml-1 text-xs text-red-600">{Math.min(...portfolioPerformance.map(p => p.return))}%</span>
                </Badge>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="metrics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded p-4">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-msu-green mr-2" />
                  <h3 className="font-medium">Risk-Adjusted Return</h3>
                </div>
                <div className="mt-3 space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
                    <div className="font-semibold">{riskAdjustedMetrics.sharpeRatio}</div>
                    <div className="text-xs text-gray-500">Return per unit of risk</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Sortino Ratio</div>
                    <div className="font-semibold">{riskAdjustedMetrics.sortinoRatio}</div>
                    <div className="text-xs text-gray-500">Return per unit of downside risk</div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded p-4">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                  <h3 className="font-medium">Risk Characteristics</h3>
                </div>
                <div className="mt-3 space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Beta</div>
                    <div className="font-semibold">
                      {selectedAllocation === "Conservative" ? "0.65" : 
                       selectedAllocation === "Balanced" ? "0.85" : "1.15"}
                    </div>
                    <div className="text-xs text-gray-500">Market sensitivity</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Standard Deviation</div>
                    <div className="font-semibold">{currentAllocation?.volatility}%</div>
                    <div className="text-xs text-gray-500">Measure of volatility</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-4 border rounded">
              <h3 className="font-medium mb-2">Portfolio Diversification Assessment</h3>
              <div className="text-sm text-gray-700">
                <p>This portfolio has {calculateDiversificationScore(currentAllocation)} diversification across asset classes, helping to reduce unsystematic risk.</p>
                <p className="mt-2">
                  {selectedAllocation === "Conservative" 
                    ? "The heavy bond allocation provides stability but limits long-term growth potential."
                    : selectedAllocation === "Balanced" 
                    ? "The mix of stocks and bonds provides a good balance between growth and income."
                    : "The emphasis on equities positions this portfolio for long-term appreciation."}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Helper function to calculate diversification score based on allocation
function calculateDiversificationScore(allocation: any) {
  if (!allocation) return "moderate";
  
  // Count significant allocations (those over 5%)
  const significantAllocations = Object.values(allocation.allocation).filter((value: any) => value >= 5).length;
  
  if (significantAllocations >= 5) return "excellent";
  if (significantAllocations >= 4) return "good";
  if (significantAllocations >= 3) return "moderate";
  return "limited";
}
