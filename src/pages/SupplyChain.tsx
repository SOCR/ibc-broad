
import React, { useState, useMemo } from "react";
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
import { SupplyChainData } from "@/types/market";
import { TruckIcon, Ship, Clock, DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Process data to ensure proper grouping by region for line charts
const processDataForLineCharts = (data: any[], metric: keyof SupplyChainData) => {
  const regions = [...new Set(data.map(item => item.region))];
  
  return regions.map(region => {
    const regionData = data
      .filter(item => item.region === region)
      .sort((a, b) => a.year - b.year);
      
    return {
      name: region,
      data: regionData.map(item => ({
        year: item.year,
        value: item[metric],
        region: item.region
      }))
    };
  });
};

// Prepare data for radar chart with more metrics for the spider chart
const prepareRadarData = (data: any[]) => {
  const regions = Array.from(new Set(data.map(item => item.region)));
  const latestYear = Math.max(...data.map(item => item.year));
  
  return regions.map(region => {
    const regionData = data.filter(item => item.region === region && item.year === latestYear)[0] || {};
    
    // Calculate efficiency score (inverse of delivery time, normalized)
    const maxDeliveryTime = Math.max(...data.filter(item => item.year === latestYear).map(item => item.deliveryTime));
    const efficiencyScore = regionData.deliveryTime ? (10 - (regionData.deliveryTime / maxDeliveryTime * 10) + 3) : 0;
    
    // Calculate cost efficiency (inverse of freight costs, normalized)
    const maxFreightCost = Math.max(...data.filter(item => item.year === latestYear).map(item => item.freightCosts));
    const costEfficiency = regionData.freightCosts ? (10 - (regionData.freightCosts / maxFreightCost * 10) + 3) : 0;
    
    // Volume normalized to 0-10 scale
    const maxVolume = Math.max(...data.filter(item => item.year === latestYear).map(item => item.containerVolume));
    const volumeScore = regionData.containerVolume ? (regionData.containerVolume / maxVolume * 10) : 0;
    
    // Add growth rate calculation compared to previous year
    const previousYearData = data.find(item => 
      item.region === region && item.year === latestYear - 1
    );
    
    const volumeGrowth = previousYearData && regionData.containerVolume
      ? ((regionData.containerVolume - previousYearData.containerVolume) / previousYearData.containerVolume * 5) + 5
      : 5;
      
    const reliabilityScore = Math.min(10, 5 + (1 / regionData.deliveryTime * 20));
    
    return {
      region,
      "Capacity": volumeScore,
      "Cost Efficiency": costEfficiency,
      "Delivery Speed": efficiencyScore,
      "Growth Rate": volumeGrowth,
      "Reliability": reliabilityScore
    };
  });
};

// Prepare bar chart data for each region, ensuring each year appears only once
const prepareFreightCostsData = (data: any[]) => {
  const regions = [...new Set(data.map(item => item.region))];
  const years = [...new Set(data.map(item => item.year))].sort((a, b) => a - b);
  
  // Create one entry per year with all regions
  return years.map(year => {
    const yearData: any = { year };
    
    regions.forEach(region => {
      const regionData = data.find(item => item.region === region && item.year === year);
      yearData[region] = regionData?.freightCosts || 0;
    });
    
    return yearData;
  });
};

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
  
  // Prepare improved data for radar chart
  const radarData = useMemo(() => prepareRadarData(supplyChainData), []);

  // Prepare line chart data for each region
  const containerVolumeData = useMemo(() => 
    processDataForLineCharts(supplyChainData, 'containerVolume'), 
  []);
  
  const freightCostsData = useMemo(() => 
    processDataForLineCharts(supplyChainData, 'freightCosts'), 
  []);
  
  const deliveryTimeData = useMemo(() => 
    processDataForLineCharts(supplyChainData, 'deliveryTime'), 
  []);

  // Prepare improved bar chart data to avoid duplicate years
  const freightCostsByYear = useMemo(() => 
    prepareFreightCostsData(supplyChainData),
  []);

  // Define colors for the radar chart with more distinct colors
  const RADAR_COLORS = ["#18453B", "#7A9B76", "#A2AAAD", "#FF6B35", "#004E89"];

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
            key={`region-${region}`}
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
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="year"
                      type="number" 
                      domain={['dataMin', 'dataMax']} 
                      allowDuplicatedCategory={false}
                    />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    {containerVolumeData.map((region, index) => (
                      <Line 
                        key={`${region.name}-${index}`}
                        type="monotone" 
                        dataKey="value" 
                        name={region.name} 
                        data={region.data}
                        stroke={index === 0 ? "#18453B" : index === 1 ? "#7A9B76" : "#A2AAAD"} 
                        strokeWidth={region.name === selectedRegion || selectedRegion === "all" ? 2 : 1}
                        dot={{ r: 3 }} 
                        activeDot={{ r: 5 }} 
                        opacity={region.name === selectedRegion || selectedRegion === "all" ? 1 : 0.5}
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
                    data={freightCostsByYear}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    {regions.map((region, index) => (
                      <Bar 
                        key={`bar-${region}`}
                        dataKey={region} 
                        name={region} 
                        fill={index === 0 ? "#18453B" : index === 1 ? "#7A9B76" : "#A2AAAD"}
                        opacity={region === selectedRegion || selectedRegion === "all" ? 1 : 0.5}
                      />
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
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="year"
                      type="number" 
                      domain={['dataMin', 'dataMax']} 
                      allowDuplicatedCategory={false}
                    />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    {deliveryTimeData.map((region, index) => (
                      <Line 
                        key={`${region.name}-${index}`}
                        type="monotone" 
                        dataKey="value" 
                        name={region.name}
                        data={region.data} 
                        stroke={index === 0 ? "#18453B" : index === 1 ? "#7A9B76" : "#A2AAAD"} 
                        strokeWidth={region.name === selectedRegion || selectedRegion === "all" ? 2 : 1}
                        dot={{ r: 3 }} 
                        activeDot={{ r: 5 }} 
                        opacity={region.name === selectedRegion || selectedRegion === "all" ? 1 : 0.5}
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
        <CardContent className="h-96">
          <ChartContainer config={{}} className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={150} width={600} height={300} data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="region" />
                <PolarRadiusAxis angle={30} domain={[0, 10]} />
                <Radar name="Capacity" dataKey="Capacity" stroke="#18453B" fill="#18453B" fillOpacity={0.6} />
                <Radar name="Cost Efficiency" dataKey="Cost Efficiency" stroke="#7A9B76" fill="#7A9B76" fillOpacity={0.6} />
                <Radar name="Delivery Speed" dataKey="Delivery Speed" stroke="#A2AAAD" fill="#A2AAAD" fillOpacity={0.6} />
                <Radar name="Growth Rate" dataKey="Growth Rate" stroke="#FF6B35" fill="#FF6B35" fillOpacity={0.6} />
                <Radar name="Reliability" dataKey="Reliability" stroke="#004E89" fill="#004E89" fillOpacity={0.6} />
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
