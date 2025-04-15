
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FinancialProfile } from "@/types/market";
import { v4 as uuidv4 } from 'uuid';
import { PersonalInfoForm } from "./PersonalInfoForm";
import { IncomeExpensesForm } from "./IncomeExpensesForm";
import { AssetsForm } from "./AssetsForm";
import { DebtsForm } from "./DebtsForm";
import { RetirementGoalsForm } from "./RetirementGoalsForm";
import { EducationPlanningForm } from "./EducationPlanningForm";
import { RiskToleranceForm } from "./RiskToleranceForm";
import { formSchema } from "./formSchema";

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
        <PersonalInfoForm form={form} />
        <IncomeExpensesForm form={form} />
        <AssetsForm form={form} />
        <DebtsForm form={form} />
        <RetirementGoalsForm form={form} />
        <EducationPlanningForm form={form} />
        <RiskToleranceForm form={form} />

        <div className="flex justify-end">
          <Button type="submit" className="w-full md:w-auto">Generate Financial Analysis</Button>
        </div>
      </form>
    </Form>
  );
}
