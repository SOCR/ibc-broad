
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CurrencyCardProps {
  code: string;
  name: string;
  icon: LucideIcon;
  value: number;
  change: string;
  isPositive: boolean;
}

export const CurrencyCard: React.FC<CurrencyCardProps> = ({ 
  code, 
  name, 
  icon: Icon, 
  value, 
  change, 
  isPositive 
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">{name}</CardTitle>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-2xl font-bold">{value.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground mt-1">USD/{code.toUpperCase()}</p>
          </div>
          <div className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
