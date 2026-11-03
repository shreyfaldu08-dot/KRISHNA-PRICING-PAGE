"use client";

import React, { forwardRef } from "react";
import { CatalogueData } from "@/types/pricing";
import { ReligiousHeading } from "./krishna/ReligiousHeading";
import { Header } from "./krishna/Header";
import { BotanicalDecoration } from "./krishna/BotanicalDecoration";
import { ProductCard } from "./krishna/ProductCard";
import { Footer } from "./krishna/Footer";

interface PriceCardPreviewProps {
  data: CatalogueData;
}

export const PriceCardPreview = forwardRef<HTMLDivElement, PriceCardPreviewProps>(
  ({ data }, ref) => {
    return (
      <div
        ref={ref}
        id="price-card-canvas"
        className="relative w-full max-w-[540px] aspect-[4/5] mx-auto rounded-3xl poster-canvas border-2 border-[#BFDBFE] shadow-2xl overflow-hidden p-3.5 sm:p-5 md:p-6 flex flex-col justify-between select-text"
        style={{
          boxShadow: "0 25px 50px -12px rgba(15, 41, 74, 0.18)",
        }}
      >
        {/* Architectural Inner Frame with Diamond Corner Accents */}
        <div className="absolute inset-2 sm:inset-2.5 border border-[#BFDBFE]/60 rounded-2xl pointer-events-none z-0">
          <span className="absolute -top-1.5 -left-1.5 text-[9px] text-[#2563EB] leading-none">◈</span>
          <span className="absolute -top-1.5 -right-1.5 text-[9px] text-[#2563EB] leading-none">◈</span>
          <span className="absolute -bottom-1.5 -left-1.5 text-[9px] text-[#2563EB] leading-none">◈</span>
          <span className="absolute -bottom-1.5 -right-1.5 text-[9px] text-[#2563EB] leading-none">◈</span>
        </div>

        {/* Decorative Botanical Illustrations in Soft Blue Ink */}
        <BotanicalDecoration />

        {/* Top Header Region (Religious Heading + Brand Heading + Date) */}
        <div className="relative z-10 space-y-0.5 sm:space-y-1">
          {/* SECTION 02 — Top Religious Heading in Deep Navy Blue */}
          <ReligiousHeading heading={data.religiousHeading} />

          {/* SECTION 03 & 04 — Main Brand Heading, Subtitle & Date */}
          <Header
            brandName={data.brandName}
            subtitle={data.subtitle}
            date={data.date}
          />
        </div>

        {/* SECTION 06 — Main Product Showcase (Symmetrical Architectural Layout) */}
        <div className="relative z-10 grid grid-cols-2 gap-4 sm:gap-6 my-auto items-stretch">
          {/* LEFT PRODUCT CARD — TRUPTI COTTON SEED REFINED OIL */}
          <ProductCard product={data.trupti} />

          {/* RIGHT PRODUCT CARD — KRISHNA GROUNDNUT OIL */}
          <ProductCard product={data.krishna} />
        </div>

        {/* SECTION 05 (Bottom) & SECTION 07 — Bottom Footer */}
        <div className="relative z-10">
          <Footer
            notice={data.footerNotice}
            location={data.footerLocation}
          />
        </div>
      </div>
    );
  }
);

PriceCardPreview.displayName = "PriceCardPreview";
