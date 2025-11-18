import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Breadcrumb = ({ items = [] }) => {
  return (
    <div className="flex items-center text-sm mb-4">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isLastChevron = index === items.length - 2;

        return (
          <span key={index} className="flex items-center gap-1">
            {!isLast ? (
              <Link
                to={item.href}
                className="text-gray-500 font-normal text-sm hover:text-gray-700"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-secondary-500 text-sm font-normal">
                {item.label}
              </span>
            )}

            {!isLast && (
              <ChevronRight
                className="w-4 h-4"
                style={{
                  color: isLastChevron ? '#4A8394' : '#9E9E9E',
                }}
              />
            )}
          </span>
        );
      })}
    </div>
  );
};