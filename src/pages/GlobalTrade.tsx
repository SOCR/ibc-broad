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
  ComposedChart,
  Area
} from "recharts";
import { internationalTradeData } from "@/data/marketData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlobeIcon, TrendingUp, TrendingDown } from "lucide-react";

const GlobalTrade: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  
  // Filter data based on selected region
  const filteredData = selectedRegion === "all" 
    ? internationalTradeData 
    : internationalTradeData.filter(item => item.country === selectedRegion);
    
  // Get all unique regions
  const regions = Array.from(new Set(internationalTradeData.map(item => item.country)));
  
  // Calculate totals for each year
  const yearTotals = Array.from(new Set(internationalTradeData.map(item => item.year)))
    .map(year => {
      const yearData = internationalTradeData.filter(item => item.year === year);
      return {
        year,
        totalExports: yearData.reduce((sum, item) => sum + item.exports, 0),
        totalImports: yearData.reduce((sum, item) => sum + item.imports, 0),
        totalBalance: yearData.reduce((sum, item) => sum + item.balance, 0)
      };
    });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Global Trade Analysis</h1>
        <div className="flex items-center">
          <GlobeIcon className="mr-2 h-6 w-6 text-msu-green" />
          <span className="text-sm font-medium">Trade Flows (in billions USD)</span>
        </div>
      </div>
      
      <div className="flex space-x-4 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedRegion("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            selectedRegion === "all"
              ? "bg-msu-green text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          All Regions
        </button>
        {regions.map(region => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedRegion === region
                ? "bg-msu-green text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {region}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">
                Exports
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            {selectedRegion === "all" ? (
              <div className="text-4xl font-bold text-green-600">
                $6,950B
              </div>
            ) : (
              <div className="text-4xl font-bold text-green-600">
                ${filteredData[filteredData.length - 1]?.exports}B
              </div>
            )}
            <p className="text-sm text-muted-foreground mt-2">
              Total exports in 2022
            </p>
            <div className="text-sm text-green-600 font-medium mt-2">
              +8.5% from previous year
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">
                Imports
              </CardTitle>
              <TrendingDown className="h-5 w-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            {selectedRegion === "all" ? (
              <div className="text-4xl font-bold text-blue-600">
                $7,250B
              </div>
            ) : (
              <div className="text-4xl font-bold text-blue-600">
                ${filteredData[filteredData.length - 1]?.imports}B
              </div>
            )}
            <p className="text-sm text-muted-foreground mt-2">
              Total imports in 2022
            </p>
            <div className="text-sm text-blue-600 font-medium mt-2">
              +6.3% from previous year
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">
                Trade Balance
              </CardTitle>
              <GlobeIcon className="h-5 w-5 text-msu-green" />
            </div>
          </CardHeader>
          <CardContent>
            {selectedRegion === "all" ? (
              <div className="text-4xl font-bold text-amber-500">
                $-300B
              </div>
            ) : (
              <div className={`text-4xl font-bold ${filteredData[filteredData.length - 1]?.balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                ${filteredData[filteredData.length - 1]?.balance}B
              </div>
            )}
            <p className="text-sm text-muted-foreground mt-2">
              Net trade balance in 2022
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Trade Overview</TabsTrigger>
          <TabsTrigger value="exports">Exports Analysis</TabsTrigger>
          <TabsTrigger value="imports">Imports Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Trade Balance Over Time</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{}} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={selectedRegion === "all" ? yearTotals : filteredData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar 
                      dataKey={selectedRegion === "all" ? "totalExports" : "exports"} 
                      name="Exports" 
                      fill="#18453B" 
                      stackId="a"
                    />
                    <Bar 
                      dataKey={selectedRegion === "all" ? "totalImports" : "imports"} 
                      name="Imports" 
                      fill="#7A9B76" 
                      stackId="a"
                    />
                    <Line 
                      type="monotone" 
                      dataKey={selectedRegion === "all" ? "totalBalance" : "balance"} 
                      name="Balance" 
                      stroke="#FF6B35" 
                      strokeWidth={2}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="exports" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Exports by Region</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{}} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={internationalTradeData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    {regions.map((region, index) => (
                      <Line 
                        key={region}
                        type="monotone" 
                        dataKey="exports" 
                        name={`${region} Exports`} 
                        stroke={index === 0 ? "#18453B" : index === 1 ? "#7A9B76" : "#A2AAAD"} 
                        strokeWidth={region === selectedRegion || selectedRegion === "all" ? 2 : 1} 
                        data={internationalTradeData.filter(item => item.country === region)}
                        dot={{ r: 3 }} 
                        activeDot={{ r: 5 }} 
                        opacity={region === selectedRegion || selectedRegion === "all" ? 1 : 0.5}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="imports" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Imports by Region</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{}} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={internationalTradeData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    {regions.map((region, index) => (
                      <Line 
                        key={region}
                        type="monotone" 
                        dataKey="imports" 
                        name={`${region} Imports`} 
                        stroke={index === 0 ? "#18453B" : index === 1 ? "#7A9B76" : "#A2AAAD"} 
                        strokeWidth={region === selectedRegion || selectedRegion === "all" ? 2 : 1} 
                        data={internationalTradeData.filter(item => item.country === region)}
                        dot={{ r: 3 }} 
                        activeDot={{ r: 5 }} 
                        opacity={region === selectedRegion || selectedRegion === "all" ? 1 : 0.5}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default GlobalTrade;
