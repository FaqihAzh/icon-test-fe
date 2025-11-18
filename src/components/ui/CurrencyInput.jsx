import { cn } from '../../lib/utils';

export const CurrencyInput = ({
  label,
  value,
  required = false,
  error,
  disabled,
  className,
  ...props
}) => {
  const formattedValue = value ? value.toLocaleString('id-ID') : '';

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm font-semibold text-text-primary">
          {label}{' '}
          {required && <span className="text-danger-500">*</span>}
        </label>
      )}

      <div className={cn(
        'flex w-full rounded-md border focus-within:ring-2 focus-within:ring-secondary-500 focus-within:border-transparent',
        error ? 'border-danger-500' : 'border-gray-300'
      )}>
        <div className={cn(
          'bg-gray-200 h-10 px-3 py-2 text-sm text-gray-700 flex items-center rounded-l-md border-r border-gray-300',
          disabled && 'opacity-50 cursor-not-allowed',
          error && 'border-danger-500 bg-danger-50'
        )}>
          Rp.
        </div>

        <input
          type="text"
          disabled={disabled}
          placeholder="000.000.00"
          value={formattedValue}
          className={cn(
            'flex h-10 w-full bg-white px-3 py-2 text-sm placeholder:text-gray-400',
            'focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            'border-none rounded-r-md focus:ring-0',
            error ? 'text-danger-500' : 'text-gray-900',
            className
          )}
          {...props}
        />
      </div>

      {error && <p className="text-xs text-danger-500">{error}</p>}
    </div>
  );
};