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
      {/* 1. Cathedral Arch Product Presentation */}
      <ProductImage src={product.imageSrc} alt={product.imageAlt} />

      {/* 2. Product Brand Name & Subtitle in Blue Shade */}
      <div className="text-center mt-2">
        <h2 className="font-bold text-base sm:text-xl md:text-[22px] text-[#0F294A] tracking-[0.1em] uppercase leading-none">
          {product.brandName}
        </h2>
        <p className="text-[8px] sm:text-[9.5px] md:text-[10.5px] font-semibold text-[#2563EB] tracking-[0.16em] uppercase mt-0.5">
          {product.subtitle}
        </p>
      </div>

      {/* 3. Wholesale Tin Rate Banner */}
      <ProductPriceBanner priceText={product.tinPrice} />

      {/* 4. Open Typographic Dual Rates Strip (Clean line-separated columns, no square boxes!) */}
      <div className="flex items-center justify-around mt-1.5 pt-1.5 border-t border-[#BFDBFE]/70">
        <PriceBox unit="5 LTR CAN" price={product.canPrice} />
        <div className="w-[1px] h-6 sm:h-7 bg-[#93C5FD]/60"></div>
        <PriceBox unit="1 LTR BOTTLE" price={product.bottlePrice} />
      </div>
    </div>
  );
};
