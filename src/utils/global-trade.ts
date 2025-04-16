
import { MarketFactors, TradeIndicator, RegionalGrowth, GlobalRecommendation } from "@/types/market";

// Default values for market factors
export const defaultMarketFactors: MarketFactors = {
  interestRates: 5,
  inflation: 3.5,
  currencyVolatility: 4,
  commodityPrices: 6,
  geopoliticalRisk: 5,
  consumerConfidence: 6,
  manufacturingOutput: 5,
  energyPrices: 7
};

// Default global trade indicators
export const defaultTradeIndicators: TradeIndicator[] = [
  {
    id: "trade-volume",
    name: "Global Trade Volume",
    currentValue: 5,
    projected: 5.5,
    impact: "positive",
    description: "Total volume of international trade in goods and services"
  },
  {
    id: "shipping-costs",
    name: "Shipping Costs",
    currentValue: 6.5,
    projected: 5.8,
    impact: "positive",
    description: "Average cost of shipping containers globally"
  },
  {
    id: "tariffs",
    name: "Average Tariff Rates",
    currentValue: 4,
    projected: 4.2,
    impact: "negative",
    description: "Average tariff rates across major trading partners"
  },
  {
    id: "supply-chain",
    name: "Supply Chain Efficiency",
    currentValue: 5,
    projected: 5.5,
    impact: "positive",
    description: "Efficiency of global supply chain operations"
  },
  {
    id: "trade-agreements",
    name: "Trade Agreements",
    currentValue: 6,
    projected: 6.5,
    impact: "positive",
    description: "Impact of active and pending trade agreements"
  }
];

// Default regional growth factors
export const defaultRegionalGrowth: RegionalGrowth[] = [
  {
    region: "North America",
    currentGrowth: 2.1,
    projectedGrowth: 2.3,
    tradeVolume: 8,
    marketAccessibility: 9,
    stability: 8,
    industries: [
      { name: "Technology", strength: 9, outlook: "positive" },
      { name: "Manufacturing", strength: 7, outlook: "neutral" },
      { name: "Services", strength: 8, outlook: "positive" },
      { name: "Energy", strength: 7, outlook: "neutral" }
    ]
  },
  {
    region: "Europe",
    currentGrowth: 1.5,
    projectedGrowth: 1.7,
    tradeVolume: 7,
    marketAccessibility: 8,
    stability: 7,
    industries: [
      { name: "Manufacturing", strength: 8, outlook: "neutral" },
      { name: "Finance", strength: 7, outlook: "positive" },
      { name: "Renewable Energy", strength: 8, outlook: "positive" },
      { name: "Agriculture", strength: 6, outlook: "neutral" }
    ]
  },
  {
    region: "Asia Pacific",
    currentGrowth: 4.2,
    projectedGrowth: 4.5,
    tradeVolume: 9,
    marketAccessibility: 7,
    stability: 6,
    industries: [
      { name: "Manufacturing", strength: 9, outlook: "positive" },
      { name: "Technology", strength: 8, outlook: "positive" },
      { name: "Consumer Goods", strength: 8, outlook: "positive" },
      { name: "Services", strength: 7, outlook: "positive" }
    ]
  },
  {
    region: "Latin America",
    currentGrowth: 2.0,
    projectedGrowth: 2.4,
    tradeVolume: 5,
    marketAccessibility: 6,
    stability: 5,
    industries: [
      { name: "Agriculture", strength: 8, outlook: "positive" },
      { name: "Mining", strength: 7, outlook: "positive" },
      { name: "Manufacturing", strength: 6, outlook: "neutral" },
      { name: "Tourism", strength: 7, outlook: "positive" }
    ]
  },
  {
    region: "Middle East & Africa",
    currentGrowth: 3.2,
    projectedGrowth: 3.5,
    tradeVolume: 5,
    marketAccessibility: 5,
    stability: 4,
    industries: [
      { name: "Energy", strength: 9, outlook: "neutral" },
      { name: "Mining", strength: 8, outlook: "positive" },
      { name: "Agriculture", strength: 6, outlook: "neutral" },
      { name: "Manufacturing", strength: 5, outlook: "positive" }
    ]
  }
];

// Algorithm to determine investment recommendations based on all factors
export const generateRecommendations = (
  marketFactors: MarketFactors,
  tradeIndicators: TradeIndicator[],
  regionalGrowth: RegionalGrowth[],
  forecastPeriod: number
): GlobalRecommendation[] => {
  
  // Calculate overall market sentiment (0-10)
  const marketSentiment = calculateMarketSentiment(marketFactors);
  
  // Calculate trade environment score (0-10)
  const tradeScore = calculateTradeScore(tradeIndicators);
  
  // Identify top regions based on growth and stability
  const topRegions = identifyTopRegions(regionalGrowth);
  
  // Generate recommendations based on all factors
  const recommendations: GlobalRecommendation[] = [];
  
  // Generate market-wide recommendation
  recommendations.push(generateMarketWideRecommendation(
    marketSentiment, 
    tradeScore, 
    forecastPeriod
  ));
  
  // Generate region-specific recommendations
  topRegions.forEach(region => {
    const regionRecs = generateRegionalRecommendations(
      region,
      marketFactors,
      tradeScore,
      forecastPeriod
    );
    recommendations.push(...regionRecs);
  });
  
  // Generate sector-specific recommendations
  recommendations.push(...generateSectorRecommendations(
    marketFactors,
    tradeIndicators,
    regionalGrowth,
    forecastPeriod
  ));
  
  // Sort by confidence score
  return recommendations.sort((a, b) => b.confidenceScore - a.confidenceScore);
};

// Calculate overall market sentiment score
const calculateMarketSentiment = (factors: MarketFactors): number => {
  // Higher scores are better for consumer confidence and manufacturing output
  // Lower scores are better for interest rates, inflation, etc.
  return (
    (10 - factors.interestRates) * 0.15 +
    (10 - factors.inflation) * 0.15 +
    (10 - factors.currencyVolatility) * 0.1 +
    (10 - factors.commodityPrices) * 0.1 +
    (10 - factors.geopoliticalRisk) * 0.15 +
    factors.consumerConfidence * 0.15 +
    factors.manufacturingOutput * 0.1 +
    (10 - factors.energyPrices) * 0.1
  );
};

// Calculate trade environment score
const calculateTradeScore = (indicators: TradeIndicator[]): number => {
  let score = 0;
  let totalWeight = 0;
  
  indicators.forEach(indicator => {
    let weight = 0;
    let value = 0;
    
    switch(indicator.id) {
      case 'trade-volume':
        weight = 0.25;
        value = indicator.projected;
        break;
      case 'shipping-costs':
        weight = 0.2;
        value = 10 - indicator.projected; // Lower shipping costs are better
        break;
      case 'tariffs':
        weight = 0.2;
        value = 10 - indicator.projected; // Lower tariffs are better
        break;
      case 'supply-chain':
        weight = 0.2;
        value = indicator.projected;
        break;
      case 'trade-agreements':
        weight = 0.15;
        value = indicator.projected;
        break;
      default:
        weight = 0.1;
        value = indicator.projected;
    }
    
    score += value * weight;
    totalWeight += weight;
  });
  
  return totalWeight > 0 ? score / totalWeight : 5;
};

// Identify top regions for investment
const identifyTopRegions = (regions: RegionalGrowth[]): RegionalGrowth[] => {
  // Calculate a composite score for each region
  const regionScores = regions.map(region => {
    const score = 
      region.projectedGrowth * 2 + 
      region.tradeVolume * 0.8 +
      region.marketAccessibility * 0.7 +
      region.stability * 1.5;
    
    return { region, score };
  });
  
  // Sort by score and take top 3
  return regionScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.region);
};

// Generate a market-wide recommendation
const generateMarketWideRecommendation = (
  marketSentiment: number,
  tradeScore: number,
  forecastPeriod: number
): GlobalRecommendation => {
  const overallOutlook = (marketSentiment * 0.6 + tradeScore * 0.4);
  
  // Determine risk level and timeframe based on outlook
  let riskLevel: 'low' | 'moderate' | 'high';
  let timeframe: 'short' | 'medium' | 'long';
  let potentialReturn: number;
  
  if (overallOutlook >= 7) {
    // Favorable conditions
    riskLevel = forecastPeriod <= 6 ? 'moderate' : 'low';
    timeframe = forecastPeriod <= 6 ? 'short' : 'medium';
    potentialReturn = 8 + Math.random() * 4; // 8-12%
  } else if (overallOutlook >= 5) {
    // Neutral conditions
    riskLevel = 'moderate';
    timeframe = 'medium';
    potentialReturn = 6 + Math.random() * 3; // 6-9%
  } else {
    // Challenging conditions
    riskLevel = 'high';
    timeframe = forecastPeriod <= 6 ? 'medium' : 'long';
    potentialReturn = 4 + Math.random() * 3; // 4-7%
  }
  
  return {
    id: "overall",
    title: overallOutlook >= 7 
      ? "Favorable Global Trade Environment"
      : overallOutlook >= 5
      ? "Cautiously Optimistic Trade Outlook"
      : "Defensive Positioning in Challenging Trade Environment",
    description: overallOutlook >= 7
      ? `Strong economic indicators and favorable trade conditions support portfolio expansion with ${forecastPeriod <= 6 ? 'short' : 'medium'}-term investment horizons.`
      : overallOutlook >= 5
      ? `Mixed signals in global markets suggest a balanced approach with diversification across sectors and regions over a ${forecastPeriod <= 9 ? 'medium' : 'longer'}-term investment horizon.`
      : `Challenging economic and trade conditions require defensive positioning, focusing on stable sectors and regions with stronger fundamentals over a ${forecastPeriod <= 6 ? 'medium' : 'longer'}-term view.`,
    regions: ["Global"],
    sectors: overallOutlook >= 7
      ? ["Diversified", "Growth-Oriented"]
      : overallOutlook >= 5
      ? ["Balanced", "Mixed Exposure"]
      : ["Defensive", "Value-Oriented"],
    riskLevel,
    timeframe,
    potentialReturn,
    confidenceScore: Math.round(overallOutlook * 10),
    factors: [
      `Market sentiment score: ${marketSentiment.toFixed(1)}/10`,
      `Trade environment score: ${tradeScore.toFixed(1)}/10`,
      `${forecastPeriod}-month forecast period`
    ]
  };
};

// Generate region-specific recommendations
const generateRegionalRecommendations = (
  region: RegionalGrowth,
  marketFactors: MarketFactors,
  tradeScore: number,
  forecastPeriod: number
): GlobalRecommendation[] => {
  const recommendations: GlobalRecommendation[] = [];
  
  // Find top industries in the region
  const topIndustries = region.industries
    .filter(industry => industry.strength >= 7 && industry.outlook !== 'negative')
    .sort((a, b) => b.strength - a.strength)
    .slice(0, 2);
  
  // Generate a recommendation for each top industry
  topIndustries.forEach(industry => {
    const industryScore = industry.strength + (industry.outlook === 'positive' ? 2 : 0);
    const regionScore = region.projectedGrowth + region.stability / 5;
    const overallScore = (industryScore * 0.6 + regionScore * 0.3 + tradeScore * 0.1);
    
    let riskLevel: 'low' | 'moderate' | 'high';
    let timeframe: 'short' | 'medium' | 'long';
    let potentialReturn: number;
    
    // Determine recommendation parameters based on scores
    if (overallScore >= 9) {
      riskLevel = 'moderate';
      timeframe = forecastPeriod <= 9 ? 'short' : 'medium';
      potentialReturn = 10 + Math.random() * 5; // 10-15%
    } else if (overallScore >= 7) {
      riskLevel = 'moderate';
      timeframe = 'medium';
      potentialReturn = 7 + Math.random() * 4; // 7-11%
    } else {
      riskLevel = 'high';
      timeframe = 'long';
      potentialReturn = 5 + Math.random() * 3; // 5-8%
    }
    
    recommendations.push({
      id: `${region.region.toLowerCase()}-${industry.name.toLowerCase()}`,
      title: `${industry.name} in ${region.region}`,
      description: `${industry.outlook === 'positive' ? 'Strong' : 'Stable'} outlook for ${industry.name} in ${region.region} with projected regional growth of ${region.projectedGrowth.toFixed(1)}% and favorable industry conditions.`,
      regions: [region.region],
      sectors: [industry.name],
      riskLevel,
      timeframe,
      potentialReturn,
      confidenceScore: Math.round(overallScore * 10),
      factors: [
        `Industry strength: ${industry.strength}/10`,
        `Industry outlook: ${industry.outlook}`,
        `Regional growth: ${region.projectedGrowth.toFixed(1)}%`,
        `Regional stability: ${region.stability}/10`
      ]
    });
  });
  
  return recommendations;
};

// Generate sector-specific recommendations
const generateSectorRecommendations = (
  marketFactors: MarketFactors,
  tradeIndicators: TradeIndicator[],
  regions: RegionalGrowth[],
  forecastPeriod: number
): GlobalRecommendation[] => {
  const recommendations: GlobalRecommendation[] = [];
  
  // Technology sector recommendation
  if (marketFactors.consumerConfidence > 5 && marketFactors.geopoliticalRisk < 6) {
    const techScore = 6 + (marketFactors.consumerConfidence - 5) / 2;
    recommendations.push({
      id: "sector-technology",
      title: "Global Technology Sector",
      description: "Technology remains resilient with strong consumer confidence and moderate geopolitical risks, especially in cloud computing, AI, and semiconductor sub-sectors.",
      regions: ["North America", "Asia Pacific"],
      sectors: ["Technology", "Semiconductors", "Software"],
      riskLevel: 'moderate',
      timeframe: forecastPeriod <= 9 ? 'short' : 'medium',
      potentialReturn: 9 + Math.random() * 6,
      confidenceScore: Math.round(techScore * 8),
      factors: [
        `Consumer confidence: ${marketFactors.consumerConfidence}/10`,
        `Geopolitical risk: ${marketFactors.geopoliticalRisk}/10`
      ]
    });
  }
  
  // Manufacturing sector recommendation
  const manufacturingImpact = marketFactors.manufacturingOutput * 0.6 + 
                             (10 - marketFactors.energyPrices) * 0.4;
  
  if (manufacturingImpact > 4.5) {
    recommendations.push({
      id: "sector-manufacturing",
      title: "Global Manufacturing",
      description: `Manufacturing shows ${manufacturingImpact > 6 ? 'strong' : 'moderate'} potential with ${marketFactors.manufacturingOutput > 6 ? 'robust' : 'stable'} output levels, despite ${marketFactors.energyPrices > 7 ? 'high' : 'moderate'} energy prices.`,
      regions: ["Asia Pacific", "Europe", "North America"],
      sectors: ["Manufacturing", "Industrial Equipment", "Automation"],
      riskLevel: manufacturingImpact > 6 ? 'low' : 'moderate',
      timeframe: 'medium',
      potentialReturn: 6 + manufacturingImpact * 0.5,
      confidenceScore: Math.round(manufacturingImpact * 9),
      factors: [
        `Manufacturing output: ${marketFactors.manufacturingOutput}/10`,
        `Energy prices: ${marketFactors.energyPrices}/10`
      ]
    });
  }
  
  // Energy sector recommendation
  if (marketFactors.energyPrices > 6) {
    recommendations.push({
      id: "sector-energy",
      title: "Energy Sector",
      description: `High energy prices create opportunities in traditional energy, while ${marketFactors.consumerConfidence > 5 ? 'strong' : 'moderate'} consumer sentiment supports renewable energy transition investments.`,
      regions: ["Middle East & Africa", "North America", "Europe"],
      sectors: ["Energy", "Renewables", "Utilities"],
      riskLevel: 'moderate',
      timeframe: 'long',
      potentialReturn: 7 + Math.random() * 4,
      confidenceScore: Math.round(6.5 * 10),
      factors: [
        `Energy prices: ${marketFactors.energyPrices}/10`,
        `Consumer confidence: ${marketFactors.consumerConfidence}/10`
      ]
    });
  }
  
  // Financial sector recommendation
  const financialScore = 5 + (marketFactors.interestRates - 5) * 0.3 + 
                        (marketFactors.consumerConfidence - 5) * 0.3;
  
  if (financialScore > 5) {
    recommendations.push({
      id: "sector-financial",
      title: "Financial Services",
      description: `Financial sector shows ${financialScore > 6 ? 'strong' : 'moderate'} potential with ${marketFactors.interestRates > 5 ? 'higher' : 'stable'} interest rates and ${marketFactors.consumerConfidence > 5 ? 'positive' : 'neutral'} consumer sentiment.`,
      regions: ["North America", "Europe", "Asia Pacific"],
      sectors: ["Finance", "Banking", "Insurance"],
      riskLevel: financialScore > 6 ? 'moderate' : 'high',
      timeframe: forecastPeriod <= 6 ? 'short' : 'medium',
      potentialReturn: 5 + financialScore * 0.8,
      confidenceScore: Math.round(financialScore * 10),
      factors: [
        `Interest rates: ${marketFactors.interestRates}/10`,
        `Consumer confidence: ${marketFactors.consumerConfidence}/10`
      ]
    });
  }
  
  return recommendations;
};
