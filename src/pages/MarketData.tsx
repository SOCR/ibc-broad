
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
import { marketTrendsData } from "@/data/marketData";
import { ChartActions } from "@/components/ui/ChartActions";

const MarketData: React.FC = () => {
  // CSV Helper
  function downloadCSV(data: any[], filename = "market-trends.csv") {
    if (!data?.length) return;
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));
    for (const row of data) {
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
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Market Data Overview</h1>
      <p className="text-muted-foreground">
        Explore key market trends and indicators.
      </p>

      {/* in card for your primary Market Trends chart */}
      <Card>
        <CardHeader>
          <CardTitle>Market Trends Overview</CardTitle>
          <div className="absolute right-6 top-6">
            <ChartActions
              onDownload={() => downloadCSV(marketTrendsData, "market-trends.csv")}
              info={"Data Source: Yahoo Finance, Bloomberg, compiled 2018-2023."}
            />
          </div>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ChartContainer config={{}} className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={marketTrendsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="sp500" name="S&P 500" stroke="#18453B" />
                <Line type="monotone" dataKey="nasdaq" name="NASDAQ" stroke="#7A9B76" />
                <Line type="monotone" dataKey="dowjones" name="Dow Jones" stroke="#A2AAAD" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketData;
