
/**
 * Forecasting utilities for the MSU Broad College IBC Dashboard
 * These functions implement different forecasting methods for time series data
 */

/**
 * Generates a linear regression forecast based on historical data
 * @param data Array of historical data points
 * @param lookback Number of data points to use for trend calculation
 * @param horizon Number of periods to forecast
 * @returns Array of forecasted values
 */
export const linearRegressionForecast = (
  data: number[], 
  lookback: number = 5, 
  horizon: number = 2
): number[] => {
  // Use the last 'lookback' data points
  const points = data.slice(-lookback);
  
  // Calculate the simple linear trend (average change)
  let totalChange = 0;
  for (let i = 1; i < points.length; i++) {
    totalChange += points[i] - points[i-1];
  }
  
  const avgChange = totalChange / (points.length - 1);
  const lastValue = points[points.length - 1];
  
  // Generate forecast
  const forecast: number[] = [];
  for (let i = 1; i <= horizon; i++) {
    forecast.push(lastValue + (avgChange * i));
  }
  
  return forecast;
};

/**
 * Exponential smoothing forecast
 * @param data Array of historical data points
 * @param alpha Smoothing factor (0 < alpha < 1)
 * @param horizon Number of periods to forecast
 * @returns Array of forecasted values
 */
export const exponentialSmoothingForecast = (
  data: number[], 
  alpha: number = 0.3, 
  horizon: number = 2
): number[] => {
  if (data.length < 2) {
    return Array(horizon).fill(data[0] || 0);
  }
  
  // Initialize with the last value
  let forecast = data[data.length - 1];
  const results: number[] = [];
  
  for (let i = 0; i < horizon; i++) {
    // Apply exponential smoothing formula
    // The last two actual values are used for the first forecast
    const change = i === 0
      ? data[data.length - 1] - data[data.length - 2]
      : results[i - 1] - (i === 1 ? data[data.length - 1] : results[i - 2]);
    
    forecast = forecast + alpha * change;
    results.push(forecast);
  }
  
  return results;
};

/**
 * ARIMA-like forecast (simplified)
 * This is a simplified version that adds some autoregression
 * @param data Array of historical data points
 * @param lookback Number of data points to use
 * @param horizon Number of periods to forecast
 * @returns Array of forecasted values
 */
export const arimaForecast = (
  data: number[], 
  lookback: number = 5, 
  horizon: number = 2
): number[] => {
  // This is a simplified ARIMA-like approach
  // For a real ARIMA model, one would need proper AR, I, and MA components
  
  const points = data.slice(-lookback);
  
  // Calculate trend (simple AR(1) model)
  let totalChange = 0;
  for (let i = 1; i < points.length; i++) {
    totalChange += points[i] - points[i-1];
  }
  
  const avgChange = totalChange / (points.length - 1);
  let lastValue = points[points.length - 1];
  
  const forecast: number[] = [];
  for (let i = 0; i < horizon; i++) {
    // Add a small random component to simulate ARIMA behavior
    const randomFactor = Math.random() * 0.1 - 0.05; // ±5% random variation
    const nextValue = lastValue + avgChange * (1 + randomFactor);
    forecast.push(nextValue);
    lastValue = nextValue;
  }
  
  return forecast;
};

/**
 * Monte Carlo simulation forecast
 * @param data Array of historical data points
 * @param lookback Number of data points to use
 * @param horizon Number of periods to forecast
 * @param simulations Number of Monte Carlo paths to simulate
 * @returns Array of forecasted values (averages from simulations)
 */
export const monteCarloForecast = (
  data: number[], 
  lookback: number = 5, 
  horizon: number = 2,
  simulations: number = 1000
): number[] => {
  const points = data.slice(-lookback);
  
  // Calculate historical volatility
  const returns: number[] = [];
  for (let i = 1; i < points.length; i++) {
    returns.push((points[i] / points[i-1]) - 1);
  }
  
  const meanReturn = returns.reduce((sum, val) => sum + val, 0) / returns.length;
  const variance = returns.reduce((sum, val) => sum + Math.pow(val - meanReturn, 2), 0) / returns.length;
  const volatility = Math.sqrt(variance);
  
  // Run Monte Carlo simulations
  const simulationResults: number[][] = [];
  
  for (let sim = 0; sim < simulations; sim++) {
    const path: number[] = [];
    let lastValue = points[points.length - 1];
    
    for (let i = 0; i < horizon; i++) {
      // Generate a random return based on historical distribution
      const randomReturn = generateRandomNormal(meanReturn, volatility);
      const nextValue = lastValue * (1 + randomReturn);
      path.push(nextValue);
      lastValue = nextValue;
    }
    
    simulationResults.push(path);
  }
  
  // Calculate the average across all simulations for each forecasted period
  const forecast: number[] = [];
  for (let i = 0; i < horizon; i++) {
    let sum = 0;
    for (let sim = 0; sim < simulations; sim++) {
      sum += simulationResults[sim][i];
    }
    forecast.push(sum / simulations);
  }
  
  return forecast;
};

/**
 * Generate a random number from a normal distribution
 * @param mean Mean of the normal distribution
 * @param stdDev Standard deviation of the normal distribution
 * @returns Random number from normal distribution
 */
function generateRandomNormal(mean: number, stdDev: number): number {
  // Box-Muller transform to generate a normal distribution
  const u1 = Math.random();
  const u2 = Math.random();
  
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  
  return z0 * stdDev + mean;
}

/**
 * Creates a comprehensive forecast using multiple methods
 * @param data Historical data
 * @param horizonYears Number of years to forecast
 * @returns Object containing multiple forecast methods
 */
export const createMultiMethodForecast = (
  data: number[],
  horizonYears: number = 2
): { 
  linear: number[], 
  exponential: number[], 
  arima: number[], 
  monteCarlo: number[]
} => {
  const periods = horizonYears * 12; // Assuming monthly data
  
  return {
    linear: linearRegressionForecast(data, 12, periods),
    exponential: exponentialSmoothingForecast(data, 0.3, periods),
    arima: arimaForecast(data, 24, periods),
    monteCarlo: monteCarloForecast(data, 24, periods, 500)
  };
};
