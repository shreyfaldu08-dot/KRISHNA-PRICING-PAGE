import React from "react";

interface ProductImageProps {
  src: string;
  alt: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ src, alt }) => {
  return (
    <div className="w-full aspect-[1/1] rounded-2xl overflow-hidden bg-gradient-to-b from-[#F0F7FF] to-[#E2EDFA] border border-[#BFDBFE]/60 shadow-2xs">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-center select-none block"
        loading="eager"
      />
    </div>
  );
};
