import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";

export const Select = ({
  label,
  required = false,
  options = [],
  placeholder = "Pilih...",
  value,
  onChange,
  className,
  error,
  disabled,
  min,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div ref={wrapperRef} className="relative">
        {/* Select Trigger */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 text-sm transition disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-red-500" : "border-gray-300",
            className
          )}
        >
          <span className={cn(!selected && "text-gray-400")}>
            {selected ? selected.label : placeholder}
          </span>

          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200 text-[#3D7D8F]",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-20 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-md max-h-56 overflow-auto">
            {options.map((opt) => {
              // ❗ Tentukan apakah opsi ini harus disable
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
                    "px-3 py-2 text-sm",
                    isDisabled
                      ? "text-gray-300 cursor-not-allowed bg-gray-50"
                      : "cursor-pointer hover:bg-gray-100 text-[#333333]",
                    value === opt.value &&
                      !isDisabled &&
                      "bg-gray-100 font-medium"
                  )}
                >
                  {opt.label}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Error message */}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
