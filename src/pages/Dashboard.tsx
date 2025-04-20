import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";
import { ibexOverTimeData, ibexKnowledgeData, stateActivity } from "@/data/ibexData";
import { FileText } from "lucide-react";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { Tooltip as ShadcnTooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Download, Info } from "lucide-react";

// Annualized Market Data (years not months)
const annualStockData = [
  { year: 2018, SPY: 270, EAFE: 220, EM: 180 },
  { year: 2019, SPY: 290, EAFE: 250, EM: 200 },
  { year: 2020, SPY: 320, EAFE: 260, EM: 215 },
  { year: 2021, SPY: 400, EAFE: 300, EM: 240 },
  { year: 2022, SPY: 390, EAFE: 310, EM: 230 },
  { year: 2023, SPY: 430, EAFE: 340, EM: 265 }
];

// Mock economic data
const economicData = [
  { name: "USA", gdpGrowth: 3.2, inflation: 2.8, unemployment: 3.8 },
  { name: "EU", gdpGrowth: 2.4, inflation: 3.1, unemployment: 7.2 },
  { name: "China", gdpGrowth: 6.1, inflation: 2.2, unemployment: 5.1 },
  { name: "Japan", gdpGrowth: 1.2, inflation: 1.0, unemployment: 2.8 },
  { name: "UK", gdpGrowth: 1.8, inflation: 2.5, unemployment: 4.2 },
];

// State distribution for pie chart
const stateDistributionData = [
  { name: "Highly Active", value: 20 },
  { name: "Active", value: 17 },
  { name: "Less Active", value: 13 }
];

const statExplanations = {
  score: "The Current IBEX Score reflects the latest measurement of international business activity and engagement benchmarks for community colleges across the US. The higher the score, the more active and comprehensive the programs.",
  rankings: "State Rankings display the distribution of states by their activity level in international business education. 'Highly Active' denotes top engagement, 'Active' for moderate, and 'Less Active' for limited participation.",
  course: "The Top International Course spotlights the most commonly offered international business course across US community colleges and the percentage of colleges including it in their curriculum."
};

// Add CSV download helper
function downloadCSV(data: any[], filename = "chart-data.csv") {
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

const DASHBOARD_SOURCES = {
  ibex: "Data Source: Michigan State University International Business Center (IBC), IBEX Survey Reports 2018-2023.",
  stateDist: "Data Source: IBC Benchmarking State Activity Database, latest update 2023.",
  market: "Data Source: Yahoo Finance Market Data annualized, S&P data and major world indices.",
  economic: "Data Source: IMF World Economic Outlook and World Bank, 2023.",
};

const Dashboard: React.FC = () => {
  const latestIbexData = ibexOverTimeData[ibexOverTimeData.length - 1];
  
  return (
    <div className="space-y-6">
      <TooltipProvider>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* IBEX Score StatCard with Tooltip */}
          <ShadcnTooltip>
            <TooltipTrigger asChild>
              <div>
                <DashboardStats 
                  latestIbexData={latestIbexData} 
                  // Only render IBEX Score as first card so we can wrap it for tooltip
                  renderFirstCard
                />
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <span>{statExplanations.score}</span>
            </TooltipContent>
          </ShadcnTooltip>

          {/* State Rankings StatCard with Tooltip */}
          <ShadcnTooltip>
            <TooltipTrigger asChild>
              <div>
                <DashboardStats 
                  latestIbexData={latestIbexData} 
                  renderSecondCard
                />
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <span>{statExplanations.rankings}</span>
            </TooltipContent>
          </ShadcnTooltip>

          {/* Top International Course StatCard with Tooltip */}
          <ShadcnTooltip>
            <TooltipTrigger asChild>
              <div>
                <DashboardStats 
                  latestIbexData={latestIbexData} 
                  renderThirdCard
                />
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <span>{statExplanations.course}</span>
            </TooltipContent>
          </ShadcnTooltip>
        </div>
      </TooltipProvider>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="IBEX Scores Over Time"
                  titleExtra={
                    <div className="flex items-center space-x-2">
                      <button aria-label="Download Data"
                              onClick={() => downloadCSV(ibexOverTimeData, "ibex-scores.csv")}
                              className="hover-scale rounded p-1 hover:bg-gray-100">
                        <Download size={16} className="text-muted-foreground" />
                      </button>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button aria-label="Chart Info" className="hover-scale rounded p-1 hover:bg-gray-100">
                            <Info size={16} className="text-muted-foreground" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent side="top" className="text-xs max-w-xs">
                          {DASHBOARD_SOURCES.ibex}
                        </PopoverContent>
                      </Popover>
                    </div>
                  }
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={ibexOverTimeData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="midwest" stroke="#8884d8" />
              <Line type="monotone" dataKey="northeast" stroke="#82ca9d" />
              <Line type="monotone" dataKey="south" stroke="#ffc658" />
              <Line type="monotone" dataKey="west" stroke="#ff7300" />
              <Line type="monotone" dataKey="overall" stroke="#18453B" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="State Activity Distribution" 
                  titleExtra={
                    <div className="flex items-center space-x-2">
                      <button aria-label="Download Data"
                        onClick={() => downloadCSV(stateDistributionData, "state-distribution.csv")}
                        className="hover-scale rounded p-1 hover:bg-gray-100">
                        <Download size={16} className="text-muted-foreground" />
                      </button>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button aria-label="Chart Info" className="hover-scale rounded p-1 hover:bg-gray-100">
                            <Info size={16} className="text-muted-foreground" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent side="top" className="text-xs max-w-xs">
                          {DASHBOARD_SOURCES.stateDist}
                        </PopoverContent>
                      </Popover>
                    </div>
                  }
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={stateDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                <Cell key="cell-0" fill="#18453B" />
                <Cell key="cell-1" fill="#7A9B76" />
                <Cell key="cell-2" fill="#A2AAAD" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Market Performance" 
                titleExtra={
                  <div className="flex items-center space-x-2">
                    <button aria-label="Download Data"
                      onClick={() => downloadCSV(annualStockData, "market-performance.csv")}
                      className="hover-scale rounded p-1 hover:bg-gray-100">
                      <Download size={16} className="text-muted-foreground" />
                    </button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button aria-label="Chart Info" className="hover-scale rounded p-1 hover:bg-gray-100">
                          <Info size={16} className="text-muted-foreground" />
                        </PopoverTrigger>
                        <PopoverContent side="top" className="text-xs max-w-xs">
                          {DASHBOARD_SOURCES.market}
                        </PopoverContent>
                      </Popover>
                    </div>
                  }
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={annualStockData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="SPY" stroke="#18453B" strokeWidth={2} />
            <Line type="monotone" dataKey="EAFE" stroke="#7A9B76" />
            <Line type="monotone" dataKey="EM" stroke="#A2AAAD" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Economic Indicators: Major Economies" 
                titleExtra={
                  <div className="flex items-center space-x-2">
                    <button aria-label="Download Data"
                      onClick={() => downloadCSV(economicData, "economic-indicators.csv")}
                      className="hover-scale rounded p-1 hover:bg-gray-100">
                      <Download size={16} className="text-muted-foreground" />
                    </button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button aria-label="Chart Info" className="hover-scale rounded p-1 hover:bg-gray-100">
                          <Info size={16} className="text-muted-foreground" />
                        </PopoverTrigger>
                        <PopoverContent side="top" className="text-xs max-w-xs">
                          {DASHBOARD_SOURCES.economic}
                        </PopoverContent>
                      </Popover>
                    </div>
                  }
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={economicData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="gdpGrowth" name="GDP Growth %" fill="#18453B" />
            <Bar dataKey="inflation" name="Inflation %" fill="#7A9B76" />
            <Bar dataKey="unemployment" name="Unemployment %" fill="#A2AAAD" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="mt-8 border-t pt-6">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <FileText className="h-4 w-4" />
          <a 
            href="https://ibc-static.broad.msu.edu/sites/globalinit/ibc/publications/research/pdfs/ibex2019.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:underline"
          >
            2019 Broad IBC Benchmark Report on International Business Education at Community Colleges
          </a>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          © 2019 Michigan State University International Business Center. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
