import React from "react";

export const BotanicalDecoration: React.FC = () => {
  return (
    <>
      {/* Upper-Left: Botanical Cotton Plant Line-Art (Pure Vector SVG) */}
      <svg
        viewBox="0 0 160 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 w-28 sm:w-36 md:w-44 pointer-events-none select-none z-0 opacity-75"
        aria-hidden="true"
      >
        {/* Main Curved Stem */}
        <path
          d="M 5,-10 C 20,35 40,85 32,165"
          stroke="#BD8665"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Branch 1 to Upper Cotton Boll */}
        <path
          d="M 22,40 C 45,45 75,38 105,48"
          stroke="#BD8665"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        {/* Branch 2 to Lower Cotton Boll */}
        <path
          d="M 30,95 C 60,105 95,108 128,122"
          stroke="#BD8665"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        {/* Open Cotton Boll 1 (Tufts & Bracts) */}
        <path
          d="M 105,48 C 100,42 98,34 104,28 C 110,22 120,24 125,30 C 131,24 140,26 143,33 C 146,40 142,48 136,52 C 140,58 138,68 130,70 C 122,72 114,67 112,60 C 105,62 98,56 105,48 Z"
          stroke="#BD8665"
          strokeWidth="1.1"
          fill="#FAF5EE"
          fillOpacity="0.4"
        />
        {/* Calyx Leaves for Boll 1 */}
        <path
          d="M 98,48 Q 112,50 115,55 M 102,40 Q 112,38 116,42 M 106,56 Q 116,58 118,63"
          stroke="#BD8665"
          strokeWidth="0.9"
        />
        {/* Open Cotton Boll 2 */}
        <path
          d="M 128,122 C 124,116 122,108 128,103 C 134,98 143,100 148,106 C 153,101 161,103 164,109 C 167,115 163,123 158,126 C 161,132 158,140 151,142 C 144,143 137,139 135,133 C 129,134 123,129 128,122 Z"
          stroke="#BD8665"
          strokeWidth="1.1"
          fill="#FAF5EE"
          fillOpacity="0.4"
        />
        {/* Delicate Cotton Leaves with Veins */}
        <path
          d="M 15,20 C 5,22 -2,12 8,5 C 20,0 28,12 15,20 Z"
          stroke="#BD8665"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path d="M 8,5 Q 14,12 15,20" stroke="#BD8665" strokeWidth="0.7" />
        <path
          d="M 28,75 C 42,70 54,80 48,92 C 40,102 26,90 28,75 Z"
          stroke="#BD8665"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path d="M 28,75 Q 40,82 48,92" stroke="#BD8665" strokeWidth="0.7" />
      </svg>

      {/* Upper-Right: Botanical Groundnut/Peanut Plant Line-Art (Pure Vector SVG) */}
      <svg
        viewBox="0 0 160 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 right-0 w-28 sm:w-36 md:w-44 pointer-events-none select-none z-0 opacity-75"
        aria-hidden="true"
      >
        {/* Main Curved Peanut Vine */}
        <path
          d="M 155,-10 C 140,35 120,85 128,165"
          stroke="#BD8665"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Branch 1 */}
        <path
          d="M 138,40 C 115,45 85,38 55,48"
          stroke="#BD8665"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        {/* Branch 2 to Peanut Pod */}
        <path
          d="M 130,95 C 100,105 65,110 35,124"
          stroke="#BD8665"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        {/* Textured Peanut Pod (with waist constriction) */}
        <path
          d="M 52,48 C 45,44 32,45 25,52 C 18,59 20,68 28,72 C 24,78 26,88 34,92 C 42,96 52,92 56,84 C 54,77 50,72 52,65 C 56,58 56,52 52,48 Z"
          stroke="#BD8665"
          strokeWidth="1.1"
          fill="#FAF5EE"
          fillOpacity="0.4"
        />
        {/* Pod Surface Reticulation Lines */}
        <path
          d="M 28,54 Q 38,58 48,54 M 26,64 Q 38,68 50,63 M 28,74 Q 40,78 48,76 M 34,84 Q 44,86 52,82"
          stroke="#BD8665"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        {/* Paired Peanut Leaflets */}
        <path
          d="M 115,30 C 102,20 90,26 95,38 C 100,50 114,44 115,30 Z"
          stroke="#BD8665"
          strokeWidth="1"
        />
        <path d="M 115,30 Q 104,34 95,38" stroke="#BD8665" strokeWidth="0.7" />
        <path
          d="M 125,75 C 110,68 98,75 104,88 C 110,100 124,92 125,75 Z"
          stroke="#BD8665"
          strokeWidth="1"
        />
        <path d="M 125,75 Q 112,81 104,88" stroke="#BD8665" strokeWidth="0.7" />
        <path
          d="M 145,20 C 155,22 162,12 152,5 C 140,0 132,12 145,20 Z"
          stroke="#BD8665"
          strokeWidth="1"
        />
      </svg>

      {/* Lower-Left: Minimal Delicate Leaf Sprig (Pure Vector SVG) */}
      <svg
        viewBox="0 0 120 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0 w-20 sm:w-28 md:w-32 pointer-events-none select-none z-0 opacity-70"
        aria-hidden="true"
      >
        <path
          d="M -5,105 C 15,75 35,55 75,45"
          stroke="#BD8665"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <path
          d="M 30,70 C 22,58 30,46 42,50 C 52,54 45,68 30,70 Z"
          stroke="#BD8665"
          strokeWidth="0.9"
        />
        <path
          d="M 52,55 C 50,40 62,34 72,40 C 80,48 70,60 52,55 Z"
          stroke="#BD8665"
          strokeWidth="0.9"
        />
        <path
          d="M 75,45 C 80,32 94,30 98,40 C 100,50 88,54 75,45 Z"
          stroke="#BD8665"
          strokeWidth="0.9"
        />
      </svg>

      {/* Lower-Right: Minimal Groundnut Sprig (Pure Vector SVG) */}
      <svg
        viewBox="0 0 120 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 right-0 w-20 sm:w-28 md:w-32 pointer-events-none select-none z-0 opacity-70"
        aria-hidden="true"
      >
        <path
          d="M 125,105 C 105,75 85,55 45,45"
          stroke="#BD8665"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <path
          d="M 90,70 C 98,58 90,46 78,50 C 68,54 75,68 90,70 Z"
          stroke="#BD8665"
          strokeWidth="0.9"
        />
        <path
          d="M 68,55 C 70,40 58,34 48,40 C 40,48 50,60 68,55 Z"
          stroke="#BD8665"
          strokeWidth="0.9"
        />
        <path
          d="M 45,45 C 40,32 26,30 22,40 C 20,50 32,54 45,45 Z"
          stroke="#BD8665"
          strokeWidth="0.9"
        />
      </svg>
    </>
  );
};
