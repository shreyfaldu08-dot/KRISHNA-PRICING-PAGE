import React from "react";

interface ProductImageProps {
  src: string;
  alt: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ src, alt }) => {
  return (
    <div className="w-full aspect-[376/410] rounded-2xl sm:rounded-[24px] overflow-hidden select-none block bg-transparent shadow-xs">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-bottom select-none block"
        loading="eager"
      />
    </div>
  );
};
