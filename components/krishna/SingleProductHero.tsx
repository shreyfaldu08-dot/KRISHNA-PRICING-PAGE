import React from "react";
import { ProductItem, ColorPalette } from "@/types/pricing";
import { ProductPriceBanner } from "./ProductPriceBanner";
import { PriceBox } from "./PriceBox";

interface SingleProductHeroProps {
  product: ProductItem;
  palette?: ColorPalette;
}

export const SingleProductHero: React.FC<SingleProductHeroProps> = ({
  product,
  palette,
}) => {
  const brandNameColor =
    palette?.brandNameColor || palette?.textCharcoal || "#111827";
  const textSupporting = palette?.textSupporting || "#2563EB";

  const isCotton =
    product.id === "trupti" ||
    product.brandName?.toLowerCase().includes("trupti") ||
    product.subtitle?.toLowerCase().includes("cotton");

  const heroImageSrc =
    product.horizontalImageSrc ||
    (isCotton
      ? "/assets/trupti-oil-horizontal.jpg"
      : "/assets/krishna-groundnut-horizontal.jpg");

  return (
    <div className="relative z-10 flex flex-col items-center justify-between my-auto -mt-2 mb-1 w-full max-w-[390px] mx-auto px-1 py-0.5">
      {/* 1. Large Hero Product Photography */}
      <div className="w-full max-w-[340px] aspect-[16/9] rounded-2xl overflow-hidden shadow-md select-none bg-[#F7F4EF] border border-black/5">
        <img
          src={heroImageSrc}
          alt={product.imageAlt}
          className="w-full h-full object-contain object-center select-none block"
          loading="eager"
        />
      </div>

      {/* 2. Hero Brand Name & Subtitle */}
      <div className="text-center mt-4.5">
        <h2
          className="font-black text-[30px] tracking-[0.08em] uppercase leading-none transition-colors duration-200"
          style={{ color: brandNameColor }}
        >
          {product.brandName}
        </h2>
        <p
          className="text-[12px] font-bold tracking-[0.18em] uppercase mt-1.5 transition-colors duration-200"
          style={{ color: textSupporting }}
        >
          {product.subtitle}
        </p>
      </div>

      {/* 3. Wholesale Tin Rate Capsule Banner */}
      <div className="w-full max-w-[340px] mt-2">
        <ProductPriceBanner
          product={product}
          priceText={product.tinPrice}
          price15L={product.tin15LPrice}
          price15kg={product.tin15kgPrice}
          palette={palette}
          isHero={true}
        />
      </div>

      {/* 4. Retail Prices (5 LTR Can & 1 LTR Bottle Side-by-Side) */}
      <div className="flex gap-3.5 w-full max-w-[340px] mt-2">
        <PriceBox unit="5 LTR" price={product.canPrice} palette={palette} />
        <PriceBox unit="1 LTR" price={product.bottlePrice} palette={palette} />
      </div>
    </div>
  );
};
