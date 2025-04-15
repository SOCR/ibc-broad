
// Add here your market types
export interface FinancialProfile {
  id: string;
  name: string;
  age: number;
  retirementAge: number;
  lifeExpectancy: number;
  income: number;
  monthlyExpenses: number;
  assets: {
    cash: number;
    investments: number;
    realEstate: number;
    other: number;
  };
  debts: {
    mortgage: number;
    studentLoans: number;
    carLoans: number;
    creditCards: number;
    other: number;
  };
  goals: {
    retirement: {
      monthlyIncome: number;
      savingRate: number;
    };
    education: {
      children: number;
      yearsUntilCollege: number[];
      estimatedCostPerYear: number;
      savingRate: number;
    };
    other: Array<{ name: string; targetAmount: number; targetDate: Date }>;
  };
  riskTolerance: 'low' | 'medium' | 'high';
}

export interface FinancialScenarioResults {
  retirementBalance: number;
  retirementIncome: number;
  collegeBalance: number;
  educationFundingGap: number;
  netWorthOverTime: Array<{ year: number; value: number }>;
  savingsOverTime: Array<{ year: number; value: number }>;
  incomeOverTime: Array<{ year: number; value: number }>;
  expensesOverTime: Array<{ year: number; value: number }>;
  retirementNetWorthOverTime: Array<{ year: number; value: number }>;
  retirementAssetsOverTime: Array<{ year: number; value: number }>;
  educationSavingsOverTime: Array<{ year: number; value: number }>;
}

export interface FinancialScenario {
  id: string;
  name: string;
  description: string;
  investmentReturn: number;
  inflationRate: number;
  taxRate: number;
  retirementSavingRate: number;
  additionalIncome: number;
  expenseReduction: number;
  results: FinancialScenarioResults;
}
