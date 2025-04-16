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

// New additions for stockExchange and supplyChain data
export interface StockExchange {
  name: string;
  location: string;
  marketCap: number;
  listedCompanies: number;
  topSectors: string[];
  tradingHours: string;
  established: number;
  year: number; // Adding missing year property
}

export interface SupplyChainData {
  product: string;
  year: number;
  sourceCountries: string[];
  transportationModes: string[];
  leadTimes: number;
  costs: number;
  disruptions: number;
  region: string; // Adding missing region property
  containerVolume: number; // Adding missing containerVolume property
  freightCosts: number; // Adding missing freightCosts property
  deliveryTime: number; // Adding missing deliveryTime property
}

// Global Trade Analysis types
export interface MarketFactors {
  interestRates: number;          // 0-10 scale, representing base rates
  inflation: number;              // 0-15 scale, percentage
  currencyVolatility: number;     // 0-10 scale, low to high volatility
  commodityPrices: number;        // 0-10 scale, current price levels
  geopoliticalRisk: number;       // 0-10 scale, low to high risk
  consumerConfidence: number;     // 0-10 scale, low to high confidence
  manufacturingOutput: number;    // 0-10 scale, contraction to expansion
  energyPrices: number;           // 0-10 scale, low to high prices
}

export interface TradeIndicator {
  id: string;
  name: string;
  currentValue: number;
  projected: number;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
}

export interface RegionalGrowth {
  region: string;
  currentGrowth: number;  // Current GDP growth rate
  projectedGrowth: number; // Projected growth rate
  tradeVolume: number;     // 0-10 scale
  marketAccessibility: number; // 0-10 scale 
  stability: number;       // 0-10 scale
  industries: Array<{
    name: string;
    strength: number;      // 0-10 scale
    outlook: 'positive' | 'negative' | 'neutral';
  }>;
}

export interface GlobalRecommendation {
  id: string;
  title: string;
  description: string;
  regions: string[];
  sectors: string[];
  riskLevel: 'low' | 'moderate' | 'high';
  timeframe: 'short' | 'medium' | 'long';
  potentialReturn: number; // Percentage
  confidenceScore: number; // 0-100
  factors: string[];
}
