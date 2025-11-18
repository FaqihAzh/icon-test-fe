import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

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
        'h-5 w-5 rounded border flex items-center justify-center transition-colors',
        checked 
          ? 'border-secondary-600 bg-secondary-600' 
          : 'border-gray-300 bg-white',
        disabled && 'cursor-not-allowed opacity-60',
        !disabled && 'hover:border-secondary-500',
        className
      )}
      {...props}
    >
      {checked && <Check className="h-3 w-3 text-white" />}
    </button>
  );
};