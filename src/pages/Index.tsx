
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Link } from "react-router-dom";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  Wallet, 
  TrendingUp, 
  Globe, 
  BookOpen, 
  Users, 
  ChartBar, 
  Building2, 
  DollarSign, 
  Ship,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { exchangeRateData, economicIndicators, stockExchangeData, supplyChainData } from "@/data/marketData";

const COLORS = ["#18453B", "#7A9B76", "#A2AAAD", "#1E88E5", "#D81B60", "#43A047"];

const Index = () => {
  // Prepare data for exchange rate chart
  const recentExchangeData = exchangeRateData.slice(-6);

  // Prepare GDP data
  const gdpData = economicIndicators
    .filter(item => item.year === 2023)
    .map(item => ({
      name: item.country,
      value: item.gdp
    }));

  // Prepare stock exchange data for card
  const topExchanges = stockExchangeData
    .sort((a, b) => b.marketCap - a.marketCap)
    .slice(0, 3);

  // Quick stats data
  const quickStats = [
    { title: "Markets Analyzed", value: "30+", icon: <ChartBar className="h-5 w-5" />, color: "bg-blue-100 text-blue-600" },
    { title: "Countries Covered", value: "175", icon: <Globe className="h-5 w-5" />, color: "bg-green-100 text-green-600" },
    { title: "Courses Available", value: "10", icon: <BookOpen className="h-5 w-5" />, color: "bg-amber-100 text-amber-600" },
    { title: "Financial Tools", value: "12", icon: <Wallet className="h-5 w-5" />, color: "bg-purple-100 text-purple-600" }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">MSU IBC Dashboard</h1>
        <p className="text-muted-foreground">
          Michigan State University International Business Center: Your hub for global business insights and financial tools.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`rounded-full p-2 ${stat.color}`}>
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
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
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="eur" name="EUR" stroke="#18453B" strokeWidth={2} />
                  <Line type="monotone" dataKey="gbp" name="GBP" stroke="#7A9B76" />
                  <Line type="monotone" dataKey="jpy" name="JPY (÷100)" stroke="#1E88E5" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="mr-2 h-5 w-5" /> GDP by Major Economy
            </CardTitle>
            <CardDescription>2023 GDP in Trillions USD</CardDescription>
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
                  <ChartTooltip formatter={(value) => [`$${value} trillion`, "GDP"]} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="mr-2 h-5 w-5" /> Top Stock Exchanges
            </CardTitle>
            <CardDescription>By Market Capitalization (Trillions USD)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topExchanges.map((exchange, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`h-3 w-3 rounded-full bg-${index === 0 ? 'green' : index === 1 ? 'blue' : 'amber'}-500`}></div>
                    <span className="font-medium">{exchange.name}</span>
                  </div>
                  <span className="font-bold">${exchange.marketCap}T</span>
                </div>
              ))}
              <div className="pt-2">
                <Link to="/stock-exchanges">
                  <Button variant="link" className="p-0 h-auto font-normal" asChild>
                    <span className="flex items-center text-sm">View all exchanges <ArrowRight className="ml-1 h-3 w-3" /></span>
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" /> Financial Health
            </CardTitle>
            <CardDescription>CFP Consulting Analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Retirement Readiness</span>
                <span className="text-sm font-medium">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "78%" }}></div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm">Education Funding</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm">Debt Management</span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "92%" }}></div>
              </div>
              
              <div className="pt-4">
                <Link to="/cfp-consulting">
                  <Button variant="link" className="p-0 h-auto font-normal" asChild>
                    <span className="flex items-center text-sm">Plan your financial future <ArrowRight className="ml-1 h-3 w-3" /></span>
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Ship className="mr-2 h-5 w-5" /> Supply Chain Metrics
            </CardTitle>
            <CardDescription>2022 Regional Performance</CardDescription>
          </CardHeader>
          <CardContent className="h-[230px]">
            <ChartContainer config={{}} className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={supplyChainData.filter(item => item.year === 2022)}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="containerVolume" name="Container Volume" fill="#18453B" />
                  <Bar dataKey="deliveryTime" name="Delivery Time" fill="#7A9B76" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="pt-2">
              <Link to="/supply-chain">
                <Button variant="link" className="p-0 h-auto font-normal" asChild>
                  <span className="flex items-center text-sm">View supply chain details <ArrowRight className="ml-1 h-3 w-3" /></span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" /> Recent Courses
            </CardTitle>
            <CardDescription>Popular Broad College courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">IB 811: Global Strategy</p>
                  <p className="text-sm text-muted-foreground">Analysis of globalization and strategy development</p>
                </div>
                <Link to="/broad-courses">
                  <Button variant="outline" size="sm">Details</Button>
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">MBA 820: Global Supply Chain Management</p>
                  <p className="text-sm text-muted-foreground">Design and management of global supply chains</p>
                </div>
                <Link to="/broad-courses">
                  <Button variant="outline" size="sm">Details</Button>
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">FIN 850: International Financial Management</p>
                  <p className="text-sm text-muted-foreground">Financial management in an international context</p>
                </div>
                <Link to="/broad-courses">
                  <Button variant="outline" size="sm">Details</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5" /> Currency Spotlight
            </CardTitle>
            <CardDescription>USD to major currencies (Current)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">€</div>
                <div>
                  <p className="font-medium">Euro</p>
                  <p className="text-xl font-bold text-green-600">€{exchangeRateData[exchangeRateData.length - 1].eur}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-700 font-bold">£</div>
                <div>
                  <p className="font-medium">British Pound</p>
                  <p className="text-xl font-bold text-green-600">£{exchangeRateData[exchangeRateData.length - 1].gbp}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold">¥</div>
                <div>
                  <p className="font-medium">Japanese Yen</p>
                  <p className="text-xl font-bold text-red-600">¥{exchangeRateData[exchangeRateData.length - 1].jpy}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">C$</div>
                <div>
                  <p className="font-medium">Canadian Dollar</p>
                  <p className="text-xl font-bold text-red-600">C${exchangeRateData[exchangeRateData.length - 1].cad}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
