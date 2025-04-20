
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from "recharts";
import { economicIndicators } from "@/data/marketData";

export function TrendsTab() {
  const sortedEconomicIndicators = [...economicIndicators].sort((a, b) => a.year - b.year);
  const usaData = sortedEconomicIndicators.filter(d => d.country === "USA");
  const euData = sortedEconomicIndicators.filter(d => d.country === "EU");
  const chinaData = sortedEconomicIndicators.filter(d => d.country === "China");

  // Process data for GDP growth calculation properly to avoid duplicates
  const gdpGrowthData = React.useMemo(() => {
    const result = [];
    
    // Process each country separately
    ["USA", "EU", "China"].forEach(country => {
      const countryData = sortedEconomicIndicators
        .filter(item => item.country === country)
        .sort((a, b) => a.year - b.year);
      
      // Calculate growth rates (skip first year as we need previous data)
      for (let i = 1; i < countryData.length; i++) {
        const prevYear = countryData[i-1];
        const currentYear = countryData[i];
        
        // Calculate percentage growth
        const growth = ((currentYear.gdp - prevYear.gdp) / prevYear.gdp) * 100;
        
        result.push({
          country,
          year: currentYear.year,
          prevYear: prevYear.year,
          growth: parseFloat(growth.toFixed(2)),
          label: `${currentYear.year} (${country})` // Create unique labels
        });
      }
    });
    
    // Sort by year and then by country for consistent display
    return result.sort((a, b) => a.year - b.year || a.country.localeCompare(b.country));
  }, [sortedEconomicIndicators]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>GDP Growth Rate by Country (%)</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ChartContainer config={{}} className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="year"
                  type="number"
                  domain={['dataMin', 'dataMax']}
                  allowDuplicatedCategory={false}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value, name, props) => [`${value}%`, props.payload.country]}
                  labelFormatter={(value) => `Year: ${value}`}
                />
                <Legend />
                {["USA", "EU", "China"].map((country, index) => {
                  const color = index === 0 ? "#18453B" : index === 1 ? "#1E88E5" : "#D81B60";
                  const countryData = gdpGrowthData.filter(d => d.country === country);
                  
                  return (
                    <Line
                      key={country}
                      data={countryData}
                      name={`${country} Growth`}
                      type="monotone"
                      dataKey="growth"
                      stroke={color}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      isAnimationActive={false} // Disable animation to help with performance
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Interest Rate Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer config={{}} className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="year"
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    allowDuplicatedCategory={false}
                  />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, "Interest Rate"]} />
                  <Legend />
                  <Line
                    data={usaData}
                    name="USA"
                    type="monotone"
                    dataKey="interestRate"
                    stroke="#18453B"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    isAnimationActive={false}
                  />
                  <Line
                    data={euData}
                    name="EU"
                    type="monotone"
                    dataKey="interestRate"
                    stroke="#1E88E5"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    isAnimationActive={false}
                  />
                  <Line
                    data={chinaData}
                    name="China"
                    type="monotone"
                    dataKey="interestRate"
                    stroke="#D81B60"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Annual GDP (Trillion USD)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer config={{}} className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="year"
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    allowDuplicatedCategory={false}
                  />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}T`, "GDP"]} />
                  <Legend />
                  <Line
                    data={usaData}
                    name="USA"
                    type="monotone"
                    dataKey="gdp"
                    stroke="#18453B"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    isAnimationActive={false}
                  />
                  <Line
                    data={euData}
                    name="EU"
                    type="monotone"
                    dataKey="gdp"
                    stroke="#1E88E5"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    isAnimationActive={false}
                  />
                  <Line
                    data={chinaData}
                    name="China"
                    type="monotone"
                    dataKey="gdp"
                    stroke="#D81B60"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
