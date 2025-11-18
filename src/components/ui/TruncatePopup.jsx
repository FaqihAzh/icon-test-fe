import { useState, useRef, useEffect } from "react";
import { cn } from "../../utils/cn";

export const TruncatePopup = ({ text, className = "" }) => {
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
      className={cn("inline-block w-full", className)}
      onMouseEnter={() => isOverflow && setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {/* teks yang dipotong */}
      <h3
        ref={textRef}
        className="text-base font-bold text-[#868E96] truncate"
      >
        {text}
      </h3>

      {/* tooltip */}
      {show && (
        <div className="bg-[#F2F2F2] absolute right-0 bottom-full mb-6 z-30 px-4 py-2 text-sm font-semibold text-[#868E96] rounded shadow-sm whitespace-normal max-w-xs">
          {text}
        </div>
      )}
    </div>
  );
};