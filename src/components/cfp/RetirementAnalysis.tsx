
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FinancialProfile, FinancialScenario } from "@/types/market";
import { formatCurrency } from "@/utils/formatters";
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
  Bar
} from "recharts";
import { AlertCircle, TrendingUp, TrendingDown } from "lucide-react";

interface RetirementAnalysisProps {
  profile: FinancialProfile;
  scenarios: FinancialScenario[];
}

export function RetirementAnalysis({ profile, scenarios }: RetirementAnalysisProps) {
  // Default to the balanced scenario
  const defaultScenario = scenarios.find(s => s.id === "balanced") || scenarios[0];
  
  const yearsToRetirement = profile.retirementAge - profile.age;
  const retirementYears = profile.lifeExpectancy - profile.retirementAge;
  
  // Calculate if current savings rate is sufficient
  const monthlyTargetIncome = profile.goals.retirement.monthlyIncome;
  const projectedMonthlyIncome = defaultScenario.results.retirementIncome;
  const incomeGap = monthlyTargetIncome - projectedMonthlyIncome;
  const isSufficient = incomeGap <= 0;
  
  // Create data for retirement income chart
  const incomeComparisonData = scenarios.map(scenario => ({
    scenario: scenario.name,
    projected: scenario.results.retirementIncome,
    target: monthlyTargetIncome,
    gap: Math.max(0, monthlyTargetIncome - scenario.results.retirementIncome)
  }));
  
  // Create data for savings growth chart
  const savingsData = defaultScenario.results.savingsOverTime.map(point => ({
    age: point.year,
    savings: point.value
  }));
  
  // Calculate additional savings needed to reach target
  const additionalMonthlySavings = incomeGap > 0 
    ? (incomeGap / 0.04) / (Math.pow(1 + defaultScenario.investmentReturn, yearsToRetirement) * 12 * yearsToRetirement)
    : 0;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Years Until Retirement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{yearsToRetirement} years</div>
            <p className="text-xs text-muted-foreground">Age {profile.age} to {profile.retirementAge}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Retirement Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{retirementYears} years</div>
            <p className="text-xs text-muted-foreground">Age {profile.retirementAge} to {profile.lifeExpectancy}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Monthly Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(profile.goals.retirement.savingRate)}</div>
          </CardContent>
        </Card>
      </div>

      {!isSufficient && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Gap in Retirement Income</AlertTitle>
          <AlertDescription>
            Your current savings rate will provide approximately {formatCurrency(projectedMonthlyIncome)} per month in retirement, 
            which is {formatCurrency(incomeGap)} less than your target of {formatCurrency(monthlyTargetIncome)}. 
            Consider increasing your monthly savings by {formatCurrency(additionalMonthlySavings)}.
          </AlertDescription>
        </Alert>
      )}

      {isSufficient && (
        <Alert>
          <TrendingUp className="h-4 w-4" />
          <AlertTitle>On Track for Retirement</AlertTitle>
          <AlertDescription>
            Your current savings rate will provide approximately {formatCurrency(projectedMonthlyIncome)} per month in retirement, 
            which exceeds your target of {formatCurrency(monthlyTargetIncome)}.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Retirement Income Comparison</CardTitle>
            <CardDescription>Monthly income projection across scenarios vs. target</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={incomeComparisonData}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="scenario" />
                  <YAxis tickFormatter={(value) => `$${Math.round(value / 100) * 100}`} />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                  <Bar dataKey="projected" name="Projected Monthly Income" fill="#82ca9d" />
                  <Bar dataKey="gap" name="Gap to Target" fill="#ff8042" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Retirement Savings Growth</CardTitle>
            <CardDescription>Projected growth over time ({defaultScenario.name} scenario)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={savingsData}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                  <Line type="monotone" dataKey="savings" name="Retirement Savings" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Retirement Planning Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-lg font-medium flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Increase Savings Rate
              </h3>
              <p>
                {isSufficient
                  ? "Your current savings rate is on track. Consider increasing it further to build additional security."
                  : `Increase your monthly retirement contributions by at least ${formatCurrency(additionalMonthlySavings)} to meet your retirement income goals.`}
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium flex items-center">
                <TrendingDown className="h-4 w-4 mr-2" />
                Optimize Investment Mix
              </h3>
              <p>
                Based on your risk tolerance ({profile.riskTolerance}), consider a portfolio allocation that 
                targets {profile.riskTolerance === 'low' ? '4-5%' : profile.riskTolerance === 'medium' ? '6-7%' : '8-10%'} annual returns.
              </p>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Social Security Considerations</h3>
            <p>
              This analysis doesn't include potential Social Security benefits, which could provide additional 
              income of approximately $1,500 - $3,000 per month depending on your work history and claiming age.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
