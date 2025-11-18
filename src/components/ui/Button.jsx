import { cn } from "../../utils/cn";

export const Button = ({ 
  children, 
  variant = "default", 
  size = "default",
  className,
  disabled,
  ...props 
}) => {
  const baseStyles = "cursor-pointer text-sm inline-flex font-medium items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D7D8F] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#D3D3D3] disabled:text-[#9E9E9E] disabled:font-semibold";
  
  const variants = {
    default: "bg-[#4A8394] text-white hover:bg-[#18A2BA]",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700",
    ghost: "hover:bg-gray-100 text-gray-700",
    destructive: "bg-[#FF6363] text-white hover:bg-[#e05555]",
    noOutline: "bg-transparent text-[#FF6363] hover:bg-[#FF6363] hover:text-white",
  };
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-4 py-3 text-sm",
    lg: "h-12 px-6",
    icon: "h-10 w-10",
  };
  
  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};