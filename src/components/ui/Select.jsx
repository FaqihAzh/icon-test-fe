import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Select = ({
  label,
  required = false,
  options = [],
  placeholder = 'Pilih...',
  value,
  onChange,
  className,
  error,
  disabled,
  min,
  isPrimary = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const selected = options.find(o => o.value === value);

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className={cn(
          'font-medium',
          isPrimary ? 'text-text-primary text-sm' : 'text-gray-700 text-xs'
        )}>
          {label} {required && <span className="text-danger-500">*</span>}
        </label>
      )}

      <div ref={wrapperRef} className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(prev => !prev)}
          className={cn(
            'flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 text-sm transition',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-200',
            'focus:outline-none focus:ring-2 focus:ring-secondary-500',
            error ? 'border-danger-500' : 'border-gray-300',
            className
          )}
        >
          <span className={cn(
            !selected && 'text-gray-400',
            selected && 'text-text-primary'
          )}>
            {selected ? selected.label : placeholder}
          </span>

          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform duration-200 text-secondary-600',
              isOpen && 'rotate-180'
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute z-20 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-md max-h-56 overflow-auto">
            {options.map(opt => {
              const isDisabled = min !== undefined && opt.value < min;

              return (
                <div
                  key={opt.value}
                  onClick={() => {
                    if (!isDisabled) {
                      onChange(opt.value);
                      setIsOpen(false);
                    }
                  }}
                  className={cn(
                    'px-3 py-2 text-sm',
                    isDisabled
                      ? 'text-gray-300 cursor-not-allowed bg-gray-50'
                      : 'cursor-pointer hover:bg-gray-100 text-text-primary',
                    value === opt.value && !isDisabled && 'bg-gray-100 font-medium'
                  )}
                >
                  {opt.label}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {error && <p className="text-xs text-danger-500">{error}</p>}
    </div>
  );
};