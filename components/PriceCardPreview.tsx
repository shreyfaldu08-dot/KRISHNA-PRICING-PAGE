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
        className="relative w-full max-w-[560px] aspect-[1122/1402] mx-auto rounded-3xl bg-[#FAF5EF] border border-[#E5DACD] shadow-2xl overflow-hidden p-5 sm:p-7 md:p-8 flex flex-col justify-between select-text paper-texture"
        style={{
          boxShadow: "0 25px 50px -12px rgba(120, 80, 40, 0.15)",
        }}
      >
        {/* SECTION 05 — Decorative Botanical Illustrations */}
        <BotanicalDecoration />

        {/* Top Header Region (Religious Heading + Brand Heading + Date) */}
        <div className="relative z-10 space-y-1">
          {/* SECTION 02 — Top Religious Heading */}
          <ReligiousHeading heading={data.religiousHeading} />

          {/* SECTION 03 & 04 — Main Brand Heading, Subtitle & Date */}
          <Header
            brandName={data.brandName}
            subtitle={data.subtitle}
            date={data.date}
          />
        </div>

        {/* SECTION 06 — Main Product Showcase (Two-Column Symmetrical Layout) */}
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
