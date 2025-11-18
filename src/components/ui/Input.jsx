import { cn } from "../../utils/cn";

export const Input = ({
  label,
  required = false,
  className,
  error,
  leftIcon,
  type = "text",
  disabled,
  min,
  max,
  minLength,
  maxLength,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Label */}
      {label && (
        <label className="text-sm font-semibold text-[#333333]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative w-full">
        {/* Left Icon (optional) */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A8394] pointer-events-none">
            {leftIcon}
          </div>
        )}

        <input
          type={type}
          disabled={disabled}
          min={min}
          max={max}
          minLength={minLength}
          maxLength={maxLength}
          className={cn(
            "flex h-10 w-full min-h-10 min-w-[180px] rounded-md border bg-white px-3 py-2 text-sm placeholder:text-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-[#3D7D8F] focus:border-transparent",
            "disabled:cursor-not-allowed disabled:bg-[#D3D3D3] text-[#333333]",
            leftIcon && "pl-10",
            error ? "border-red-500 focus:ring-red-500" : "border-gray-300",
            className
          )}
          {...props}
        />
      </div>

      {/* Error message */}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
