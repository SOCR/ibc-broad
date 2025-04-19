
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  className?: string;
  valueClassName?: string;
  children?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  className,
  valueClassName = "text-msu-green",
  children
}) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children ? (
          children
        ) : (
          <>
            <div className={`text-4xl font-bold ${valueClassName}`}>{value}</div>
            {description && (
              <p className="text-sm text-muted-foreground mt-2">
                {description}
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
