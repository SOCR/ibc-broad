
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
}

export interface InternationalTradeData {
  year: number;
  exports: number;
  imports: number;
  balance: number;
  country: string;
}

export interface SupplyChainData {
  year: number;
  containerVolume: number;
  freightCosts: number;
  deliveryTime: number;
  region: string;
}

export interface EconomicIndicator {
  year: number;
  gdp: number;
  inflation: number;
  unemployment: number;
  country: string;
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
