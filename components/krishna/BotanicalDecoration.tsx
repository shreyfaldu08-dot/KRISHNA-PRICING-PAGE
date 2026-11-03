import React from "react";

export const BotanicalDecoration: React.FC = () => {
  return (
    <>
      {/* Top-Left: Botanical Cotton Illustration in Soft Blue Ink */}
      <img
        src="/assets/botanical-cotton-top.png"
        alt=""
        aria-hidden="true"
        className="absolute -top-1 -left-1 w-20 sm:w-28 md:w-36 pointer-events-none select-none mix-blend-multiply opacity-40 z-0"
        style={{ filter: "hue-rotate(180deg) saturate(0.8) brightness(0.85)" }}
      />

      {/* Top-Right: Botanical Groundnut/Peanut Illustration in Soft Blue Ink */}
      <img
        src="/assets/botanical-peanut-top.png"
        alt=""
        aria-hidden="true"
        className="absolute -top-1 -right-1 w-20 sm:w-28 md:w-36 pointer-events-none select-none mix-blend-multiply opacity-40 z-0"
        style={{ filter: "hue-rotate(180deg) saturate(0.8) brightness(0.85)" }}
      />

      {/* Bottom-Left: Cotton Branch Sketch in Soft Blue Ink */}
      <img
        src="/assets/botanical-cotton-bottom.png"
        alt=""
        aria-hidden="true"
        className="absolute -bottom-1 -left-1 w-16 sm:w-24 md:w-32 pointer-events-none select-none mix-blend-multiply opacity-35 z-0"
        style={{ filter: "hue-rotate(180deg) saturate(0.8) brightness(0.85)" }}
      />

      {/* Bottom-Right: Peanuts Botanical Cluster Sketch in Soft Blue Ink */}
      <img
        src="/assets/botanical-peanut-bottom.png"
        alt=""
        aria-hidden="true"
        className="absolute -bottom-1 -right-1 w-16 sm:w-24 md:w-32 pointer-events-none select-none mix-blend-multiply opacity-35 z-0"
        style={{ filter: "hue-rotate(180deg) saturate(0.8) brightness(0.85)" }}
      />
    </>
  );
};
