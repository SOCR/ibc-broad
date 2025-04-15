
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
import { economicIndicators } from "@/data/marketData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, BarChart2 } from "lucide-react";

const COLORS = ["#18453B", "#7A9B76", "#A2AAAD", "#FF6B35", "#4361EE"];

// GDP Growth data based on economic indicators
const getGdpGrowthData = () => {
  return economicIndicators
    .filter(item => item.year >= 2020)
    .map((item, index) => {
      const prevYear = economicIndicators.find(
        prev => prev.year === item.year - 1 && prev.country === item.country
      );
      
      if (!prevYear) return { ...item, growth: 0 };
      
      const growth = ((item.gdp - prevYear.gdp) / prevYear.gdp) * 100;
      return { ...item, growth };
    });
};

const EconomicIndicators: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2022);
  const gdpGrowthData = getGdpGrowthData();
  
  // Filter data for selected year
  const yearData = economicIndicators.filter(item => item.year === selectedYear);
  
  // Prepare data for pie charts
  const gdpData = yearData.map(item => ({
    name: item.country,
    value: item.gdp
  }));
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Economic Indicators</h1>
      
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {Array.from(new Set(economicIndicators.map(item => item.year))).map(year => (
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
                GDP Overview
              </CardTitle>
              <BarChart2 className="h-5 w-5 text-msu-green" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-40">
              <ChartContainer config={{}} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gdpData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={50}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, value}) => `${name}: $${value.toFixed(1)}T`}
                    >
                      {gdpData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="mt-2 text-center text-sm text-muted-foreground">
              GDP distribution by country (trillion USD)
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">
                Inflation
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-red-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {yearData.map(item => (
                <div key={`inflation-${item.country}`} className="flex items-center justify-between">
                  <span className="font-medium">{item.country}</span>
                  <div className="flex items-center">
                    <span className={`text-xl font-bold ${
                      item.inflation > 5 ? "text-red-500" : 
                      item.inflation > 2 ? "text-amber-500" : "text-green-500"
                    }`}>
                      {item.inflation}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">
                Unemployment
              </CardTitle>
              <TrendingDown className="h-5 w-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {yearData.map(item => (
                <div key={`unemployment-${item.country}`} className="flex items-center justify-between">
                  <span className="font-medium">{item.country}</span>
                  <div className="flex items-center">
                    <span className={`text-xl font-bold ${
                      item.unemployment > 7 ? "text-red-500" : 
                      item.unemployment > 5 ? "text-amber-500" : "text-green-500"
                    }`}>
                      {item.unemployment}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="gdp" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="gdp">GDP Trends</TabsTrigger>
          <TabsTrigger value="inflation">Inflation Trends</TabsTrigger>
          <TabsTrigger value="unemployment">Unemployment Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="gdp" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>GDP Trends by Country</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{}} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={economicIndicators}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    {Array.from(new Set(economicIndicators.map(item => item.country))).map((country, index) => (
                      <Line 
                        key={country}
                        type="monotone" 
                        dataKey="gdp" 
                        name={country} 
                        stroke={COLORS[index % COLORS.length]} 
                        strokeWidth={1.5} 
                        data={economicIndicators.filter(item => item.country === country)}
                        dot={{ r: 3 }} 
                        activeDot={{ r: 5 }} 
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>GDP Growth Rate</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{}} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={gdpGrowthData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    {Array.from(new Set(gdpGrowthData.map(item => item.country))).map((country, index) => (
                      <Bar 
                        key={country}
                        dataKey="growth" 
                        name={`${country} Growth %`} 
                        fill={COLORS[index % COLORS.length]}
                        data={gdpGrowthData.filter(item => item.country === country)}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inflation" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Inflation Trends by Country</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{}} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={economicIndicators}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    {Array.from(new Set(economicIndicators.map(item => item.country))).map((country, index) => (
                      <Line 
                        key={country}
                        type="monotone" 
                        dataKey="inflation" 
                        name={country} 
                        stroke={COLORS[index % COLORS.length]} 
                        strokeWidth={1.5} 
                        data={economicIndicators.filter(item => item.country === country)}
                        dot={{ r: 3 }} 
                        activeDot={{ r: 5 }} 
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="unemployment" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Unemployment Trends by Country</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{}} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={economicIndicators}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    {Array.from(new Set(economicIndicators.map(item => item.country))).map((country, index) => (
                      <Line 
                        key={country}
                        type="monotone" 
                        dataKey="unemployment" 
                        name={country} 
                        stroke={COLORS[index % COLORS.length]} 
                        strokeWidth={1.5} 
                        data={economicIndicators.filter(item => item.country === country)}
                        dot={{ r: 3 }} 
                        activeDot={{ r: 5 }} 
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EconomicIndicators;
