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

export interface CatalogueData {
  religiousHeading: string;
  leftCompanyName: string;
  rightCompanyName: string;
  brandName?: string;
  subtitle?: string;
  date: string;
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
