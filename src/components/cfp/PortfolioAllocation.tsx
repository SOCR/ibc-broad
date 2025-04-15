
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { investmentAllocations } from "@/data/marketData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, BarChart3 } from "lucide-react";

interface PortfolioAllocationProps {
  riskTolerance: 'low' | 'medium' | 'high';
}

export function PortfolioAllocation({ riskTolerance }: PortfolioAllocationProps) {
  const [selectedAllocation, setSelectedAllocation] = React.useState(() => {
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
      </CardContent>
    </Card>
  );
}
