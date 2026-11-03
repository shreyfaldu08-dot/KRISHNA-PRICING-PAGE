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
  activeTab?: string;
}

export const PriceCardPreview = forwardRef<HTMLDivElement, PriceCardPreviewProps>(
  ({ data, activeTab }, ref) => {
    const palette = getEffectivePalette(data.theme, data.customColor);
    const containerRef = useRef<HTMLDivElement>(null);

    // Compute scale accurately based on available width or viewport
    const calculateScale = () => {
      let availableWidth = 540;
      const maxScreenAvailable =
        typeof window !== "undefined" ? window.innerWidth - 32 : 540;

      if (containerRef.current && containerRef.current.offsetWidth > 0) {
        availableWidth = Math.min(containerRef.current.offsetWidth, maxScreenAvailable);
      } else if (typeof window !== "undefined") {
        availableWidth = Math.min(540, window.innerWidth - 48);
      }
      return Math.min(1, Math.max(0.4, Number((availableWidth / 540).toFixed(4))));
    };

      const [scale, setScale] = useState(() => {
        if (typeof window !== "undefined") {
          const initialWidth = Math.min(540, window.innerWidth - 48);
          return Math.min(1, Math.max(0.4, Number((initialWidth / 540).toFixed(4))));
        }
        return 1;
      });

      // Smooth responsive scaling so mobile screens display the EXACT desktop canonical poster
      useEffect(() => {
        const updateScale = () => {
          const nextScale = calculateScale();
          setScale(nextScale);
        };

        // Run immediately and with slight delays to accommodate CSS rendering transitions
        updateScale();
        const timer1 = setTimeout(updateScale, 50);
        const timer2 = setTimeout(updateScale, 150);

        const observer = new ResizeObserver(() => updateScale());
        if (containerRef.current) observer.observe(containerRef.current);
        window.addEventListener("resize", updateScale);

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
          observer.disconnect();
          window.removeEventListener("resize", updateScale);
        };
      }, [activeTab]);

            return (
          <div
            ref={containerRef}
            className="w-full max-w-[540px] flex justify-center items-center overflow-hidden"
          >
            {/* Scaled Artboard Viewport Wrapper */}
            <div
              id="poster-scale-wrapper"
              className="relative shrink-0 transition-all duration-100 overflow-hidden"
              style={{
                width: `${Math.round(540 * scale)}px`,
                height: `${Math.round(675 * scale)}px`,
              }}
            >
              {/* Canonical 540x675 HD Poster Canvas (Always identical layout on Mobile & Desktop) */}
              <div
                ref={ref}
                id="price-card-canvas"
                className="absolute top-0 left-0 w-[540px] h-[675px] max-w-[540px] max-h-[675px] shrink-0 rounded-none border shadow-2xl p-6 flex flex-col justify-between select-text transition-colors duration-200"
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
