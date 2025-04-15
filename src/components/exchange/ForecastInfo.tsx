
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface Currency {
  code: string;
  name: string;
  color: string;
}

interface ForecastInfoProps {
  currencies: Currency[];
  forecastMethod: string;
  forecastMethods: { id: string; name: string; description: string }[];
  chartData: any[];
  actualLastData: any;
}

export const ForecastInfo: React.FC<ForecastInfoProps> = ({
  currencies,
  forecastMethod,
  forecastMethods,
  chartData,
  actualLastData
}) => {
  return (
    <Card className="bg-gray-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-msu-green" />
            Forecast Information
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">
              {forecastMethods.find(m => m.id === forecastMethod)?.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {forecastMethods.find(m => m.id === forecastMethod)?.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currencies.map((currency) => {
              const actualValue = actualLastData[currency.code] as number;
              const forecastedValue = chartData[chartData.length - 1][currency.code] as number;
              const changePercent = ((forecastedValue - actualValue) / actualValue) * 100;
              
              return (
                <div key={`forecast-${currency.code}`} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: currency.color }}></div>
                    <span className="font-medium">{currency.name}</span>
                  </div>
                  <div className={`text-sm font-medium ${changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-xs text-muted-foreground mt-4">
            Note: Forecasts are based on historical trends and represent potential future scenarios, not guaranteed outcomes. 
            Multiple factors can influence actual exchange rates.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
