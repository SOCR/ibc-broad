
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
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

// Process data for line charts - memoized for performance
const useProcessedData = () => {
  return useMemo(() => {
    // Get unique countries and years
    const countries = [...new Set(economicIndicators.map(item => item.country))];
    const years = [...new Set(economicIndicators.map(item => item.year))].sort((a, b) => a - b);
    
    // Process GDP growth data
    const gdpGrowthData = [];
    countries.forEach(country => {
      const countryData = economicIndicators
        .filter(item => item.country === country)
        .sort((a, b) => a.year - b.year);
      
      for (let i = 1; i < countryData.length; i++) {
        const prevYear = countryData[i-1];
        const currentYear = countryData[i];
        
        const growth = ((currentYear.gdp - prevYear.gdp) / prevYear.gdp) * 100;
        gdpGrowthData.push({
          country,
          year: currentYear.year,
          growth: parseFloat(growth.toFixed(2)),
          prevYear: prevYear.year,
          yearLabel: currentYear.year.toString()
        });
      }
    });
    
    // Process line chart data
    const processDataForMetric = (metric) => {
      return countries.map(country => {
        const countryData = economicIndicators
          .filter(item => item.country === country)
          .sort((a, b) => a.year - b.year)
          .map(item => ({
            year: item.year,
            value: item[metric],
            country: item.country
          }));
          
        return {
          name: country,
          data: countryData
        };
      });
    };
    
    return {
      countries,
      years,
      gdpGrowthData,
      gdpLineData: processDataForMetric('gdp'),
      inflationLineData: processDataForMetric('inflation'),
      unemploymentLineData: processDataForMetric('unemployment')
    };
  }, []);
};

const EconomicIndicators: React.FC = () => {
  const { countries, years, gdpGrowthData, gdpLineData, inflationLineData, unemploymentLineData } = useProcessedData();
  const [selectedYear, setSelectedYear] = useState<number>(Math.max(...years));
  
  // Filter data for selected year - memoized to avoid recalculations
  const yearData = useMemo(() => {
    return economicIndicators.filter(item => item.year === selectedYear);
  }, [selectedYear]);
  
  // Prepare data for pie chart - memoized to avoid recalculations
  const gdpData = useMemo(() => {
    return yearData.map(item => ({
      name: item.country,
      value: item.gdp
    }));
  }, [yearData]);
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Economic Indicators</h1>
      
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {years.map(year => (
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
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* GDP Card */}
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
                    <Tooltip formatter={(value) => [`$${value}T`, "GDP"]} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="mt-2 text-center text-sm text-muted-foreground">
              GDP distribution by country (trillion USD)
            </div>
          </CardContent>
        </Card>
        
        {/* Inflation Card */}
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
        
        {/* Unemployment Card */}
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
        
        {/* GDP Trends Tab */}
        <TabsContent value="gdp" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>GDP Trends by Country</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{}} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="year"
                      type="number" 
                      domain={['dataMin', 'dataMax']} 
                      allowDuplicatedCategory={false}
                    />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}T`, "GDP"]} />
                    <Legend />
                    {gdpLineData.map((country, index) => (
                      <Line 
                        key={`${country.name}-gdp`}
                        name={country.name}
                        data={country.data}
                        type="monotone" 
                        dataKey="value"
                        stroke={COLORS[index % COLORS.length]} 
                        strokeWidth={1.5} 
                        dot={{ r: 3 }} 
                        activeDot={{ r: 5 }}
                        connectNulls
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
                  <BarChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="yearLabel"
                      tickFormatter={(value) => value}
                    />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, "Growth"]}
                      labelFormatter={(label, payload) => {
                        if (payload && payload.length > 0) {
                          return `${payload[0].payload.country} (${payload[0].payload.year})`;
                        }
                        return label;
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="growth" 
                      name="Growth %" 
                      fill="#18453B" 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Inflation Trends Tab */}
        <TabsContent value="inflation" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Inflation Trends by Country</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{}} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="year"
                      type="number"
                      domain={['dataMin', 'dataMax']}
                      allowDuplicatedCategory={false}
                    />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, "Inflation"]} />
                    <Legend />
                    {inflationLineData.map((country, index) => (
                      <Line 
                        key={`${country.name}-inflation`}
                        name={country.name}
                        data={country.data}
                        type="monotone" 
                        dataKey="value"
                        stroke={COLORS[index % COLORS.length]} 
                        strokeWidth={1.5} 
                        dot={{ r: 3 }} 
                        activeDot={{ r: 5 }}
                        connectNulls
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Unemployment Trends Tab */}
        <TabsContent value="unemployment" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Unemployment Trends by Country</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{}} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="year"
                      type="number"
                      domain={['dataMin', 'dataMax']}
                      allowDuplicatedCategory={false}
                    />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, "Unemployment"]} />
                    <Legend />
                    {unemploymentLineData.map((country, index) => (
                      <Line 
                        key={`${country.name}-unemployment`}
                        name={country.name}
                        data={country.data}
                        type="monotone" 
                        dataKey="value"
                        stroke={COLORS[index % COLORS.length]} 
                        strokeWidth={1.5} 
                        dot={{ r: 3 }} 
                        activeDot={{ r: 5 }}
                        connectNulls
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
