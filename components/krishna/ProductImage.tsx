import React from "react";

interface ProductImageProps {
  src: string;
  alt: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ src, alt }) => {
  return (
    <div className="w-full aspect-[376/418] rounded-2xl sm:rounded-[28px] overflow-hidden select-none block bg-[#F7F3EB]">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-center select-none block"
        loading="eager"
      />
    </div>
  );
};
