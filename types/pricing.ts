export interface IndividualPrice {
  unit: string;
  price: string;
}

export interface ProductItem {
  id: string;
  brandName: string;
  subtitle: string;
  imageSrc: string;
  horizontalImageSrc?: string;
  imageAlt: string;
  tinPrice: string;
  tin15LPrice?: string;
  tin15kgPrice?: string;
  show15L?: boolean;
  show15kg?: boolean;
  canPrice: string;
  bottlePrice: string;
}

export function getWholesaleRates(product?: ProductItem): {
  price15L: string;
  price15kg: string;
  show15L: boolean;
  show15kg: boolean;
} {
  const show15L = product?.show15L !== false;
  const show15kg = product?.show15kg !== false;
  if (!product) return { price15L: "", price15kg: "", show15L: true, show15kg: true };
  if (product.tin15LPrice !== undefined || product.tin15kgPrice !== undefined) {
    return {
      price15L: (product.tin15LPrice ?? "").replace(/^₹\s*/, "").replace(/\s*\+\s*NEW\s*TIN/i, "").trim(),
      price15kg: (product.tin15kgPrice ?? "").replace(/^₹\s*/, "").replace(/\s*\+\s*NEW\s*TIN/i, "").trim(),
      show15L,
      show15kg,
    };
  }
  const clean = (product.tinPrice || "").replace(/^₹\s*/, "").replace(/\s*\+\s*NEW\s*TIN/i, "").trim();
  const parts = clean.split(/[–\-\/]/);
  return {
    price15L: (parts[0] || '').trim(),
    price15kg: (parts[1] || parts[0] || '').trim(),
    show15L,
    show15kg,
  };
}

export type TemplateColorTheme =
  | "royalNavy"
  | "terracotta"
  | "royalBlue"
  | "heritageGreen"
  | "forestEmerald"
  | "goldenOchre"
  | "midnightNoir"
  | "charcoalSlate"
  | "kesarGold"
  | "royalBurgundy"
  | "oliveSage"
  | "desertCopper"
  | "imperialPlum"
  | "warmEspresso"
  | "custom";

export interface ColorPalette {
  id: TemplateColorTheme;
  name: string;
  bgCanvas: string;
  borderColor: string;
  frameColor: string;
  accentPrimary: string;
  accentSecondary: string;
  pillBg: string;
  pillBorder: string;
  pillTextColor?: string;
  priceBoxBg: string;
  priceBoxBorder: string;
  textCharcoal: string;
  textSupporting: string;
  brandNameColor?: string;
}

export const COLOR_THEMES: Record<string, ColorPalette> = {
  royalNavy: {
    id: "royalNavy",
    name: "Royal Navy Blue",
    bgCanvas: "#EBF3FC",      // Luminous light powder-blue porcelain canvas
    borderColor: "#C5D9F2",   // Crisp architectural sky-blue border
    frameColor: "#D6E5F7",    // Subtle inner framing line
    accentPrimary: "#1D4ED8", // Royal sapphire for sacred heading, date, pills & prices
    accentSecondary: "#3B82F6", // Vibrant sapphire accent lines & botanical sketch SVG
    pillBg: "#FFFFFF",        // Pure white pill matching 5L & 1L cards
    pillBorder: "#C5D9F2",
    pillTextColor: "#1D4ED8", // Bold Royal Sapphire Blue Price
    priceBoxBg: "#FFFFFF",    // Pure elevated white price card for ultra-high contrast
    priceBoxBorder: "#C5D9F2",
    textCharcoal: "#0F172A",  // Deep midnight navy for company names & footer notice
    brandNameColor: "#1E3A8A",// Commanding rich royal navy for TRUPTI & KRISHNA
    textSupporting: "#2563EB", // Elegant royal slate for subtitles & unit labels
  },
  terracotta: {
    id: "terracotta",
    name: "Classic Terracotta",
    bgCanvas: "#FAF4EC",      // Authentic warm linen ivory light terracotta surface
    borderColor: "#E8D8C5",   // Architectural warm sand border
    frameColor: "#EFE3D3",    // Subtle inner framing line
    accentPrimary: "#B83B20", // Deep burnt terracotta for headings, date, pills & prices
    accentSecondary: "#BD8665", // Copper accent for divider hairlines & botanical sketch
    pillBg: "#FFFFFF",        // Pure white pill matching 5L & 1L cards
    pillBorder: "#E8D8C5",
    pillTextColor: "#B83B20", // Bold Burnt Terracotta Price
    priceBoxBg: "#FFFFFF",    // Pure elevated white price card for ultra-high contrast
    priceBoxBorder: "#E8D8C5", // Delicate warm sand border
    textCharcoal: "#26211D",  // Deep espresso charcoal for company names & footer notice
    brandNameColor: "#7C2D12",// Rich deep terracotta mahogany for TRUPTI & KRISHNA
    textSupporting: "#78350F", // Refined amber espresso for subtitles & unit labels
  },
  heritageGreen: {
    id: "heritageGreen",
    name: "Heritage Emerald",
    bgCanvas: "#F0F9F3",      // Soft light mint sage porcelain surface
    borderColor: "#C1E5CB",
    frameColor: "#D7EFE0",
    accentPrimary: "#15803D", // Rich forest emerald
    accentSecondary: "#22C55E", // Vibrant emerald accent
    pillBg: "#FFFFFF",        // Pure white pill matching 5L & 1L cards
    pillBorder: "#C1E5CB",
    pillTextColor: "#15803D", // Bold Forest Emerald Price
    priceBoxBg: "#FFFFFF",    // Pure elevated white price card
    priceBoxBorder: "#C1E5CB",
    textCharcoal: "#052E16",
    brandNameColor: "#14532D",// Deep forest emerald for TRUPTI & KRISHNA
    textSupporting: "#166534",
  },
  goldenOchre: {
    id: "goldenOchre",
    name: "Golden Ochre",
    bgCanvas: "#FDF9EE",      // Warm honey light cream surface
    borderColor: "#EDE0BF",
    frameColor: "#F4EBD2",
    accentPrimary: "#B45309", // Rich amber bronze
    accentSecondary: "#D97706",
    pillBg: "#FFFFFF",        // Pure white pill matching 5L & 1L cards
    pillBorder: "#EDE0BF",
    pillTextColor: "#B45309", // Bold Amber Bronze Price
    priceBoxBg: "#FFFFFF",    // Pure elevated white price card
    priceBoxBorder: "#EDE0BF",
    textCharcoal: "#1F1D1A",
    brandNameColor: "#78350F",// Deep warm bronze mahogany for TRUPTI & KRISHNA
    textSupporting: "#92400E",
  },
  midnightNoir: {
    id: "midnightNoir",
    name: "Editorial Slate",
    bgCanvas: "#F1F5F9",      // Clean cool light studio porcelain
    borderColor: "#CBD5E1",
    frameColor: "#E2E8F0",
    accentPrimary: "#0F172A", // Deep obsidian
    accentSecondary: "#475569",
    pillBg: "#FFFFFF",        // Pure white pill matching 5L & 1L cards
    pillBorder: "#CBD5E1",
    pillTextColor: "#0F172A", // Bold Obsidian Price
    priceBoxBg: "#FFFFFF",    // Pure elevated white price card
    priceBoxBorder: "#CBD5E1",
    textCharcoal: "#020617",
    brandNameColor: "#020617",
    textSupporting: "#334155",
  },
  kesarGold: {
    id: "kesarGold",
    name: "Imperial Kesar Gold",
    bgCanvas: "#FFFDF7",      // Warm luminous kesar-ivory porcelain surface
    borderColor: "#FDE68A",   // Radiant filament golden border
    frameColor: "#FEF3C7",
    accentPrimary: "#D97706", // Rich vibrant saffron gold for headings & prices
    accentSecondary: "#F59E0B",
    pillBg: "#FFFFFF",
    pillBorder: "#FDE68A",
    pillTextColor: "#D97706",
    priceBoxBg: "#FFFFFF",
    priceBoxBorder: "#FDE68A",
    textCharcoal: "#451A03",  // Deep rich royal mahogany
    brandNameColor: "#78350F",
    textSupporting: "#B45309",
  },
  royalBurgundy: {
    id: "royalBurgundy",
    name: "Royal Bordeaux Wine",
    bgCanvas: "#FDF8F9",      // Alabaster petal rose porcelain surface
    borderColor: "#F3D2DF",   // Delicate vintage bordeaux hairline border
    frameColor: "#FCE7F0",
    accentPrimary: "#881337", // Imperial bordeaux wine for headings & prices
    accentSecondary: "#BE185D",
    pillBg: "#FFFFFF",
    pillBorder: "#F3D2DF",
    pillTextColor: "#881337",
    priceBoxBg: "#FFFFFF",
    priceBoxBorder: "#F3D2DF",
    textCharcoal: "#4C0519",  // Deep velvet noir-burgundy
    brandNameColor: "#881337",
    textSupporting: "#9F1239",
  },
  oliveSage: {
    id: "oliveSage",
    name: "Mediterranean Olive Sage",
    bgCanvas: "#F8FAF6",      // Natural cold-pressed virgin olive porcelain
    borderColor: "#D2E4D0",   // Soft botanical olive filament border
    frameColor: "#E2EFE0",
    accentPrimary: "#365314", // Deep artisanal olive grove for headings & prices
    accentSecondary: "#65A30D",
    pillBg: "#FFFFFF",
    pillBorder: "#D2E4D0",
    pillTextColor: "#365314",
    priceBoxBg: "#FFFFFF",
    priceBoxBorder: "#D2E4D0",
    textCharcoal: "#1A2E05",
    brandNameColor: "#365314",
    textSupporting: "#4D7C0F",
  },
  desertCopper: {
    id: "desertCopper",
    name: "Burnished Desert Copper",
    bgCanvas: "#FCF9F5",      // Warm sunlit sand dunes surface
    borderColor: "#EAD7C4",   // Burnished bronze hairline border
    frameColor: "#F5ECE1",
    accentPrimary: "#9A3412", // Deep glowing desert copper for headings & prices
    accentSecondary: "#EA580C",
    pillBg: "#FFFFFF",
    pillBorder: "#EAD7C4",
    pillTextColor: "#9A3412",
    priceBoxBg: "#FFFFFF",
    priceBoxBorder: "#EAD7C4",
    textCharcoal: "#2E1308",
    brandNameColor: "#7C2D12",
    textSupporting: "#C2410C",
  },
  imperialPlum: {
    id: "imperialPlum",
    name: "Imperial Royal Plum",
    bgCanvas: "#FAF7FC",      // Subtle lilac porcelain surface
    borderColor: "#E5D7F2",   // Delicate royal amethyst border
    frameColor: "#F1E7FA",
    accentPrimary: "#6B21A8", // Rich royal purple for headings & prices
    accentSecondary: "#9333EA",
    pillBg: "#FFFFFF",
    pillBorder: "#E5D7F2",
    pillTextColor: "#6B21A8",
    priceBoxBg: "#FFFFFF",
    priceBoxBorder: "#E5D7F2",
    textCharcoal: "#2E0854",
    brandNameColor: "#581C87",
    textSupporting: "#7E22CE",
  },
  warmEspresso: {
    id: "warmEspresso",
    name: "Warm Toasted Espresso",
    bgCanvas: "#FAF8F5",      // Warm milk-foam linen surface
    borderColor: "#E6DDD2",   // Warm toasted oak hairline border
    frameColor: "#F2EBE2",
    accentPrimary: "#573D29", // Deep rich espresso walnut for headings & prices
    accentSecondary: "#8C6544",
    pillBg: "#FFFFFF",
    pillBorder: "#E6DDD2",
    pillTextColor: "#573D29",
    priceBoxBg: "#FFFFFF",
    priceBoxBorder: "#E6DDD2",
    textCharcoal: "#24180F",
    brandNameColor: "#3D2717",
    textSupporting: "#735034",
  },
  custom: {
    id: "custom",
    name: "Custom Shade",
    bgCanvas: "#EBF3FC",
    borderColor: "#C5D9F2",
    frameColor: "#D6E5F7",
    accentPrimary: "#1D4ED8",
    accentSecondary: "#3B82F6",
    pillBg: "#FFFFFF",
    pillBorder: "#C5D9F2",
    pillTextColor: "#1D4ED8",
    priceBoxBg: "#FFFFFF",
    priceBoxBorder: "#C5D9F2",
    textCharcoal: "#0F172A",
    brandNameColor: "#1E3A8A",
    textSupporting: "#2563EB",
  },
};

// Aliases for seamless backward compatibility
COLOR_THEMES.royalBlue = COLOR_THEMES.royalNavy;
COLOR_THEMES.forestEmerald = COLOR_THEMES.heritageGreen;
COLOR_THEMES.charcoalSlate = COLOR_THEMES.midnightNoir;

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    clean = clean.split("").map((c) => c + c).join("");
  }
  const num = parseInt(clean, 16);
  if (isNaN(num)) return { r: 29, g: 78, b: 216 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function blendWithWhite(rgb: { r: number; g: number; b: number }, tintPercent: number): string {
  const t = Math.min(Math.max(tintPercent, 0), 1);
  const r = Math.round(255 * (1 - t) + rgb.r * t);
  const g = Math.round(255 * (1 - t) + rgb.g * t);
  const b = Math.round(255 * (1 - t) + rgb.b * t);
  return `rgb(${r}, ${g}, ${b})`;
}

export function getEffectivePalette(
  theme?: TemplateColorTheme | string,
  customHex?: string
): ColorPalette {
  let normalizedKey = theme || "royalNavy";
  if (normalizedKey === "royalBlue") normalizedKey = "royalNavy";
  if (normalizedKey === "forestEmerald") normalizedKey = "heritageGreen";
  if (normalizedKey === "charcoalSlate") normalizedKey = "midnightNoir";

  if (normalizedKey === "custom" && customHex) {
    const rgb = hexToRgb(customHex);
    return {
      id: "custom",
      name: "Custom Shade",
      bgCanvas: blendWithWhite(rgb, 0.08),     // Luminous soft tint for canvas
      borderColor: blendWithWhite(rgb, 0.28),  // Harmonious matching border
      frameColor: blendWithWhite(rgb, 0.18),   // Inner framing line
      accentPrimary: customHex,                // Rich custom hex for headings, date, prices
      accentSecondary: customHex,              // Accent lines & botanical sketch SVG
      pillBg: "#FFFFFF",                       // Pure white pill matching 5L & 1L cards
      pillBorder: blendWithWhite(rgb, 0.28),
      pillTextColor: customHex,
      priceBoxBg: "#FFFFFF",                   // Pure elevated white price card for contrast
      priceBoxBorder: blendWithWhite(rgb, 0.28),
      textCharcoal: "#0F172A",
      brandNameColor: customHex,               // Coordinated custom color for TRUPTI & KRISHNA
      textSupporting: blendWithWhite(rgb, 0.75),
    };
  }

  return COLOR_THEMES[normalizedKey] || COLOR_THEMES.royalNavy;
}

export type ProductSelectionMode = "both" | "cotton" | "groundnut";

export interface CatalogueData {
  productMode?: ProductSelectionMode;
  religiousHeading: string;
  leftCompanyName: string;
  rightCompanyName: string;
  brandName?: string;
  subtitle?: string;
  date: string;
  theme?: TemplateColorTheme;
  customColor?: string;
  trupti: ProductItem;
  krishna: ProductItem;
  footerNotice: string;
  footerLocation: string;
}

// Compatibility alias
export type PricingData = CatalogueData;

export const INITIAL_CATALOGUE_DATA: CatalogueData = {
  productMode: "both",
  religiousHeading: "जय श्री कृष्णा",
  leftCompanyName: "KRISHNA EXPORT. INDUSTRIES",
  rightCompanyName: "SHREE KRISHNA OIL MILL",
  brandName: "KRISHNA EXPORT. INDUSTRIES",
  subtitle: "",
  date: "03-11-2026",
  theme: "royalNavy",
  customColor: "#1D4ED8",
  trupti: {
    id: "trupti",
    brandName: "TRUPTI",
    subtitle: "COTTON SEED REFINED OIL",
    imageSrc: "/assets/trupti-oil-5l.jpg",
    horizontalImageSrc: "/assets/trupti-oil-horizontal.jpg",
    imageAlt: "TRUPTI Cotton Seed Refined Oil 5 Litre Can",
    tinPrice: "2445–2700",
    tin15LPrice: "2445",
    tin15kgPrice: "2700",
    show15L: true,
    show15kg: true,
    canPrice: "758",
    bottlePrice: "151",
  },
  krishna: {
    id: "krishna",
    brandName: "KRISHNA",
    subtitle: "GROUNDNUT OIL",
    imageSrc: "/assets/krishna-groundnut-15kg.jpg",
    horizontalImageSrc: "/assets/krishna-groundnut-horizontal.jpg",
    imageAlt: "KRISHNA Groundnut Oil 15 Kg Tin",
    tinPrice: "2650–2850",
    tin15LPrice: "2650",
    tin15kgPrice: "2850",
    show15L: true,
    show15kg: true,
    canPrice: "882",
    bottlePrice: "177",
  },
  footerNotice: "ALL RATES PLUS GST",
  footerLocation: "EX-FACTORY  |  JUNAGADH",
};

export const INITIAL_PRICING_DATA = INITIAL_CATALOGUE_DATA;
