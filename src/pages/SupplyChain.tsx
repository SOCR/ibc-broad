
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell
} from "recharts";
import { supplyChainData } from "@/data/marketData";
import { TruckIcon, Ship, Clock, DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SupplyChain: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  
  // Filter data based on selected region
  const filteredData = selectedRegion === "all" 
    ? supplyChainData 
    : supplyChainData.filter(item => item.region === selectedRegion);
    
  // Get all unique regions
  const regions = Array.from(new Set(supplyChainData.map(item => item.region)));
  
  // Get latest data for each region
  const latestData = regions.map(region => {
    const regionData = supplyChainData.filter(item => item.region === region);
    return regionData[regionData.length - 1];
  });
  
  // Prepare data for radar chart
  const radarData = regions.map(region => {
    const regionData = supplyChainData.filter(item => item.region === region && item.year === 2022)[0];
    return {
      region,
      "Container Volume": regionData.containerVolume / 10, // Scale for better visualization
      "Freight Costs": regionData.freightCosts / 200, // Scale for better visualization
      "Delivery Time": regionData.deliveryTime
    };
  });

  // Prepare bar chart data for each region
  const prepareRegionData = (metric: keyof typeof supplyChainData[0]) => {
    return regions.map(region => {
      const regionData = supplyChainData
        .filter(item => item.region === region && item.year >= 2020)
        .map(item => ({
          year: item.year,
          value: item[metric],
          region: item.region
        }));
      return regionData;
    }).flat();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Supply Chain Analytics</h1>
        <div className="flex items-center">
          <TruckIcon className="mr-2 h-6 w-6 text-msu-green" />
          <span className="text-sm font-medium">Global Supply Chain Metrics</span>
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
                Container Volume
              </CardTitle>
              <Ship className="h-5 w-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            {selectedRegion === "all" ? (
              <div className="text-4xl font-bold text-blue-600">116M</div>
            ) : (
              <div className="text-4xl font-bold text-blue-600">
                {filteredData[filteredData.length - 1]?.containerVolume}M
              </div>
            )}
            <p className="text-sm text-muted-foreground mt-2">
              TEU (Twenty-foot Equivalent Units) in 2022
            </p>
            <div className="text-sm text-green-600 font-medium mt-2">
              +7.8% from previous year
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">
                Freight Costs
              </CardTitle>
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            {selectedRegion === "all" ? (
              <div className="text-4xl font-bold text-green-600">$1,900</div>
            ) : (
              <div className="text-4xl font-bold text-green-600">
                ${filteredData[filteredData.length - 1]?.freightCosts}
              </div>
            )}
            <p className="text-sm text-muted-foreground mt-2">
              Average cost per container in 2022
            </p>
            <div className="text-sm text-red-600 font-medium mt-2">
              -17.4% from previous year
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">
                Delivery Time
              </CardTitle>
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            {selectedRegion === "all" ? (
              <div className="text-4xl font-bold text-amber-500">8.2</div>
            ) : (
              <div className="text-4xl font-bold text-amber-500">
                {filteredData[filteredData.length - 1]?.deliveryTime}
              </div>
            )}
            <p className="text-sm text-muted-foreground mt-2">
              Average days in transit in 2022
            </p>
            <div className="text-sm text-green-600 font-medium mt-2">
              -32.0% from previous year
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="volume" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="volume">Container Volume</TabsTrigger>
          <TabsTrigger value="costs">Freight Costs</TabsTrigger>
          <TabsTrigger value="time">Delivery Time</TabsTrigger>
        </TabsList>
        
        <TabsContent value="volume" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Container Volume Trends (Million TEU)</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{}} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={supplyChainData}
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
                        dataKey="containerVolume" 
                        name={`${region}`} 
                        stroke={index === 0 ? "#18453B" : index === 1 ? "#7A9B76" : "#A2AAAD"} 
                        strokeWidth={region === selectedRegion || selectedRegion === "all" ? 2 : 1} 
                        data={supplyChainData.filter(item => item.region === region)}
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
        
        <TabsContent value="costs" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Freight Costs Comparison (USD)</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{}} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={prepareRegionData("freightCosts")}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    {regions.map((region, index) => (
                      <Bar 
                        key={region}
                        dataKey="value" 
                        name={region} 
                        fill={index === 0 ? "#18453B" : index === 1 ? "#7A9B76" : "#A2AAAD"}
                        stackId={region}
                      >
                        {prepareRegionData("freightCosts")
                          .filter(item => item.region === region)
                          .map((entry, i) => (
                            <Cell 
                              key={`cell-${i}`} 
                              fill={index === 0 ? "#18453B" : index === 1 ? "#7A9B76" : "#A2AAAD"} 
                              opacity={region === selectedRegion || selectedRegion === "all" ? 1 : 0.5}
                            />
                          ))}
                      </Bar>
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="time" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Time Trends (Days)</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{}} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={supplyChainData}
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
                        dataKey="deliveryTime" 
                        name={`${region}`} 
                        stroke={index === 0 ? "#18453B" : index === 1 ? "#7A9B76" : "#A2AAAD"} 
                        strokeWidth={region === selectedRegion || selectedRegion === "all" ? 2 : 1} 
                        data={supplyChainData.filter(item => item.region === region)}
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
      
      <Card>
        <CardHeader>
          <CardTitle>Supply Chain Metrics Comparison (2022)</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ChartContainer config={{}} className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={120} width={600} height={300} data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="region" />
                <PolarRadiusAxis />
                <Radar name="Container Volume" dataKey="Container Volume" stroke="#18453B" fill="#18453B" fillOpacity={0.6} />
                <Radar name="Freight Costs" dataKey="Freight Costs" stroke="#7A9B76" fill="#7A9B76" fillOpacity={0.6} />
                <Radar name="Delivery Time" dataKey="Delivery Time" stroke="#A2AAAD" fill="#A2AAAD" fillOpacity={0.6} />
                <Legend />
                <ChartTooltip content={<ChartTooltipContent />} />
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplyChain;
