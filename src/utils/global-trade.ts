
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
  const topRegions = identifyTopRegions(regionalGrowth, marketFactors);
  
  // Generate recommendations based on all factors
  const recommendations: GlobalRecommendation[] = [];
  
  // Generate market-wide recommendation
  recommendations.push(generateMarketWideRecommendation(
    marketSentiment, 
    tradeScore, 
    forecastPeriod,
    marketFactors
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

// Calculate overall market sentiment score with improved economic relationships
const calculateMarketSentiment = (factors: MarketFactors): number => {
  // Economic relationships based on established economic theory:
  // 1. High interest rates typically slow growth but control inflation
  // 2. High inflation negatively impacts economic sentiment
  // 3. Currency volatility creates uncertainty
  // 4. High energy prices typically drag on economic performance
  
  // Base components
  const monetaryComponent = 5 + ((5 - factors.interestRates) * 0.5) - ((factors.inflation - 2) * 0.7);
  
  // Stability components
  const stabilityComponent = 5 - (factors.currencyVolatility * 0.3) - (factors.geopoliticalRisk * 0.2);
  
  // Growth components
  const growthDriver = factors.consumerConfidence * 0.3 + factors.manufacturingOutput * 0.3;
  
  // Cost components
  const costDrag = (factors.energyPrices * 0.2) + (factors.commodityPrices * 0.2);
  
  // Combined sentiment following Phillips curve and IS-LM model principles
  let sentiment = monetaryComponent + stabilityComponent + growthDriver - costDrag;
  
  // Apply nonlinear effects at extremes (diminishing returns)
  if (factors.inflation > 8) {
    sentiment -= (factors.inflation - 8) * 0.5; // High inflation has increasing negative impact
  }
  
  if (factors.interestRates > 7 && factors.inflation < 4) {
    sentiment -= (factors.interestRates - 7) * 0.5; // Restrictive monetary policy without high inflation
  }
  
  // Adjust for interaction effects (e.g., high energy prices + high inflation is worse than either alone)
  if (factors.energyPrices > 7 && factors.inflation > 5) {
    sentiment -= 1; // Stagflation risk
  }
  
  // Normalize to 0-10 scale
  return Math.max(0, Math.min(10, sentiment));
};

// Calculate trade environment score with enhanced economic relationships
const calculateTradeScore = (indicators: TradeIndicator[]): number => {
  let score = 0;
  let totalWeight = 0;
  
  // Extract indicator values for interaction effects
  const tradeVolume = indicators.find(i => i.id === 'trade-volume')?.projected || 5;
  const shippingCosts = indicators.find(i => i.id === 'shipping-costs')?.projected || 5;
  const tariffs = indicators.find(i => i.id === 'tariffs')?.projected || 5;
  const supplyChain = indicators.find(i => i.id === 'supply-chain')?.projected || 5;
  const tradeAgreements = indicators.find(i => i.id === 'trade-agreements')?.projected || 5;
  
  // Base effects
  score += (tradeVolume * 0.25);
  score += ((10 - shippingCosts) * 0.2); // Lower shipping costs are better
  score += ((10 - tariffs) * 0.2); // Lower tariffs are better
  score += (supplyChain * 0.2);
  score += (tradeAgreements * 0.15);
  
  totalWeight = 0.25 + 0.2 + 0.2 + 0.2 + 0.15;
  
  // Interaction effects based on economic principles
  
  // High tariffs reduce the positive impact of trade agreements
  if (tariffs > 7 && tradeAgreements > 6) {
    score -= (tariffs - 7) * 0.1;
  }
  
  // Supply chain efficiency has more impact when trade volume is high
  if (tradeVolume > 7 && supplyChain > 7) {
    score += 0.5;
  } else if (tradeVolume > 7 && supplyChain < 4) {
    score -= 0.5; // Bottleneck effect
  }
  
  // Return normalized score
  return Math.max(0, Math.min(10, score / totalWeight));
};

// Identify top regions for investment with more realistic economic filtering
const identifyTopRegions = (regions: RegionalGrowth[], marketFactors: MarketFactors): RegionalGrowth[] => {
  // Calculate a composite score for each region that considers global market factors
  const regionScores = regions.map(region => {
    // Base regional score
    let score = region.projectedGrowth * 2 + 
               region.tradeVolume * 0.8 +
               region.marketAccessibility * 0.7 +
               region.stability * 1.5;
    
    // Apply global factor adjustments:
    
    // Regions with high stability are less affected by geopolitical risk
    if (marketFactors.geopoliticalRisk > 7 && region.stability < 6) {
      score -= 2; // High-risk regions suffer more in unstable global environment
    }
    
    // High-growth regions typically benefit more from low interest rates
    if (marketFactors.interestRates < 4 && region.projectedGrowth > 3) {
      score += 1; // Growth boost from accommodative monetary policy
    }
    
    // Commodity-intensive regions affected more by commodity prices
    const isCommodityIntensive = region.industries.some(i => 
      ["Mining", "Energy", "Agriculture"].includes(i.name) && i.strength > 7
    );
    
    if (isCommodityIntensive) {
      if (marketFactors.commodityPrices > 7) {
        score += 1.5; // Commodity exporters benefit from high prices
      } else if (marketFactors.commodityPrices < 4) {
        score -= 1; // Commodity exporters hurt by low prices
      }
    }
    
    return { region, score };
  });
  
  // Sort by score and take top 3
  return regionScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.region);
};

// Generate a market-wide recommendation with improved economic logic
const generateMarketWideRecommendation = (
  marketSentiment: number,
  tradeScore: number,
  forecastPeriod: number,
  marketFactors: MarketFactors
): GlobalRecommendation => {
  // Weight sentiment and trade based on forecast period (longer periods give more weight to fundamentals)
  const fundamentalWeight = Math.min(0.7, 0.4 + (forecastPeriod / 36));
  const tradeWeight = 1 - fundamentalWeight;
  
  const overallOutlook = (marketSentiment * fundamentalWeight + tradeScore * tradeWeight);
  
  // Economic logic for risk assessment
  let riskLevel: 'low' | 'moderate' | 'high';
  let timeframe: 'short' | 'medium' | 'long';
  let potentialReturn: number;
  
  // Risk is higher with: high volatility, high geopolitical risk, extreme inflation
  const volatilityRisk = marketFactors.currencyVolatility > 6;
  const geopoliticalRisk = marketFactors.geopoliticalRisk > 6;
  const inflationRisk = marketFactors.inflation < 1 || marketFactors.inflation > 6;
  
  const riskFactors = [volatilityRisk, geopoliticalRisk, inflationRisk].filter(Boolean).length;
  
  if (overallOutlook >= 7) {
    // Favorable conditions
    riskLevel = riskFactors >= 2 ? 'moderate' : 'low';
    timeframe = forecastPeriod <= 6 ? 'short' : 'medium';
    
    // Returns modeled with diminishing returns at higher outlook scores
    const baseReturn = 7 + (overallOutlook - 7) * 1.5;
    potentialReturn = baseReturn + (Math.random() * 2); // Add small randomization
  } else if (overallOutlook >= 5) {
    // Neutral conditions
    riskLevel = riskFactors >= 1 ? 'moderate' : 'low';
    timeframe = 'medium';
    potentialReturn = 5 + (overallOutlook - 5) * 1.2 + (Math.random() * 2);
  } else {
    // Challenging conditions
    riskLevel = 'high';
    timeframe = forecastPeriod <= 6 ? 'medium' : 'long';
    potentialReturn = 3 + overallOutlook * 0.4 + (Math.random() * 2);
  }
  
  // Stagflation scenario - high inflation with low growth prospects
  if (marketFactors.inflation > 6 && marketFactors.consumerConfidence < 4 && marketFactors.manufacturingOutput < 4) {
    riskLevel = 'high';
    timeframe = 'long';
    potentialReturn = Math.max(3, potentialReturn - 3);
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
      `${forecastPeriod}-month forecast period`,
      riskFactors > 0 ? `Risk factors: ${riskFactors}` : `Stable economic conditions`
    ]
  };
};

// Generate region-specific recommendations with improved economic relations
const generateRegionalRecommendations = (
  region: RegionalGrowth,
  marketFactors: MarketFactors,
  tradeScore: number,
  forecastPeriod: number
): GlobalRecommendation[] => {
  const recommendations: GlobalRecommendation[] = [];
  
  // Find top industries in the region based on strength and outlook
  // But also accounting for global market factors that may affect specific industries
  const adjustedIndustries = region.industries.map(industry => {
    let adjustedStrength = industry.strength;
    let adjustedOutlook = industry.outlook;
    
    // Industry-specific adjustments based on global factors
    switch(industry.name) {
      case "Technology":
        // Tech benefits from low interest rates, suffers from geopolitical risk
        if (marketFactors.interestRates < 4) adjustedStrength += 0.5;
        if (marketFactors.interestRates > 7) adjustedStrength -= 1;
        if (marketFactors.geopoliticalRisk > 7) adjustedStrength -= 0.5;
        break;
      
      case "Manufacturing":
        // Manufacturing affected by energy prices, benefits from consumer confidence
        if (marketFactors.energyPrices > 7) adjustedStrength -= 1;
        if (marketFactors.consumerConfidence > 7) adjustedStrength += 0.5;
        if (marketFactors.manufacturingOutput < 4) adjustedStrength -= 0.5;
        break;
      
      case "Energy":
        // Energy sector benefits from high energy prices
        if (marketFactors.energyPrices > 7) adjustedStrength += 1;
        if (marketFactors.energyPrices < 4) adjustedStrength -= 0.5;
        break;
        
      case "Finance":
        // Finance benefits from moderate interest rates, suffers from extreme rates
        if (marketFactors.interestRates >= 4 && marketFactors.interestRates <= 6) adjustedStrength += 0.5;
        if (marketFactors.interestRates > 8 || marketFactors.interestRates < 2) adjustedStrength -= 0.5;
        if (marketFactors.currencyVolatility > 7) adjustedStrength -= 1;
        break;
        
      case "Agriculture":
        // Agriculture affected by commodity prices
        if (marketFactors.commodityPrices > 7) adjustedStrength += 0.5;
        break;
    }
    
    // Update outlook based on adjusted strength
    if (adjustedStrength >= 8) adjustedOutlook = 'positive';
    else if (adjustedStrength >= 5) adjustedOutlook = 'neutral';
    else adjustedOutlook = 'negative';
    
    return {...industry, adjustedStrength, adjustedOutlook};
  });
  
  // Get top industries after adjustments
  const topIndustries = adjustedIndustries
    .filter(industry => industry.adjustedStrength >= 7 && industry.adjustedOutlook !== 'negative')
    .sort((a, b) => b.adjustedStrength - a.adjustedStrength)
    .slice(0, 2);
  
  // Generate a recommendation for each top industry
  topIndustries.forEach(industry => {
    const industryScore = industry.adjustedStrength + (industry.adjustedOutlook === 'positive' ? 2 : 0);
    const regionScore = region.projectedGrowth + region.stability / 5;
    
    // Weight more on industry for short-term forecasts, more on region for long-term
    const industryWeight = 0.6 - (forecastPeriod / 36 * 0.2);
    const regionWeight = 0.3 + (forecastPeriod / 36 * 0.2);
    const globalWeight = 0.1;
    
    const overallScore = (industryScore * industryWeight + regionScore * regionWeight + tradeScore * globalWeight);
    
    let riskLevel: 'low' | 'moderate' | 'high';
    let timeframe: 'short' | 'medium' | 'long';
    let potentialReturn: number;
    
    // Determine recommendation parameters based on scores
    if (overallScore >= 9) {
      riskLevel = 'moderate';
      timeframe = forecastPeriod <= 9 ? 'short' : 'medium';
      potentialReturn = 8 + Math.random() * 4; // 8-12%
    } else if (overallScore >= 7) {
      riskLevel = 'moderate';
      timeframe = 'medium';
      potentialReturn = 6 + Math.random() * 3; // 6-9%
    } else {
      riskLevel = 'high';
      timeframe = 'long';
      potentialReturn = 4 + Math.random() * 3; // 4-7%
    }
    
    // Adjust for region stability
    if (region.stability < 5) {
      riskLevel = 'high';
      potentialReturn += 2; // Higher risk premium
    }
    
    recommendations.push({
      id: `${region.region.toLowerCase()}-${industry.name.toLowerCase()}`,
      title: `${industry.name} in ${region.region}`,
      description: `${industry.adjustedOutlook === 'positive' ? 'Strong' : 'Stable'} outlook for ${industry.name} in ${region.region} with projected regional growth of ${region.projectedGrowth.toFixed(1)}% and favorable industry conditions.`,
      regions: [region.region],
      sectors: [industry.name],
      riskLevel,
      timeframe,
      potentialReturn,
      confidenceScore: Math.round(overallScore * 10),
      factors: [
        `Industry strength: ${industry.strength}/10 (Adjusted: ${industry.adjustedStrength.toFixed(1)})`,
        `Industry outlook: ${industry.adjustedOutlook}`,
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
  
  // Technology sector recommendation - following innovation sector behavior during different economic cycles
  if (marketFactors.consumerConfidence > 5 && marketFactors.interestRates < 7) {
    const techScore = 6 + (marketFactors.consumerConfidence - 5) / 2 - (marketFactors.interestRates - 3) / 3;
    
    if (techScore > 5) {
      recommendations.push({
        id: "sector-technology",
        title: "Global Technology Sector",
        description: `Technology shows ${techScore > 7 ? 'strong' : 'moderate'} potential with ${marketFactors.consumerConfidence > 7 ? 'high' : 'decent'} consumer confidence and ${marketFactors.interestRates < 4 ? 'accommodative' : 'manageable'} interest rates.`,
        regions: ["North America", "Asia Pacific"],
        sectors: ["Technology", "Semiconductors", "Software"],
        riskLevel: techScore > 7 ? 'moderate' : 'high',
        timeframe: forecastPeriod <= 9 ? 'short' : 'medium',
        potentialReturn: 7 + Math.random() * 5,
        confidenceScore: Math.round(techScore * 8),
        factors: [
          `Consumer confidence: ${marketFactors.consumerConfidence}/10`,
          `Interest rates: ${marketFactors.interestRates}/10`,
          `Technology sector score: ${techScore.toFixed(1)}/10`
        ]
      });
    }
  }
  
  // Manufacturing sector recommendation - classic industrial sensitivity to multiple factors
  const manufacturingImpact = marketFactors.manufacturingOutput * 0.4 + 
                             (10 - marketFactors.energyPrices) * 0.3 +
                             tradeIndicators.find(i => i.id === 'tariffs')?.projected * -0.2 +
                             marketFactors.consumerConfidence * 0.1;
  
  if (manufacturingImpact > 4.5) {
    recommendations.push({
      id: "sector-manufacturing",
      title: "Global Manufacturing",
      description: `Manufacturing shows ${manufacturingImpact > 6 ? 'strong' : 'moderate'} potential with ${marketFactors.manufacturingOutput > 6 ? 'robust' : 'stable'} output levels, despite ${marketFactors.energyPrices > 7 ? 'high' : 'moderate'} energy prices.`,
      regions: ["Asia Pacific", "Europe", "North America"],
      sectors: ["Manufacturing", "Industrial Equipment", "Automation"],
      riskLevel: manufacturingImpact > 6 ? 'low' : 'moderate',
      timeframe: 'medium',
      potentialReturn: 5 + manufacturingImpact * 0.5,
      confidenceScore: Math.round(manufacturingImpact * 9),
      factors: [
        `Manufacturing output: ${marketFactors.manufacturingOutput}/10`,
        `Energy prices: ${marketFactors.energyPrices}/10`,
        `Tariff impact: ${tradeIndicators.find(i => i.id === 'tariffs')?.projected || 5}/10`,
        `Manufacturing score: ${manufacturingImpact.toFixed(1)}/10`
      ]
    });
  }
  
  // Energy sector recommendation - following energy sector behavior during different economic cycles
  // Energy sector is complex - different impacts for traditional vs renewable
  const traditionalEnergyScore = marketFactors.energyPrices * 0.6 + 
                               marketFactors.geopoliticalRisk * 0.2 +
                               (10 - marketFactors.interestRates) * 0.2;
                               
  const renewableEnergyScore = marketFactors.consumerConfidence * 0.4 +
                              marketFactors.manufacturingOutput * 0.3 +
                              (10 - marketFactors.energyPrices) * 0.3;
  
  // Traditional energy
  if (traditionalEnergyScore > 5.5) {
    recommendations.push({
      id: "sector-energy-traditional",
      title: "Traditional Energy Sector",
      description: `Traditional energy presents ${traditionalEnergyScore > 7 ? 'strong' : 'moderate'} opportunities with ${marketFactors.energyPrices > 7 ? 'high' : 'stable'} energy prices and growing demand.`,
      regions: ["Middle East & Africa", "North America"],
      sectors: ["Energy", "Oil & Gas", "Utilities"],
      riskLevel: 'moderate',
      timeframe: 'medium',
      potentialReturn: 5 + traditionalEnergyScore * 0.4,
      confidenceScore: Math.round(traditionalEnergyScore * 10),
      factors: [
        `Energy prices: ${marketFactors.energyPrices}/10`,
        `Geopolitical risk factor: ${marketFactors.geopoliticalRisk}/10`
      ]
    });
  }
  
  // Renewable energy
  if (renewableEnergyScore > 5.5) {
    recommendations.push({
      id: "sector-energy-renewable",
      title: "Renewable Energy Sector",
      description: `Renewable energy shows ${renewableEnergyScore > 7 ? 'strong' : 'promising'} growth potential with ${marketFactors.consumerConfidence > 6 ? 'strong' : 'moderate'} consumer sentiment supporting green energy transition.`,
      regions: ["Europe", "North America", "Asia Pacific"],
      sectors: ["Renewables", "Clean Energy", "Green Technology"],
      riskLevel: 'moderate',
      timeframe: 'long',
      potentialReturn: 6 + renewableEnergyScore * 0.5,
      confidenceScore: Math.round(renewableEnergyScore * 9),
      factors: [
        `Consumer confidence: ${marketFactors.consumerConfidence}/10`,
        `Manufacturing output: ${marketFactors.manufacturingOutput}/10`,
        `Conventional energy prices: ${marketFactors.energyPrices}/10`,
        `Score: ${renewableEnergyScore.toFixed(1)}/10`
      ]
    });
  }
  
  // Financial sector recommendation - following banking sector behavior during different interest rate environments
  const financialScore = 4 + 
                      Math.abs(5 - marketFactors.interestRates) * (marketFactors.interestRates >= 3 ? 0.6 : -0.3) + 
                      (marketFactors.consumerConfidence - 5) * 0.4 +
                      (marketFactors.currencyVolatility > 7 ? -1 : 0);
  
  if (financialScore > 5) {
    const interestRateEnvironment = 
      marketFactors.interestRates <= 3 ? "low interest rate" :
      marketFactors.interestRates >= 7 ? "high interest rate" : "moderate interest rate";
      
    const sentiment = 
      marketFactors.consumerConfidence >= 7 ? "strong economic sentiment" :
      marketFactors.consumerConfidence <= 4 ? "cautious consumer outlook" : "stable consumer sentiment";
    
    recommendations.push({
      id: "sector-financial",
      title: "Financial Services",
      description: `Financial sector shows ${financialScore > 6 ? 'strong' : 'moderate'} potential in ${interestRateEnvironment} environment with ${sentiment}.`,
      regions: ["North America", "Europe", "Asia Pacific"],
      sectors: ["Finance", "Banking", "Insurance"],
      riskLevel: financialScore > 6 ? 'moderate' : 'high',
      timeframe: forecastPeriod <= 6 ? 'short' : 'medium',
      potentialReturn: 5 + financialScore * 0.8,
      confidenceScore: Math.round(financialScore * 10),
      factors: [
        `Interest rates: ${marketFactors.interestRates}/10`,
        `Consumer confidence: ${marketFactors.consumerConfidence}/10`,
        `Currency stability: ${10 - marketFactors.currencyVolatility}/10`,
        `Financial sector score: ${financialScore.toFixed(1)}/10`
      ]
    });
  }
  
  return recommendations;
};
