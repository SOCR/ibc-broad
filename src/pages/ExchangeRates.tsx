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
  ReferenceArea
} from "recharts";
import { exchangeRateData, forecastMethods } from "@/data/marketData";
import { 
  DollarSign, 
  Euro, 
  PoundSterling, 
  JapaneseYen, 
  CandlestickChart,
  Calendar,
  TrendingUp
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  ToggleGroup,
  ToggleGroupItem
} from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { generateTimeSeriesTorecast } from "@/utils/forecasting";

const currencies = [
  { code: "eur", name: "Euro (EUR)", icon: Euro, color: "#1E88E5" },
  { code: "gbp", name: "British Pound (GBP)", icon: PoundSterling, color: "#D81B60" },
  { code: "jpy", name: "Japanese Yen (JPY)", icon: JapaneseYen, color: "#8E24AA" },
  { code: "cad", name: "Canadian Dollar (CAD)", icon: DollarSign, color: "#43A047" },
  { code: "aud", name: "Australian Dollar (AUD)", icon: DollarSign, color: "#F4511E" },
  { code: "cny", name: "Chinese Yuan (CNY)", icon: DollarSign, color: "#FFB300" },
];

const CurrencyCard: React.FC<{
  code: string;
  name: string;
  icon: React.FC<{ className?: string }>;
  value: number;
  change: string;
  isPositive: boolean;
}> = ({ code, name, icon: Icon, value, change, isPositive }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">{name}</CardTitle>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-2xl font-bold">{value.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground mt-1">USD/{code.toUpperCase()}</p>
          </div>
          <div className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Date range options
const dateRanges = [
  { id: "1m", name: "1 Month", value: 1 },
  { id: "3m", name: "3 Months", value: 3 },
  { id: "6m", name: "6 Months", value: 6 },
  { id: "1y", name: "1 Year", value: 12 },
  { id: "3y", name: "3 Years", value: 36 },
  { id: "5y", name: "5 Years", value: 60 },
  { id: "10y", name: "10 Years", value: 120 },
  { id: "all", name: "All Data", value: 1000 }
];

const ExchangeRates: React.FC = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<string>("1y");
  const [enableForecast, setEnableForecast] = useState<boolean>(false);
  const [forecastMethod, setForecastMethod] = useState<string>("linear");
  const [forecastYears, setForecastYears] = useState<number>(2);
  
  // Filter data based on selected date range
  const filterDataByDateRange = (data: typeof exchangeRateData) => {
    const range = dateRanges.find(r => r.id === selectedDateRange)?.value || 12;
    
    if (range >= 1000) {
      return data; // Return all data
    }
    
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - range);
    
    return data.filter(item => {
      const itemDate = new Date(item.date + "-01"); // Convert YYYY-MM to YYYY-MM-DD
      return itemDate >= cutoffDate;
    });
  };
  
  // Apply forecast if enabled
  const getChartData = () => {
    const filteredData = filterDataByDateRange(exchangeRateData);
    
    if (!enableForecast) {
      return filteredData;
    }
    
    // Generate forecasts for each currency
    const forecastedData = [...filteredData];
    currencies.forEach(currency => {
      const currencyForecast = generateTimeSeriesTorecast(
        filteredData.map(item => ({ 
          date: item.date, 
          value: item[currency.code as keyof typeof item] as number 
        })),
        forecastMethod,
        forecastYears
      ).filter(item => item.isForecasted);
      
      // Merge forecasted data
      currencyForecast.forEach(item => {
        const existingItemIndex = forecastedData.findIndex(d => d.date === item.date);
        if (existingItemIndex >= 0) {
          forecastedData[existingItemIndex][currency.code] = item.value;
        } else {
          const newDataPoint = { date: item.date, isForecasted: true };
          currencies.forEach(c => {
            // Default to last known value for other currencies
            const lastKnown = filteredData[filteredData.length - 1][c.code as keyof typeof filteredData[0]] as number;
            newDataPoint[c.code as keyof typeof newDataPoint] = c.code === currency.code ? item.value : lastKnown;
          });
          forecastedData.push(newDataPoint as any);
        }
      });
    });
    
    return forecastedData;
  };
  
  const chartData = getChartData();
  
  // Get latest exchange rates
  const latestData = exchangeRateData[exchangeRateData.length - 1];
  const previousData = exchangeRateData[exchangeRateData.length - 2];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Exchange Rates</h1>
        <div className="flex items-center">
          <CandlestickChart className="mr-2 h-6 w-6 text-msu-green" />
          <span className="text-sm font-medium">Base Currency: USD</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currencies.map((currency) => {
          const currentValue = latestData[currency.code as keyof typeof latestData] as number;
          const previousValue = previousData[currency.code as keyof typeof previousData] as number;
          const percentChange = ((currentValue - previousValue) / previousValue) * 100;
          const isPositive = percentChange >= 0;
          const changeText = `${isPositive ? '+' : ''}${percentChange.toFixed(2)}%`;
          
          return (
            <CurrencyCard 
              key={currency.code}
              code={currency.code}
              name={currency.name}
              icon={currency.icon}
              value={currentValue}
              change={changeText}
              isPositive={isPositive}
            />
          );
        })}
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0">
            <CardTitle>Exchange Rate Trends</CardTitle>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                  <SelectTrigger className="w-[110px]">
                    <SelectValue placeholder="Time Range" />
                  </SelectTrigger>
                  <SelectContent>
                    {dateRanges.map((range) => (
                      <SelectItem key={range.id} value={range.id}>{range.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="forecast-toggle"
                    checked={enableForecast}
                    onCheckedChange={setEnableForecast}
                  />
                  <Label htmlFor="forecast-toggle">Forecast</Label>
                </div>
                {enableForecast && (
                  <>
                    <Select value={forecastMethod} onValueChange={setForecastMethod}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Forecast Method" />
                      </SelectTrigger>
                      <SelectContent>
                        {forecastMethods.map((method) => (
                          <SelectItem key={method.id} value={method.id}>{method.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <ToggleGroup 
                      type="single" 
                      value={forecastYears.toString()} 
                      onValueChange={(val) => setForecastYears(Number(val) || 2)}
                    >
                      <ToggleGroupItem value="1" aria-label="1 Year">1Y</ToggleGroupItem>
                      <ToggleGroupItem value="2" aria-label="2 Years">2Y</ToggleGroupItem>
                      <ToggleGroupItem value="3" aria-label="3 Years">3Y</ToggleGroupItem>
                    </ToggleGroup>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[500px]">
          <ChartContainer config={{}} className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date"
                  tickFormatter={(value) => {
                    // For monthly data, show just year if January
                    return value.endsWith("-01") ? value.split("-")[0] : value;
                  }}
                />
                <YAxis />
                <ChartTooltip 
                  content={<ChartTooltipContent />} 
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Legend />
                {enableForecast && (
                  <ReferenceArea
                    x1={exchangeRateData[exchangeRateData.length - 1].date}
                    x2={chartData[chartData.length - 1].date}
                    stroke="none"
                    fill="#f5f5f5"
                    fillOpacity={0.3}
                  />
                )}
                {currencies.map((currency) => (
                  <Line 
                    key={currency.code}
                    type="monotone" 
                    dataKey={currency.code} 
                    name={currency.name} 
                    stroke={currency.color} 
                    strokeWidth={1.5} 
                    dot={{ r: 3 }} 
                    activeDot={{ r: 5 }} 
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      {enableForecast && (
        <Card className="bg-gray-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-msu-green" />
                Forecast Information
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  {forecastMethods.find(m => m.id === forecastMethod)?.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {forecastMethods.find(m => m.id === forecastMethod)?.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currencies.map((currency) => {
                  // Get the last actual data point
                  const actualLastData = exchangeRateData[exchangeRateData.length - 1];
                  // Get the last forecasted data point
                  const forecastedLastData = chartData[chartData.length - 1];
                  
                  const actualValue = actualLastData[currency.code as keyof typeof actualLastData] as number;
                  const forecastedValue = forecastedLastData[currency.code as keyof typeof forecastedLastData] as number;
                  const changePercent = ((forecastedValue - actualValue) / actualValue) * 100;
                  
                  return (
                    <div key={`forecast-${currency.code}`} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: currency.color }}></div>
                        <span className="font-medium">{currency.name}</span>
                      </div>
                      <div className={`text-sm font-medium ${changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="text-xs text-muted-foreground mt-4">
                Note: Forecasts are based on historical trends and represent potential future scenarios, not guaranteed outcomes. 
                Multiple factors can influence actual exchange rates.
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExchangeRates;
