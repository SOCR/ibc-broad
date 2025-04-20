
import React from "react";
import { Download, Info } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface ChartActionsProps {
  onDownload: () => void;
  info: React.ReactNode;
  disabled?: boolean;
}

export const ChartActions: React.FC<ChartActionsProps> = ({ onDownload, info, disabled }) => (
  <div className="flex items-center space-x-2">
    <button
      aria-label="Download Data"
      onClick={onDownload}
      disabled={disabled}
      className="hover-scale rounded p-1 hover:bg-gray-100 disabled:opacity-50"
    >
      <Download size={16} className="text-muted-foreground" />
    </button>
    <Popover>
      <PopoverTrigger asChild>
        <button aria-label="Chart Info" className="hover-scale rounded p-1 hover:bg-gray-100">
          <Info size={16} className="text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent side="top" className="text-xs max-w-xs">
        {info}
      </PopoverContent>
    </Popover>
  </div>
);
