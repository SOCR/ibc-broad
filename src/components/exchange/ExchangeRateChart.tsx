
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
  Tooltip
} from "recharts";
import { Calendar } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { dateRanges } from "@/data/constants";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  ToggleGroup,
  ToggleGroupItem
} from "@/components/ui/toggle-group";

interface Currency {
  code: string;
  name: string;
  icon: React.FC<{ className?: string }>;
  color: string;
}

interface ExchangeRateChartProps {
  chartData: any[];
  currencies: Currency[];
  selectedDateRange: string;
  setSelectedDateRange: (value: string) => void;
  enableForecast: boolean;
  setEnableForecast: (value: boolean) => void;
  forecastMethod: string;
  setForecastMethod: (value: string) => void;
  forecastYears: number;
  setForecastYears: (value: number) => void;
  forecastMethods: { id: string; name: string; description: string }[];
  lastActualDate?: string;
}

export const ExchangeRateChart: React.FC<ExchangeRateChartProps> = ({
  chartData,
  currencies,
  selectedDateRange,
  setSelectedDateRange,
  enableForecast,
  setEnableForecast,
  forecastMethod,
  setForecastMethod,
  forecastYears,
  setForecastYears,
  forecastMethods,
  lastActualDate
}) => {
  return (
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
              <Tooltip 
                content={(props) => {
                  if (!props.active || !props.payload) return null;
                  const payload = props.payload;
                  const date = props.label;

                  return (
                    <div className="bg-white p-3 border rounded shadow">
                      <p className="font-medium">Date: {date}</p>
                      <div className="mt-2">
                        {payload.map((entry: any, index: number) => {
                          const currency = currencies.find(c => c.code === entry.dataKey);
                          return (
                            <div key={index} className="flex items-center justify-between mt-1">
                              <div className="flex items-center">
                                <div 
                                  className="w-3 h-3 rounded-full mr-2" 
                                  style={{ backgroundColor: entry.color }}
                                />
                                <span>{currency?.name || entry.dataKey}</span>
                              </div>
                              <span className="font-mono ml-4">{entry.value}</span>
                            </div>
                          );
                        })}
                      </div>
                      {props.payload[0]?.payload?.isForecasted && (
                        <p className="text-xs mt-2 text-amber-600 font-medium">
                          Forecasted value
                        </p>
                      )}
                    </div>
                  );
                }}
              />
              <Legend />
              {enableForecast && lastActualDate && (
                <ReferenceArea
                  x1={lastActualDate}
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
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
