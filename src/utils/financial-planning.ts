
import { FinancialProfile, FinancialScenario } from "@/types/market";

export function generateFinancialScenarios(profile: FinancialProfile): FinancialScenario[] {
  // Create three scenarios: conservative, balanced, and aggressive
  const scenarios: FinancialScenario[] = [
    generateConservativeScenario(profile),
    generateBalancedScenario(profile),
    generateAggressiveScenario(profile)
  ];
  
  return scenarios;
}

function generateConservativeScenario(profile: FinancialProfile): FinancialScenario {
  const investmentReturn = 0.05; // 5% annual return
  const inflationRate = 0.03; // 3% inflation rate
  const taxRate = 0.15; // 15% effective tax rate
  const retirementSavingRate = profile.goals.retirement.savingRate * 1.05; // Slightly increased savings
  const additionalIncome = 0; // No additional income sources
  const expenseReduction = profile.monthlyExpenses * 0.05; // 5% reduction in expenses
  
  return {
    id: "conservative",
    name: "Conservative Approach",
    description: "A conservative approach focusing on expense reduction and steady savings with lower-risk investments.",
    investmentReturn,
    inflationRate,
    taxRate,
    retirementSavingRate,
    additionalIncome,
    expenseReduction,
    results: calculateResults(profile, {
      investmentReturn,
      inflationRate,
      taxRate,
      retirementSavingRate,
      additionalIncome,
      expenseReduction
    })
  };
}

function generateBalancedScenario(profile: FinancialProfile): FinancialScenario {
  const investmentReturn = 0.07; // 7% annual return
  const inflationRate = 0.025; // 2.5% inflation rate
  const taxRate = 0.18; // 18% effective tax rate
  const retirementSavingRate = profile.goals.retirement.savingRate * 1.15; // 15% increased savings
  const additionalIncome = profile.income * 0.05; // 5% additional income sources (side gigs, etc.)
  const expenseReduction = profile.monthlyExpenses * 0.1; // 10% reduction in expenses
  
  return {
    id: "balanced",
    name: "Balanced Approach",
    description: "A balanced approach with moderate investments, some expense reduction, and diversified income sources.",
    investmentReturn,
    inflationRate,
    taxRate,
    retirementSavingRate,
    additionalIncome,
    expenseReduction,
    results: calculateResults(profile, {
      investmentReturn,
      inflationRate,
      taxRate,
      retirementSavingRate,
      additionalIncome,
      expenseReduction
    })
  };
}

function generateAggressiveScenario(profile: FinancialProfile): FinancialScenario {
  const investmentReturn = 0.09; // 9% annual return
  const inflationRate = 0.03; // 3% inflation rate
  const taxRate = 0.2; // 20% effective tax rate
  const retirementSavingRate = profile.goals.retirement.savingRate * 1.25; // 25% increased savings
  const additionalIncome = profile.income * 0.1; // 10% additional income sources
  const expenseReduction = profile.monthlyExpenses * 0.15; // 15% reduction in expenses
  
  return {
    id: "aggressive",
    name: "Growth-Focused Approach",
    description: "An aggressive approach focusing on maximizing income, higher-risk investments, and significant expense reduction.",
    investmentReturn,
    inflationRate,
    taxRate,
    retirementSavingRate,
    additionalIncome,
    expenseReduction,
    results: calculateResults(profile, {
      investmentReturn,
      inflationRate,
      taxRate,
      retirementSavingRate,
      additionalIncome,
      expenseReduction
    })
  };
}

interface CalculationParams {
  investmentReturn: number;
  inflationRate: number;
  taxRate: number;
  retirementSavingRate: number;
  additionalIncome: number;
  expenseReduction: number;
}

function calculateResults(profile: FinancialProfile, params: CalculationParams) {
  // Calculate years until retirement
  const yearsUntilRetirement = profile.retirementAge - profile.age;
  
  // Calculate retirement balance
  let currentAssets = profile.assets.cash + profile.assets.investments;
  let netWorthOverTime: Array<{year: number, value: number}> = [];
  let savingsOverTime: Array<{year: number, value: number}> = [];
  
  // Initialize net worth with current assets minus debts
  const totalDebts = profile.debts.mortgage + profile.debts.studentLoans + 
                   profile.debts.carLoans + profile.debts.creditCards + profile.debts.other;
  let netWorth = currentAssets + profile.assets.realEstate + profile.assets.other - totalDebts;
  
  // Annual savings (including retirement savings rate and expense reduction)
  const totalAnnualIncome = profile.income + params.additionalIncome;
  const monthlyExpensesAfterReduction = profile.monthlyExpenses - params.expenseReduction;
  const annualExpenses = monthlyExpensesAfterReduction * 12;
  const annualSavings = (totalAnnualIncome * (1 - params.taxRate)) - annualExpenses;
  
  // Project for each year until retirement
  for (let year = 0; year <= yearsUntilRetirement; year++) {
    // Record the current year's net worth and savings
    netWorthOverTime.push({ year: profile.age + year, value: netWorth });
    savingsOverTime.push({ year: profile.age + year, value: currentAssets });
    
    // Update for next year
    currentAssets = currentAssets * (1 + params.investmentReturn) + annualSavings;
    
    // Adjust for inflation in expenses and income
    const inflationFactor = Math.pow(1 + params.inflationRate, year);
    
    // Simplified debt reduction (assuming steady paydown)
    const remainingDebtRatio = Math.max(0, 1 - year / (yearsUntilRetirement * 0.8));
    const currentDebts = totalDebts * remainingDebtRatio;
    
    // Update net worth
    netWorth = currentAssets + (profile.assets.realEstate * inflationFactor) + 
               (profile.assets.other * inflationFactor) - currentDebts;
  }
  
  // Calculate retirement income (assuming 4% withdrawal rate)
  const retirementBalance = currentAssets;
  const retirementIncome = retirementBalance * 0.04;
  
  // Calculate education savings
  let collegeBalance = 0;
  if (profile.goals.education.children > 0) {
    // Calculate college savings based on children and saving rate
    const educationSavingRate = profile.goals.education.savingRate;
    const averageYearsUntilCollege = profile.goals.education.yearsUntilCollege.reduce((sum, year) => sum + year, 0) / 
                                    profile.goals.education.yearsUntilCollege.length;
    
    // Simple estimation of college savings
    collegeBalance = educationSavingRate * 12 * averageYearsUntilCollege * 
                    Math.pow(1 + params.investmentReturn, averageYearsUntilCollege);
  }
  
  return {
    retirementBalance,
    retirementIncome,
    collegeBalance,
    netWorthOverTime,
    savingsOverTime
  };
}
