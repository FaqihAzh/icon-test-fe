import { cn } from '../../lib/utils';

export const Button = ({ 
  children, 
  variant = 'default', 
  size = 'default',
  className,
  disabled,
  ...props 
}) => {
  const baseStyles = "cursor-pointer text-sm inline-flex font-medium items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500";
  
  const variants = {
    default: 'bg-secondary-500 text-white hover:bg-primary-500',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700',
    ghost: 'hover:bg-gray-100 text-gray-700',
    destructive: 'bg-danger-500 text-white hover:bg-danger-600',
    noOutline: 'bg-transparent text-danger-500 hover:bg-danger-500 hover:text-white',
  };
  
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-8 px-4 py-3 text-sm',
    lg: 'h-12 px-6',
    icon: 'h-10 w-10',
  };
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};