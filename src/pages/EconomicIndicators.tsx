import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
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
import { economicIndicators } from "@/data/marketData";
import { ChartActions } from "@/components/ui/ChartActions";

const EconomicIndicators: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Economic Indicators</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Economic Indicators Over Time</CardTitle>
          <div className="absolute right-6 top-6">
            <ChartActions
              onDownload={() => {
                const filename = `economic-indicators.csv`;
                if (!economicIndicators?.length) return;
                const csvRows = [];
                const headers = Object.keys(economicIndicators[0]);
                csvRows.push(headers.join(","));
                for (const row of economicIndicators) {
                  const vals = headers.map(header => JSON.stringify(row[header] ?? ""));
                  csvRows.push(vals.join(","));
                }
                const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = filename;
                a.click();
                window.URL.revokeObjectURL(url);
              }}
              info={"Data Source: IMF World Economic Outlook, World Bank, last update 2023."}
            />
          </div>
        </CardHeader>
        <CardContent className="h-[500px]">
          <ChartContainer config={{}} className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={economicIndicators}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="gdp" name="GDP (Trillions USD)" stroke="#18453B" />
                <Line type="monotone" dataKey="inflation" name="Inflation (%)" stroke="#7A9B76" />
                <Line type="monotone" dataKey="unemployment" name="Unemployment (%)" stroke="#A2AAAD" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default EconomicIndicators;
