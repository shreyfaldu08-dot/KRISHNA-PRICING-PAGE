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
      {/* 1. Product Photography on Studio Pedestal */}
      <ProductImage src={product.imageSrc} alt={product.imageAlt} />

      {/* 2. Product Brand Name & Subtitle */}
      <div className="text-center mt-2 sm:mt-2.5">
        <h2 className="font-bold text-base sm:text-xl md:text-[22px] text-[#1E1B18] tracking-[0.1em] uppercase leading-none">
          {product.brandName}
        </h2>
        <p className="text-[8px] sm:text-[9.5px] md:text-[10.5px] font-semibold text-[#5A524A] tracking-[0.16em] uppercase mt-0.5">
          {product.subtitle}
        </p>
      </div>

      {/* 3. Wholesale Price Banner */}
      <ProductPriceBanner priceText={product.tinPrice} />

      {/* 4. Individual Product Prices (5 LTR & 1 LTR Side by Side) */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
        <PriceBox unit="5 LTR" price={product.canPrice} />
        <PriceBox unit="1 LTR" price={product.bottlePrice} />
      </div>
    </div>
  );
};
