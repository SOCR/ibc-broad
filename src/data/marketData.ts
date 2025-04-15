
import { 
  StockExchangeData, 
  ExchangeRateData,
  InternationalTradeData,
  SupplyChainData,
  EconomicIndicator,
  Course,
  TeamMember,
  TutorialStep
} from "@/types/market";
import { msuLogo, tomasHultImage, sarahSingerImage, billMotzImage } from "@/assets";

// Stock Exchange Data since 1950 (simplified with 10-year intervals)
export const stockExchangeData: StockExchangeData[] = [
  { year: 1950, nyse: 100, nasdaq: 0, lse: 80, tse: 40, sse: 0, hkse: 20, euronext: 30, bse: 15, jsx: 10, asx: 25 },
  { year: 1960, nyse: 150, nasdaq: 0, lse: 100, tse: 60, sse: 0, hkse: 30, euronext: 50, bse: 25, jsx: 15, asx: 35 },
  { year: 1970, nyse: 200, nasdaq: 100, lse: 150, tse: 90, sse: 0, hkse: 50, euronext: 80, bse: 40, jsx: 25, asx: 55 },
  { year: 1980, nyse: 400, nasdaq: 150, lse: 250, tse: 180, sse: 0, hkse: 120, euronext: 150, bse: 70, jsx: 45, asx: 90 },
  { year: 1990, nyse: 800, nasdaq: 400, lse: 500, tse: 350, sse: 100, hkse: 230, euronext: 300, bse: 150, jsx: 100, asx: 180 },
  { year: 2000, nyse: 1600, nasdaq: 1200, lse: 900, tse: 700, sse: 300, hkse: 500, euronext: 600, bse: 300, jsx: 200, asx: 350 },
  { year: 2010, nyse: 2200, nasdaq: 1800, lse: 1300, tse: 1100, sse: 900, hkse: 850, euronext: 850, bse: 600, jsx: 400, asx: 500 },
  { year: 2020, nyse: 3000, nasdaq: 3200, lse: 1800, tse: 1500, sse: 1400, hkse: 1200, euronext: 1100, bse: 950, jsx: 600, asx: 750 },
  { year: 2023, nyse: 3500, nasdaq: 3800, lse: 2000, tse: 1700, sse: 1600, hkse: 1300, euronext: 1250, bse: 1100, jsx: 700, asx: 800 }
];

// Exchange Rate Data (simplified monthly data for the last year)
export const exchangeRateData: ExchangeRateData[] = [
  { date: '2023-01', usd: 1, eur: 0.85, gbp: 0.75, jpy: 130.52, cad: 1.35, aud: 1.45, cny: 6.78 },
  { date: '2023-02', usd: 1, eur: 0.84, gbp: 0.74, jpy: 132.10, cad: 1.34, aud: 1.44, cny: 6.79 },
  { date: '2023-03', usd: 1, eur: 0.83, gbp: 0.73, jpy: 133.70, cad: 1.36, aud: 1.46, cny: 6.88 },
  { date: '2023-04', usd: 1, eur: 0.82, gbp: 0.72, jpy: 135.20, cad: 1.37, aud: 1.48, cny: 6.92 },
  { date: '2023-05', usd: 1, eur: 0.83, gbp: 0.73, jpy: 137.50, cad: 1.36, aud: 1.49, cny: 7.05 },
  { date: '2023-06', usd: 1, eur: 0.84, gbp: 0.74, jpy: 140.80, cad: 1.34, aud: 1.47, cny: 7.18 },
  { date: '2023-07', usd: 1, eur: 0.85, gbp: 0.75, jpy: 142.30, cad: 1.32, aud: 1.46, cny: 7.16 },
  { date: '2023-08', usd: 1, eur: 0.86, gbp: 0.76, jpy: 145.10, cad: 1.35, aud: 1.48, cny: 7.24 },
  { date: '2023-09', usd: 1, eur: 0.85, gbp: 0.77, jpy: 147.80, cad: 1.36, aud: 1.50, cny: 7.28 },
  { date: '2023-10', usd: 1, eur: 0.84, gbp: 0.76, jpy: 148.70, cad: 1.37, aud: 1.51, cny: 7.31 },
  { date: '2023-11', usd: 1, eur: 0.86, gbp: 0.77, jpy: 149.10, cad: 1.36, aud: 1.49, cny: 7.27 },
  { date: '2023-12', usd: 1, eur: 0.87, gbp: 0.78, jpy: 147.20, cad: 1.34, aud: 1.48, cny: 7.20 }
];

// International Trade Data (by major region)
export const internationalTradeData: InternationalTradeData[] = [
  // North America
  { year: 2018, exports: 1750, imports: 2300, balance: -550, country: "North America" },
  { year: 2019, exports: 1700, imports: 2250, balance: -550, country: "North America" },
  { year: 2020, exports: 1500, imports: 2000, balance: -500, country: "North America" },
  { year: 2021, exports: 1800, imports: 2400, balance: -600, country: "North America" },
  { year: 2022, exports: 1950, imports: 2550, balance: -600, country: "North America" },
  
  // Europe
  { year: 2018, exports: 2300, imports: 2200, balance: 100, country: "Europe" },
  { year: 2019, exports: 2250, imports: 2150, balance: 100, country: "Europe" },
  { year: 2020, exports: 2050, imports: 1950, balance: 100, country: "Europe" },
  { year: 2021, exports: 2400, imports: 2250, balance: 150, country: "Europe" },
  { year: 2022, exports: 2550, imports: 2400, balance: 150, country: "Europe" },
  
  // Asia
  { year: 2018, exports: 2500, imports: 2000, balance: 500, country: "Asia" },
  { year: 2019, exports: 2550, imports: 2050, balance: 500, country: "Asia" },
  { year: 2020, exports: 2400, imports: 1900, balance: 500, country: "Asia" },
  { year: 2021, exports: 2750, imports: 2150, balance: 600, country: "Asia" },
  { year: 2022, exports: 2950, imports: 2300, balance: 650, country: "Asia" }
];

// Supply Chain Data
export const supplyChainData: SupplyChainData[] = [
  // North America
  { year: 2018, containerVolume: 30, freightCosts: 1200, deliveryTime: 5, region: "North America" },
  { year: 2019, containerVolume: 32, freightCosts: 1250, deliveryTime: 4.8, region: "North America" },
  { year: 2020, containerVolume: 28, freightCosts: 1500, deliveryTime: 7.2, region: "North America" },
  { year: 2021, containerVolume: 33, freightCosts: 2200, deliveryTime: 8.5, region: "North America" },
  { year: 2022, containerVolume: 35, freightCosts: 1800, deliveryTime: 6.5, region: "North America" },
  
  // Europe
  { year: 2018, containerVolume: 25, freightCosts: 1300, deliveryTime: 6.5, region: "Europe" },
  { year: 2019, containerVolume: 26, freightCosts: 1350, deliveryTime: 6.3, region: "Europe" },
  { year: 2020, containerVolume: 22, freightCosts: 1600, deliveryTime: 9.0, region: "Europe" },
  { year: 2021, containerVolume: 27, freightCosts: 2400, deliveryTime: 10.2, region: "Europe" },
  { year: 2022, containerVolume: 29, freightCosts: 2000, deliveryTime: 7.8, region: "Europe" },
  
  // Asia
  { year: 2018, containerVolume: 45, freightCosts: 1100, deliveryTime: 8.2, region: "Asia" },
  { year: 2019, containerVolume: 47, freightCosts: 1150, deliveryTime: 8.0, region: "Asia" },
  { year: 2020, containerVolume: 40, freightCosts: 1400, deliveryTime: 12.5, region: "Asia" },
  { year: 2021, containerVolume: 48, freightCosts: 2300, deliveryTime: 15.0, region: "Asia" },
  { year: 2022, containerVolume: 52, freightCosts: 1900, deliveryTime: 10.2, region: "Asia" }
];

// Economic Indicators
export const economicIndicators: EconomicIndicator[] = [
  // USA
  { year: 2018, gdp: 20.58, inflation: 2.4, unemployment: 3.9, country: "USA" },
  { year: 2019, gdp: 21.43, inflation: 1.8, unemployment: 3.7, country: "USA" },
  { year: 2020, gdp: 20.94, inflation: 1.2, unemployment: 8.1, country: "USA" },
  { year: 2021, gdp: 22.99, inflation: 4.7, unemployment: 5.4, country: "USA" },
  { year: 2022, gdp: 25.46, inflation: 8.0, unemployment: 3.6, country: "USA" },
  
  // EU
  { year: 2018, gdp: 18.75, inflation: 1.8, unemployment: 6.8, country: "EU" },
  { year: 2019, gdp: 15.63, inflation: 1.4, unemployment: 6.3, country: "EU" },
  { year: 2020, gdp: 15.30, inflation: 0.5, unemployment: 7.1, country: "EU" },
  { year: 2021, gdp: 17.09, inflation: 2.9, unemployment: 7.0, country: "EU" },
  { year: 2022, gdp: 16.63, inflation: 8.1, unemployment: 6.1, country: "EU" },
  
  // China
  { year: 2018, gdp: 13.89, inflation: 2.1, unemployment: 3.8, country: "China" },
  { year: 2019, gdp: 14.34, inflation: 2.9, unemployment: 3.6, country: "China" },
  { year: 2020, gdp: 14.72, inflation: 2.5, unemployment: 4.2, country: "China" },
  { year: 2021, gdp: 16.86, inflation: 0.9, unemployment: 4.0, country: "China" },
  { year: 2022, gdp: 17.96, inflation: 2.0, unemployment: 4.1, country: "China" }
];

// Broad College Courses
export const broadCourses: Course[] = [
  {
    code: "ACM 293",
    title: "Cooperative Education for Accounting Majors",
    description: "Work experience related to student's major field under faculty supervision.",
    credits: 1,
    department: "Accounting",
    category: "Business Core"
  },
  {
    code: "FI 320",
    title: "Introduction to Finance",
    description: "Overview of financial markets, financial analysis and valuation, and derivatives.",
    credits: 3,
    department: "Finance",
    category: "Business Core"
  },
  {
    code: "MKT 310",
    title: "International and Cross-Cultural Business",
    description: "Business operations in the international environment. Social, cultural, economic, and institutional variables in global business.",
    credits: 3,
    department: "Marketing",
    category: "International"
  },
  {
    code: "SCM 303",
    title: "Introduction to Supply Chain Management",
    description: "Objectives, processes, and functions of supply chain management activities.",
    credits: 3,
    department: "Supply Chain Management",
    category: "Business Core"
  },
  {
    code: "MGT 315",
    title: "Managing Human Resources and Organizational Behavior",
    description: "Managing individuals and organizational dynamics for effective job performance.",
    credits: 3,
    department: "Management",
    category: "Management"
  },
  {
    code: "MKT 300",
    title: "Marketing Management",
    description: "Decision making in marketing and its relation to other business areas.",
    credits: 3,
    department: "Marketing",
    category: "Business Core"
  },
  {
    code: "MKT 317",
    title: "International Business",
    description: "Concerns of international businesses: trade, investment, and operations.",
    credits: 3,
    department: "Marketing",
    category: "International"
  },
  {
    code: "MKT 319",
    title: "Marketing Analytics",
    description: "Application of statistical techniques to solve marketing problems.",
    credits: 3,
    department: "Marketing",
    category: "Analytics"
  },
  {
    code: "SCM 371",
    title: "Procurement and Supply Management",
    description: "Strategic sourcing and building supply relationships.",
    credits: 3,
    department: "Supply Chain Management",
    category: "Supply Chain"
  },
  {
    code: "SCM 373",
    title: "Logistics and Transportation Management",
    description: "Micro analysis of logistics and transportation, including freight systems and operations.",
    credits: 3,
    department: "Supply Chain Management",
    category: "Supply Chain"
  }
];

// Team Members
export const teamMembers: TeamMember[] = [
  {
    name: "Tomas Hult",
    title: "Director, International Business Center",
    bio: "Dr. Tomas Hult has been IBC's Director since 2001 and he founded IBEX in 2008. Hult is Byington Endowed Chair, Professor of Marketing and International Business, and one of most cited business scholars in the world. In 2016, he was named the #1 marketing professor worldwide by Academy of Marketing Science.",
    image: tomasHultImage
  },
  {
    name: "Sarah Singer",
    title: "Assistant Director, International Business Center",
    bio: "Dr. Sarah Singer serves as the IBC Assistant Director and coordinator for community college programming. She works directly with community colleges across the United States to develop and implement internationalization strategies.",
    image: sarahSingerImage
  },
  {
    name: "William 'Bill' Motz",
    title: "Business Professor, Lansing Community College",
    bio: "Bill Motz is a Business Professor at Lansing Community College and a long-standing partner in IBEX benchmarking and community college activities. He has collaborated with MSU IBC on numerous projects to enhance international business education.",
    image: billMotzImage
  }
];

// Tutorial Steps
export const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Welcome to the MSU Broad College IBC Dashboard",
    description: "This dashboard provides comprehensive data and insights about international business education, market trends, and economic indicators."
  },
  {
    id: 2,
    title: "Navigating the Dashboard",
    description: "Use the sidebar on the left to navigate between different sections of the dashboard. The sidebar can be collapsed for a wider view of the data."
  },
  {
    id: 3,
    title: "IBEX Analysis",
    description: "The IBEX Analysis page provides data about the International Business Education Index (IBEX), which measures the degree to which community colleges emphasize internationalization of business education."
  },
  {
    id: 4,
    title: "Market Data",
    description: "The Market Data page shows current market trends and economic indicators from around the world, helping to understand the global business environment."
  },
  {
    id: 5,
    title: "Financial Data",
    description: "Explore stock exchange data, exchange rates, and economic indicators to gain insights into global financial markets."
  },
  {
    id: 6,
    title: "Trade & Supply Chain",
    description: "Analyze global trade patterns, supply chain metrics, and international trade data to understand the flow of goods and services worldwide."
  },
  {
    id: 7,
    title: "Resources",
    description: "Find information about Broad College courses, the IBC team, and this tutorial to make the most of the dashboard."
  }
];
