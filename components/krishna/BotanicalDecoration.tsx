import React from "react";

export const BotanicalDecoration: React.FC = () => {
  return (
    <>
      {/* Top-Left: Botanical Cotton Illustration */}
      <img
        src="/assets/botanical-cotton-top.png"
        alt=""
        aria-hidden="true"
        className="absolute -top-1 -left-1 w-20 sm:w-28 md:w-36 pointer-events-none select-none mix-blend-multiply opacity-60 z-0"
      />

      {/* Top-Right: Botanical Groundnut/Peanut Illustration */}
      <img
        src="/assets/botanical-peanut-top.png"
        alt=""
        aria-hidden="true"
        className="absolute -top-1 -right-1 w-20 sm:w-28 md:w-36 pointer-events-none select-none mix-blend-multiply opacity-60 z-0"
      />

      {/* Bottom-Left: Cotton Branch Sketch */}
      <img
        src="/assets/botanical-cotton-bottom.png"
        alt=""
        aria-hidden="true"
        className="absolute -bottom-1 -left-1 w-16 sm:w-24 md:w-32 pointer-events-none select-none mix-blend-multiply opacity-50 z-0"
      />

      {/* Bottom-Right: Peanuts Botanical Cluster Sketch */}
      <img
        src="/assets/botanical-peanut-bottom.png"
        alt=""
        aria-hidden="true"
        className="absolute -bottom-1 -right-1 w-16 sm:w-24 md:w-32 pointer-events-none select-none mix-blend-multiply opacity-50 z-0"
      />
    </>
  );
};
