import React from "react";

export const BotanicalDecoration: React.FC = () => {
  return (
    <>
      {/* Top-Left: Botanical Cotton Illustration */}
      <img
        src="/assets/botanical-cotton-top.png"
        alt=""
        aria-hidden="true"
        className="absolute top-1 sm:top-2 left-0 w-24 sm:w-32 md:w-40 pointer-events-none select-none mix-blend-multiply opacity-75 z-0"
      />

      {/* Top-Right: Botanical Groundnut/Peanut Illustration */}
      <img
        src="/assets/botanical-peanut-top.png"
        alt=""
        aria-hidden="true"
        className="absolute top-1 sm:top-2 right-0 w-24 sm:w-32 md:w-40 pointer-events-none select-none mix-blend-multiply opacity-75 z-0"
      />

      {/* Bottom-Left: Cotton Branch Sketch */}
      <img
        src="/assets/botanical-cotton-bottom.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-20 sm:w-28 md:w-36 pointer-events-none select-none mix-blend-multiply opacity-70 z-0"
      />

      {/* Bottom-Right: Peanuts Botanical Cluster Sketch */}
      <img
        src="/assets/botanical-peanut-bottom.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-20 sm:w-28 md:w-36 pointer-events-none select-none mix-blend-multiply opacity-70 z-0"
      />
    </>
  );
};

