import { useQuery } from "@tanstack/react-query";
import { ArrowDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppleLogo } from "@/components/AppleLogo";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts, formatPrice } from "@/lib/catalog";
import { APPLE_DISCOUNT, isAppleProduct, useIphone18InCart } from "@/lib/appleDeal";

const scrollToDeals = () => {
  document.getElementById("apple-20")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

/** Sticky balloon right under the header so mobile users see the 20% deal instantly. */
export function AppleDealBanner() {
  const active = useIphone18InCart();
  if (!active) return null;

  return (
    <div className="sticky top-16 z-40 border-b border-[#ff2d55]/40 bg-[#150004]/95 backdrop-blur-md">
      <button
        onClick={scrollToDeals}
        className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-2.5 text-left sm:px-6"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ff0033]/20 text-white">
          <AppleLogo className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold text-white">
            20% OFF em produtos Apple
          </span>
          <span className="block truncate text-[11px] text-[#ffb3c1]">
            Desbloqueado com o iPhone 18 Pro Max no carrinho
          </span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#ff0033] px-3 py-1.5 text-xs font-semibold text-white">
          Ver <ArrowDown className="h-3.5 w-3.5" />
        </span>
      </button>
    </div>
  );
}

/** Section listing every Apple product with the 20% combo price applied. */
export function AppleDealSection() {
  const active = useIphone18InCart();
  const { data: products = [], isPending } = useQuery({
    queryKey: ["products", "apple-deal"],
    queryFn: () => fetchProducts(200),
    enabled: active,
    select: (rows) => rows.filter(isAppleProduct),
  });

  if (!active) return null;

  return (
    <section
      id="apple-20"
      className="mx-auto mt-6 max-w-7xl scroll-mt-28 px-4 sm:mt-10 sm:px-6"
    >
      <div className="rounded-3xl border border-[#ff2d55]/45 bg-[#150004] p-5 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <AppleLogo className="h-6 w-6 text-white" />
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Combo Apple · <span className="text-[#ff2d55]">20% OFF</span>
          </h2>
          <span className="rounded-full border border-[#ff2d55]/60 bg-[#ff0033]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#ff5470]">
            Ativo
          </span>
        </div>
        <p className="mt-2 text-sm text-white/70">
          Com o iPhone 18 Pro Max no carrinho, todos os produtos Apple abaixo saem com 20% de
          desconto aplicado automaticamente no carrinho.
        </p>

        {isPending ? (
          <div className="flex h-32 items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-[#ff2d55]" />
          </div>
        ) : (
          <div className="mt-5 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:thin]">
            {products.map((product) => {
              const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
              return (
                <div key={product.node.id} className="w-44 shrink-0 sm:w-52">
                  <ProductCard product={product} compact />
                  <p className="mt-1 px-1 text-xs font-semibold text-[#ff5470]">
                    No combo: {formatPrice(price * (1 - APPLE_DISCOUNT))}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        <Button
          onClick={scrollToDeals}
          className="mt-4 hidden border-0 bg-[#ff0033] text-white hover:bg-[#ff2d55]"
        >
          Ver produtos
        </Button>
      </div>
    </section>
  );
}
