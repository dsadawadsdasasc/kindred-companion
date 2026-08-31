import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Truck, ShieldCheck, CreditCard, Headphones, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts } from "@/lib/catalog";
import { CATEGORIES } from "@/lib/categories";
import { AppleLogo } from "@/components/AppleLogo";
import { AppleDealSection } from "@/components/AppleDealBanner";
import { IPHONE18_HANDLE } from "@/lib/appleDeal";
import iphone18Image from "@/assets/iphone18-pro-max.png";


export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Nova Store | Tecnologia e eletrônicos premium" },
      {
        name: "description",
        content:
          "Smartphones, TVs, notebooks e casa inteligente com entrega rápida, checkout seguro e as melhores marcas de tecnologia.",
      },
      { property: "og:title", content: "Nova Store | Tecnologia e eletrônicos premium" },
      {
        property: "og:description",
        content:
          "Loja moderna de eletrônicos: smartphones, TVs, notebooks e casa inteligente com entrega rápida.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const BENEFITS = [
  { icon: Truck, title: "Frete grátis", text: "Em compras acima de R$ 2.000" },
  { icon: CreditCard, title: "Parcelamento", text: "Em até 12x no cartão" },
  { icon: ShieldCheck, title: "Compra segura", text: "Checkout protegido e criptografado" },
  { icon: Headphones, title: "Suporte premium", text: "Atendimento especializado" },
];

function CategoryRow({ category }: { category: (typeof CATEGORIES)[number] }) {
  const { data: products = [], isPending } = useQuery({
    queryKey: ["products", "row", category.slug],
    queryFn: () => fetchProducts(10, category.slug),
  });

  if (!isPending && products.length === 0) return null;

  return (
    <div className="mt-10 first:mt-0">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-bold sm:text-xl">{category.name}</h3>
        <Link
          to="/categoria/$slug"
          params={{ slug: category.slug }}
          className="group inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Ver todos
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      {isPending ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        </div>
      ) : (
        <div className="mt-4 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:thin]">
          {products.map((product) => (
            <div key={product.node.id} className="w-48 flex-shrink-0 sm:w-52">
              <ProductCard product={product} compact />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Frase da loja */}
        <section className="relative overflow-hidden border-b border-border/60">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-primary/25 blur-[120px]"
          />
          <div className="relative mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 sm:py-14">
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-primary">
              Nova temporada tech
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-[1.08] sm:text-5xl">
              Tecnologia premium,
              <br />
              <span className="text-primary">entrega relâmpago.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground sm:text-base">
              Smartphones, TVs, notebooks e casa inteligente selecionados, com checkout seguro e
              frete expresso.
            </p>
          </div>
        </section>

        {/* iPhone 18 Pro Max - lançamento */}
        <section id="produtos" className="relative mx-auto mt-6 max-w-7xl px-4 sm:mt-10 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-[#ff1030]/50 bg-[#150004]">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 top-1/4 h-[420px] w-[420px] rounded-full bg-[#ff0033]/40 blur-[130px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -bottom-24 h-[420px] w-[420px] rounded-full bg-[#ff2d55]/35 blur-[130px]"
            />
            <div className="relative grid items-center gap-8 p-6 sm:p-12 lg:grid-cols-2">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#ff2d55]/60 bg-[#ff0033]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff5470] shadow-[0_0_24px_rgba(255,0,51,0.45)]">
                  <AppleLogo className="h-3.5 w-3.5" />
                  Pré-venda exclusiva
                </span>
                <h2 className="mt-5 flex flex-wrap items-center gap-3 text-3xl font-bold leading-[1.05] text-white sm:text-6xl">
                  <AppleLogo className="h-8 w-8 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] sm:h-12 sm:w-12" />
                  <span>
                    iPhone 18 Pro Max
                    <br />
                    <span className="text-[#ff2d55] drop-shadow-[0_0_28px_rgba(255,45,85,0.75)]">
                      Vermelho Titânio
                    </span>
                  </span>
                </h2>
                <p className="mt-5 max-w-lg text-base font-medium text-[#ffb3c1] sm:text-lg">
                  Seja o primeiro a desfrutar da nova era.
                </p>
                <p className="mt-3 max-w-lg text-sm text-white/70">
                  Chip A20 Pro, sistema de câmeras revolucionário e um brilho que ninguém mais
                  tem. Reserve agora — unidades limitadas no primeiro lote.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <span className="text-2xl font-bold text-white sm:text-3xl">R$ 19.990,90</span>
                  <Button
                    size="lg"
                    asChild
                    className="border-0 bg-[#ff0033] text-white shadow-[0_0_36px_rgba(255,0,51,0.6)] hover:bg-[#ff2d55]"
                  >
                    <Link to="/product/$handle" params={{ handle: IPHONE18_HANDLE }}>
                      Garantir o meu <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <p className="mt-4 text-[11px] uppercase tracking-widest text-[#ff5470]">
                  Entrega estimada no dia do lançamento
                </p>
              </div>

              <div className="relative flex justify-center">
                <div
                  aria-hidden
                  className="absolute inset-0 m-auto h-[320px] w-[320px] rounded-full bg-[#ff0033]/45 blur-[100px]"
                />
                <img
                  src={iphone18Image}
                  alt="iPhone 18 Pro Max em vermelho titânio"
                  width={1024}
                  height={1024}
                  className="relative w-full max-w-xs drop-shadow-[0_0_60px_rgba(255,0,51,0.55)] sm:max-w-md"
                />
              </div>
            </div>
          </div>
        </section>

        <AppleDealSection />

        {/* Catálogo por categoria */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Nossa loja</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Curadoria de tecnologia direto da nossa loja.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/categoria/$slug"
                params={{ slug: c.slug }}
                className="rounded-xl border border-border/70 bg-card/60 px-3 py-2.5 text-center text-xs font-semibold transition-colors hover:border-primary/60 hover:text-primary sm:text-sm"
              >
                {c.name}
              </Link>
            ))}
          </div>

          <div className="mt-8">
            {CATEGORIES.map((c) => (
              <CategoryRow key={c.slug} category={c} />
            ))}
          </div>
        </section>

        {/* Benefícios */}
        <section className="border-y border-border/60 bg-card/30">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="flex items-center gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <b.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{b.title}</p>
                  <p className="text-xs text-muted-foreground">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Navegue por categoria */}
        <section id="categorias" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">Navegue por categoria</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/categoria/$slug"
                params={{ slug: c.slug }}
                className="group flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-card/60 px-4 py-3 transition-colors hover:border-primary/60 hover:bg-card"
              >
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold">{c.name}</h3>
                  <p className="truncate text-xs text-muted-foreground">{c.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-primary transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </section>


      </main>

      <SiteFooter />
    </div>
  );
}
