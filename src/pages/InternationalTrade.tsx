import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { internationalTradeData } from "@/data/marketData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShipIcon, ArrowUpDown, BarChart4 } from "lucide-react";

const COLORS = ["#18453B", "#7A9B76", "#A2AAAD"];

const InternationalTrade: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2022);
  
  // Calculate trade totals for the pie chart
  const tradeTotals = [];
  
  // Get data for the selected year
  const yearData = internationalTradeData.filter(item => item.year === selectedYear);
  
  // Calculate total exports and imports for each region in the selected year
  for (const region of Array.from(new Set(yearData.map(item => item.country)))) {
    const regionData = yearData.find(item => item.country === region);
    if (regionData) {
      tradeTotals.push({
        name: region,
        value: regionData.exports,
        type: 'Exports'
      });
      tradeTotals.push({
        name: region,
        value: regionData.imports,
        type: 'Imports'
      });
    }
  }
  
  // Calculate trade balances
  const tradeBalances = yearData.map(item => ({
    name: item.country,
    value: item.balance
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">International Trade Analysis</h1>
        <div className="flex items-center">
          <ShipIcon className="mr-2 h-6 w-6 text-msu-green" />
          <span className="text-sm font-medium">Global Trade Patterns</span>
        </div>
      </div>
      
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {Array.from(new Set(internationalTradeData.map(item => item.year))).map(year => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedYear === year
                ? "bg-msu-green text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {year}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">
                Total Global Exports
              </CardTitle>
              <ArrowUpDown className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-600">
              ${yearData.reduce((sum, item) => sum + item.exports, 0)}B
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Global exports in {selectedYear}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">
                Total Global Imports
              </CardTitle>
              <ArrowUpDown className="h-5 w-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">
              ${yearData.reduce((sum, item) => sum + item.imports, 0)}B
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Global imports in {selectedYear}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">
                Global Trade Volume
              </CardTitle>
              <BarChart4 className="h-5 w-5 text-msu-green" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-msu-green">
              ${yearData.reduce((sum, item) => sum + item.exports + item.imports, 0)}B
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Total trade volume in {selectedYear}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="exports-imports" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="exports-imports">Exports & Imports</TabsTrigger>
          <TabsTrigger value="balance">Trade Balance</TabsTrigger>
          <TabsTrigger value="distribution">Regional Distribution</TabsTrigger>
        </TabsList>
        
        <TabsContent value="exports-imports" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Exports and Imports by Region ({selectedYear})</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{}} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={yearData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="country" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="exports" name="Exports" fill="#18453B" />
                    <Bar dataKey="imports" name="Imports" fill="#7A9B76" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="balance" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Trade Balance by Region ({selectedYear})</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{}} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={yearData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="country" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar 
                      dataKey="balance" 
                      name="Trade Balance"
                    >
                      {yearData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.balance >= 0 ? "#18453B" : "#FF6B35"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="distribution" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Regional Distribution of Exports ({selectedYear})</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ChartContainer config={{}} className="h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={tradeTotals.filter(item => item.type === 'Exports')}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {tradeTotals.filter(item => item.type === 'Exports').map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Regional Distribution of Imports ({selectedYear})</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ChartContainer config={{}} className="h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={tradeTotals.filter(item => item.type === 'Imports')}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {tradeTotals.filter(item => item.type === 'Imports').map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Historical Trade Trends (2018-2022)</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ChartContainer config={{}} className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" type="category" allowDuplicatedCategory={false} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                {Array.from(new Set(internationalTradeData.map(item => item.country))).map((region, index) => (
                  <Line
                    key={`exports-${region}`}
                    data={internationalTradeData.filter(item => item.country === region)}
                    type="monotone"
                    dataKey="exports"
                    name={`${region} Exports`}
                    stroke={COLORS[index % COLORS.length]}
                    strokeDasharray={index === 0 ? "" : "5 5"}
                    strokeWidth={1.5}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                ))}
                {Array.from(new Set(internationalTradeData.map(item => item.country))).map((region, index) => (
                  <Line
                    key={`imports-${region}`}
                    data={internationalTradeData.filter(item => item.country === region)}
                    type="monotone"
                    dataKey="imports"
                    name={`${region} Imports`}
                    stroke={COLORS[index % COLORS.length]}
                    strokeWidth={1.5}
                    strokeDasharray="3 3"
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default InternationalTrade;
