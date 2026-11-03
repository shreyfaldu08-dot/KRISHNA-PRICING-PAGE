"use client";

import React, { useState } from "react";
import { toPng, toBlob } from "html-to-image";
import confetti from "canvas-confetti";
import { CatalogueData } from "@/types/pricing";
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

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    try {
      setDownloading(true);
      await new Promise((res) => setTimeout(res, 80));

      const dataUrl = await toPng(cardRef.current, {
        quality: 0.98,
        pixelRatio: 3, // 3x retina clarity for crisp text and print/WhatsApp
        cacheBust: true,
      });

      const dateStr = (data.date || "rates").replace(/[^a-zA-Z0-9_-]/g, "_");
      const fileName = `Krishna_Export_Rates_${dateStr}.png`;

      const link = document.createElement("a");
      link.download = fileName;
      link.href = dataUrl;
      link.click();

      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (err) {
      console.error("Failed to generate image:", err);
      alert("Error generating image. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyImage = async () => {
    if (!cardRef.current) return;
    try {
      setCopyingImage(true);

      const blob = await toBlob(cardRef.current, {
        quality: 0.98,
        pixelRatio: 3,
        cacheBust: true,
      });

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
    text += `🏢 *${data.brandName || "KRISHNA EXPORT. INDUSTRIES"}*\n`;
    text += `📋 *${data.subtitle || "PRODUCT COLLECTION & WHOLESALE PRICE LIST"}*\n`;
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
    <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-xl shadow-blue-950/5 border border-blue-100/80">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        {/* Main High-Resolution Download Button */}
        <button
          onClick={handleDownloadImage}
          disabled={downloading}
          type="button"
          className="flex-1 py-3 px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 hover:from-blue-600 hover:to-indigo-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-blue-700/25 flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50"
        >
          {downloading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Rendering 3x HD PNG...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Download Poster PNG (3x HD)</span>
            </>
          )}
        </button>

        {/* Secondary Utility Actions */}
        <div className="flex items-center gap-2">
          {/* Copy Image to Clipboard */}
          <button
            onClick={handleCopyImage}
            disabled={copyingImage}
            type="button"
            className="flex-1 sm:flex-none py-3 px-3 rounded-xl sm:rounded-2xl bg-blue-50/80 hover:bg-blue-100 text-blue-900 border border-blue-100 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
            title="Copy image directly to clipboard"
          >
            {copyingImage ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
            ) : copiedImage ? (
              <>
                <Check className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-blue-700">Copied Image</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-blue-700" />
                <span className="hidden sm:inline">Copy Image</span>
              </>
            )}
          </button>

          {/* Copy WhatsApp Formatted Message Text */}
          <button
            onClick={handleCopyBroadcast}
            type="button"
            className="flex-1 sm:flex-none py-3 px-3 rounded-xl sm:rounded-2xl bg-blue-50/80 hover:bg-blue-100 text-blue-900 border border-blue-100 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
            title="Copy WhatsApp formatted message text"
          >
            {copiedText ? (
              <>
                <Check className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-blue-700">Copied Text</span>
              </>
            ) : (
              <>
                <FileText className="w-3.5 h-3.5 text-blue-700" />
                <span className="hidden sm:inline">Copy Text</span>
              </>
            )}
          </button>

          {/* Share directly on WhatsApp */}
          <button
            onClick={handleShareWhatsApp}
            type="button"
            className="flex-1 sm:flex-none py-3 px-3.5 rounded-xl sm:rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
            title="Open WhatsApp with rates prefilled"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
