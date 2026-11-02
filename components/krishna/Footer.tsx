import React from "react";

interface FooterProps {
  notice?: string;
  location?: string;
}

export const Footer: React.FC<FooterProps> = ({
  notice = "ALL RATES PLUS GST",
  location = "EX-FACTORY  |  JUNAGADH",
}) => {
  return (
    <div className="mt-2 sm:mt-4 pt-1 text-center px-4 sm:px-6">
      {/* Horizontal Divider with Centered Notice */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-0.5 sm:mb-1">
        <span className="flex-1 h-[1px] bg-[#C4A482] opacity-60"></span>
        <span className="font-serif-title font-bold text-[9px] sm:text-xs md:text-[13px] text-[#292725] tracking-[0.16em] uppercase whitespace-nowrap">
          {notice}
        </span>
        <span className="flex-1 h-[1px] bg-[#C4A482] opacity-60"></span>
      </div>

      {/* Location / Terms */}
      <div className="font-serif-title font-bold text-[8.5px] sm:text-[10px] md:text-[11.5px] text-[#57534E] tracking-[0.22em] uppercase mt-0.5">
        {location}
      </div>
    </div>
  );
};
