
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { economicIndicators } from "@/data/marketData";

const MarketData: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Global Market Data</h1>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Market Overview</TabsTrigger>
          <TabsTrigger value="economic">Economic Indicators</TabsTrigger>
          <TabsTrigger value="trends">Market Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  Global GDP Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-msu-green">3.8%</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Forecasted global GDP growth for 2023
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  Global Inflation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-amber-500">6.5%</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Average global inflation rate
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  Trade Volume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-600">$28.5T</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Global merchandise trade volume
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Global Economic Indicators</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{}} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={economicIndicators.filter(item => item.year === 2022)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="country" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="gdp" name="GDP (Trillion $)" fill="#18453B" />
                    <Bar dataKey="inflation" name="Inflation (%)" fill="#7A9B76" />
                    <Bar dataKey="unemployment" name="Unemployment (%)" fill="#A2AAAD" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="economic" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>GDP Trends (Trillion USD)</CardTitle>
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
                    <Line type="monotone" dataKey="gdp" name="GDP" stroke="#18453B" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Inflation Rate Comparison</CardTitle>
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
                      <Line type="monotone" dataKey="inflation" name="Inflation" stroke="#FF6B35" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Unemployment Rate Comparison</CardTitle>
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
                      <Line type="monotone" dataKey="unemployment" name="Unemployment" stroke="#4361EE" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Economic Growth by Country (2018-2022)</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{}} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={economicIndicators.filter(d => ["USA", "EU", "China"].includes(d.country))}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="gdp" name="GDP" stroke="#18453B" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
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

export default MarketData;
