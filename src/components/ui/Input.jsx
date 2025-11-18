import { cn } from '../../lib/utils';

export const Input = ({
  label,
  required = false,
  className,
  error,
  leftIcon,
  type = 'text',
  disabled,
  min,
  max,
  minLength,
  maxLength,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm font-semibold text-text-primary">
          {label} {required && <span className="text-danger-500">*</span>}
        </label>
      )}

      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-500 pointer-events-none">
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
            'flex h-10 w-full min-h-10 min-w-[180px] rounded-md border bg-white px-3 py-2 text-sm',
            'placeholder:text-gray-400 text-text-primary',
            'focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent',
            'disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500',
            leftIcon && 'pl-10',
            error ? 'border-danger-500 focus:ring-danger-500' : 'border-gray-300',
            className
          )}
          {...props}
        />
      </div>

      {error && <p className="text-xs text-danger-500">{error}</p>}
    </div>
  );
};