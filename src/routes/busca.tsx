import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { searchProducts } from "@/lib/catalog";

export const Route = createFileRoute("/busca")({
  validateSearch: (search: Record<string, unknown>): { q?: string } => ({
    q: typeof search["q"] === "string" ? (search["q"] as string) : "",
  }),
  component: SearchPage,
  head: () => ({
    meta: [
      { title: "Buscar produtos | Nova Store" },
      {
        name: "description",
        content:
          "Busque smartphones, notebooks, TVs, consoles e periféricos no catálogo da Nova Store.",
      },
      { property: "og:title", content: "Buscar produtos | Nova Store" },
      {
        property: "og:description",
        content: "Encontre tecnologia premium com entrega expressa na Nova Store.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function SearchPage() {
  const { q = "" } = Route.useSearch();

  const { data: products = [], isPending } = useQuery({
    queryKey: ["search", q],
    queryFn: () => searchProducts(q, 48),
    enabled: q.trim().length > 0,
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar para a home
        </Link>
        <h1 className="mt-6 text-3xl font-bold">
          {q ? `Resultados para "${q}"` : "Buscar produtos"}
        </h1>

        {!q ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Digite um termo na busca acima para encontrar produtos.
          </p>
        ) : isPending ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : products.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border py-20 text-center">
            <p className="text-lg font-semibold">Nenhum produto encontrado</p>
            <p className="mt-2 text-sm text-muted-foreground">Tente outro termo de busca.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
