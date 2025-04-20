export interface EconomicIndicator {
  country: string;
  year: number;
  gdp: number;
  inflation: number;
  unemployment: number;
  interestRate: number;
}

export interface FinancialHealthScore {
  overall: number;
  components: {
    debt: number;
    savings: number;
    retirement: number;
    education: number;
    cashflow: number;
  };
  status: 'poor' | 'fair' | 'good' | 'excellent';
  recommendations: string[];
}

export const ibcTeamMembers = [
  {
    name: "Tunga Kiyak",
    title: "Managing Director",
    bio: "Dr. Tunga Kiyak is the Managing Director of Michigan State University's International Business Center (IBC) with 20 years of experience in international business. He oversees IBC's programs for internationalizing business education.",
    image: "/placeholder.svg"
  },
  {
    name: "Irem Kiyak",
    title: "Associate Director",
    bio: "Dr. Irem Kiyak serves as the Associate Director of MSU's International Business Center. She leads global initiatives and partnerships while overseeing the globalEDGE knowledge portal.",
    image: "/placeholder.svg"
  },
  {
    name: "Sarah Singer",
    title: "Director",
    bio: "Dr. Sarah Singer is the Director of Education Abroad and the Global Initiatives in the Eli Broad College of Business and Assistant Director of CIBER. She manages the development of global opportunities for MSU students.",
    image: "/placeholder.svg"
  },
  {
    name: "Beverly Wilkins",
    title: "Program Coordinator",
    bio: "Beverly Wilkins is the Program Coordinator for IBC, supporting key programs and activities including the globalEDGE initiative. She manages day-to-day operations of the center.",
    image: "/placeholder.svg"
  },
  {
    name: "David Frayer",
    title: "Executive Director, Executive Development Programs",
    bio: "Dr. David Frayer is the Executive Director of Executive Development Programs at the Eli Broad College of Business. He leads programs for corporate executives and helps integrate international business perspectives.",
    image: "/placeholder.svg"
  },
  {
    name: "Tomas Hult",
    title: "Director, IBC & CIBER",
    bio: "Dr. Tomas Hult is the Director of both the International Business Center and the Center for International Business Education and Research (CIBER). He is also a Professor of Marketing and holds the Byington Endowed Chair.",
    image: "/placeholder.svg"
  },
  {
    name: "Ahmet Kirca",
    title: "Outreach Director",
    bio: "Dr. Ahmet Kirca serves as the Outreach Director for the IBC. He helps develop and implement programs that connect the business college with international partners and opportunities.",
    image: "/placeholder.svg"
  }
];

export const economicIndicators = [
  {
    country: "USA",
    year: 2018,
    gdp: 20.58,
    inflation: 2.4,
    unemployment: 3.9,
    interestRate: 2.5
  },
  {
    country: "USA",
    year: 2019,
    gdp: 21.43,
    inflation: 1.8,
    unemployment: 3.7,
    interestRate: 1.75
  },
  {
    country: "USA",
    year: 2020,
    gdp: 20.94,
    inflation: 1.2,
    unemployment: 8.1,
    interestRate: 0.25
  },
  {
    country: "USA",
    year: 2021,
    gdp: 22.99,
    inflation: 4.7,
    unemployment: 5.4,
    interestRate: 0.25
  },
  {
    country: "USA",
    year: 2022,
    gdp: 25.46,
    inflation: 8.0,
    unemployment: 3.6,
    interestRate: 4.25
  },
  {
    country: "EU",
    year: 2018,
    gdp: 18.77,
    inflation: 1.8,
    unemployment: 6.8,
    interestRate: 0.0
  },
  {
    country: "EU",
    year: 2019,
    gdp: 15.63,
    inflation: 1.4,
    unemployment: 6.4,
    interestRate: 0.0
  },
  {
    country: "EU",
    year: 2020,
    gdp: 15.29,
    inflation: 0.3,
    unemployment: 7.1,
    interestRate: 0.0
  },
  {
    country: "EU",
    year: 2021,
    gdp: 17.13,
    inflation: 2.6,
    unemployment: 7.0,
    interestRate: 0.0
  },
  {
    country: "EU",
    year: 2022,
    gdp: 17.35,
    inflation: 9.2,
    unemployment: 6.1,
    interestRate: 2.0
  },
  {
    country: "China",
    year: 2018,
    gdp: 13.89,
    inflation: 2.1,
    unemployment: 3.8,
    interestRate: 4.35
  },
  {
    country: "China",
    year: 2019,
    gdp: 14.34,
    inflation: 2.9,
    unemployment: 3.6,
    interestRate: 4.35
  },
  {
    country: "China",
    year: 2020,
    gdp: 14.72,
    inflation: 2.5,
    unemployment: 4.2,
    interestRate: 3.85
  },
  {
    country: "China",
    year: 2021,
    gdp: 17.73,
    inflation: 0.9,
    unemployment: 4.0,
    interestRate: 3.8
  },
  {
    country: "China",
    year: 2022,
    gdp: 18.10,
    inflation: 2.0,
    unemployment: 5.5,
    interestRate: 3.65
  }
];

// Add missing exports needed by other components
export const exchangeRateData = [
  { date: "2018-01", eur: 0.83, gbp: 0.72, jpy: 109.12, cad: 1.24, aud: 1.25, cny: 6.43, isForecasted: false },
  { date: "2018-06", eur: 0.85, gbp: 0.75, jpy: 110.44, cad: 1.31, aud: 1.35, cny: 6.62, isForecasted: false },
  { date: "2018-12", eur: 0.88, gbp: 0.78, jpy: 109.67, cad: 1.36, aud: 1.42, cny: 6.88, isForecasted: false },
  { date: "2019-06", eur: 0.88, gbp: 0.79, jpy: 107.84, cad: 1.31, aud: 1.43, cny: 6.87, isForecasted: false },
  { date: "2019-12", eur: 0.9, gbp: 0.76, jpy: 109.56, cad: 1.3, aud: 1.44, cny: 7.01, isForecasted: false },
  { date: "2020-06", eur: 0.89, gbp: 0.81, jpy: 107.35, cad: 1.36, aud: 1.45, cny: 7.06, isForecasted: false },
  { date: "2020-12", eur: 0.82, gbp: 0.74, jpy: 103.24, cad: 1.27, aud: 1.3, cny: 6.53, isForecasted: false },
  { date: "2021-06", eur: 0.84, gbp: 0.72, jpy: 110.98, cad: 1.23, aud: 1.33, cny: 6.46, isForecasted: false },
  { date: "2021-12", eur: 0.88, gbp: 0.74, jpy: 115.13, cad: 1.28, aud: 1.38, cny: 6.37, isForecasted: false },
  { date: "2022-06", eur: 0.95, gbp: 0.82, jpy: 135.57, cad: 1.29, aud: 1.45, cny: 6.7, isForecasted: false },
  { date: "2022-12", eur: 0.94, gbp: 0.83, jpy: 131.12, cad: 1.35, aud: 1.47, cny: 6.9, isForecasted: false },
  { date: "2023-06", eur: 0.92, gbp: 0.78, jpy: 142.31, cad: 1.32, aud: 1.48, cny: 7.23, isForecasted: false },
  { date: "2023-12", eur: 0.91, gbp: 0.79, jpy: 141.52, cad: 1.33, aud: 1.47, cny: 7.1, isForecasted: false },
  { date: "2024-01", eur: 0.92, gbp: 0.79, jpy: 147.83, cad: 1.34, aud: 1.51, cny: 7.18, isForecasted: false }
];

export const forecastMethods = [
  { id: 'linear', name: 'Linear Regression', description: 'Assumes a straight-line relationship between time and exchange rate.' },
  { id: 'moving', name: 'Moving Average', description: 'Uses an average of past values to predict future values.' },
  { id: 'seasonal', name: 'Seasonal Adjustment', description: 'Accounts for seasonal patterns in exchange rate fluctuations.' },
  { id: 'exponential', name: 'Exponential Smoothing', description: 'Places more weight on recent observations.' }
];

// Update stock exchange data to include year property and individual exchange properties
export const stockExchangeData = [
  { year: 1950, nyse: 100, nasdaq: 100, lse: 100, tse: 100, sse: 100, hkse: 100, euronext: 100, bse: 100, jsx: 100, asx: 100 },
  { year: 1960, nyse: 145, nasdaq: 132, lse: 148, tse: 135, sse: 120, hkse: 125, euronext: 130, bse: 115, jsx: 110, asx: 128 },
  { year: 1970, nyse: 235, nasdaq: 210, lse: 236, tse: 204, sse: 145, hkse: 156, euronext: 198, bse: 142, jsx: 131, asx: 167 },
  { year: 1980, nyse: 487, nasdaq: 432, lse: 389, tse: 367, sse: 178, hkse: 245, euronext: 312, bse: 187, jsx: 154, asx: 232 },
  { year: 1990, nyse: 876, nasdaq: 789, lse: 712, tse: 654, sse: 267, hkse: 456, euronext: 567, bse: 278, jsx: 234, asx: 398 },
  { year: 2000, nyse: 1430, nasdaq: 1897, lse: 1032, tse: 967, sse: 456, hkse: 789, euronext: 876, bse: 432, jsx: 367, asx: 654 },
  { year: 2010, nyse: 2134, nasdaq: 2345, lse: 1543, tse: 1342, sse: 987, hkse: 1234, euronext: 1345, bse: 765, jsx: 543, asx: 876 },
  { year: 2015, nyse: 2678, nasdaq: 2987, lse: 1786, tse: 1567, sse: 1345, hkse: 1567, euronext: 1654, bse: 987, jsx: 654, asx: 1032 },
  { year: 2020, nyse: 3000, nasdaq: 3200, lse: 1800, tse: 1650, sse: 1500, hkse: 1700, euronext: 1750, bse: 1100, jsx: 700, asx: 1200 },
  { year: 2023, nyse: 3500, nasdaq: 3800, lse: 2000, tse: 1800, sse: 1600, hkse: 1900, euronext: 1950, bse: 1200, jsx: 850, asx: 1350 }
];

// Let's also keep a separate structure for the original stock exchange data
export const stockExchangeDetails = [
  { exchange: 'NYSE', country: 'USA', marketCap: 27.69, volume: 1.46, companies: 2400, yearlyChange: 8.2 },
  { exchange: 'NASDAQ', country: 'USA', marketCap: 24.56, volume: 2.89, companies: 3300, yearlyChange: 12.8 },
  { exchange: 'Tokyo SE', country: 'Japan', marketCap: 6.17, volume: 0.55, companies: 3800, yearlyChange: 7.4 },
  { exchange: 'Shanghai SE', country: 'China', marketCap: 8.15, volume: 0.84, companies: 1600, yearlyChange: 2.1 },
  { exchange: 'LSE', country: 'UK', marketCap: 3.11, volume: 0.21, companies: 1900, yearlyChange: 4.6 },
  { exchange: 'Euronext', country: 'EU', marketCap: 7.33, volume: 0.45, companies: 1500, yearlyChange: 6.8 }
];

export const supplyChainData = [
  { region: 'North America', year: 2018, containerVolume: 26.5, freightCosts: 1250, deliveryTime: 12 },
  { region: 'North America', year: 2019, containerVolume: 27.8, freightCosts: 1280, deliveryTime: 11.5 },
  { region: 'North America', year: 2020, containerVolume: 24.3, freightCosts: 1950, deliveryTime: 18.6 },
  { region: 'North America', year: 2021, containerVolume: 29.1, freightCosts: 2300, deliveryTime: 16.2 },
  { region: 'North America', year: 2022, containerVolume: 31.2, freightCosts: 1900, deliveryTime: 11.0 },
  { region: 'Europe', year: 2018, containerVolume: 22.1, freightCosts: 1180, deliveryTime: 9.8 },
  { region: 'Europe', year: 2019, containerVolume: 23.4, freightCosts: 1220, deliveryTime: 9.2 },
  { region: 'Europe', year: 2020, containerVolume: 20.7, freightCosts: 1730, deliveryTime: 16.4 },
  { region: 'Europe', year: 2021, containerVolume: 24.2, freightCosts: 2150, deliveryTime: 14.5 },
  { region: 'Europe', year: 2022, containerVolume: 25.8, freightCosts: 1850, deliveryTime: 8.8 },
  { region: 'Asia Pacific', year: 2018, containerVolume: 52.3, freightCosts: 980, deliveryTime: 8.6 },
  { region: 'Asia Pacific', year: 2019, containerVolume: 55.7, freightCosts: 1050, deliveryTime: 8.1 },
  { region: 'Asia Pacific', year: 2020, containerVolume: 49.1, freightCosts: 1580, deliveryTime: 14.3 },
  { region: 'Asia Pacific', year: 2021, containerVolume: 56.9, freightCosts: 1980, deliveryTime: 12.1 },
  { region: 'Asia Pacific', year: 2022, containerVolume: 59.8, freightCosts: 1700, deliveryTime: 7.8 }
];

export const internationalTradeData = [
  { country: 'North America', year: 2018, exports: 1450, imports: 2351, balance: -901 },
  { country: 'North America', year: 2019, exports: 1398, imports: 2337, balance: -939 },
  { country: 'North America', year: 2020, exports: 1187, imports: 2028, balance: -841 },
  { country: 'North America', year: 2021, exports: 1432, imports: 2539, balance: -1107 },
  { country: 'North America', year: 2022, exports: 1692, imports: 2811, balance: -1119 },
  { country: 'Europe', year: 2018, exports: 2320, imports: 2126, balance: 194 },
  { country: 'Europe', year: 2019, exports: 2367, imports: 2089, balance: 278 },
  { country: 'Europe', year: 2020, exports: 2018, imports: 1823, balance: 195 },
  { country: 'Europe', year: 2021, exports: 2395, imports: 2198, balance: 197 },
  { country: 'Europe', year: 2022, exports: 2587, imports: 2367, balance: 220 },
  { country: 'Asia', year: 2018, exports: 2647, imports: 2531, balance: 116 },
  { country: 'Asia', year: 2019, exports: 2701, imports: 2487, balance: 214 },
  { country: 'Asia', year: 2020, exports: 2523, imports: 2289, balance: 234 },
  { country: 'Asia', year: 2021, exports: 3047, imports: 2839, balance: 208 },
  { country: 'Asia', year: 2022, exports: 3321, imports: 3099, balance: 222 }
];

export const broadCourses = [
  {
    code: "IBUS 310",
    title: "International Business",
    credits: 3,
    department: "International Business",
    category: "Core",
    description: "Overview of international business theories and practices. Analysis of how business decisions are influenced by political, cultural, and economic factors."
  },
  {
    code: "IBUS 351",
    title: "International Business Law",
    credits: 3,
    department: "International Business",
    category: "Elective",
    description: "Legal aspects of conducting international business operations. Examines international trade laws, contracts, intellectual property rights, and dispute resolution."
  }
];

export const investmentAllocations = [
  {
    name: "Conservative",
    allocation: {
      bonds: 60,
      largeCap: 15,
      midCap: 5,
      smallCap: 5,
      international: 10,
      alternatives: 5
    },
    expectedReturn: 5.2,
    risk: "Low",
    volatility: 6.5,
    description: "Emphasizes capital preservation with moderate income and growth potential. Suited for risk-averse investors or those with short time horizons.",
    maxDrawdown: 15
  },
  {
    name: "Moderately Conservative",
    allocation: {
      bonds: 50,
      largeCap: 20,
      midCap: 10,
      smallCap: 5,
      international: 10,
      alternatives: 5
    },
    expectedReturn: 6.1,
    risk: "Low to Moderate",
    volatility: 8.2,
    description: "Balanced approach leaning toward fixed income, with growth potential through moderate stock exposure.",
    maxDrawdown: 20
  },
  {
    name: "Balanced",
    allocation: {
      bonds: 40,
      largeCap: 25,
      midCap: 10,
      smallCap: 5,
      international: 15,
      alternatives: 5
    },
    expectedReturn: 6.8,
    risk: "Moderate",
    volatility: 10.5,
    description: "Equal emphasis on growth and income, balancing risk and return through diversification across asset classes.",
    maxDrawdown: 25
  },
  {
    name: "Moderately Aggressive",
    allocation: {
      bonds: 25,
      largeCap: 30,
      midCap: 15,
      smallCap: 10,
      international: 15,
      alternatives: 5
    },
    expectedReturn: 7.6,
    risk: "Moderate to High",
    volatility: 13.8,
    description: "Growth-oriented approach with significant equity exposure, suited for investors with longer time horizons.",
    maxDrawdown: 30
  },
  {
    name: "Aggressive",
    allocation: {
      bonds: 10,
      largeCap: 35,
      midCap: 15,
      smallCap: 15,
      international: 20,
      alternatives: 5
    },
    expectedReturn: 8.5,
    risk: "High",
    volatility: 17.2,
    description: "Primarily focused on long-term capital appreciation with high equity allocation. Best for investors with high risk tolerance and long time horizons.",
    maxDrawdown: 40
  }
];

export const tutorialSteps = [
  {
    id: 1,
    title: "Welcome to the Dashboard",
    description: "This tutorial will guide you through the MSU Broad College IBC Dashboard features. Navigate through each step using the Next/Previous buttons.",
    image: true
  },
  {
    id: 2,
    title: "IBEX Analysis",
    description: "The IBEX (International Business Education Index) section shows how actively colleges are promoting international business education through various metrics.",
    image: true
  },
  {
    id: 3,
    title: "Economic Indicators",
    description: "Compare economic indicators like GDP, inflation, and unemployment across major economies. Use the filters to customize your view.",
    image: true
  },
  {
    id: 4,
    title: "Stock Exchanges",
    description: "Analyze global stock exchanges by market capitalization, trading volume, and performance. Click on individual exchanges for detailed information.",
    image: true
  },
  {
    id: 5,
    title: "Exchange Rates",
    description: "Track currency exchange rates and forecast future trends using different statistical methods. Toggle forecast settings to see predictions.",
    image: true
  },
  {
    id: 6,
    title: "CFP Planning Tools",
    description: "Use our financial planning tools to assess your financial health, plan for retirement, and manage debt. Enter your information to receive personalized analysis.",
    image: true
  }
];
