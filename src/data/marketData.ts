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
