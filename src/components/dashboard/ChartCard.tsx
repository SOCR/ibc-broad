
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer } from "recharts";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  height?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  children,
  className,
  height = "h-80"
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className={height}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
