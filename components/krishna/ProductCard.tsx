import React from "react";
import { ProductItem } from "@/types/pricing";
import { ProductImage } from "./ProductImage";
import { ProductPriceBanner } from "./ProductPriceBanner";
import { PriceBox } from "./PriceBox";

interface ProductCardProps {
  product: ProductItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex-1 flex flex-col justify-between">
      {/* 1. Product Photography */}
      <ProductImage src={product.imageSrc} alt={product.imageAlt} />

      {/* 2. Product Name & Subtitle */}
      <div className="text-center mt-3 sm:mt-4">
        <h2 className="font-serif-title font-bold text-xl sm:text-2xl md:text-[28px] text-[#292725] tracking-[0.1em] uppercase leading-none">
          {product.brandName}
        </h2>
        <p className="font-serif-title text-[9px] sm:text-[11px] md:text-[12px] font-bold text-[#57534E] tracking-[0.16em] uppercase mt-1">
          {product.subtitle}
        </p>
      </div>

      {/* 3. Wholesale Price Banner */}
      <ProductPriceBanner priceText={product.tinPrice} />

      {/* 4. Individual Product Prices (5 LTR & 1 LTR Side by Side) */}
      <div className="flex gap-2 sm:gap-2.5 mt-2 sm:mt-2.5">
        <PriceBox unit="5 LTR" price={product.canPrice} />
        <PriceBox unit="1 LTR" price={product.bottlePrice} />
      </div>
    </div>
  );
};

