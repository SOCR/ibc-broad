import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartActions } from "@/components/ui/ChartActions";

const SupplyChain: React.FC = () => {
  const data = [
    { year: 2018, index: 65 },
    { year: 2019, index: 68 },
    { year: 2020, index: 62 },
    { year: 2021, index: 58 },
    { year: 2022, index: 60 },
    { year: 2023, index: 63 },
  ];

  const CHART_SOURCE = "Data Source: Global Supply Chain Index, data from World Bank and OECD, 2023.";

  function downloadCSV(data: any[], filename = "supply-chain-resilience.csv") {
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
      <h1 className="text-2xl font-bold">Supply Chain Analysis</h1>
      <Card>
        <CardHeader>
          <CardTitle>Supply Chain Resilience Index</CardTitle>
          <div className="absolute right-6 top-6">
            <ChartActions
              onDownload={() => downloadCSV(data, "supply-chain-resilience.csv")}
              info={CHART_SOURCE}
            />
          </div>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ChartContainer config={{}} className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis domain={[0, 100]} />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="index" stroke="#18453B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplyChain;
