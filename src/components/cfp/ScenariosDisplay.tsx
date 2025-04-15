
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FinancialProfile, FinancialScenario } from "@/types/market";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { formatCurrency } from "@/utils/formatters";

interface ScenariosDisplayProps {
  profile: FinancialProfile;
  scenarios: FinancialScenario[];
}

export function ScenariosDisplay({ profile, scenarios }: ScenariosDisplayProps) {
  function calculateTotalDebts() {
    return profile.debts.mortgage + 
           profile.debts.studentLoans + 
           profile.debts.carLoans + 
           profile.debts.creditCards + 
           profile.debts.other;
  }

  function calculateTotalAssets() {
    return profile.assets.cash + 
           profile.assets.investments + 
           profile.assets.realEstate + 
           profile.assets.other;
  }

  function calculateNetWorth() {
    return calculateTotalAssets() - calculateTotalDebts();
  }

  const comparisonData = scenarios.map(scenario => ({
    name: scenario.name,
    retirementBalance: scenario.results.retirementBalance,
    retirementIncome: scenario.results.retirementIncome * 12, // Annual income
    collegeBalance: scenario.results.collegeBalance,
    netWorthAtRetirement: scenario.results.netWorthOverTime.slice(-1)[0]?.value || 0
  }));

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(calculateTotalAssets())}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Liabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(calculateTotalDebts())}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Net Worth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(calculateNetWorth())}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Scenario Comparison</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparisonData}
                  margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                  <Bar dataKey="retirementBalance" name="Retirement Balance" fill="#8884d8" />
                  <Bar dataKey="netWorthAtRetirement" name="Net Worth at Retirement" fill="#82ca9d" />
                  <Bar dataKey="collegeBalance" name="College Funds" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue={scenarios[0]?.id || "conservative"}>
        <TabsList className="grid grid-cols-3">
          {scenarios.map(scenario => (
            <TabsTrigger key={scenario.id} value={scenario.id}>{scenario.name}</TabsTrigger>
          ))}
        </TabsList>
        
        {scenarios.map(scenario => (
          <TabsContent key={scenario.id} value={scenario.id}>
            <Card>
              <CardHeader>
                <CardTitle>{scenario.name}</CardTitle>
                <CardDescription>{scenario.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Investment Return</div>
                    <div className="text-xl font-semibold">{(scenario.investmentReturn * 100).toFixed(1)}%</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Inflation Rate</div>
                    <div className="text-xl font-semibold">{(scenario.inflationRate * 100).toFixed(1)}%</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Monthly Savings</div>
                    <div className="text-xl font-semibold">{formatCurrency(scenario.retirementSavingRate)}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Expense Reduction</div>
                    <div className="text-xl font-semibold">{formatCurrency(scenario.expenseReduction)}/mo</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Net Worth Projection</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={scenario.results.netWorthOverTime}
                        margin={{
                          top: 10, right: 30, left: 0, bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
                        <Tooltip formatter={(value) => formatCurrency(value as number)} />
                        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Retirement Savings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formatCurrency(scenario.results.retirementBalance)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Monthly Retirement Income</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formatCurrency(scenario.results.retirementIncome)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">College Savings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formatCurrency(scenario.results.collegeBalance)}</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  This scenario projects a net worth of {formatCurrency(scenario.results.netWorthOverTime.slice(-1)[0]?.value || 0)} by retirement age.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
