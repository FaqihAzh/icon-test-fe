import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Breadcrumb = ({ items = [] }) => {
  return (
    <div className="flex items-center text-sm mb-4">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isLastChevron = index === items.length - 2; // chevron terakhir

        return (
          <span key={index} className="flex items-center gap-1">
            {!isLast ? (
              <Link
                to={item.href}
                className="text-[#9E9E9E] font-normal text-sm"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[#4A8394] text-sm font-normal">
                {item.label}
              </span>
            )}

            {!isLast && (
              <ChevronRight
                className="w-4 h-4"
                style={{
                  color: isLastChevron ? "#4A8394" : "#9E9E9E",
                }}
              />
            )}
          </span>
        );
      })}
    </div>
  );
};
