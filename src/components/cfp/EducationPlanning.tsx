
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FinancialProfile, FinancialScenario } from "@/types/market";
import { formatCurrency } from "@/utils/formatters";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { AlertCircle, GraduationCap, Trophy } from "lucide-react";

interface EducationPlanningProps {
  profile: FinancialProfile;
  scenarios: FinancialScenario[];
}

export function EducationPlanning({ profile, scenarios }: EducationPlanningProps) {
  // Default to the balanced scenario
  const defaultScenario = scenarios.find(s => s.id === "balanced") || scenarios[0];
  
  const { children, yearsUntilCollege, estimatedCostPerYear, savingRate } = profile.goals.education;
  
  // Calculate if current savings rate is sufficient
  const totalCollegeCost = children * estimatedCostPerYear * 4; // Assuming 4 years of college per child
  const projectedSavings = defaultScenario.results.collegeBalance;
  const gap = totalCollegeCost - projectedSavings;
  const isSufficient = gap <= 0;
  
  // Calculate the average time until college for all children
  const avgYearsUntilCollege = yearsUntilCollege.reduce((sum, years) => sum + years, 0) / Math.max(1, yearsUntilCollege.length);

  // Create data for cost breakdown
  const collegeOptions = [
    { type: "Public In-State", cost: 25000, totalCost: 25000 * 4 * children },
    { type: "Public Out-of-State", cost: 45000, totalCost: 45000 * 4 * children },
    { type: "Private College", cost: 65000, totalCost: 65000 * 4 * children }
  ];
  
  // Project education savings growth
  const savingsGrowth = [];
  let currentSavings = 0;
  const monthlyContribution = savingRate;
  const annualReturn = defaultScenario.investmentReturn;
  
  // Project 20 years of savings or until the last child goes to college
  const maxYears = Math.max(...yearsUntilCollege) + 4;
  for (let year = 0; year <= maxYears; year++) {
    // Calculate if any children start college this year
    const childrenStartingCollege = yearsUntilCollege.filter(y => y === year).length;
    const withdrawalThisYear = childrenStartingCollege * estimatedCostPerYear;
    
    savingsGrowth.push({
      year: profile.age + year,
      savings: currentSavings,
      expense: withdrawalThisYear > 0 ? withdrawalThisYear : undefined
    });
    
    // Update for next year
    currentSavings = (currentSavings - withdrawalThisYear) * (1 + annualReturn) + (monthlyContribution * 12);
    
    // Follow children throughout college (4 years)
    for (let i = 1; i <= 3; i++) {
      const childrenInYear = yearsUntilCollege.filter(y => y === year - i).length;
      if (childrenInYear > 0) {
        currentSavings -= childrenInYear * estimatedCostPerYear;
      }
    }
    
    // Don't let it go negative
    currentSavings = Math.max(0, currentSavings);
  }
  
  // Calculate required monthly savings to meet the goal
  const requiredMonthlySavings = gap > 0 
    ? gap / (avgYearsUntilCollege * 12) / Math.pow(1 + annualReturn / 12, avgYearsUntilCollege * 12)
    : 0;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Number of Children</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{children}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Est. Total College Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalCollegeCost)}</div>
            <p className="text-xs text-muted-foreground">Based on {formatCurrency(estimatedCostPerYear)}/year for 4 years per child</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Monthly Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(savingRate)}</div>
          </CardContent>
        </Card>
      </div>

      {!isSufficient && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Funding Gap Detected</AlertTitle>
          <AlertDescription>
            Your current savings rate will accumulate approximately {formatCurrency(projectedSavings)}, 
            which is {formatCurrency(gap)} less than the estimated total cost of {formatCurrency(totalCollegeCost)}. 
            Consider increasing your monthly education savings by {formatCurrency(requiredMonthlySavings)}.
          </AlertDescription>
        </Alert>
      )}

      {isSufficient && (
        <Alert>
          <Trophy className="h-4 w-4" />
          <AlertTitle>On Track for College Funding</AlertTitle>
          <AlertDescription>
            Your current savings rate is projected to cover the estimated college expenses for your children.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>College Cost Comparison</CardTitle>
            <CardDescription>Annual and total costs by institution type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={collegeOptions}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis yAxisId="left" tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
                  <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="cost" name="Annual Cost" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="totalCost" name="Total for All Children" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Education Savings Projection</CardTitle>
            <CardDescription>Projected savings and expenses over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={savingsGrowth}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                  <Line type="monotone" dataKey="savings" name="Education Savings" stroke="#8884d8" />
                  <Line type="monotone" dataKey="expense" name="College Expenses" stroke="#ff8042" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Education Planning Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-lg font-medium flex items-center">
                <GraduationCap className="h-4 w-4 mr-2" />
                Education Funding Options
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>529 College Savings Plan: Tax-advantaged growth</li>
                <li>Coverdell ESA: Flexible for K-12 and college expenses</li>
                <li>UTMA/UGMA Accounts: More flexible but fewer tax advantages</li>
                <li>Roth IRA: Can be used for education or retirement</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                Additional Considerations
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Financial aid eligibility impact</li>
                <li>Scholarship opportunities</li>
                <li>Tax credits and deductions available</li>
                <li>Student loan options as a backup plan</li>
              </ul>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Recommended Action Steps</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Open a dedicated education savings account for each child</li>
              <li>{isSufficient ? "Continue your current savings plan" : `Increase monthly education savings by ${formatCurrency(requiredMonthlySavings)}`}</li>
              <li>Explore tax-advantaged education savings options</li>
              <li>Reassess college costs and savings annually</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
