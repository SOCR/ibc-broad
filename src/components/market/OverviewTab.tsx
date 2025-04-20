
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { economicIndicators } from "@/data/marketData";

export function OverviewTab() {
  const latestYear = Math.max(...economicIndicators.map(item => item.year));
  const latestYearData = economicIndicators.filter(item => item.year === latestYear);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Global GDP Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-msu-green">3.8%</div>
            <p className="text-sm text-muted-foreground mt-2">
              Forecasted global GDP growth for {latestYear + 1}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Global Inflation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-amber-500">6.5%</div>
            <p className="text-sm text-muted-foreground mt-2">Average global inflation rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Trade Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">$28.5T</div>
            <p className="text-sm text-muted-foreground mt-2">Global merchandise trade volume</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Global Economic Indicators ({latestYear})</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ChartContainer config={{}} className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={latestYearData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" />
                <YAxis />
                <Legend />
                <Bar dataKey="gdp" name="GDP (Trillion $)" fill="#18453B" />
                <Bar dataKey="inflation" name="Inflation (%)" fill="#7A9B76" />
                <Bar dataKey="unemployment" name="Unemployment (%)" fill="#A2AAAD" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
