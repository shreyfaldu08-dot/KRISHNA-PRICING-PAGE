"use client";

import React, { forwardRef } from "react";
import { CatalogueData } from "@/types/pricing";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { ContemporaryTemplate } from "./templates/ContemporaryTemplate";
import { HeritageTemplate } from "./templates/HeritageTemplate";

interface PriceCardPreviewProps {
  data: CatalogueData;
}

export const PriceCardPreview = forwardRef<HTMLDivElement, PriceCardPreviewProps>(
  ({ data }, ref) => {
    const style = data.templateStyle || "minimal";

    return (
      <div
        ref={ref}
        id="price-card-canvas"
        className="relative w-full max-w-[520px] aspect-[4/5] mx-auto rounded-3xl shadow-xl overflow-hidden border border-amber-950/10 select-text"
        style={{
          boxShadow: "0 20px 45px -10px rgba(120, 80, 40, 0.18)",
        }}
      >
        {style === "contemporary" && <ContemporaryTemplate data={data} />}
        {style === "heritage" && <HeritageTemplate data={data} />}
        {(style === "minimal" || !style) && <MinimalTemplate data={data} />}
      </div>
    );
  }
);

PriceCardPreview.displayName = "PriceCardPreview";
