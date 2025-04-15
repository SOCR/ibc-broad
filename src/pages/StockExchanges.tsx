
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
  ResponsiveContainer
} from "recharts";
import { stockExchangeData } from "@/data/marketData";
import { StockExchange } from "@/types/market";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const stockExchanges = {
  nyse: { name: "New York Stock Exchange", color: "#18453B" },
  nasdaq: { name: "NASDAQ", color: "#1E88E5" },
  lse: { name: "London Stock Exchange", color: "#D81B60" },
  tse: { name: "Tokyo Stock Exchange", color: "#8E24AA" },
  sse: { name: "Shanghai Stock Exchange", color: "#F4511E" },
  hkse: { name: "Hong Kong Stock Exchange", color: "#43A047" },
  euronext: { name: "Euronext", color: "#FFB300" },
  bse: { name: "Bombay Stock Exchange", color: "#6D4C41" },
  jsx: { name: "Jakarta Stock Exchange", color: "#00ACC1" },
  asx: { name: "Australian Securities Exchange", color: "#5E35B1" }
};

const StockExchanges: React.FC = () => {
  const [selectedExchanges, setSelectedExchanges] = useState<string[]>(["nyse", "nasdaq", "lse", "sse", "hkse"]);
  const [timeframe, setTimeframe] = useState<string>("all");

  const filteredData = timeframe === "all" 
    ? stockExchangeData 
    : stockExchangeData.filter(item => item.year >= parseInt(timeframe));

  const handleExchangeToggle = (exchange: string) => {
    setSelectedExchanges(prev => 
      prev.includes(exchange)
        ? prev.filter(e => e !== exchange)
        : [...prev, exchange]
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">International Stock Exchange Data</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Filter Exchanges</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {Object.entries(stockExchanges).map(([key, { name, color }]) => (
              <div key={key} className="flex items-center">
                <input
                  type="checkbox"
                  id={key}
                  checked={selectedExchanges.includes(key)}
                  onChange={() => handleExchangeToggle(key)}
                  className="rounded text-primary-600 focus:ring-primary-500 mr-2"
                />
                <label htmlFor={key} className="text-sm font-medium">
                  <span
                    className="inline-block w-3 h-3 mr-1 rounded-full"
                    style={{ backgroundColor: color }}
                  ></span>
                  {name}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Timeframe</h3>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time (1950-2023)</SelectItem>
              <SelectItem value="1980">Since 1980</SelectItem>
              <SelectItem value="1990">Since 1990</SelectItem>
              <SelectItem value="2000">Since 2000</SelectItem>
              <SelectItem value="2010">Since 2010</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Stock Exchange Index Values (1950-2023)</CardTitle>
        </CardHeader>
        <CardContent className="h-[500px]">
          <ChartContainer config={{}} className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={filteredData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                {selectedExchanges.map(key => (
                  <Line 
                    key={key}
                    type="monotone" 
                    dataKey={key} 
                    name={stockExchanges[key as keyof typeof stockExchanges].name} 
                    stroke={stockExchanges[key as keyof typeof stockExchanges].color} 
                    strokeWidth={key === "nyse" ? 2 : 1.5} 
                    dot={{ r: 3 }} 
                    activeDot={{ r: 5 }} 
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">NYSE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-msu-green">3,500</div>
            <p className="text-sm text-muted-foreground mt-1">Current index value</p>
            <div className="text-sm text-green-600 font-medium mt-2">+16.7% since 2020</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">NASDAQ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">3,800</div>
            <p className="text-sm text-muted-foreground mt-1">Current index value</p>
            <div className="text-sm text-green-600 font-medium mt-2">+18.8% since 2020</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">LSE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">2,000</div>
            <p className="text-sm text-muted-foreground mt-1">Current index value</p>
            <div className="text-sm text-green-600 font-medium mt-2">+11.1% since 2020</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StockExchanges;
