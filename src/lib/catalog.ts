import { supabase } from "@/integrations/supabase/client";

/** Product shape used across the UI (kept compatible with the previous catalog adapter). */
export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    brand: string | null;
    stock: number;
    compareAtPrice: { amount: string; currencyCode: string } | null;
    priceRange: {
      minVariantPrice: { amount: string; currencyCode: string };
    };
    images: {
      edges: Array<{ node: { url: string; altText: string | null } }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: { amount: string; currencyCode: string };
          availableForSale: boolean;
          selectedOptions: Array<{ name: string; value: string }>;
        };
      }>;
    };
    options: Array<{ name: string; values: string[] }>;
  };
}

export interface ProductRow {
  id: string;
  handle: string;
  title: string;
  description: string;
  brand: string | null;
  category_slug: string;
  price: number;
  compare_at_price: number | null;
  image_url: string | null;
  image_urls: string[];
  stock: number;
}

const CURRENCY = "BRL";

export function toProduct(row: ProductRow): ShopifyProduct {
  const urls = row.image_urls?.length ? row.image_urls : row.image_url ? [row.image_url] : [];
  return {
    node: {
      id: row.id,
      title: row.title,
      description: row.description,
      handle: row.handle,
      brand: row.brand,
      stock: row.stock,
      compareAtPrice:
        row.compare_at_price != null
          ? { amount: String(row.compare_at_price), currencyCode: CURRENCY }
          : null,
      priceRange: {
        minVariantPrice: { amount: String(row.price), currencyCode: CURRENCY },
      },
      images: { edges: urls.map((url) => ({ node: { url, altText: row.title } })) },
      variants: {
        edges: [
          {
            node: {
              id: row.id,
              title: "Padrão",
              price: { amount: String(row.price), currencyCode: CURRENCY },
              availableForSale: row.stock > 0,
              selectedOptions: [],
            },
          },
        ],
      },
      options: [],
    },
  };
}

export async function fetchProducts(
  limit = 24,
  categorySlug?: string,
): Promise<ShopifyProduct[]> {
  let query = supabase
    .from("products")
    .select("*")
    .order("price", { ascending: false })
    .limit(limit);

  if (categorySlug) query = query.eq("category_slug", categorySlug);

  const { data, error } = await query;
  if (error) throw error;
  return (data as ProductRow[]).map(toProduct);
}

export async function searchProducts(term: string, limit = 24): Promise<ShopifyProduct[]> {
  const cleaned = term.trim();
  if (!cleaned) return [];
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or(`title.ilike.%${cleaned}%,brand.ilike.%${cleaned}%,description.ilike.%${cleaned}%`)
    .order("price", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data as ProductRow[]).map(toProduct);
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("handle", handle)
    .maybeSingle();
  if (error) throw error;
  return data ? toProduct(data as ProductRow) : null;
}

export function formatPrice(amount: string | number, _currencyCode?: string) {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  try {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  } catch {
    return `R$ ${value.toFixed(2)}`;
  }
}

export const FREE_SHIPPING_THRESHOLD = 2000;
