import React from "react";

interface ProductImageProps {
  src: string;
  alt: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ src, alt }) => {
  return (
    <div className="relative w-full aspect-[378/395] rounded-t-[90px] sm:rounded-t-[110px] rounded-b-xl overflow-hidden bg-gradient-to-b from-[#EFF6FF] via-[#E2EDFA] to-[#D6E6F7] border border-[#93C5FD] p-1 shadow-xs">
      {/* Inner Nested Arch Window */}
      <div className="w-full h-full rounded-t-[84px] sm:rounded-t-[104px] rounded-b-lg overflow-hidden bg-white/40">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-center select-none block"
          loading="eager"
        />
      </div>
    </div>
  );
};
