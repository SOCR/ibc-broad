
import React, { useState, useMemo } from "react";
import { exchangeRateData, forecastMethods } from "@/data/marketData";
import { dateRanges } from "@/data/constants";
import { 
  DollarSign, 
  Euro, 
  PoundSterling, 
  JapaneseYen, 
  CandlestickChart
} from "lucide-react";
import { createMultiMethodForecast } from "@/utils/forecasting";
import { CurrencyCard } from "@/components/exchange/CurrencyCard";
import { ExchangeRateChart } from "@/components/exchange/ExchangeRateChart";
import { ForecastInfo } from "@/components/exchange/ForecastInfo";

// Define currencies data
const currencies = [
  { code: "eur", name: "Euro (EUR)", icon: Euro, color: "#1E88E5" },
  { code: "gbp", name: "British Pound (GBP)", icon: PoundSterling, color: "#D81B60" },
  { code: "jpy", name: "Japanese Yen (JPY)", icon: JapaneseYen, color: "#8E24AA" },
  { code: "cad", name: "Canadian Dollar (CAD)", icon: DollarSign, color: "#43A047" },
  { code: "aud", name: "Australian Dollar (AUD)", icon: DollarSign, color: "#F4511E" },
  { code: "cny", name: "Chinese Yuan (CNY)", icon: DollarSign, color: "#FFB300" },
];

const ExchangeRates: React.FC = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<string>("1y");
  const [enableForecast, setEnableForecast] = useState<boolean>(false);
  const [forecastMethod, setForecastMethod] = useState<string>("linear");
  const [forecastYears, setForecastYears] = useState<number>(2);
  
  // Filter data based on selected date range
  const filterDataByDateRange = (data: typeof exchangeRateData) => {
    const range = dateRanges.find(r => r.id === selectedDateRange)?.value || 12;
    
    if (range >= 1000) {
      return data;
    }
    
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - range);
    
    return data.filter(item => {
      if (!item.date) return false;
      const itemDate = new Date(item.date + "-01");
      return itemDate >= cutoffDate;
    });
  };
  
  // Apply forecast if enabled - with improved error handling
  const getChartData = useMemo(() => {
    try {
      const filteredData = filterDataByDateRange(exchangeRateData);
      
      if (!enableForecast || filteredData.length === 0) {
        return filteredData;
      }
      
      // Create a deep copy to avoid mutating original data
      const forecastedData = JSON.parse(JSON.stringify(filteredData));
      const lastActualDate = forecastedData[forecastedData.length - 1]?.date;
      
      if (!lastActualDate) return forecastedData;
      
      // Safely generate forecast for each currency
      currencies.forEach(currency => {
        try {
          // Extract valid data points only
          const dataPoints = filteredData
            .map(item => item[currency.code as keyof typeof item])
            .filter((value): value is number => typeof value === 'number' && !isNaN(value));
          
          if (dataPoints.length < 2) return; // Need at least 2 points for forecasting
          
          const currencyForecast = createMultiMethodForecast(dataPoints, forecastYears * 12)[forecastMethod];
          
          if (!currencyForecast || !Array.isArray(currencyForecast)) return;
          
          // Add forecast data points
          currencyForecast.forEach((value, index) => {
            if (typeof value !== 'number' || isNaN(value)) return; // Skip invalid forecasts
            
            const lastDate = new Date(lastActualDate + "-01");
            const forecastDate = new Date(lastDate);
            forecastDate.setMonth(lastDate.getMonth() + index + 1);
            const forecastDateString = `${forecastDate.getFullYear()}-${String(forecastDate.getMonth() + 1).padStart(2, '0')}`;
            
            const existingItemIndex = forecastedData.findIndex(d => d.date === forecastDateString);
            if (existingItemIndex >= 0) {
              forecastedData[existingItemIndex] = {
                ...forecastedData[existingItemIndex],
                [currency.code]: value,
                isForecasted: true
              };
            } else {
              const newDataPoint: any = { 
                date: forecastDateString, 
                isForecasted: true 
              };
              currencies.forEach(c => {
                const lastKnown = filteredData[filteredData.length - 1][c.code as keyof typeof filteredData[0]];
                newDataPoint[c.code] = c.code === currency.code ? value : lastKnown;
              });
              forecastedData.push(newDataPoint);
            }
          });
        } catch (e) {
          console.error(`Error forecasting ${currency.code}:`, e);
          // Continue with other currencies if one fails
        }
      });
      
      return forecastedData;
    } catch (e) {
      console.error("Error generating chart data:", e);
      return [];
    }
  }, [exchangeRateData, selectedDateRange, enableForecast, forecastMethod, forecastYears]);
  
  // Get the latest and previous data for the currency cards
  const latestData = exchangeRateData[exchangeRateData.length - 1] || {};
  const previousData = exchangeRateData[exchangeRateData.length - 2] || {};
  const lastActualDate = latestData.date;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Exchange Rates</h1>
        <div className="flex items-center">
          <CandlestickChart className="mr-2 h-6 w-6 text-msu-green" />
          <span className="text-sm font-medium">Base Currency: USD</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currencies.map((currency) => {
          const currentValue = latestData[currency.code as keyof typeof latestData] as number | undefined;
          const previousValue = previousData[currency.code as keyof typeof previousData] as number | undefined;
          
          // Calculate percent change with validation
          let percentChange = 0;
          let changeText = "0.00%";
          let isPositive = true;
          
          if (typeof currentValue === 'number' && typeof previousValue === 'number' && previousValue !== 0) {
            percentChange = ((currentValue - previousValue) / previousValue) * 100;
            isPositive = percentChange >= 0;
            changeText = `${isPositive ? '+' : ''}${percentChange.toFixed(2)}%`;
          }
          
          return (
            <CurrencyCard 
              key={currency.code}
              code={currency.code}
              name={currency.name}
              icon={currency.icon}
              value={typeof currentValue === 'number' ? currentValue : 0}
              change={changeText}
              isPositive={isPositive}
            />
          );
        })}
      </div>
      
      <ExchangeRateChart
        chartData={getChartData}
        currencies={currencies}
        selectedDateRange={selectedDateRange}
        setSelectedDateRange={setSelectedDateRange}
        enableForecast={enableForecast}
        setEnableForecast={setEnableForecast}
        forecastMethod={forecastMethod}
        setForecastMethod={setForecastMethod}
        forecastYears={forecastYears}
        setForecastYears={setForecastYears}
        forecastMethods={forecastMethods}
        lastActualDate={enableForecast ? lastActualDate : undefined}
      />
      
      {enableForecast && (
        <ForecastInfo
          currencies={currencies}
          forecastMethod={forecastMethod}
          forecastMethods={forecastMethods}
          chartData={getChartData}
          actualLastData={latestData}
        />
      )}
    </div>
  );
};

export default ExchangeRates;
