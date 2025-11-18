import React from 'react';
import { cn } from "../../utils/cn"; // Pastikan path cn sudah benar
import { Input } from "./Input"; // Pastikan path Input sudah benar

// Mendefinisikan komponen khusus untuk input mata uang
export const CurrencyInput = ({
  label,
  value,
  required = false,
  error,
  disabled,
  className,
  ...props
}) => {
  // Menggunakan format toLocaleString untuk memastikan format "700.000"
  const formattedValue = value ? value.toLocaleString("id-ID") : "";

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Label */}
      {label && (
        <label className="text-sm font-semibold text-[#333333]">
          {label}{" "}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Kontainer untuk tampilan gabungan Rp. dan Input */}
      <div className="flex w-full rounded-md border border-gray-300 focus-within:ring-2 focus-within:ring-[#3D7D8F] focus-within:border-transparent">
        
        {/* Simbol Rp. di sisi kiri */}
        <div 
          className={cn(
            "bg-[#E5E7E9] h-10 px-3 py-2 text-sm text-gray-700 flex items-center rounded-l-md border-r border-gray-300",
            // Gaya tambahan saat disabled
            disabled && "bg-gray-200 opacity-50 cursor-not-allowed",
            // Gaya saat error
            error && "border-red-500 bg-red-50"
          )}
        >
          Rp.
        </div>

        {/* Input Field */}
        <input
          type="text"
          disabled={disabled}
          placeholder='000.000.00'
          value={formattedValue}
          className={cn(
            "flex h-10 w-full bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 border-none rounded-r-md",
            // Hapus border bawaan karena sudah ditangani div luar
            "focus:ring-0 focus:border-none", 
            error ? "text-red-500" : "text-gray-900",
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