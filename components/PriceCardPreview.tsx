"use client";

import React, { forwardRef } from "react";
import { PricingData } from "@/types/pricing";

interface PriceCardPreviewProps {
  data: PricingData;
}

export const PriceCardPreview = forwardRef<HTMLDivElement, PriceCardPreviewProps>(
  ({ data }, ref) => {
    // Format date as DD-MM-YYYY exactly as in user's image (30-10-2026)
    const formatDisplayDate = (dateStr: string) => {
      if (!dateStr) return "";
      try {
        const parts = dateStr.split("-");
        if (parts.length === 3) {
          // If YYYY-MM-DD
          if (parts[0].length === 4) {
            return `${parts[2]}-${parts[1]}-${parts[0]}`;
          }
          return dateStr;
        }
      } catch {
        return dateStr;
      }
      return dateStr;
    };

    const bgImage = data.customBgUrl || "/templates/krishna-clean-template.jpg";

    return (
      <div
        ref={ref}
        id="price-card-canvas"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="relative w-full max-w-[540px] aspect-[819/1024] mx-auto rounded-3xl overflow-hidden shadow-2xl border border-amber-900/15 select-none font-serif"
      >
        {/* 1. Dynamic Date (Centered between the two divider lines) */}
        <div
          style={{ top: "21.3%", left: "50%" }}
          className="absolute -translate-x-1/2 -translate-y-1/2 font-bold tracking-widest text-[#241c14] text-[12px] sm:text-[15px] whitespace-nowrap"
        >
          {formatDisplayDate(data.date)}
        </div>

        {/* 2. Left Product: TRUPTI COTTON SEED OIL */}
        {/* Tin Price Pill */}
        <div
          style={{ top: "79.8%", left: "26.9%" }}
          className="absolute -translate-x-1/2 -translate-y-1/2 font-black text-[#8a3c18] text-[11px] sm:text-[14px] md:text-[15px] whitespace-nowrap tracking-wide"
        >
          ₹ {data.cottonSeedOil.tinPrice || "—"} + NEW TIN
        </div>

        {/* 5 LTR Price Box */}
        <div
          style={{ top: "88.6%", left: "17.2%" }}
          className="absolute -translate-x-1/2 -translate-y-1/2 font-black text-[#15110d] text-[16px] sm:text-[22px] md:text-[24px] tracking-tight whitespace-nowrap"
        >
          ₹{data.cottonSeedOil.canPrice || "—"}
        </div>

        {/* 1 LTR Price Box */}
        <div
          style={{ top: "88.6%", left: "38.0%" }}
          className="absolute -translate-x-1/2 -translate-y-1/2 font-black text-[#15110d] text-[16px] sm:text-[22px] md:text-[24px] tracking-tight whitespace-nowrap"
        >
          ₹{data.cottonSeedOil.bottlePrice || "—"}
        </div>

        {/* 3. Right Product: KRISHNA GROUNDNUT OIL */}
        {/* Tin Price Pill */}
        <div
          style={{ top: "79.8%", left: "72.9%" }}
          className="absolute -translate-x-1/2 -translate-y-1/2 font-black text-[#8a3c18] text-[11px] sm:text-[14px] md:text-[15px] whitespace-nowrap tracking-wide"
        >
          ₹ {data.groundnutOil.tinPrice || "—"} + NEW TIN
        </div>

        {/* 5 LTR Price Box */}
        <div
          style={{ top: "88.6%", left: "62.9%" }}
          className="absolute -translate-x-1/2 -translate-y-1/2 font-black text-[#15110d] text-[16px] sm:text-[22px] md:text-[24px] tracking-tight whitespace-nowrap"
        >
          ₹{data.groundnutOil.canPrice || "—"}
        </div>

        {/* 1 LTR Price Box */}
        <div
          style={{ top: "88.6%", left: "83.9%" }}
          className="absolute -translate-x-1/2 -translate-y-1/2 font-black text-[#15110d] text-[16px] sm:text-[22px] md:text-[24px] tracking-tight whitespace-nowrap"
        >
          ₹{data.groundnutOil.bottlePrice || "—"}
        </div>
      </div>
    );
  }
);

PriceCardPreview.displayName = "PriceCardPreview";
