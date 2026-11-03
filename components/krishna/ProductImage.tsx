import React from "react";

interface ProductImageProps {
  src: string;
  alt: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ src, alt }) => {
  return (
    <div className="w-full aspect-[378/420] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#F0E6D8] shadow-xs">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-center select-none block"
        loading="eager"
      />
    </div>
  );
};
