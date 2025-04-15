import { FinancialProfile, FinancialScenario } from "@/types/market";
import { FinancialHealthScore } from "@/data/marketData";

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

// Add a custom scenario generator for more personalized planning
export function generateCustomScenario(
  profile: FinancialProfile, 
  params: {
    name: string;
    description: string;
    investmentReturn: number;
    inflationRate: number;
    taxRate: number;
    retirementSavingRateMultiplier: number;
    additionalIncomePercentage: number;
    expenseReductionPercentage: number;
  }
): FinancialScenario {
  const retirementSavingRate = profile.goals.retirement.savingRate * params.retirementSavingRateMultiplier;
  const additionalIncome = profile.income * params.additionalIncomePercentage;
  const expenseReduction = profile.monthlyExpenses * params.expenseReductionPercentage;
  
  return {
    id: "custom",
    name: params.name,
    description: params.description,
    investmentReturn: params.investmentReturn,
    inflationRate: params.inflationRate,
    taxRate: params.taxRate,
    retirementSavingRate,
    additionalIncome,
    expenseReduction,
    results: calculateResults(profile, {
      investmentReturn: params.investmentReturn,
      inflationRate: params.inflationRate,
      taxRate: params.taxRate,
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
  let incomeOverTime: Array<{year: number, value: number}> = [];
  let expensesOverTime: Array<{year: number, value: number}> = [];
  
  // Initialize net worth with current assets minus debts
  const totalDebts = profile.debts.mortgage + profile.debts.studentLoans + 
                   profile.debts.carLoans + profile.debts.creditCards + profile.debts.other;
  let netWorth = currentAssets + profile.assets.realEstate + profile.assets.other - totalDebts;
  
  // Annual savings (including retirement savings rate and expense reduction)
  let currentIncome = profile.income + params.additionalIncome;
  let monthlyExpensesAfterReduction = profile.monthlyExpenses - params.expenseReduction;
  let annualExpenses = monthlyExpensesAfterReduction * 12;
  let annualSavings = (currentIncome * (1 - params.taxRate)) - annualExpenses;
  
  // Project for each year until retirement
  for (let year = 0; year <= yearsUntilRetirement; year++) {
    // Record the current year's values
    netWorthOverTime.push({ year: profile.age + year, value: netWorth });
    savingsOverTime.push({ year: profile.age + year, value: currentAssets });
    incomeOverTime.push({ year: profile.age + year, value: currentIncome });
    expensesOverTime.push({ year: profile.age + year, value: annualExpenses });
    
    // Update for next year
    currentAssets = currentAssets * (1 + params.investmentReturn) + annualSavings;
    
    // Adjust for inflation and modest income growth
    const inflationFactor = Math.pow(1 + params.inflationRate, year);
    const incomeGrowthFactor = 1 + (0.02 + params.inflationRate); // 2% real income growth plus inflation
    
    // Update income and expenses for next year
    currentIncome = profile.income * Math.pow(incomeGrowthFactor, year + 1) + params.additionalIncome;
    monthlyExpensesAfterReduction = (profile.monthlyExpenses * inflationFactor) - params.expenseReduction;
    annualExpenses = monthlyExpensesAfterReduction * 12;
    annualSavings = (currentIncome * (1 - params.taxRate)) - annualExpenses;
    
    // Simplified debt reduction (assuming steady paydown)
    const remainingDebtRatio = Math.max(0, 1 - year / (yearsUntilRetirement * 0.8));
    const currentDebts = totalDebts * remainingDebtRatio;
    
    // Update net worth with appreciation for real estate
    const realEstateValue = profile.assets.realEstate * Math.pow(1 + 0.04, year); // 4% annual real estate appreciation
    netWorth = currentAssets + realEstateValue + (profile.assets.other * inflationFactor) - currentDebts;
  }
  
  // Calculate retirement income (assuming 4% withdrawal rate)
  const retirementBalance = currentAssets;
  const retirementIncome = retirementBalance * 0.04;
  
  // Project retirement years
  const retirementYears = profile.lifeExpectancy - profile.retirementAge;
  let retirementNetWorthOverTime: Array<{year: number, value: number}> = [];
  let retirementAssetsOverTime: Array<{year: number, value: number}> = [];
  
  let retirementAssets = retirementBalance;
  let currentRetirementNetWorth = netWorth;
  
  for (let year = 0; year <= retirementYears; year++) {
    const currentYear = profile.retirementAge + year;
    retirementNetWorthOverTime.push({ year: currentYear, value: currentRetirementNetWorth });
    retirementAssetsOverTime.push({ year: currentYear, value: retirementAssets });
    
    // Calculate withdrawal adjusted for inflation
    const inflationFactor = Math.pow(1 + params.inflationRate, year);
    const annualWithdrawal = retirementIncome * 12 * inflationFactor;
    
    // Update retirement assets
    retirementAssets = Math.max(0, (retirementAssets - annualWithdrawal) * (1 + params.investmentReturn * 0.8)); // Lower returns in retirement (more conservative)
    
    // Update real estate value
    const realEstateValue = profile.assets.realEstate * Math.pow(1 + 0.03, yearsUntilRetirement + year); // Slower real estate growth in retirement
    
    // Update net worth
    currentRetirementNetWorth = retirementAssets + realEstateValue;
  }
  
  // Calculate education savings
  let collegeBalance = 0;
  let educationFundingGap = 0;
  let educationSavingsOverTime: Array<{year: number, value: number}> = [];
  
  if (profile.goals.education.children > 0) {
    // Calculate college savings based on children and saving rate
    const educationSavingRate = profile.goals.education.savingRate;
    const averageYearsUntilCollege = profile.goals.education.yearsUntilCollege.reduce((sum, year) => sum + year, 0) / 
                                    profile.goals.education.yearsUntilCollege.length;
    
    let currentEducationSavings = 0;
    const yearsToProject = Math.max(...profile.goals.education.yearsUntilCollege) + 4; // Project through college years
    
    // Total education cost per child (4 years)
    const totalEducationCostPerChild = profile.goals.education.estimatedCostPerYear * 4;
    const totalEducationCost = totalEducationCostPerChild * profile.goals.education.children;
    
    // Project education savings
    for (let year = 0; year <= yearsToProject; year++) {
      educationSavingsOverTime.push({
        year: profile.age + year,
        value: currentEducationSavings
      });
      
      // Check if any children start college this year
      const childrenStarting = profile.goals.education.yearsUntilCollege.filter(y => y === year).length;
      let yearlyWithdrawal = 0;
      
      if (childrenStarting > 0) {
        yearlyWithdrawal = childrenStarting * profile.goals.education.estimatedCostPerYear;
      }
      
      // Add ongoing education costs for kids already in college
      for (let i = 1; i < 4; i++) { // Check previous 3 years
        const childrenInYear = profile.goals.education.yearsUntilCollege.filter(y => y === year - i && year - i >= 0).length;
        if (childrenInYear > 0) {
          yearlyWithdrawal += childrenInYear * profile.goals.education.estimatedCostPerYear;
        }
      }
      
      // Update education savings
      currentEducationSavings = Math.max(0, (currentEducationSavings - yearlyWithdrawal) * 
                              (1 + params.investmentReturn * 0.7) + (educationSavingRate * 12));
    }
    
    // Final college balance and gap
    collegeBalance = currentEducationSavings;
    educationFundingGap = Math.max(0, totalEducationCost - collegeBalance);
  }
  
  return {
    retirementBalance,
    retirementIncome,
    collegeBalance,
    educationFundingGap,
    netWorthOverTime,
    savingsOverTime,
    incomeOverTime,
    expensesOverTime,
    retirementNetWorthOverTime,
    retirementAssetsOverTime,
    educationSavingsOverTime
  };
}

// New function to calculate financial health score
export function calculateFinancialHealthScore(profile: FinancialProfile): FinancialHealthScore {
  // Calculate debt-to-income ratio
  const totalMonthlyDebt = 
    (profile.debts.mortgage / 360) +   // assuming 30-year mortgage
    (profile.debts.studentLoans / 120) + // assuming 10-year term
    (profile.debts.carLoans / 60) +    // assuming 5-year term
    (profile.debts.creditCards / 24) + // assuming 2-year payoff
    (profile.debts.other / 36);        // assuming 3-year term
  
  const monthlyIncome = profile.income / 12;
  const debtToIncomeRatio = totalMonthlyDebt / monthlyIncome;
  
  // Calculate emergency fund ratio (months of expenses covered)
  const monthlyExpenses = profile.monthlyExpenses;
  const emergencyFundRatio = profile.assets.cash / monthlyExpenses;
  
  // Calculate retirement savings ratio
  const idealRetirementSavings = profile.income * (profile.age / 10);
  const actualRetirementSavings = profile.assets.investments;
  const retirementSavingsRatio = actualRetirementSavings / idealRetirementSavings;
  
  // Calculate education funding ratio
  let educationFundingRatio = 1.0; // Default to fully funded
  if (profile.goals.education.children > 0) {
    const totalEducationNeeds = profile.goals.education.children * 
                              profile.goals.education.estimatedCostPerYear * 4; // 4 years of college
    
    const educationSavings = profile.assets.investments * 0.2; // Assume 20% of investments for education
    educationFundingRatio = educationSavings / totalEducationNeeds;
  }
  
  // Calculate cash flow ratio
  const totalAnnualExpenses = profile.monthlyExpenses * 12;
  const afterTaxIncome = profile.income * 0.75; // Assume 25% tax rate
  const cashFlowRatio = (afterTaxIncome - totalAnnualExpenses) / afterTaxIncome;
  
  // Calculate component scores (0-100)
  const debtScore = Math.max(0, Math.min(100, 100 - (debtToIncomeRatio * 300)));
  const savingsScore = Math.max(0, Math.min(100, emergencyFundRatio * 20));
  const retirementScore = Math.max(0, Math.min(100, retirementSavingsRatio * 100));
  const educationScore = Math.max(0, Math.min(100, educationFundingRatio * 100));
  const cashFlowScore = Math.max(0, Math.min(100, (cashFlowRatio + 0.2) * 200));
  
  // Calculate overall score with weightings
  const overallScore = Math.round(
    (debtScore * 0.2) +
    (savingsScore * 0.2) +
    (retirementScore * 0.3) +
    (educationScore * 0.15) +
    (cashFlowScore * 0.15)
  );
  
  // Determine status
  let status: 'poor' | 'fair' | 'good' | 'excellent';
  if (overallScore >= 80) status = 'excellent';
  else if (overallScore >= 60) status = 'good';
  else if (overallScore >= 40) status = 'fair';
  else status = 'poor';
  
  // Generate recommendations
  const recommendations: string[] = [];
  
  if (debtScore < 60) {
    recommendations.push("Focus on reducing high-interest debt, particularly credit cards.");
  }
  
  if (savingsScore < 60) {
    recommendations.push(`Build emergency fund to cover at least ${Math.max(3, Math.round(emergencyFundRatio))} months of expenses.`);
  }
  
  if (retirementScore < 60) {
    recommendations.push(`Increase retirement contributions by at least ${Math.round((0.15 - (profile.goals.retirement.savingRate / profile.income)) * 100)}% of income.`);
  }
  
  if (educationScore < 60 && profile.goals.education.children > 0) {
    recommendations.push("Consider opening a 529 college savings plan or increasing education fund contributions.");
  }
  
  if (cashFlowScore < 60) {
    recommendations.push("Review monthly expenses and identify areas to reduce spending to improve cash flow.");
  }
  
  if (recommendations.length === 0) {
    recommendations.push("Continue your current financial strategy, which shows excellent financial health.");
  }
  
  return {
    overall: overallScore,
    components: {
      debt: Math.round(debtScore),
      savings: Math.round(savingsScore),
      retirement: Math.round(retirementScore),
      education: Math.round(educationScore),
      cashflow: Math.round(cashFlowScore)
    },
    status,
    recommendations
  };
}
