import React from "react";
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
import { exchangeRateData } from "@/data/marketData";
import { DollarSign, Euro, PoundSterling, JapaneseYen, CandlestickChart } from "lucide-react";

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
            <p className="text-sm text-muted-foreground mt-1">USD/</p>
          </div>
          <div className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ExchangeRates: React.FC = () => {
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
          <CardTitle>Exchange Rate Trends (2023)</CardTitle>
        </CardHeader>
        <CardContent className="h-[500px]">
          <ChartContainer config={{}} className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={exchangeRateData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
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
    </div>
  );
};

export default ExchangeRates;
