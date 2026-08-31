import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  ArrowLeft,
  BadgePercent,
  Barcode,
  Check,
  CreditCard,
  ExternalLink,
  Loader2,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { fetchProductByHandle, fetchProducts, formatPrice } from "@/lib/catalog";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$handle")({
  component: ProductPage,
  head: () => ({
    meta: [
      { title: "Produto | Nova Store Tecnologia" },
      {
        name: "description",
        content:
          "Veja detalhes, preço e disponibilidade deste produto na Nova Store e finalize a compra com checkout seguro.",
      },
      { property: "og:title", content: "Produto | Nova Store Tecnologia" },
      {
        property: "og:description",
        content: "Detalhes do produto, preço e compra com checkout seguro na Nova Store.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function ProductPage() {
  const { handle } = Route.useParams();
  const addItem = useCartStore((s) => s.addItem);
  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { data: product, isPending } = useQuery({
    queryKey: ["product", handle],
    queryFn: () => fetchProductByHandle(handle),
  });

  const { data: related } = useQuery({
    queryKey: ["related-products"],
    queryFn: () => fetchProducts(12),
  });

  const node = product?.node;
  const variant = node?.variants.edges[0]?.node;
  const images = node?.images.edges ?? [];
  const priceAmount = parseFloat(node?.priceRange.minVariantPrice.amount ?? "0");
  const compareAt = node?.compareAtPrice ? parseFloat(node.compareAtPrice.amount) : null;
  const pixPrice = priceAmount * 0.92;
  const installment = priceAmount / 10;
  const relatedProducts = (related ?? []).filter((p) => p.node.handle !== handle).slice(0, 8);

  const handleAddToCart = async () => {
    if (!product || !variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Adicionado ao carrinho", {
      description: node?.title,
      position: "top-center",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar à loja
        </Link>

        {isPending ? (
          <div className="flex h-80 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : !node ? (
          <div className="py-24 text-center">
            <h1 className="text-2xl font-bold">Produto não encontrado</h1>
            <p className="mt-2 text-muted-foreground">
              Este produto não está mais disponível na loja.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-10 lg:grid-cols-2">
              {/* Galeria */}
              <div>
                <div className="overflow-hidden rounded-3xl border border-border bg-secondary">
                  {images[imageIndex] ? (
                    <img
                      src={images[imageIndex].node.url}
                      alt={images[imageIndex].node.altText ?? node.title}
                      className="aspect-square w-full object-contain p-4"
                    />
                  ) : (
                    <div className="flex aspect-square items-center justify-center text-muted-foreground">
                      Sem imagem
                    </div>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto">
                    {images.map((img, i) => (
                      <button
                        key={img.node.url}
                        onClick={() => setImageIndex(i)}
                        className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-secondary transition-colors ${
                          i === imageIndex
                            ? "border-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <img
                          src={img.node.url}
                          alt=""
                          className="h-full w-full object-contain p-1"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Informações */}
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {node.stock > 0 ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                      <Check className="h-3 w-3" /> Em estoque
                    </span>
                  ) : (
                    <span className="rounded-full bg-destructive/15 px-3 py-1 text-xs font-semibold text-destructive">
                      Indisponível
                    </span>
                  )}
                  {node.brand && (
                    <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                      {node.brand}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    <Truck className="h-3 w-3" /> Envio para todo o Brasil
                  </span>
                </div>

                <h1 className="mt-4 text-3xl font-bold">{node.title}</h1>

                {appleDealActive && (
                  <div className="mt-5 overflow-hidden rounded-2xl border border-[#ff2d55]/60 bg-[#1a0007] p-5 shadow-[0_0_30px_rgba(255,0,51,0.25)]">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#ff2d55]/60 bg-[#ff0033]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff5470]">
                      <AppleLogo className="h-3.5 w-3.5" />
                      Combo Apple ativo
                    </span>
                    <p className="mt-3 text-sm text-white/80">
                      Com o <strong className="text-white">iPhone 18 Pro Max</strong> no carrinho,
                      você garante <strong className="text-[#ff2d55]">20% de desconto</strong> em
                      todos os produtos Apple.
                    </p>
                    <div className="mt-3 flex flex-wrap items-baseline gap-3">
                      <span className="text-sm text-white/50 line-through">
                        {formatPrice(priceAmount)}
                      </span>
                      <span className="text-3xl font-bold text-[#ff2d55]">
                        {formatPrice(appleDealPrice)}
                      </span>
                      <span className="text-xs text-white/60">
                        você economiza {formatPrice(priceAmount - appleDealPrice)}
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-5 rounded-2xl border border-border bg-card p-5">
                  {compareAt && compareAt > priceAmount && (
                    <p className="text-sm text-muted-foreground">
                      <span className="line-through">{formatPrice(compareAt)}</span>
                    </p>
                  )}
                  <p className="mt-1 text-4xl font-bold text-primary">
                    {formatPrice(priceAmount)}
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <CreditCard className="h-4 w-4 text-primary" />
                    em até <strong>10x de {formatPrice(installment)}</strong> sem juros
                  </p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-primary">
                    <Barcode className="h-4 w-4" />
                    {formatPrice(pixPrice)} no Pix (8% de desconto)
                  </p>
                </div>


                <div className="mt-6 flex items-center gap-4">
                  <p className="text-sm font-semibold">Quantidade</p>
                  <div className="flex items-center gap-1 rounded-full border border-border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full"
                      onClick={() => setQuantity((q) => q + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1"
                    disabled={node.stock === 0}
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Adicionar ao carrinho
                  </Button>
                  <Button size="lg" className="flex-1" disabled={node.stock === 0} onClick={handleAddToCart}>
                    <Zap className="mr-2 h-4 w-4" />
                    Comprar agora
                  </Button>
                </div>

                <div className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                  <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-card p-3">
                    <Truck className="h-4 w-4 text-primary" /> Frete grátis acima de R$ 2.000
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-card p-3">
                    <ShieldCheck className="h-4 w-4 text-primary" /> Compra 100% segura
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-card p-3">
                    <RotateCcw className="h-4 w-4 text-primary" /> Troca fácil em até 7 dias
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-card p-3">
                    <BadgePercent className="h-4 w-4 text-primary" /> Garantia do fabricante
                  </div>
                </div>
              </div>
            </div>

            {/* Descrição */}
            {node.description && (
              <section className="mt-14 rounded-3xl border border-border bg-card p-6 sm:p-8">
                <h2 className="flex items-center gap-2 text-xl font-bold">
                  <Star className="h-5 w-5 text-primary" /> Sobre este produto
                </h2>
                <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {node.description}
                </p>
              </section>
            )}

            {/* Relacionados */}
            {relatedProducts.length > 0 && (
              <section className="mt-14">
                <div className="mb-5 flex items-end justify-between">
                  <h2 className="text-xl font-bold sm:text-2xl">Você também pode gostar</h2>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Ver loja <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {relatedProducts.map((p) => (
                    <div key={p.node.id} className="w-52 shrink-0 sm:w-60">
                      <ProductCard product={p} compact />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
