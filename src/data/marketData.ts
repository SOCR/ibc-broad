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

// Stock Exchange Data since 1950 (expanded with more historical data)
export const stockExchangeData: StockExchangeData[] = [
  { year: 1950, nyse: 100, nasdaq: 0, lse: 80, tse: 40, sse: 0, hkse: 20, euronext: 30, bse: 15, jsx: 10, asx: 25 },
  { year: 1960, nyse: 150, nasdaq: 0, lse: 100, tse: 60, sse: 0, hkse: 30, euronext: 50, bse: 25, jsx: 15, asx: 35 },
  { year: 1970, nyse: 200, nasdaq: 100, lse: 150, tse: 90, sse: 0, hkse: 50, euronext: 80, bse: 40, jsx: 25, asx: 55 },
  { year: 1975, nyse: 300, nasdaq: 125, lse: 200, tse: 135, sse: 0, hkse: 85, euronext: 115, bse: 55, jsx: 35, asx: 73 },
  { year: 1980, nyse: 400, nasdaq: 150, lse: 250, tse: 180, sse: 0, hkse: 120, euronext: 150, bse: 70, jsx: 45, asx: 90 },
  { year: 1985, nyse: 600, nasdaq: 275, lse: 375, tse: 265, sse: 0, hkse: 175, euronext: 225, bse: 110, jsx: 73, asx: 135 },
  { year: 1990, nyse: 800, nasdaq: 400, lse: 500, tse: 350, sse: 100, hkse: 230, euronext: 300, bse: 150, jsx: 100, asx: 180 },
  { year: 1995, nyse: 1200, nasdaq: 800, lse: 700, tse: 525, sse: 200, hkse: 365, euronext: 450, bse: 225, jsx: 150, asx: 265 },
  { year: 2000, nyse: 1600, nasdaq: 1200, lse: 900, tse: 700, sse: 300, hkse: 500, euronext: 600, bse: 300, jsx: 200, asx: 350 },
  { year: 2005, nyse: 1900, nasdaq: 1500, lse: 1100, tse: 900, sse: 600, hkse: 675, euronext: 725, bse: 450, jsx: 300, asx: 425 },
  { year: 2010, nyse: 2200, nasdaq: 1800, lse: 1300, tse: 1100, sse: 900, hkse: 850, euronext: 850, bse: 600, jsx: 400, asx: 500 },
  { year: 2015, nyse: 2600, nasdaq: 2500, lse: 1550, tse: 1300, sse: 1150, hkse: 1025, euronext: 975, bse: 775, jsx: 500, asx: 625 },
  { year: 2020, nyse: 3000, nasdaq: 3200, lse: 1800, tse: 1500, sse: 1400, hkse: 1200, euronext: 1100, bse: 950, jsx: 600, asx: 750 },
  { year: 2023, nyse: 3500, nasdaq: 3800, lse: 2000, tse: 1700, sse: 1600, hkse: 1300, euronext: 1250, bse: 1100, jsx: 700, asx: 800 },
  { year: 2024, nyse: 3650, nasdaq: 4100, lse: 2100, tse: 1750, sse: 1650, hkse: 1350, euronext: 1300, bse: 1150, jsx: 725, asx: 825 }
];

// Exchange Rate Data (extended with more historical data)
export const exchangeRateData: ExchangeRateData[] = [
  // More historical data added
  { date: '2000-01', usd: 1, eur: 0.96, gbp: 0.62, jpy: 102.11, cad: 1.45, aud: 1.53, cny: 8.27 },
  { date: '2005-01', usd: 1, eur: 0.77, gbp: 0.53, jpy: 103.45, cad: 1.22, aud: 1.29, cny: 8.27 },
  { date: '2010-01', usd: 1, eur: 0.70, gbp: 0.62, jpy: 91.10, cad: 1.04, aud: 1.11, cny: 6.83 },
  { date: '2015-01', usd: 1, eur: 0.85, gbp: 0.66, jpy: 118.27, cad: 1.19, aud: 1.24, cny: 6.21 },
  { date: '2020-01', usd: 1, eur: 0.90, gbp: 0.77, jpy: 109.10, cad: 1.31, aud: 1.47, cny: 6.91 },
  { date: '2020-06', usd: 1, eur: 0.89, gbp: 0.80, jpy: 107.35, cad: 1.36, aud: 1.45, cny: 7.07 },
  { date: '2021-01', usd: 1, eur: 0.82, gbp: 0.73, jpy: 103.79, cad: 1.28, aud: 1.30, cny: 6.48 },
  { date: '2021-06', usd: 1, eur: 0.84, gbp: 0.71, jpy: 110.58, cad: 1.24, aud: 1.32, cny: 6.46 },
  { date: '2022-01', usd: 1, eur: 0.88, gbp: 0.74, jpy: 115.08, cad: 1.27, aud: 1.40, cny: 6.36 },
  { date: '2022-06', usd: 1, eur: 0.95, gbp: 0.82, jpy: 134.94, cad: 1.29, aud: 1.45, cny: 6.69 },
  // Original monthly data for 2023
  { date: '2023-01', usd: 1, eur: 0.92, gbp: 0.81, jpy: 130.52, cad: 1.35, aud: 1.45, cny: 6.78 },
  { date: '2023-02', usd: 1, eur: 0.94, gbp: 0.83, jpy: 132.10, cad: 1.34, aud: 1.44, cny: 6.79 },
  { date: '2023-03', usd: 1, eur: 0.93, gbp: 0.82, jpy: 133.70, cad: 1.36, aud: 1.46, cny: 6.88 },
  { date: '2023-04', usd: 1, eur: 0.91, gbp: 0.80, jpy: 135.20, cad: 1.37, aud: 1.48, cny: 6.92 },
  { date: '2023-05', usd: 1, eur: 0.93, gbp: 0.81, jpy: 137.50, cad: 1.36, aud: 1.49, cny: 7.05 },
  { date: '2023-06', usd: 1, eur: 0.92, gbp: 0.78, jpy: 140.80, cad: 1.34, aud: 1.47, cny: 7.18 },
  { date: '2023-07', usd: 1, eur: 0.91, gbp: 0.77, jpy: 142.30, cad: 1.32, aud: 1.46, cny: 7.16 },
  { date: '2023-08', usd: 1, eur: 0.92, gbp: 0.78, jpy: 145.10, cad: 1.35, aud: 1.48, cny: 7.24 },
  { date: '2023-09', usd: 1, eur: 0.94, gbp: 0.81, jpy: 147.80, cad: 1.36, aud: 1.50, cny: 7.28 },
  { date: '2023-10', usd: 1, eur: 0.94, gbp: 0.82, jpy: 148.70, cad: 1.37, aud: 1.51, cny: 7.31 },
  { date: '2023-11', usd: 1, eur: 0.92, gbp: 0.79, jpy: 149.10, cad: 1.36, aud: 1.49, cny: 7.27 },
  { date: '2023-12', usd: 1, eur: 0.91, gbp: 0.79, jpy: 147.20, cad: 1.34, aud: 1.48, cny: 7.20 },
  // Added 2024 data
  { date: '2024-01', usd: 1, eur: 0.92, gbp: 0.78, jpy: 146.85, cad: 1.34, aud: 1.47, cny: 7.18 },
  { date: '2024-02', usd: 1, eur: 0.93, gbp: 0.79, jpy: 149.20, cad: 1.35, aud: 1.49, cny: 7.19 },
  { date: '2024-03', usd: 1, eur: 0.92, gbp: 0.79, jpy: 151.60, cad: 1.36, aud: 1.50, cny: 7.23 },
  { date: '2024-04', usd: 1, eur: 0.93, gbp: 0.80, jpy: 153.12, cad: 1.37, aud: 1.51, cny: 7.24 }
];

// International Trade Data (extended)
export const internationalTradeData: InternationalTradeData[] = [
  // Added historical data
  // North America
  { year: 1990, exports: 600, imports: 750, balance: -150, country: "North America" },
  { year: 1995, exports: 810, imports: 980, balance: -170, country: "North America" },
  { year: 2000, exports: 1050, imports: 1350, balance: -300, country: "North America" },
  { year: 2005, exports: 1250, imports: 1650, balance: -400, country: "North America" },
  { year: 2010, exports: 1500, imports: 1950, balance: -450, country: "North America" },
  { year: 2015, exports: 1650, imports: 2150, balance: -500, country: "North America" },
  // Original data
  { year: 2018, exports: 1750, imports: 2300, balance: -550, country: "North America" },
  { year: 2019, exports: 1700, imports: 2250, balance: -550, country: "North America" },
  { year: 2020, exports: 1500, imports: 2000, balance: -500, country: "North America" },
  { year: 2021, exports: 1800, imports: 2400, balance: -600, country: "North America" },
  { year: 2022, exports: 1950, imports: 2550, balance: -600, country: "North America" },
  // Added 2023-2024 data
  { year: 2023, exports: 2050, imports: 2650, balance: -600, country: "North America" },
  { year: 2024, exports: 2100, imports: 2700, balance: -600, country: "North America" },
  
  // Europe
  { year: 1990, exports: 750, imports: 720, balance: 30, country: "Europe" },
  { year: 1995, exports: 980, imports: 940, balance: 40, country: "Europe" },
  { year: 2000, exports: 1350, imports: 1300, balance: 50, country: "Europe" },
  { year: 2005, exports: 1650, imports: 1580, balance: 70, country: "Europe" },
  { year: 2010, exports: 1950, imports: 1850, balance: 100, country: "Europe" },
  { year: 2015, exports: 2150, imports: 2050, balance: 100, country: "Europe" },
  // Original data
  { year: 2018, exports: 2300, imports: 2200, balance: 100, country: "Europe" },
  { year: 2019, exports: 2250, imports: 2150, balance: 100, country: "Europe" },
  { year: 2020, exports: 2050, imports: 1950, balance: 100, country: "Europe" },
  { year: 2021, exports: 2400, imports: 2250, balance: 150, country: "Europe" },
  { year: 2022, exports: 2550, imports: 2400, balance: 150, country: "Europe" },
  // Added 2023-2024 data
  { year: 2023, exports: 2650, imports: 2500, balance: 150, country: "Europe" },
  { year: 2024, exports: 2700, imports: 2550, balance: 150, country: "Europe" },
  
  // Asia
  { year: 1990, exports: 650, imports: 520, balance: 130, country: "Asia" },
  { year: 1995, exports: 950, imports: 760, balance: 190, country: "Asia" },
  { year: 2000, exports: 1300, imports: 1040, balance: 260, country: "Asia" },
  { year: 2005, exports: 1680, imports: 1340, balance: 340, country: "Asia" },
  { year: 2010, exports: 2100, imports: 1680, balance: 420, country: "Asia" },
  { year: 2015, exports: 2350, imports: 1880, balance: 470, country: "Asia" },
  // Original data
  { year: 2018, exports: 2500, imports: 2000, balance: 500, country: "Asia" },
  { year: 2019, exports: 2550, imports: 2050, balance: 500, country: "Asia" },
  { year: 2020, exports: 2400, imports: 1900, balance: 500, country: "Asia" },
  { year: 2021, exports: 2750, imports: 2150, balance: 600, country: "Asia" },
  { year: 2022, exports: 2950, imports: 2300, balance: 650, country: "Asia" },
  // Added 2023-2024 data
  { year: 2023, exports: 3100, imports: 2400, balance: 700, country: "Asia" },
  { year: 2024, exports: 3250, imports: 2500, balance: 750, country: "Asia" }
];

// Economic Indicators (extended)
export const economicIndicators: EconomicIndicator[] = [
  // Added historical data
  // USA
  { year: 1990, gdp: 5.98, inflation: 5.4, unemployment: 5.6, country: "USA" },
  { year: 1995, gdp: 7.64, inflation: 2.8, unemployment: 5.6, country: "USA" },
  { year: 2000, gdp: 10.25, inflation: 3.4, unemployment: 4.0, country: "USA" },
  { year: 2005, gdp: 13.04, inflation: 3.4, unemployment: 5.1, country: "USA" },
  { year: 2010, gdp: 14.96, inflation: 1.6, unemployment: 9.6, country: "USA" },
  { year: 2015, gdp: 18.24, inflation: 0.1, unemployment: 5.3, country: "USA" },
  // Original data
  { year: 2018, gdp: 20.58, inflation: 2.4, unemployment: 3.9, country: "USA" },
  { year: 2019, gdp: 21.43, inflation: 1.8, unemployment: 3.7, country: "USA" },
  { year: 2020, gdp: 20.94, inflation: 1.2, unemployment: 8.1, country: "USA" },
  { year: 2021, gdp: 22.99, inflation: 4.7, unemployment: 5.4, country: "USA" },
  { year: 2022, gdp: 25.46, inflation: 8.0, unemployment: 3.6, country: "USA" },
  // Added 2023-2024 data
  { year: 2023, gdp: 27.36, inflation: 4.1, unemployment: 3.7, country: "USA" },
  { year: 2024, gdp: 28.85, inflation: 3.4, unemployment: 3.8, country: "USA" },
  
  // EU
  { year: 1990, gdp: 6.45, inflation: 4.8, unemployment: 8.2, country: "EU" },
  { year: 1995, gdp: 8.30, inflation: 3.1, unemployment: 10.5, country: "EU" },
  { year: 2000, gdp: 8.49, inflation: 2.2, unemployment: 9.2, country: "EU" },
  { year: 2005, gdp: 11.31, inflation: 2.2, unemployment: 9.0, country: "EU" },
  { year: 2010, gdp: 13.05, inflation: 1.6, unemployment: 9.6, country: "EU" },
  { year: 2015, gdp: 14.86, inflation: 0.0, unemployment: 9.4, country: "EU" },
  // Original data
  { year: 2018, gdp: 18.75, inflation: 1.8, unemployment: 6.8, country: "EU" },
  { year: 2019, gdp: 15.63, inflation: 1.4, unemployment: 6.3, country: "EU" },
  { year: 2020, gdp: 15.30, inflation: 0.5, unemployment: 7.1, country: "EU" },
  { year: 2021, gdp: 17.09, inflation: 2.9, unemployment: 7.0, country: "EU" },
  { year: 2022, gdp: 16.63, inflation: 8.1, unemployment: 6.1, country: "EU" },
  // Added 2023-2024 data
  { year: 2023, gdp: 17.52, inflation: 6.4, unemployment: 6.0, country: "EU" },
  { year: 2024, gdp: 18.21, inflation: 3.2, unemployment: 5.9, country: "EU" },
  
  // China
  { year: 1990, gdp: 0.36, inflation: 3.1, unemployment: 2.5, country: "China" },
  { year: 1995, gdp: 0.73, inflation: 17.1, unemployment: 2.9, country: "China" },
  { year: 2000, gdp: 1.21, inflation: 0.4, unemployment: 3.1, country: "China" },
  { year: 2005, gdp: 2.29, inflation: 1.8, unemployment: 4.2, country: "China" },
  { year: 2010, gdp: 6.09, inflation: 3.3, unemployment: 4.1, country: "China" },
  { year: 2015, gdp: 11.06, inflation: 1.4, unemployment: 4.1, country: "China" },
  // Original data
  { year: 2018, gdp: 13.89, inflation: 2.1, unemployment: 3.8, country: "China" },
  { year: 2019, gdp: 14.34, inflation: 2.9, unemployment: 3.6, country: "China" },
  { year: 2020, gdp: 14.72, inflation: 2.5, unemployment: 4.2, country: "China" },
  { year: 2021, gdp: 16.86, inflation: 0.9, unemployment: 4.0, country: "China" },
  { year: 2022, gdp: 17.96, inflation: 2.0, unemployment: 4.1, country: "China" },
  // Added 2023-2024 data
  { year: 2023, gdp: 19.37, inflation: 2.0, unemployment: 5.2, country: "China" },
  { year: 2024, gdp: 20.61, inflation: 2.1, unemployment: 5.1, country: "China" }
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
    bio: "Dr. Tomas Hult has been IBC's Director since 2001 and he founded IBEX in 2008. Hult is Byington Endowed Chair, Professor of Marketing and International Business, and one of most cited business scholars in
