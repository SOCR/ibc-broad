
import React from "react";
import { StatCard } from "./StatCard";

interface DashboardStatsProps {
  latestIbexData: {
    overall: number;
    year: number;
  };
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ latestIbexData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Current IBEX Score"
        value={latestIbexData.overall}
        description={`Overall ${latestIbexData.year} IBEX score, rated as "Active"`}
      />
      
      <StatCard
        title="State Rankings"
        value={
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-medium">Highly Active States</div>
              <div className="text-2xl font-bold text-green-600">20</div>
            </div>
            <div>
              <div className="text-sm font-medium">Active States</div>
              <div className="text-2xl font-bold text-blue-600">17</div>
            </div>
            <div>
              <div className="text-sm font-medium">Less Active States</div>
              <div className="text-2xl font-bold text-orange-600">13</div>
            </div>
          </div>
        }
      />
      
      <StatCard
        title="Top International Course"
        value="International Business"
        description="59% of community colleges offer this course"
      />
    </div>
  );
};
