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
    <div className="pt-1 text-center px-4">
      {/* Horizontal Divider with Centered Notice */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-0.5">
        <span className="flex-1 h-[1px] bg-[#C4A482] opacity-50"></span>
        <span className="font-bold text-[8.5px] sm:text-[10px] md:text-[11px] text-[#1E1B18] tracking-[0.18em] uppercase whitespace-nowrap">
          {notice}
        </span>
        <span className="flex-1 h-[1px] bg-[#C4A482] opacity-50"></span>
      </div>

      {/* Location / Terms in Bahnschrift */}
      <div className="font-bold text-[8px] sm:text-[9px] md:text-[10px] text-[#5A524A] tracking-[0.22em] uppercase mt-0.5">
        {location}
      </div>
    </div>
  );
};
