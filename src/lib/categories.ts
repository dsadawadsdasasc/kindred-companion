export interface StoreCategory {
  slug: string;
  name: string;
  desc: string;
}

export const CATEGORIES: StoreCategory[] = [
  {
    slug: "smartwatches",
    name: "Smartwatches",
    desc: "Saúde e performance no pulso",
  },
  {
    slug: "iphones",
    name: "iPhones",
    desc: "A linha Apple completa",
  },
  {
    slug: "androids",
    name: "Androids",
    desc: "Samsung, Google e Motorola",
  },
  {
    slug: "televisoes",
    name: "Televisões",
    desc: "OLED, QLED, 4K e 8K",
  },
  {
    slug: "consoles",
    name: "Consoles",
    desc: "PlayStation, Xbox e Nintendo",
  },
  {
    slug: "notebooks",
    name: "Notebooks",
    desc: "Trabalho, estudo e games",
  },
  {
    slug: "macbooks",
    name: "MacBooks",
    desc: "Chips M4 Air, Pro e Max",
  },
  {
    slug: "pc",
    name: "PC",
    desc: "PCs completos, placas de vídeo e processadores",
  },
  {
    slug: "monitores",
    name: "Monitores",
    desc: "OLED, QHD e alta taxa de Hz",
  },
  {
    slug: "perifericos",
    name: "Periféricos",
    desc: "Headsets, teclados e mouses",
  },
];


export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}
