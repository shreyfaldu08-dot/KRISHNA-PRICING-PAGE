"use client";

import React, { forwardRef } from "react";
import { CatalogueData } from "@/types/pricing";
import { ReligiousHeading } from "./krishna/ReligiousHeading";
import { Header } from "./krishna/Header";
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
        className="relative w-full max-w-[560px] aspect-[1122/1402] mx-auto rounded-3xl bg-[#FAF6F0] border border-[#E5DACD] shadow-2xl overflow-hidden p-4 sm:p-6 md:p-7 flex flex-col justify-between select-text"
        style={{
          backgroundColor: "#FAF6F0",
          boxShadow: "0 25px 50px -12px rgba(120, 80, 40, 0.15)",
        }}
      >
        {/* Subtle Architectural Inner Framing */}
        <div className="absolute inset-2 sm:inset-3 border border-[#E5DACD]/80 rounded-2xl sm:rounded-[22px] pointer-events-none z-0"></div>

        {/* Top Header Region (Religious Heading + Date + Two Company Names) */}
        <div className="relative z-10 space-y-0.5 sm:space-y-1">
          {/* First line — Religious Heading */}
          <ReligiousHeading heading={data.religiousHeading} />

          {/* Second & Third line — Date, Two Company Names & Subtitle */}
          <Header
            leftCompanyName={data.leftCompanyName || data.brandName}
            rightCompanyName={data.rightCompanyName}
            brandName={data.brandName}
            subtitle={data.subtitle}
            date={data.date}
          />
        </div>

        {/* SECTION 06 — Main Product Showcase (Two-Column Symmetrical Layout) */}
        <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-5 my-auto items-stretch">
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
