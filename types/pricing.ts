export interface IndividualPrice {
  unit: string;
  price: string;
}

export interface ProductItem {
  id: string;
  brandName: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  tinPrice: string;
  canPrice: string;
  bottlePrice: string;
}

export type TemplateColorTheme =
  | "terracotta"
  | "royalBlue"
  | "forestEmerald"
  | "goldenOchre"
  | "charcoalSlate"
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
  priceBoxBg: string;
  priceBoxBorder: string;
  textCharcoal: string;
  textSupporting: string;
}

export const COLOR_THEMES: Record<TemplateColorTheme, ColorPalette> = {
  terracotta: {
    id: "terracotta",
    name: "Classic Terracotta",
    bgCanvas: "#FAF6F0",
    borderColor: "#E5DACD",
    frameColor: "#E5DACD",
    accentPrimary: "#B83B20",
    accentSecondary: "#BD8665",
    pillBg: "#F3DCC9",
    pillBorder: "#E8CBB3",
    priceBoxBg: "#F2E4D2",
    priceBoxBorder: "#DEC3A7",
    textCharcoal: "#171717",
    textSupporting: "#39332F",
  },
  royalBlue: {
    id: "royalBlue",
    name: "Royal Navy Blue",
    bgCanvas: "#F4F8FD",
    borderColor: "#CCE0F5",
    frameColor: "#D6E6F8",
    accentPrimary: "#1D4ED8",
    accentSecondary: "#3B82F6",
    pillBg: "#DCEBFD",
    pillBorder: "#B5D6FA",
    priceBoxBg: "#E4EFFF",
    priceBoxBorder: "#BAD7FB",
    textCharcoal: "#0F172A",
    textSupporting: "#334155",
  },
  forestEmerald: {
    id: "forestEmerald",
    name: "Heritage Emerald",
    bgCanvas: "#F4F8F4",
    borderColor: "#D2E4D6",
    frameColor: "#DCEADE",
    accentPrimary: "#1B633F",
    accentSecondary: "#2E8555",
    pillBg: "#D8EEDF",
    pillBorder: "#B4DEBF",
    priceBoxBg: "#E3F1E7",
    priceBoxBorder: "#B8DAC1",
    textCharcoal: "#111827",
    textSupporting: "#374151",
  },
  goldenOchre: {
    id: "goldenOchre",
    name: "Golden Ochre",
    bgCanvas: "#FAF7EF",
    borderColor: "#EADECA",
    frameColor: "#EFE6D4",
    accentPrimary: "#B46E14",
    accentSecondary: "#C28526",
    pillBg: "#F4E5C4",
    pillBorder: "#E7CE98",
    priceBoxBg: "#F7ECD2",
    priceBoxBorder: "#E4CCA0",
    textCharcoal: "#1F1D1A",
    textSupporting: "#454038",
  },
  charcoalSlate: {
    id: "charcoalSlate",
    name: "Editorial Slate",
    bgCanvas: "#F8F9FA",
    borderColor: "#E2E8F0",
    frameColor: "#CBD5E1",
    accentPrimary: "#0F172A",
    accentSecondary: "#475569",
    pillBg: "#E2E8F0",
    pillBorder: "#CBD5E1",
    priceBoxBg: "#E7EDF4",
    priceBoxBorder: "#CBD5E1",
    textCharcoal: "#0F172A",
    textSupporting: "#475569",
  },
  custom: {
    id: "custom",
    name: "Custom Shade",
    bgCanvas: "#FAF6F0",
    borderColor: "#E5DACD",
    frameColor: "#E5DACD",
    accentPrimary: "#B83B20",
    accentSecondary: "#BD8665",
    pillBg: "#F3DCC9",
    pillBorder: "#E8CBB3",
    priceBoxBg: "#F2E4D2",
    priceBoxBorder: "#DEC3A7",
    textCharcoal: "#171717",
    textSupporting: "#39332F",
  },
};

export function getEffectivePalette(
  theme?: TemplateColorTheme,
  customHex?: string
): ColorPalette {
  const base = COLOR_THEMES[theme || "terracotta"] || COLOR_THEMES.terracotta;
  if (theme === "custom" && customHex) {
    return {
      ...base,
      accentPrimary: customHex,
      accentSecondary: customHex,
      pillBorder: customHex + "45",
      pillBg: customHex + "18",
      priceBoxBg: customHex + "12",
      priceBoxBorder: customHex + "35",
    };
  }
  return base;
}

export interface CatalogueData {
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
  religiousHeading: "जय श्री कृष्णा",
  leftCompanyName: "KRISHNA EXPORT. INDUSTRIES",
  rightCompanyName: "SHREE KRISHNA OIL MILL",
  brandName: "KRISHNA EXPORT. INDUSTRIES",
  subtitle: "",
  date: "30-10-2026",
  theme: "terracotta",
  customColor: "#B83B20",
  trupti: {
    id: "trupti",
    brandName: "TRUPTI",
    subtitle: "COTTON SEED REFINED OIL",
    imageSrc: "/assets/trupti-product.png",
    imageAlt: "TRUPTI Cotton Seed Refined Oil 5 Litre Can",
    tinPrice: "2445–2455",
    canPrice: "758",
    bottlePrice: "151",
  },
  krishna: {
    id: "krishna",
    brandName: "KRISHNA",
    subtitle: "GROUNDNUT OIL",
    imageSrc: "/assets/krishna-product.png",
    imageAlt: "KRISHNA Groundnut Oil 5 Litre Can",
    tinPrice: "2850",
    canPrice: "882",
    bottlePrice: "177",
  },
  footerNotice: "ALL RATES PLUS GST",
  footerLocation: "EX-FACTORY  |  JUNAGADH",
};

export const INITIAL_PRICING_DATA = INITIAL_CATALOGUE_DATA;
