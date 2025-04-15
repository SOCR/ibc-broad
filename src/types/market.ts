
export interface StockExchangeData {
  year: number;
  nyse: number;
  nasdaq: number;
  lse: number;
  tse: number;
  sse: number;
  hkse: number;
  euronext: number;
  bse: number;
  jsx: number;
  asx: number;
}

export interface ExchangeRateData {
  date: string;
  usd: number; // Base currency
  eur: number;
  gbp: number;
  jpy: number;
  cad: number;
  aud: number;
  cny: number;
  isForecasted?: boolean;
}

export interface InternationalTradeData {
  year: number;
  exports: number;
  imports: number;
  balance: number;
  country: string;
  isForecasted?: boolean;
}

export interface SupplyChainData {
  year: number;
  containerVolume: number;
  freightCosts: number;
  deliveryTime: number;
  region: string;
  isForecasted?: boolean;
}

export interface EconomicIndicator {
  year: number;
  gdp: number;
  inflation: number;
  unemployment: number;
  country: string;
  isForecasted?: boolean;
  growth?: number;
}

export interface Course {
  code: string;
  title: string;
  description: string;
  credits: number;
  department: string;
  category: string;
}

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image: string;
}

export interface TutorialStep {
  id: number;
  title: string;
  description: string;
  image?: string;
}

export interface ForecastMethod {
  id: string;
  name: string;
  description: string;
}

export interface ForecastOptions {
  enabled: boolean;
  method: string;
  horizon: number;
  confidenceInterval?: number;
}

export type TimeSeriesDataPoint = {
  date: string | number;
  value: number;
  isForecasted?: boolean;
};

export type ForecastResult = {
  data: TimeSeriesDataPoint[];
  upperBound?: TimeSeriesDataPoint[];
  lowerBound?: TimeSeriesDataPoint[];
  method: string;
  accuracy?: number;
};

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
    other: {
      description: string;
      targetAmount: number;
      targetDate: number;
      savingRate: number;
    }[];
  };
  riskTolerance: 'low' | 'medium' | 'high';
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
  results: {
    retirementBalance: number;
    retirementIncome: number;
    collegeBalance: number;
    netWorthOverTime: Array<{year: number, value: number}>;
    savingsOverTime: Array<{year: number, value: number}>;
  };
}
