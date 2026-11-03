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
    <div className="mt-2 sm:mt-4 pt-1 sm:pt-2 text-center px-4 sm:px-6">
      {/* Horizontal Divider with Centered Notice */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 mb-0.5 sm:mb-1">
        <span className="w-1 h-1 rotate-45 bg-[#BD8665] opacity-70 shrink-0"></span>
        <span className="flex-1 h-[1px] bg-[#BD8665] opacity-75"></span>
        <span className="font-bold text-[9px] sm:text-xs md:text-[13px] text-[#171717] tracking-[0.18em] uppercase whitespace-nowrap px-1">
          {notice}
        </span>
        <span className="flex-1 h-[1px] bg-[#BD8665] opacity-75"></span>
        <span className="w-1 h-1 rotate-45 bg-[#BD8665] opacity-70 shrink-0"></span>
      </div>

      {/* Location / Terms */}
      <div className="font-bold text-[8px] sm:text-[9.5px] md:text-[11px] text-[#171717] tracking-[0.24em] uppercase mt-0.5">
        {location}
      </div>
    </div>
  );
};
