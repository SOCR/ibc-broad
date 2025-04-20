
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
import { exchangeRateData } from "@/data/marketData";

export function ExchangeRateWidget() {
  const recentExchangeData = exchangeRateData.slice(-6);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5" /> Exchange Rate Trends
        </CardTitle>
        <CardDescription>Last 6 months USD exchange rates</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ChartContainer config={{}} className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={recentExchangeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line type="monotone" dataKey="eur" name="EUR" stroke="#18453B" strokeWidth={2} />
              <Line type="monotone" dataKey="gbp" name="GBP" stroke="#7A9B76" />
              <Line type="monotone" dataKey="jpy" name="JPY (÷100)" stroke="#1E88E5" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
