
import { useSidebar } from "@/components/ui/sidebar";

export const MsuLogo = () => {
  const { isOpen } = useSidebar();
  
  return (
    <div className="flex items-center">
      {!isOpen ? (
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-msu-green">
          <span className="text-white font-bold text-sm">MSU</span>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-msu-green mr-2">
            <span className="text-white font-bold text-sm">MSU</span>
          </div>
          <span className="font-semibold text-msu-green">
            IBC Dashboard
          </span>
        </div>
      )}
    </div>
  );
};
