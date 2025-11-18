import { Check } from "lucide-react";
import { cn } from "../../utils/cn";

export const Checkbox = ({ 
  checked, 
  onCheckedChange, 
  disabled,
  className,
  ...props 
}) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange && onCheckedChange(!checked)}
      className={cn(
        "h-5 w-5 rounded border flex items-center justify-center transition-colors",
        checked 
          ? "border-[#3D7D8F] bg-[#3D7D8F]" 
          : "border-gray-300 bg-white",
        disabled && "cursor-not-allowed",
        className
      )}
      {...props}
    >
      {checked && <Check className="h-3 w-3 text-white" />}
    </button>
  );
};