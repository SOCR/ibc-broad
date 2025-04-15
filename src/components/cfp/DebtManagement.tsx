
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
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
  PieChart,
  Pie,
  Cell
} from "recharts";
import { AlertCircle, CheckCircle2, CircleDollarSign } from "lucide-react";

interface DebtManagementProps {
  profile: FinancialProfile;
  scenarios: FinancialScenario[];
}

export function DebtManagement({ profile, scenarios }: DebtManagementProps) {
  // Default to the balanced scenario
  const defaultScenario = scenarios.find(s => s.id === "balanced") || scenarios[0];
  
  const { mortgage, studentLoans, carLoans, creditCards, other } = profile.debts;
  const totalDebt = mortgage + studentLoans + carLoans + creditCards + other;
  
  // Calculate debt-to-income ratio
  const annualIncome = profile.income;
  const debtToIncomeRatio = totalDebt / annualIncome;
  
  // Assuming average interest rates for different debt types
  const debtTypes = [
    { name: "Mortgage", value: mortgage, interestRate: 0.045, minPayment: mortgage * 0.005, priority: 3 },
    { name: "Student Loans", value: studentLoans, interestRate: 0.05, minPayment: studentLoans * 0.01, priority: 4 },
    { name: "Car Loans", value: carLoans, interestRate: 0.065, minPayment: carLoans * 0.02, priority: 2 },
    { name: "Credit Cards", value: creditCards, interestRate: 0.185, minPayment: creditCards * 0.03, priority: 1 },
    { name: "Other Debt", value: other, interestRate: 0.08, minPayment: other * 0.02, priority: 5 }
  ].filter(debt => debt.value > 0);
  
  // Color scheme for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF'];
  
  // Calculate total monthly minimum payments
  const totalMinimumPayments = debtTypes.reduce((sum, debt) => sum + debt.minPayment, 0);

  // Determine debt reduction strategy
  const highInterestFirst = [...debtTypes].sort((a, b) => b.interestRate - a.interestRate);
  const snowballMethod = [...debtTypes].sort((a, b) => a.value - b.value);
  
  // Calculate debt-free timeline
  // Simple estimation assuming consistent payment and no additional debt
  const extraMonthlyPayment = defaultScenario.expenseReduction;
  const totalMonthlyPayment = totalMinimumPayments + extraMonthlyPayment;
  
  // Extremely simplified calculation - actual payoff is more complex with varying interest rates
  const weightedAvgInterestRate = debtTypes.reduce((sum, debt) => sum + (debt.value / totalDebt) * debt.interestRate, 0);
  const monthsToDebtFree = totalDebt > 0
    ? Math.ceil(-Math.log(1 - (totalDebt * weightedAvgInterestRate / 12) / totalMonthlyPayment) / Math.log(1 + weightedAvgInterestRate / 12))
    : 0;
  
  // Ensure we have a reasonable number (the formula can produce extremes with very low payments)
  const yearsToDebtFree = Math.min(Math.ceil(monthsToDebtFree / 12), 30);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Debt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalDebt)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Debt-to-Income Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(debtToIncomeRatio * 100).toFixed(1)}%</div>
            <div className="mt-2">
              <Progress value={Math.min(debtToIncomeRatio * 100, 100)} className="h-2" />
            </div>
            <p className="text-xs mt-1 text-muted-foreground">
              {debtToIncomeRatio <= 0.36 ? "Healthy (under 36%)" : 
               debtToIncomeRatio <= 0.42 ? "Moderate (36-42%)" : "High (over 42%)"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Est. Time to Debt-Free</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{yearsToDebtFree} years</div>
            <p className="text-xs text-muted-foreground">With current payments + optimization</p>
          </CardContent>
        </Card>
      </div>

      {debtToIncomeRatio > 0.42 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>High Debt-to-Income Ratio</AlertTitle>
          <AlertDescription>
            Your debt-to-income ratio is {(debtToIncomeRatio * 100).toFixed(1)}%, which is above the recommended maximum of 42%. 
            Consider focusing on debt reduction as a priority.
          </AlertDescription>
        </Alert>
      )}

      {debtToIncomeRatio <= 0.36 && totalDebt > 0 && (
        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Healthy Debt-to-Income Ratio</AlertTitle>
          <AlertDescription>
            Your debt-to-income ratio is within healthy limits. Continue making consistent payments while balancing other financial goals.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Debt Breakdown</CardTitle>
            <CardDescription>Overview of different debt types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={debtTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {debtTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interest Rate Comparison</CardTitle>
            <CardDescription>Annual interest rates by debt type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={debtTypes}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                  <Tooltip 
                    formatter={(value) => [(value as number * 100).toFixed(2) + '%', 'Interest Rate']} 
                    labelFormatter={(name) => name as string}
                  />
                  <Bar dataKey="interestRate" name="Interest Rate" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Debt Reduction Strategies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium flex items-center">
              <CircleDollarSign className="h-4 w-4 mr-2" />
              Avalanche Method (Highest Interest First)
            </h3>
            <p className="mb-4">
              Pay minimums on all debts, and put extra money toward the highest-interest debt first. This saves the most in interest.
            </p>
            
            <div className="space-y-4">
              {highInterestFirst.map((debt, index) => (
                <div key={debt.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{index + 1}. {debt.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">({(debt.interestRate * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="font-medium">{formatCurrency(debt.value)}</div>
                  </div>
                  <Progress value={debt.value / totalDebt * 100} className="h-2" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-4 space-y-2">
            <h3 className="text-lg font-medium flex items-center">
              <CircleDollarSign className="h-4 w-4 mr-2" />
              Snowball Method (Smallest Balance First)
            </h3>
            <p className="mb-4">
              Pay minimums on all debts, and put extra money toward the smallest debt first. This builds momentum through quick wins.
            </p>
            
            <div className="space-y-4">
              {snowballMethod.map((debt, index) => (
                <div key={debt.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{index + 1}. {debt.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">(${debt.value.toLocaleString()})</span>
                    </div>
                    <div className="font-medium">{formatCurrency(debt.minPayment)}/mo min payment</div>
                  </div>
                  <Progress value={(totalDebt - debt.value) / totalDebt * 100} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-medium mb-2">Recommendations</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Increase your debt payments by reallocating {formatCurrency(defaultScenario.expenseReduction)}/month from expense reductions</li>
              <li>Consider refinancing high-interest debt, especially {debtTypes[0]?.value > 0 ? debtTypes[0].name : 'credit cards'}</li>
              <li>Build an emergency fund to prevent taking on new debt for unexpected expenses</li>
              <li>Follow the {creditCards > 5000 ? 'Avalanche method to save on interest' : 'Snowball method for psychological wins'}</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
