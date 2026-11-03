"use client";

import React, { useState } from "react";
import { toPng, toBlob } from "html-to-image";
import confetti from "canvas-confetti";
import { CatalogueData, getEffectivePalette } from "@/types/pricing";
import {
  Download,
  Copy,
  Check,
  Loader2,
  Share2,
  FileText,
} from "lucide-react";

interface ExportActionsProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
  data: CatalogueData;
}

export const ExportActions: React.FC<ExportActionsProps> = ({
  cardRef,
  data,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [copyingImage, setCopyingImage] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Directly captures the live element with guaranteed square corners and solid theme background
  const capturePoster = async (
    action: "download" | "copy"
  ): Promise<string | Blob | null> => {
    const element = cardRef.current;
    if (!element) return null;

    const palette = getEffectivePalette(data.theme, data.customColor);

    // 1. Save original styles
    const origWidth = element.style.width;
    const origHeight = element.style.height;
    const origMaxWidth = element.style.maxWidth;
    const origMaxHeight = element.style.maxHeight;
    const origMargin = element.style.margin;
    const origMarginLeft = element.style.marginLeft;
    const origMarginRight = element.style.marginRight;
    const origBorderRadius = element.style.borderRadius;
    const origBoxShadow = element.style.boxShadow;
    const origTransform = element.style.transform;
    const origPosition = element.style.position;
    const origLeft = element.style.left;

    // 2. Temporarily set canonical 540x675 dimensions, zero margin, square corners & solid background
    element.style.width = "540px";
    element.style.height = "675px";
    element.style.maxWidth = "540px";
    element.style.maxHeight = "675px";
    element.style.margin = "0px";
    element.style.marginLeft = "0px";
    element.style.marginRight = "0px";
    element.style.borderRadius = "0px";
    element.style.boxShadow = "none";
    element.style.transform = "none";
    element.style.position = "relative";
    element.style.left = "0px";

    element.classList.remove("mx-auto");

    try {
      // Allow browser to calculate layout at 540x675 with zero margin
      await new Promise((res) => setTimeout(res, 80));

      const captureOptions = {
        quality: 1,
        pixelRatio: 2, // 540 * 2 = 1080 px, 675 * 2 = 1350 px
        width: 540,
        height: 675,
        backgroundColor: palette.bgCanvas,
        cacheBust: true,
        style: {
          margin: "0px",
          marginLeft: "0px",
          marginRight: "0px",
          borderRadius: "0px",
          transform: "none",
          left: "0px",
          top: "0px",
          position: "relative",
          width: "540px",
          height: "675px",
        },
      };

      if (action === "download") {
        return await toPng(element, captureOptions);
      } else {
        return await toBlob(element, captureOptions);
      }
    } finally {
      // 3. Immediately restore original styles
      element.style.width = origWidth;
      element.style.height = origHeight;
      element.style.maxWidth = origMaxWidth;
      element.style.maxHeight = origMaxHeight;
      element.style.margin = origMargin;
      element.style.marginLeft = origMarginLeft;
      element.style.marginRight = origMarginRight;
      element.style.borderRadius = origBorderRadius;
      element.style.boxShadow = origBoxShadow;
      element.style.transform = origTransform;
      element.style.position = origPosition;
      element.style.left = origLeft;
    }
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    try {
      setDownloading(true);

      const dataUrl = (await capturePoster("download")) as string | null;
      if (!dataUrl) throw new Error("Capture failed");

      const dateStr = (data.date || "rates").replace(/[^a-zA-Z0-9_-]/g, "_");
      const fileName = `Krishna_Export_Rates_${dateStr}.png`;

      const link = document.createElement("a");
      link.download = fileName;
      link.href = dataUrl;
      link.click();

      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (err) {
      console.error("Failed to generate image:", err);
      // Fallback: direct capture without resize
      try {
        if (cardRef.current) {
          const palette = getEffectivePalette(data.theme, data.customColor);
          const directUrl = await toPng(cardRef.current, {
            quality: 0.98,
            pixelRatio: 2,
            backgroundColor: palette.bgCanvas,
            style: {
              borderRadius: "0px",
              boxShadow: "none",
              margin: "0px",
              marginLeft: "0px",
              marginRight: "0px",
            },
          });
          const link = document.createElement("a");
          link.download = `Krishna_Export_Rates.png`;
          link.href = directUrl;
          link.click();
        }
      } catch (fallbackErr) {
        alert("Error generating image. Please try again.");
      }
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyImage = async () => {
    if (!cardRef.current) return;
    try {
      setCopyingImage(true);

      const blob = (await capturePoster("copy")) as Blob | null;
      if (!blob) throw new Error("Could not create image blob");

      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": blob,
          }),
        ]);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 2500);
      } else {
        alert("Clipboard Image copy is not supported in this browser. Please use 'Download Poster PNG'.");
      }
    } catch (err) {
      console.error("Failed to copy image:", err);
      alert("Could not copy image. You can click 'Download Poster PNG' instead.");
    } finally {
      setCopyingImage(false);
    }
  };

  const generateBroadcastText = () => {
    let text = `🙏 *${data.religiousHeading || "जय श्री कृष्णा"}*\n`;
    text += `🏢 *${data.leftCompanyName || data.brandName || "KRISHNA EXPORT. INDUSTRIES"}* | *${data.rightCompanyName || "SHREE KRISHNA OIL MILL"}*\n`;
    if (data.subtitle) text += `📋 *${data.subtitle}*\n`;
    text += `📅 *Date:* ${data.date}\n\n`;

    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `🌿 *${data.trupti.brandName}* (${data.trupti.subtitle})\n`;
    text += `• Wholesale Tin: ₹ ${data.trupti.tinPrice} + NEW TIN\n`;
    text += `• 5 LTR Can: ₹ ${data.trupti.canPrice}\n`;
    text += `• 1 LTR Bottle: ₹ ${data.trupti.bottlePrice}\n\n`;

    text += `🥜 *${data.krishna.brandName}* (${data.krishna.subtitle})\n`;
    text += `• Wholesale Tin: ₹ ${data.krishna.tinPrice} + NEW TIN\n`;
    text += `• 5 LTR Can: ₹ ${data.krishna.canPrice}\n`;
    text += `• 1 LTR Bottle: ₹ ${data.krishna.bottlePrice}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

    text += `⚠️ *${data.footerNotice}*\n`;
    text += `📍 *${data.footerLocation}*\n`;

    return text;
  };

  const handleCopyBroadcast = async () => {
    try {
      const text = generateBroadcastText();
      await navigator.clipboard.writeText(text);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    } catch (err) {
      console.error("Failed to copy text:", err);
      alert("Failed to copy message text.");
    }
  };

  const handleShareWhatsApp = () => {
    const text = generateBroadcastText();
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  return (
    <div className="py-2.5 px-3 sm:px-4 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
      {/* Primary Capsule CTA */}
      <button
        onClick={handleDownloadImage}
        disabled={downloading}
        type="button"
        className="flex-1 py-3 px-6 rounded-full bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-50 shadow-sm"
      >
        {downloading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-slate-300" />
            <span>Rendering 3x Retina PNG...</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4 text-slate-300" />
            <span>Download Poster (3x HD PNG)</span>
          </>
        )}
      </button>

      {/* Utility Actions */}
      <div className="flex items-center gap-1.5 self-center sm:self-auto">
        {/* Copy Image */}
        <button
          onClick={handleCopyImage}
          disabled={copyingImage}
          type="button"
          className="py-2.5 px-3.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
          title="Copy image to clipboard"
        >
          {copyingImage ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-500" />
          ) : copiedImage ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>Copy Image</span>
            </>
          )}
        </button>

        {/* Copy Text */}
        <button
          onClick={handleCopyBroadcast}
          type="button"
          className="py-2.5 px-3.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
          title="Copy broadcast formatted text"
        >
          {copiedText ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Copied</span>
            </>
          ) : (
            <>
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Copy Text</span>
            </>
          )}
        </button>

        {/* WhatsApp Share in Emerald */}
        <button
          onClick={handleShareWhatsApp}
          type="button"
          className="py-2.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
          title="Share rates directly to WhatsApp"
        >
          <Share2 className="w-3.5 h-3.5 text-emerald-100" />
          <span>WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
