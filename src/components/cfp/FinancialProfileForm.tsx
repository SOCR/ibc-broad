
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FinancialProfile } from "@/types/market";
import { v4 as uuidv4 } from 'uuid';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  age: z.coerce.number().min(18, {
    message: "Age must be at least 18.",
  }).max(100),
  retirementAge: z.coerce.number().min(50, {
    message: "Retirement age must be at least 50.",
  }).max(90),
  lifeExpectancy: z.coerce.number().min(60, {
    message: "Life expectancy must be at least 60.",
  }).max(120),
  income: z.coerce.number().min(0),
  monthlyExpenses: z.coerce.number().min(0),
  
  // Assets
  cashAssets: z.coerce.number().min(0),
  investmentAssets: z.coerce.number().min(0),
  realEstateAssets: z.coerce.number().min(0),
  otherAssets: z.coerce.number().min(0),
  
  // Debts
  mortgageDebt: z.coerce.number().min(0),
  studentLoanDebt: z.coerce.number().min(0),
  carLoanDebt: z.coerce.number().min(0),
  creditCardDebt: z.coerce.number().min(0),
  otherDebt: z.coerce.number().min(0),
  
  // Goals
  retirementMonthlyIncome: z.coerce.number().min(0),
  retirementSavingRate: z.coerce.number().min(0),
  
  // Education
  children: z.coerce.number().min(0).max(10),
  yearsUntilCollege: z.string().optional(),
  estimatedCostPerYear: z.coerce.number().min(0).optional(),
  educationSavingRate: z.coerce.number().min(0).optional(),
  
  // Risk tolerance
  riskTolerance: z.enum(["low", "medium", "high"]),
});

interface FinancialProfileFormProps {
  onSubmit: (data: FinancialProfile) => void;
  initialData: FinancialProfile | null;
}

export function FinancialProfileForm({ onSubmit, initialData }: FinancialProfileFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      age: initialData.age,
      retirementAge: initialData.retirementAge,
      lifeExpectancy: initialData.lifeExpectancy,
      income: initialData.income,
      monthlyExpenses: initialData.monthlyExpenses,
      cashAssets: initialData.assets.cash,
      investmentAssets: initialData.assets.investments,
      realEstateAssets: initialData.assets.realEstate,
      otherAssets: initialData.assets.other,
      mortgageDebt: initialData.debts.mortgage,
      studentLoanDebt: initialData.debts.studentLoans,
      carLoanDebt: initialData.debts.carLoans,
      creditCardDebt: initialData.debts.creditCards,
      otherDebt: initialData.debts.other,
      retirementMonthlyIncome: initialData.goals.retirement.monthlyIncome,
      retirementSavingRate: initialData.goals.retirement.savingRate,
      children: initialData.goals.education.children,
      yearsUntilCollege: initialData.goals.education.yearsUntilCollege.join(", "),
      estimatedCostPerYear: initialData.goals.education.estimatedCostPerYear,
      educationSavingRate: initialData.goals.education.savingRate,
      riskTolerance: initialData.riskTolerance,
    } : {
      name: "",
      age: 35,
      retirementAge: 65,
      lifeExpectancy: 85,
      income: 75000,
      monthlyExpenses: 4000,
      cashAssets: 10000,
      investmentAssets: 50000,
      realEstateAssets: 300000,
      otherAssets: 5000,
      mortgageDebt: 250000,
      studentLoanDebt: 20000,
      carLoanDebt: 15000,
      creditCardDebt: 5000,
      otherDebt: 0,
      retirementMonthlyIncome: 5000,
      retirementSavingRate: 500,
      children: 2,
      yearsUntilCollege: "10, 15",
      estimatedCostPerYear: 25000,
      educationSavingRate: 250,
      riskTolerance: "medium",
    }
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    const yearsUntilCollegeArray = values.yearsUntilCollege
      ? values.yearsUntilCollege.split(",").map(year => parseInt(year.trim(), 10))
      : [0];

    const profileData: FinancialProfile = {
      id: initialData?.id || uuidv4(),
      name: values.name,
      age: values.age,
      retirementAge: values.retirementAge,
      lifeExpectancy: values.lifeExpectancy,
      income: values.income,
      monthlyExpenses: values.monthlyExpenses,
      assets: {
        cash: values.cashAssets,
        investments: values.investmentAssets,
        realEstate: values.realEstateAssets,
        other: values.otherAssets
      },
      debts: {
        mortgage: values.mortgageDebt,
        studentLoans: values.studentLoanDebt,
        carLoans: values.carLoanDebt,
        creditCards: values.creditCardDebt,
        other: values.otherDebt
      },
      goals: {
        retirement: {
          monthlyIncome: values.retirementMonthlyIncome,
          savingRate: values.retirementSavingRate
        },
        education: {
          children: values.children,
          yearsUntilCollege: yearsUntilCollegeArray,
          estimatedCostPerYear: values.estimatedCostPerYear || 0,
          savingRate: values.educationSavingRate || 0
        },
        other: []
      },
      riskTolerance: values.riskTolerance
    };

    onSubmit(profileData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="retirementAge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Retirement Age</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lifeExpectancy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Life Expectancy</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Income & Expenses</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="income"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Income ($)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="monthlyExpenses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Expenses ($)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assets</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="cashAssets"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cash & Equivalents ($)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="investmentAssets"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Investments ($)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="realEstateAssets"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Real Estate ($)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="otherAssets"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Assets ($)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Debts</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="mortgageDebt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mortgage ($)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="studentLoanDebt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Loans ($)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="carLoanDebt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Car Loans ($)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="creditCardDebt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Credit Cards ($)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="otherDebt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Debts ($)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Retirement Goals</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="retirementMonthlyIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desired Monthly Income in Retirement ($)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="retirementSavingRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Retirement Savings ($)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Education Planning</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="children"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Children</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="yearsUntilCollege"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years Until College (separate by commas)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 5, 10, 15" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter years for each child separated by commas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="estimatedCostPerYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Cost per Year ($)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="educationSavingRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Education Savings ($)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Tolerance</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="riskTolerance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Investment Risk Tolerance</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="low" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Low Risk - Emphasis on preserving capital with modest returns
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="medium" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Medium Risk - Balance between growth and stability
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="high" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          High Risk - Focus on growth with higher volatility
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="w-full md:w-auto">Generate Financial Analysis</Button>
        </div>
      </form>
    </Form>
  );
}
