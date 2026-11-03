"use client";

import React, { forwardRef } from "react";
import { CatalogueData, getEffectivePalette } from "@/types/pricing";
import { ReligiousHeading } from "./krishna/ReligiousHeading";
import { Header } from "./krishna/Header";
import { ProductCard } from "./krishna/ProductCard";
import { Footer } from "./krishna/Footer";

interface PriceCardPreviewProps {
  data: CatalogueData;
}

export const PriceCardPreview = forwardRef<HTMLDivElement, PriceCardPreviewProps>(
  ({ data }, ref) => {
    const palette = getEffectivePalette(data.theme, data.customColor);

    return (
      <div
        ref={ref}
        id="price-card-canvas"
        className="relative w-full max-w-[540px] aspect-[4/5] mx-auto rounded-[28px] sm:rounded-[36px] border shadow-2xl overflow-hidden p-4 sm:p-6 md:p-7 flex flex-col justify-between select-text transition-colors duration-200"
        style={{
          backgroundColor: palette.bgCanvas,
          borderColor: palette.borderColor,
          boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.12)",
        }}
      >
        {/* Minimal Inner Framing Line for Architectural Balance */}
        <div
          className="absolute inset-2.5 sm:inset-3.5 border rounded-[22px] sm:rounded-[28px] pointer-events-none z-0 transition-colors duration-200 opacity-60"
          style={{ borderColor: palette.frameColor }}
        ></div>

        {/* Top Header Region (Religious Heading + Date + Two Company Names) */}
        <div className="relative z-10 space-y-1 sm:space-y-1.5 pt-0.5">
          {/* First line — Religious Heading */}
          <ReligiousHeading
            heading={data.religiousHeading}
            palette={palette}
          />

          {/* Second & Third line — Date, Two Company Names */}
          <Header
            leftCompanyName={data.leftCompanyName || data.brandName}
            rightCompanyName={data.rightCompanyName}
            brandName={data.brandName}
            subtitle={data.subtitle}
            date={data.date}
            palette={palette}
          />
        </div>

        {/* SECTION 06 — Main Product Showcase (Spacious Two-Column Layout) */}
        <div className="relative z-10 grid grid-cols-2 gap-3.5 sm:gap-6 my-auto items-stretch px-0.5 sm:px-1">
          {/* LEFT PRODUCT CARD — TRUPTI COTTON SEED REFINED OIL */}
          <ProductCard product={data.trupti} palette={palette} />

          {/* RIGHT PRODUCT CARD — KRISHNA GROUNDNUT OIL */}
          <ProductCard product={data.krishna} palette={palette} />
        </div>

        {/* SECTION 05 (Bottom) & SECTION 07 — Bottom Footer */}
        <div className="relative z-10 pb-0.5">
          <Footer
            notice={data.footerNotice}
            location={data.footerLocation}
            palette={palette}
          />
        </div>
      </div>
    );
  }
);

PriceCardPreview.displayName = "PriceCardPreview";
