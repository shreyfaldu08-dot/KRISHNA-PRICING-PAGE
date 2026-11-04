import React from "react";
import { ProductItem, ColorPalette } from "@/types/pricing";
import { ProductImage } from "./ProductImage";
import { ProductPriceBanner } from "./ProductPriceBanner";
import { PriceBox } from "./PriceBox";

interface ProductCardProps {
  product: ProductItem;
  palette?: ColorPalette;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, palette }) => {
  const brandNameColor = palette?.brandNameColor || palette?.textCharcoal || "#111827";
  const textSupporting = palette?.textSupporting || "#2563EB";

  return (
    <div className="flex-1 flex flex-col justify-between">
      {/* 1. Product Photography */}
      <ProductImage src={product.imageSrc} alt={product.imageAlt} />

      {/* 2. Product Name & Subtitle */}
      <div className="text-center mt-3.5">
        <h2
          className="font-black text-[26px] tracking-[0.06em] uppercase leading-none transition-colors duration-200"
          style={{ color: brandNameColor }}
        >
          {product.brandName}
        </h2>
        <p
          className="text-[11px] font-bold tracking-[0.16em] uppercase mt-1 transition-colors duration-200"
          style={{ color: textSupporting }}
        >
          {product.subtitle}
        </p>
      </div>

      {/* 3. Wholesale Price Banner */}
      <ProductPriceBanner product={product} priceText={product.tinPrice} price15L={product.tin15LPrice} price15kg={product.tin15kgPrice} palette={palette} />

      {/* 4. Individual Product Prices (5 LTR & 1 LTR Side by Side) */}
      <div className="flex gap-2.5 mt-2">
        <PriceBox unit="5 LTR" price={product.canPrice} palette={palette} />
        <PriceBox unit="1 LTR" price={product.bottlePrice} palette={palette} />
      </div>
    </div>
  );
};
