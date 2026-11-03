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
  const [sharingWhatsApp, setSharingWhatsApp] = useState(false);
  const [copyingMsg, setCopyingMsg] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  // Directly captures the canonical 540x675 poster with guaranteed square corners, solid background, and 1080x1350 resolution (100% identical on mobile and desktop)
  const capturePoster = async (
    action: "download" | "copy"
  ): Promise<string | Blob | null> => {
    const element = cardRef.current;
    if (!element) return null;

    const palette = getEffectivePalette(data.theme, data.customColor);

    // 1. Save original styles of element, wrapper, and document body
    const origTransform = element.style.transform;
    const origBorderRadius = element.style.borderRadius;
    const origBoxShadow = element.style.boxShadow;
    const origMargin = element.style.margin;

    const wrapper = element.parentElement;
    const origWrapperWidth = wrapper?.style.width;
    const origWrapperHeight = wrapper?.style.height;
    const origWrapperOverflow = wrapper?.style.overflow;

    const origBodyOverflow = document.body.style.overflow;
    const origHtmlOverflow = document.documentElement.style.overflow;

    // 2. Temporarily set canonical 540x675 at scale 1 with square corners
    element.style.transform = "none";
    element.style.borderRadius = "0px";
    element.style.boxShadow = "none";
    element.style.margin = "0px";
    element.classList.remove("mx-auto");

    if (wrapper) {
      wrapper.style.overflow = "visible";
      wrapper.style.width = "540px";
      wrapper.style.height = "675px";
    }

    // Ensure document does not clip 540px canvas on narrow mobile screens during capture
    document.body.style.overflow = "visible";
    document.documentElement.style.overflow = "visible";

    try {
      // Allow browser to calculate layout at canonical 540x675
      await new Promise((res) => setTimeout(res, 60));

      const captureOptions = {
        quality: 1,
        pixelRatio: 2, // Exactly 1080px × 1350px (Standard HD 4:5 Retina)
        width: 540,
        height: 675,
        backgroundColor: palette.bgCanvas,
        cacheBust: true,
        style: {
          margin: "0px",
          marginLeft: "0px",
          marginRight: "0px",
          borderRadius: "0px",
          boxShadow: "none",
          transform: "none",
          left: "0px",
          top: "0px",
          width: "540px",
          height: "675px",
        },
      };

      if (action === "download") {
        // Use toBlob for highest reliability on iOS Safari & mobile Chrome
        return await toBlob(element, captureOptions);
      } else {
        return await toBlob(element, captureOptions);
      }
    } finally {
      // 3. Immediately restore original styles
      element.style.transform = origTransform;
      element.style.borderRadius = origBorderRadius;
      element.style.boxShadow = origBoxShadow;
      element.style.margin = origMargin;

      if (wrapper) {
        wrapper.style.overflow = origWrapperOverflow || "visible";
        if (origWrapperWidth) wrapper.style.width = origWrapperWidth;
        if (origWrapperHeight) wrapper.style.height = origWrapperHeight;
      }

      document.body.style.overflow = origBodyOverflow;
      document.documentElement.style.overflow = origHtmlOverflow;
    }
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    try {
      setDownloading(true);

      const blob = (await capturePoster("download")) as Blob | null;
      if (!blob) throw new Error("Capture failed");

      const dateStr = (data.date || "rates").replace(/[^a-zA-Z0-9_-]/g, "_");
      const fileName = `Krishna_Export_Rates_${dateStr}.png`;

      // Reliable object URL download (works flawlessly on iOS Safari, Android Chrome, and Desktop)
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = fileName;
      link.href = objectUrl;
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(objectUrl);
      }, 1500);

      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (err) {
      console.error("Failed to generate image:", err);
      // Fallback: direct capture toPng
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
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
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
        alert("Direct image copy is not supported on this mobile browser. Please use 'Download Poster' to save to your photos.");
      }
    } catch (err) {
      console.error("Failed to copy image:", err);
      alert("Please use 'Download Poster' to save the HD poster directly.");
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
    if (!cardRef.current) return;
    try {
      setCopyingMsg(true);
      const broadcastText = generateBroadcastText();

      // Capture HD poster image blob
      const blob = (await capturePoster("copy")) as Blob | null;

      if (blob && navigator.clipboard && window.ClipboardItem) {
        try {
          // Write both image and text simultaneously to clipboard
          const item = new ClipboardItem({
            "image/png": blob,
            "text/plain": new Blob([broadcastText], { type: "text/plain" }),
          });
          await navigator.clipboard.write([item]);
          setCopiedMsg(true);
          setTimeout(() => setCopiedMsg(false), 2500);
          return;
        } catch (errCombined) {
          console.warn("Combined clipboard not supported, copying image:", errCombined);
          // Fallback: write image blob to clipboard
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);
          setCopiedMsg(true);
          setTimeout(() => setCopiedMsg(false), 2500);
          return;
        }
      }

      // Fallback if ClipboardItem not supported
      await navigator.clipboard.writeText(broadcastText);
      setCopiedMsg(true);
      setTimeout(() => setCopiedMsg(false), 2500);
    } catch (err) {
      console.error("Failed to copy message:", err);
      try {
        await navigator.clipboard.writeText(generateBroadcastText());
        setCopiedMsg(true);
        setTimeout(() => setCopiedMsg(false), 2500);
      } catch (e) {
        alert("Failed to copy to clipboard.");
      }
    } finally {
      setCopyingMsg(false);
    }
  };

  const handleShareWhatsApp = async () => {
    if (!cardRef.current) return;
    try {
      setSharingWhatsApp(true);
      const broadcastText = generateBroadcastText();
      const dateStr = (data.date || "rates").replace(/[^a-zA-Z0-9_-]/g, "_");
      const fileName = `Krishna_Export_Rates_${dateStr}.png`;

      // 1. Capture HD poster image blob
      const blob = (await capturePoster("copy")) as Blob | null;

      // 2. Check if native Web Share API with files is supported (mobile iOS/Android)
      if (blob && typeof navigator !== "undefined" && navigator.canShare) {
        const file = new File([blob], fileName, { type: "image/png" });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `KRISHNA EXPORT RATES - ${data.date}`,
            text: broadcastText,
          });
          return;
        }
      }

      // 3. Desktop / non-file fallback:
      // Auto-copy both image and text to clipboard so user can press Ctrl+V in WhatsApp Web
      if (blob && navigator.clipboard && window.ClipboardItem) {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              "image/png": blob,
              "text/plain": new Blob([broadcastText], { type: "text/plain" }),
            }),
          ]);
        } catch (e) {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ "image/png": blob }),
            ]);
          } catch {}
        }
      }

      const encoded = encodeURIComponent(broadcastText);
      const isMobile =
        typeof navigator !== "undefined" &&
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      if (isMobile) {
        window.location.href = `whatsapp://send?text=${encoded}`;
        setTimeout(() => {
          window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank");
        }, 600);
      } else {
        window.open(`https://web.whatsapp.com/send?text=${encoded}`, "_blank");
      }
    } catch (err: any) {
      if (err?.name === "AbortError") {
        // User cancelled native share sheet
        return;
      }
      console.error("Failed to share via WhatsApp:", err);
      const encoded = encodeURIComponent(generateBroadcastText());
      window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank");
    } finally {
      setSharingWhatsApp(false);
    }
  };

  return (
    <div className="py-2.5 px-3 sm:px-4 rounded-2xl sm:rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
      {/* Primary Capsule CTA — Full Width on Mobile */}
      <button
        onClick={handleDownloadImage}
        disabled={downloading}
        type="button"
        className="w-full sm:flex-1 py-3 px-4 sm:px-6 rounded-full bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-50 shadow-sm"
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

      {/* Utility Actions — Balanced Grid */}
      <div className="grid grid-cols-3 sm:flex sm:items-center gap-1.5 w-full sm:w-auto">
        {/* WhatsApp Share with Poster Image */}
        <button
          onClick={handleShareWhatsApp}
          disabled={sharingWhatsApp}
          type="button"
          className="py-2.5 px-2.5 sm:px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5 transition cursor-pointer shadow-xs disabled:opacity-60"
          title="Share poster image and rates directly to WhatsApp"
        >
          {sharingWhatsApp ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
              <span className="truncate">Sharing...</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-emerald-100" />
              <span className="truncate">WhatsApp</span>
            </>
          )}
        </button>

        {/* Copy Image & Message */}
        <button
          onClick={handleCopyBroadcast}
          disabled={copyingMsg}
          type="button"
          className="py-2.5 px-2 sm:px-3.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5 transition cursor-pointer disabled:opacity-60"
          title="Copy poster image and rates to clipboard"
        >
          {copyingMsg ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-500" />
          ) : copiedMsg ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-extrabold truncate">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span className="truncate">Copy Msg</span>
            </>
          )}
        </button>

        {/* Copy Image Only */}
        <button
          onClick={handleCopyImage}
          disabled={copyingImage}
          type="button"
          className="py-2.5 px-2 sm:px-3.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5 transition cursor-pointer disabled:opacity-60"
          title="Copy HD poster image only to clipboard"
        >
          {copyingImage ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-500" />
          ) : copiedImage ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-extrabold truncate">Copied</span>
            </>
          ) : (
            <>
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span className="truncate">Copy Img</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
