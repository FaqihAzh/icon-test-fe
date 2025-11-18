import { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

export const TruncatePopup = ({ text, className = '' }) => {
  const [show, setShow] = useState(false);
  const textRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      setIsOverflow(textRef.current.scrollWidth > textRef.current.clientWidth);
    }
  }, [text]);

  return (
    <div
      className={cn('inline-block w-full relative', className)}
      onMouseEnter={() => isOverflow && setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <h3 ref={textRef} className="text-base font-bold text-gray-600 truncate">
        {text}
      </h3>

      {show && (
        <div className="bg-gray-100 absolute right-0 bottom-full mb-6 z-30 px-4 py-2 text-sm font-semibold text-gray-600 rounded shadow-md whitespace-normal max-w-xs">
          {text}
        </div>
      )}
    </div>
  );
};