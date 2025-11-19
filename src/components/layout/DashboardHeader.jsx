import { ChevronRight } from 'lucide-react';
import SettingsIcon from '../../assets/icons/settings.svg';

export const DashboardHeader = () => {
  return (
    <header className=" text-text-primary px-4 md:px-8 2xl:px-12 py-3 border-b border-hr bg-white flex items-center justify-between fixed top-0 left-0 right-0 z-20">
      <div className="flex items-center gap-4">
        <img src={SettingsIcon} alt="Logo" className="w-8 h-auto" />
        <div className="text-xl font-bold tracking-wide">DASHBOARD</div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex items-center gap-3 hover:bg-opacity-80 rounded cursor-pointer">
          <ChevronRight className="w-6 h-6" />
        </div>
      </div>
    </header>
  );
};
