
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Globe } from "lucide-react";
import { economicIndicators } from "@/data/marketData";

const COLORS = ["#18453B", "#7A9B76", "#A2AAAD", "#1E88E5", "#D81B60", "#43A047"];

export function GDPWidget() {
  const latestYear = Math.max(...economicIndicators.map(item => item.year));
  const gdpData = economicIndicators
    .filter(item => item.year === latestYear)
    .map(item => ({
      name: item.country,
      value: item.gdp
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Globe className="mr-2 h-5 w-5" /> GDP by Major Economy ({latestYear})
        </CardTitle>
        <CardDescription>GDP in Trillions USD</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ChartContainer config={{}} className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={gdpData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {gdpData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value} trillion`, "GDP"]} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
