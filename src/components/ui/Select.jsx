import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";

export const Select = ({ 
  className, 
  children, 
  error,
  placeholder = "Pilih...",
  ...props 
}) => {
  return (
    <div className="relative">
      <select
        className={cn(
          "flex h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3A92A5] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 pr-10",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      >
        <option value="">{placeholder}</option>
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
    </div>
  );
};