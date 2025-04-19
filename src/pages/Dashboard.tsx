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
  Cell
} from "recharts";
import { ibexOverTimeData, ibexKnowledgeData, stateActivity } from "@/data/ibexData";
import { FileText } from "lucide-react";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { ChartCard } from "@/components/dashboard/ChartCard";

// Mock stock data
const stockData = [
  { name: "Jan", SPY: 380, EAFE: 350, EM: 320 },
  { name: "Feb", SPY: 400, EAFE: 360, EM: 310 },
  { name: "Mar", SPY: 410, EAFE: 365, EM: 315 },
  { name: "Apr", SPY: 405, EAFE: 370, EM: 325 },
  { name: "May", SPY: 420, EAFE: 375, EM: 330 },
  { name: "Jun", SPY: 430, EAFE: 380, EM: 335 },
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

const Dashboard: React.FC = () => {
  const latestIbexData = ibexOverTimeData[ibexOverTimeData.length - 1];
  
  return (
    <div className="space-y-6">
      <DashboardStats latestIbexData={latestIbexData} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="IBEX Scores Over Time">
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
        </ChartCard>

        <ChartCard title="State Activity Distribution">
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
        </ChartCard>
      </div>

      <ChartCard title="Market Performance">
        <LineChart
          data={stockData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[300, 450]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="SPY" stroke="#18453B" strokeWidth={2} />
          <Line type="monotone" dataKey="EAFE" stroke="#7A9B76" />
          <Line type="monotone" dataKey="EM" stroke="#A2AAAD" />
        </LineChart>
      </ChartCard>

      <ChartCard title="Economic Indicators: Major Economies">
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
