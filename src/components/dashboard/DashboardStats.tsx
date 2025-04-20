
import React from "react";
import { StatCard } from "./StatCard";

// Added prop booleans to allow rendering each card individually for tooltip wrapping.
interface DashboardStatsProps {
  latestIbexData: {
    overall: number;
    year: number;
  };
  renderFirstCard?: boolean;
  renderSecondCard?: boolean;
  renderThirdCard?: boolean;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ latestIbexData, renderFirstCard, renderSecondCard, renderThirdCard }) => {
  if (renderFirstCard) {
    return (
      <StatCard
        title="Current IBEX Score"
        value={latestIbexData.overall.toString()}
        description={`Overall ${latestIbexData.year} IBEX score, rated as "Active"`}
      />
    );
  }
  if (renderSecondCard) {
    return (
      <StatCard
        title="State Rankings"
        value=""
        description=""
      >
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
      </StatCard>
    );
  }
  if (renderThirdCard) {
    return (
      <StatCard
        title="Top International Course"
        value="International Business"
        description="59% of community colleges offer this course"
      />
    );
  }

  // fallback: render all (original usage)
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Current IBEX Score"
        value={latestIbexData.overall.toString()}
        description={`Overall ${latestIbexData.year} IBEX score, rated as "Active"`}
      />
      
      <StatCard
        title="State Rankings"
        value=""
        description=""
      >
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
      </StatCard>
      
      <StatCard
        title="Top International Course"
        value="International Business"
        description="59% of community colleges offer this course"
      />
    </div>
  );
};
