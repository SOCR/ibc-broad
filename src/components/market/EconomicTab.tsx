
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { economicIndicators } from "@/data/marketData";

export function EconomicTab() {
  const sortedEconomicIndicators = [...economicIndicators].sort((a, b) => a.year - b.year);
  const usaData = sortedEconomicIndicators.filter(d => d.country === "USA");
  const euData = sortedEconomicIndicators.filter(d => d.country === "EU");
  const chinaData = sortedEconomicIndicators.filter(d => d.country === "China");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>GDP Trends by Country (Trillion USD)</CardTitle>
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
                  ticks={usaData.map(d => d.year)}
                />
                <YAxis />
                <Legend />
                <Line
                  data={usaData}
                  name="USA"
                  type="monotone"
                  dataKey="gdp"
                  stroke="#18453B"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  data={euData}
                  name="EU"
                  type="monotone"
                  dataKey="gdp"
                  stroke="#1E88E5"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  data={chinaData}
                  name="China"
                  type="monotone"
                  dataKey="gdp"
                  stroke="#D81B60"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EconomicMetricChart
          title="Inflation Rate Comparison"
          dataKey="inflation"
          data={{ usaData, euData, chinaData }}
        />
        <EconomicMetricChart
          title="Unemployment Rate Comparison"
          dataKey="unemployment"
          data={{ usaData, euData, chinaData }}
        />
      </div>
    </div>
  );
}

interface EconomicMetricChartProps {
  title: string;
  dataKey: string;
  data: {
    usaData: any[];
    euData: any[];
    chinaData: any[];
  };
}

function EconomicMetricChart({ title, dataKey, data }: EconomicMetricChartProps) {
  const { usaData, euData, chinaData } = data;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
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
                ticks={usaData.map(d => d.year)}
              />
              <YAxis />
              <Legend />
              <Line
                data={usaData}
                name="USA"
                type="monotone"
                dataKey={dataKey}
                stroke="#18453B"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                data={euData}
                name="EU"
                type="monotone"
                dataKey={dataKey}
                stroke="#1E88E5"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                data={chinaData}
                name="China"
                type="monotone"
                dataKey={dataKey}
                stroke="#D81B60"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
