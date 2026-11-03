"use client";

import React, { forwardRef, useRef, useState, useEffect } from "react";
import { CatalogueData, getEffectivePalette } from "@/types/pricing";
import { BotanicalDecoration } from "./krishna/BotanicalDecoration";
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
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    // Smooth responsive scaling so mobile screens display the EXACT desktop canonical poster
    useEffect(() => {
      const updateScale = () => {
        if (!containerRef.current) return;
        const availableWidth = containerRef.current.offsetWidth;
        if (availableWidth > 0) {
          const targetScale = Math.min(1, Math.max(0.4, availableWidth / 540));
          setScale(targetScale);
        }
      };

      updateScale();

      const observer = new ResizeObserver(() => updateScale());
      if (containerRef.current) observer.observe(containerRef.current);
      window.addEventListener("resize", updateScale);

      return () => {
        observer.disconnect();
        window.removeEventListener("resize", updateScale);
      };
    }, []);

    return (
      <div
        ref={containerRef}
        className="w-full max-w-[540px] flex justify-center items-center overflow-visible"
      >
        {/* Scaled Artboard Viewport Wrapper */}
        <div
        id="poster-scale-wrapper"
        className="relative transition-all duration-100 origin-top-left"
        style={{
          width: `${Math.round(540 * scale)}px`,
          height: `${Math.round(675 * scale)}px`,
        }}
        >
        {/* Canonical 540x675 HD Poster Canvas (Always identical layout on Mobile & Desktop) */}
        <div
          ref={ref}
          id="price-card-canvas"
          className="w-[540px] h-[675px] max-w-[540px] max-h-[675px] rounded-none border shadow-2xl p-6 flex flex-col justify-between select-text transition-colors duration-200 origin-top-left"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            backgroundColor: palette.bgCanvas,
            borderColor: palette.borderColor,
            boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.12)",
          }}
        >
          {/* Minimal Inner Framing Line */}
          <div
            className="absolute inset-3 border rounded-none pointer-events-none z-0 transition-colors duration-200 opacity-60"
            style={{ borderColor: palette.frameColor }}
          />

          {/* Botanical Decoration Watermarks */}
          <BotanicalDecoration palette={palette} />

            {/* Top Header Region (Religious Heading + Date + Two Company Names) */}
            <div className="relative z-10 space-y-1.5 pt-0.5">
              <ReligiousHeading
                heading={data.religiousHeading}
                palette={palette}
              />
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
          <div className="relative z-10 grid grid-cols-2 gap-6 my-auto items-stretch px-1">
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
        </div>
      </div>
    );
  }
);

PriceCardPreview.displayName = "PriceCardPreview";
