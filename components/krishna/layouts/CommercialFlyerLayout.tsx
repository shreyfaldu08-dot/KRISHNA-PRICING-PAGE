import React from "react";
import { CatalogueData, ColorPalette, ProductItem, getWholesaleRates } from "@/types/pricing";
import { ProductPriceBanner } from "../ProductPriceBanner";
import { Sparkles, ShieldCheck, Award } from "lucide-react";

interface LayoutProps {
  data: CatalogueData;
  palette: ColorPalette;
}

interface CommercialProductCardProps {
  product: ProductItem;
  palette: ColorPalette;
  badgeText: string;
}

const CommercialProductCard: React.FC<CommercialProductCardProps> = ({
  product,
  palette,
  badgeText,
}) => {
  const { price15L: val15L, price15kg: val15kg } = getWholesaleRates(product);
  const cleanCanPrice = (product.canPrice || "").replace(/^₹\s*/, "").trim();
  const cleanBottlePrice = (product.bottlePrice || "").replace(/^₹\s*/, "").trim();

  return (
    <div className="flex-1 flex flex-col justify-between items-center relative">
      {/* 1. 3D Spotlight & Product Pedestal */}
      <div className="relative w-full flex flex-col items-center">
        {/* Ambient Radial Spotlight behind Product */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full blur-xl pointer-events-none opacity-40 z-0"
          style={{ backgroundColor: palette.accentSecondary }}
        />

        {/* Product Photo on Elevated Frame */}
        <div className="relative z-10 w-[145px] aspect-[776/1024] max-h-[190px] rounded-2xl overflow-hidden shadow-[0_12px_24px_-6px_rgba(0,0,0,0.18)] border-2 border-white bg-white select-none">
          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            className="w-full h-full object-cover object-center block"
            loading="eager"
          />
        </div>

        {/* 3D Pedestal Podium Oval Shadow */}
        <div
          className="w-28 h-2.5 rounded-full blur-[3px] -mt-1.5 z-0 opacity-35"
          style={{ backgroundColor: palette.textCharcoal }}
        />
      </div>

      {/* 2. Commercial Brand Typography & Badge */}
      <div className="text-center mt-2.5 w-full">
        <h2
          className="font-black text-[25px] tracking-tight uppercase leading-none transition-colors duration-200"
          style={{ color: palette.brandNameColor || palette.accentPrimary }}
        >
          {product.brandName}
        </h2>

        {/* Category Pill Tag */}
        <div className="inline-block mt-1">
          <span
            className="text-[9.5px] font-extrabold tracking-[0.16em] uppercase py-0.5 px-2 rounded-full border bg-white/90 shadow-2xs leading-none inline-block"
            style={{
              color: palette.textSupporting,
              borderColor: palette.borderColor,
            }}
          >
            {product.subtitle}
          </span>
        </div>
      </div>

      {/* 3. Main Wholesale Card with 15L / 15KG Eye Visibility & Fixed Size */}
      <ProductPriceBanner
        product={product}
        palette={palette}
        isHero={false}
      />

      {/* 4. Retail Pack Prices (5L Can & 1L Bottle 3D Cards) */}
      <div className="grid grid-cols-2 gap-2 w-full mt-2">
        {/* 5 LTR Can Card */}
        <div
          className="bg-white rounded-xl border p-1.5 text-center shadow-xs transition-colors"
          style={{ borderColor: palette.borderColor }}
        >
          <div
            className="text-[8.5px] font-extrabold uppercase tracking-wider leading-none"
            style={{ color: palette.textSupporting }}
          >
            5 LTR CAN
          </div>
          <div
            className="text-[17px] font-black leading-none mt-1 tracking-tight"
            style={{ color: palette.accentPrimary }}
          >
            ₹ {cleanCanPrice}
          </div>
        </div>

        {/* 1 LTR Bottle Card */}
        <div
          className="bg-white rounded-xl border p-1.5 text-center shadow-xs transition-colors"
          style={{ borderColor: palette.borderColor }}
        >
          <div
            className="text-[8.5px] font-extrabold uppercase tracking-wider leading-none"
            style={{ color: palette.textSupporting }}
          >
            1 LTR BOTTLE
          </div>
          <div
            className="text-[17px] font-black leading-none mt-1 tracking-tight"
            style={{ color: palette.accentPrimary }}
          >
            ₹ {cleanBottlePrice}
          </div>
        </div>
      </div>
    </div>
  );
};

export const CommercialFlyerLayout: React.FC<LayoutProps> = ({ data, palette }) => {
  const isSingleCotton = data.productMode === "cotton";
  const isSingleGroundnut = data.productMode === "groundnut";
  const singleProduct = isSingleCotton
    ? data.trupti
    : isSingleGroundnut
    ? data.krishna
    : null;

  const leftCompany = data.leftCompanyName || data.brandName || "KRISHNA EXPORT. INDUSTRIES";
  const rightCompany = data.rightCompanyName || "SHREE KRISHNA OIL MILL";

  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between">
      {/* 1. Bold Top Commercial Header Ribbon */}
      <div className="space-y-1.5 pt-0.5">
        {/* Upper Top Ribbon with Date & Auspicious Heading */}
        <div
          className="w-full py-1.5 px-3.5 rounded-2xl shadow-sm flex items-center justify-between transition-colors duration-200"
          style={{
            backgroundColor: palette.accentPrimary,
            color: "#FFFFFF",
          }}
        >
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span className="font-devanagari font-black text-[14px] tracking-widest uppercase">
              {data.religiousHeading}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[9.5px] font-extrabold uppercase tracking-widest opacity-85">
              DAILY EX-MILL RATE
            </span>
            <span className="py-0.5 px-2.5 rounded-full bg-white text-slate-900 font-black text-[12px] tracking-wider shadow-2xs">
              {data.date}
            </span>
          </div>
        </div>

        {/* Commercial Mill Identity Strip */}
        {isSingleCotton ? (
          <div
            className="text-center font-black text-[13px] tracking-wider uppercase py-1 border-b border-black/5"
            style={{ color: palette.textCharcoal }}
          >
            {leftCompany}
          </div>
        ) : isSingleGroundnut ? (
          <div
            className="text-center font-black text-[13px] tracking-wider uppercase py-1 border-b border-black/5"
            style={{ color: palette.textCharcoal }}
          >
            {rightCompany}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 text-center py-1 border-b border-black/5">
            <div
              className="font-black text-[11.5px] tracking-wider uppercase truncate"
              style={{ color: palette.textCharcoal }}
            >
              {leftCompany}
            </div>
            <div
              className="font-black text-[11.5px] tracking-wider uppercase truncate"
              style={{ color: palette.textCharcoal }}
            >
              {rightCompany}
            </div>
          </div>
        )}
      </div>

      {/* 2. Main Product Showcase */}
      {singleProduct ? (
        /* Single Product Hero Flyer */
        <div className="flex flex-col items-center my-auto w-full max-w-[380px] mx-auto px-2">
          {/* Spotlight & Large 3D Pedestal */}
          <div className="relative flex flex-col items-center">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-2xl opacity-40 z-0"
              style={{ backgroundColor: palette.accentSecondary }}
            />

            <div className="relative z-10 w-full max-w-[340px] aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_18px_36px_-8px_rgba(0,0,0,0.22)] border-2 border-white bg-white">
              <img
                src={singleProduct.horizontalImageSrc || singleProduct.imageSrc}
                alt={singleProduct.imageAlt}
                className="w-full h-full object-contain object-center block"
                loading="eager"
              />
            </div>

            <div
              className="w-40 h-3 rounded-full blur-[4px] -mt-1.5 z-0 opacity-40"
              style={{ backgroundColor: palette.textCharcoal }}
            />
          </div>

          {/* Brand Heading */}
          <div className="text-center mt-3">
            <h2
              className="font-black text-[32px] tracking-tight uppercase leading-none"
              style={{ color: palette.brandNameColor || palette.accentPrimary }}
            >
              {singleProduct.brandName}
            </h2>
            <div className="inline-block mt-1">
              <span
                className="text-[11px] font-extrabold tracking-[0.18em] uppercase py-0.5 px-3 rounded-full border bg-white shadow-2xs leading-none inline-block"
                style={{
                  color: palette.textSupporting,
                  borderColor: palette.borderColor,
                }}
              >
                {singleProduct.subtitle}
              </span>
            </div>
          </div>

          {/* Main Wholesale Card with 15L / 15KG Eye Visibility & Fixed Size */}
          <div className="w-full mt-3">
            <ProductPriceBanner
              product={singleProduct}
              palette={palette}
              isHero={true}
            />
          </div>

          {/* Retail 3D Boxes */}
          <div className="grid grid-cols-2 gap-3 w-full mt-2.5">
            <div
              className="bg-white rounded-2xl border p-2 text-center shadow-xs"
              style={{ borderColor: palette.borderColor }}
            >
              <div
                className="text-[10px] font-extrabold uppercase tracking-wider"
                style={{ color: palette.textSupporting }}
              >
                5 LITRE CAN
              </div>
              <div
                className="text-[20px] font-black leading-none mt-1"
                style={{ color: palette.accentPrimary }}
              >
                ₹ {singleProduct.canPrice.replace(/^₹\s*/, "").trim()}
              </div>
            </div>

            <div
              className="bg-white rounded-2xl border p-2 text-center shadow-xs"
              style={{ borderColor: palette.borderColor }}
            >
              <div
                className="text-[10px] font-extrabold uppercase tracking-wider"
                style={{ color: palette.textSupporting }}
              >
                1 LITRE BOTTLE
              </div>
              <div
                className="text-[20px] font-black leading-none mt-1"
                style={{ color: palette.accentPrimary }}
              >
                ₹ {singleProduct.bottlePrice.replace(/^₹\s*/, "").trim()}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Dual Product Showcase Side-by-Side */
        <div className="grid grid-cols-2 gap-5 my-auto px-1 items-stretch">
          <CommercialProductCard
            product={data.trupti}
            palette={palette}
            badgeText="REFINED COTTON"
          />
          <CommercialProductCard
            product={data.krishna}
            palette={palette}
            badgeText="PURE GROUNDNUT"
          />
        </div>
      )}

      {/* 3. Bottom Trust Seal & Ex-Factory Dock */}
      <div className="space-y-1.5 pb-0.5">
        <div
          className="w-full py-1.5 px-3 rounded-xl border bg-white/95 shadow-2xs flex items-center justify-between"
          style={{ borderColor: palette.borderColor }}
        >
          <div className="flex items-center gap-1.5">
            <ShieldCheck
              className="w-3.5 h-3.5"
              style={{ color: palette.accentPrimary }}
            />
            <span
              className="font-extrabold text-[10px] tracking-wider uppercase"
              style={{ color: palette.textCharcoal }}
            >
              100% PURE QUALITY GUARANTEED
            </span>
          </div>

          <span
            className="font-black text-[11px] tracking-widest uppercase"
            style={{ color: palette.accentPrimary }}
          >
            {data.footerNotice}
          </span>

          <span
            className="font-extrabold text-[10px] tracking-wider uppercase opacity-80"
            style={{ color: palette.textSupporting }}
          >
            {data.footerLocation}
          </span>
        </div>
      </div>
    </div>
  );
};

