
import React, { useState } from "react";
import { exchangeRateData, forecastMethods } from "@/data/marketData";
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

// Date range options
const dateRanges = [
  { id: "1m", name: "1 Month", value: 1 },
  { id: "3m", name: "3 Months", value: 3 },
  { id: "6m", name: "6 Months", value: 6 },
  { id: "1y", name: "1 Year", value: 12 },
  { id: "3y", name: "3 Years", value: 36 },
  { id: "5y", name: "5 Years", value: 60 },
  { id: "10y", name: "10 Years", value: 120 },
  { id: "all", name: "All Data", value: 1000 }
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
      return data; // Return all data
    }
    
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - range);
    
    return data.filter(item => {
      const itemDate = new Date(item.date + "-01"); // Convert YYYY-MM to YYYY-MM-DD
      return itemDate >= cutoffDate;
    });
  };
  
  // Apply forecast if enabled
  const getChartData = () => {
    const filteredData = filterDataByDateRange(exchangeRateData);
    
    if (!enableForecast) {
      return filteredData;
    }
    
    // Generate forecasts for each currency
    const forecastedData = [...filteredData];
    currencies.forEach(currency => {
      const dataPoints = filteredData.map(item => item[currency.code as keyof typeof item] as number);
      
      // Fixed: Pass array of numbers to createMultiMethodForecast
      const currencyForecast = createMultiMethodForecast(dataPoints, forecastYears).linear;
      
      // Merge forecasted data
      currencyForecast.forEach((value, index) => {
        // Calculate the date for this forecast point (monthly increments from last known date)
        const lastDate = new Date(filteredData[filteredData.length - 1].date + "-01");
        const forecastDate = new Date(lastDate);
        forecastDate.setMonth(lastDate.getMonth() + index + 1);
        const forecastDateString = `${forecastDate.getFullYear()}-${String(forecastDate.getMonth() + 1).padStart(2, '0')}`;
        
        const existingItemIndex = forecastedData.findIndex(d => d.date === forecastDateString);
        if (existingItemIndex >= 0) {
          forecastedData[existingItemIndex][currency.code] = value;
        } else {
          const newDataPoint = { date: forecastDateString, isForecasted: true };
          currencies.forEach(c => {
            // Default to last known value for other currencies
            const lastKnown = filteredData[filteredData.length - 1][c.code as keyof typeof filteredData[0]] as number;
            newDataPoint[c.code as keyof typeof newDataPoint] = c.code === currency.code ? value : lastKnown;
          });
          forecastedData.push(newDataPoint as any);
        }
      });
    });
    
    return forecastedData;
  };
  
  const chartData = getChartData();
  
  // Get latest exchange rates
  const latestData = exchangeRateData[exchangeRateData.length - 1];
  const previousData = exchangeRateData[exchangeRateData.length - 2];
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
          const currentValue = latestData[currency.code as keyof typeof latestData] as number;
          const previousValue = previousData[currency.code as keyof typeof previousData] as number;
          const percentChange = ((currentValue - previousValue) / previousValue) * 100;
          const isPositive = percentChange >= 0;
          const changeText = `${isPositive ? '+' : ''}${percentChange.toFixed(2)}%`;
          
          return (
            <CurrencyCard 
              key={currency.code}
              code={currency.code}
              name={currency.name}
              icon={currency.icon}
              value={currentValue}
              change={changeText}
              isPositive={isPositive}
            />
          );
        })}
      </div>
      
      <ExchangeRateChart
        chartData={chartData}
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
        lastActualDate={lastActualDate}
      />
      
      {enableForecast && (
        <ForecastInfo
          currencies={currencies}
          forecastMethod={forecastMethod}
          forecastMethods={forecastMethods}
          chartData={chartData}
          actualLastData={latestData}
        />
      )}
    </div>
  );
};

export default ExchangeRates;
