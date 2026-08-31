export interface StoreCategory {
  slug: string;
  name: string;
  desc: string;
  /** Shopify Storefront search query used to filter this category */
  query: string;
}

export const CATEGORIES: StoreCategory[] = [
  {
    slug: "smartwatches",
    name: "Smartwatches",
    desc: "Saúde e performance no pulso",
    query: "product_type:Smartwatches",
  },
  {
    slug: "iphones",
    name: "iPhones",
    desc: "A linha Apple completa",
    query: "product_type:iPhones",
  },
  {
    slug: "androids",
    name: "Androids",
    desc: "Samsung, Google e Motorola",
    query: "product_type:Androids",
  },
  {
    slug: "televisoes",
    name: "Televisões",
    desc: "OLED, QLED, 4K e 8K",
    query: "product_type:Televisões",
  },
  {
    slug: "consoles",
    name: "Consoles",
    desc: "PlayStation, Xbox e Nintendo",
    query: "product_type:Consoles",
  },
  {
    slug: "notebooks",
    name: "Notebooks",
    desc: "Trabalho, estudo e games",
    query: "product_type:Notebooks",
  },
  {
    slug: "macbooks",
    name: "MacBooks",
    desc: "Chips M4 Air, Pro e Max",
    query: "product_type:MacBooks",
  },
  {
    slug: "pc",
    name: "PC",
    desc: "PCs completos, placas de vídeo e processadores",
    query: "product_type:\"PCs Completos\" OR product_type:\"Placa de Vídeo\" OR product_type:Processador",
  },
  {
    slug: "monitores",
    name: "Monitores",
    desc: "OLED, QHD e alta taxa de Hz",
    query: "product_type:Monitor",
  },
  {
    slug: "perifericos",
    name: "Periféricos",
    desc: "Headsets, teclados e mouses",
    query: "product_type:Periférico",
  },
];


export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}
