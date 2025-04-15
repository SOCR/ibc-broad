
import { z } from "zod";

export const formSchema = z.object({
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
