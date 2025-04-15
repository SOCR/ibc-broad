
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FinancialProfile } from "@/types/market";
import { FinancialHealthScore } from "@/data/marketData";
import { calculateFinancialHealthScore } from "@/utils/financial-planning";
import { Check, AlertTriangle, AlertCircle, ChevronRight } from "lucide-react";

interface FinancialHealthScoreProps {
  profile: FinancialProfile;
}

export function FinancialHealthScoreComponent({ profile }: FinancialHealthScoreProps) {
  const healthScore = calculateFinancialHealthScore(profile);
  
  const getScoreBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return (
          <Badge className="bg-green-500 text-white flex items-center gap-1">
            <Check className="h-3 w-3" /> Excellent
          </Badge>
        );
      case 'good':
        return (
          <Badge className="bg-emerald-500 text-white flex items-center gap-1">
            <Check className="h-3 w-3" /> Good
          </Badge>
        );
      case 'fair':
        return (
          <Badge className="bg-amber-500 text-white flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> Fair
          </Badge>
        );
      case 'poor':
        return (
          <Badge className="bg-red-500 text-white flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> Needs Attention
          </Badge>
        );
      default:
        return null;
    }
  };
  
  const getProgressColor = (value: number) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return "bg-emerald-500";
    if (value >= 40) return "bg-amber-500";
    return "bg-red-500";
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Financial Health Score</CardTitle>
          {getScoreBadge(healthScore.status)}
        </div>
        <CardDescription>
          A comprehensive assessment of your overall financial wellbeing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overall Score</span>
            <span className="text-2xl font-bold">{healthScore.overall}/100</span>
          </div>
          <Progress value={healthScore.overall} className={`h-3 ${getProgressColor(healthScore.overall)}`} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Debt Management</span>
              <span className="font-medium">{healthScore.components.debt}%</span>
            </div>
            <Progress value={healthScore.components.debt} className={`h-2 ${getProgressColor(healthScore.components.debt)}`} />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Savings</span>
              <span className="font-medium">{healthScore.components.savings}%</span>
            </div>
            <Progress value={healthScore.components.savings} className={`h-2 ${getProgressColor(healthScore.components.savings)}`} />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Retirement Planning</span>
              <span className="font-medium">{healthScore.components.retirement}%</span>
            </div>
            <Progress value={healthScore.components.retirement} className={`h-2 ${getProgressColor(healthScore.components.retirement)}`} />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Education Planning</span>
              <span className="font-medium">{healthScore.components.education}%</span>
            </div>
            <Progress value={healthScore.components.education} className={`h-2 ${getProgressColor(healthScore.components.education)}`} />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <div className="flex justify-between">
              <span className="text-sm">Cash Flow</span>
              <span className="font-medium">{healthScore.components.cashflow}%</span>
            </div>
            <Progress value={healthScore.components.cashflow} className={`h-2 ${getProgressColor(healthScore.components.cashflow)}`} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="w-full">
          <h4 className="text-sm font-semibold mb-2">Top Recommendations</h4>
          <ul className="space-y-2">
            {healthScore.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <ChevronRight className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-msu-green" />
                <span className="text-sm">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardFooter>
    </Card>
  );
}
