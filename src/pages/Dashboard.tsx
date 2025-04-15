
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie
} from "recharts";
import { ibexOverTimeData, ibexKnowledgeData, stateActivity } from "@/data/ibexData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Current IBEX Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-msu-green">{latestIbexData.overall}</div>
            <p className="text-sm text-muted-foreground mt-2">
              Overall {latestIbexData.year} IBEX score, rated as "Active"
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              State Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-medium">Highly Active States</div>
                <div className="text-2xl font-bold text-green-600">20</div>
              </div>
              <div>
                <div className="text-sm font-medium">Active States</div>
                <div className="text-2xl font-bold text-blue-600">17</div>
              </div>
              <div>
                <div className="text-sm font-medium">Less Active States</div>
                <div className="text-2xl font-bold text-orange-600">13</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Top International Course
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-medium">International Business</div>
            <div className="text-3xl font-bold text-msu-green">59%</div>
            <p className="text-sm text-muted-foreground mt-2">
              of community colleges offer this course
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>IBEX Scores Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
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
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>State Activity Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
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
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Market Performance</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
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
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Economic Indicators: Major Economies</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
