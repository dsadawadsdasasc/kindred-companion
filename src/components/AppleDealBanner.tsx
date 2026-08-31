import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowDown, Loader2 } from "lucide-react";
import { AppleLogo } from "@/components/AppleLogo";
import { fetchProducts, formatPrice } from "@/lib/catalog";
import { APPLE_DISCOUNT, isAppleProduct, useIphone18InCart } from "@/lib/appleDeal";

const scrollToDeals = () => {
  const el = document.getElementById("apple-20");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  else window.location.href = "/#apple-20";
};

/** Sticky balloon right under the header so mobile users see the 20% deal instantly. */
export function AppleDealBanner() {
  const active = useIphone18InCart();
  if (!active) return null;

  return (
    <div className="border-b border-[#ff2d55]/40 bg-[#150004]/95 backdrop-blur-md">
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
export function AppleDealSection({
  unlockWithProductHandle,
}: {
  unlockWithProductHandle?: string;
} = {}) {
  const active = useIphone18InCart();
  const visible = active || unlockWithProductHandle === "iphone-18-pro-max-1tb";
  const { data: products = [], isPending } = useQuery({
    queryKey: ["products", "apple-deal"],
    queryFn: () => fetchProducts(200),
    enabled: visible,
    select: (rows) =>
      rows
        .filter(
          (product) =>
            isAppleProduct(product) && product.node.handle !== "iphone-18-pro-max-1tb",
        )
        .sort(
          (a, b) =>
            parseFloat(a.node.priceRange.minVariantPrice.amount) -
            parseFloat(b.node.priceRange.minVariantPrice.amount),
        )
        .slice(0, 12),
  });

  if (!visible) return null;

  return (
    <section
      id="apple-20"
      className="mx-auto mt-10 max-w-7xl scroll-mt-28 px-4 sm:px-0"
    >
      <div className="rounded-3xl border-2 border-[#ff0033]/60 bg-white p-5 shadow-[0_10px_40px_-20px_rgba(255,0,51,0.6)] sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <AppleLogo className="h-6 w-6 text-[#111]" />
          <h2 className="text-xl font-bold text-[#111] sm:text-2xl">
            Combo Apple · <span className="text-[#ff0033]">20% OFF</span>
          </h2>
          <span className="rounded-full bg-[#ff0033] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white">
            {active ? "Desconto ativo" : "Oferta exclusiva"}
          </span>
        </div>
        <p className="mt-2 text-sm text-[#444]">
          {active
            ? "Seu iPhone 18 Pro Max já está no carrinho. Todos os produtos Apple abaixo recebem 20% de desconto automaticamente."
            : "Adicione este iPhone 18 Pro Max ao carrinho e ganhe 20% de desconto nos produtos Apple abaixo."}
        </p>

        {isPending ? (
          <div className="flex h-32 items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-[#ff0033]" />
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => {
              const node = product.node;
              const price = parseFloat(node.priceRange.minVariantPrice.amount);
              const image = node.images.edges[0]?.node;
              return (
                <Link
                  key={node.id}
                  to="/produto/$handle"
                  params={{ handle: node.handle }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#ff0033]/20 bg-white transition hover:border-[#ff0033]/60"
                >
                  <div className="aspect-square bg-[#f6f6f7]">
                    {image ? (
                      <img
                        src={image.url}
                        alt={image.altText ?? node.title}
                        loading="lazy"
                        className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col gap-1 p-3">
                    <h3 className="line-clamp-2 text-xs font-semibold leading-snug text-[#111] sm:text-sm">
                      {node.title}
                    </h3>
                    <div className="mt-auto pt-2">
                      <p className="text-xs text-[#8a8a8e] line-through decoration-[#ff0033] decoration-2">
                        {formatPrice(price)}
                      </p>
                      <p className="text-base font-extrabold text-[#ff0033] sm:text-lg">
                        {formatPrice(price * (1 - APPLE_DISCOUNT))}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
