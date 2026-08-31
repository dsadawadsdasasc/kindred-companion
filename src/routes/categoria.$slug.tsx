import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Loader2, ArrowLeft, SlidersHorizontal } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts } from "@/lib/catalog";
import { CATEGORIES, getCategory } from "@/lib/categories";

type SortOption = "relevancia" | "menor-preco" | "maior-preco" | "desconto";

interface CategorySearch {
  sort?: SortOption;
  min?: number;
  max?: number;
}

export const Route = createFileRoute("/categoria/$slug")({
  validateSearch: (search: Record<string, unknown>): CategorySearch => ({
    sort: (["relevancia", "menor-preco", "maior-preco", "desconto"] as const).includes(
      search["sort"] as SortOption,
    )
      ? (search["sort"] as SortOption)
      : "relevancia",
    min: Number(search["min"]) > 0 ? Number(search["min"]) : 0,
    max: Number(search["max"]) > 0 ? Number(search["max"]) : 0,
  }),
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Categoria indisponível | Nova Store" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { name, desc } = loaderData.category;
    const title = `${name} | Nova Store`;
    const description = `${name} na Nova Store: ${desc.toLowerCase()}, com entrega expressa, parcelamento e checkout seguro.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: CategoryNotFound,
  component: CategoryPage,
});

function CategoryNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-3xl font-bold">Categoria não encontrada</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Escolha uma das categorias disponíveis abaixo.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to="/categoria/$slug"
              params={{ slug: c.slug }}
              className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary/60"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

const SORT_LABELS: Record<SortOption, string> = {
  relevancia: "Relevância",
  "menor-preco": "Menor preço",
  "maior-preco": "Maior preço",
  desconto: "Maior desconto",
};

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const search = Route.useSearch();
  const sort: SortOption = search.sort ?? "relevancia";
  const min = search.min ?? 0;
  const max = search.max ?? 0;
  const navigate = useNavigate({ from: "/categoria/$slug" });

  const { data: products = [], isPending } = useQuery({
    queryKey: ["products", category.slug],
    queryFn: () => fetchProducts(60, category.slug),
  });

  const visible = useMemo(() => {
    const priceOf = (p: (typeof products)[number]) =>
      parseFloat(p.node.priceRange.minVariantPrice.amount);
    const discountOf = (p: (typeof products)[number]) => {
      const compare = p.node.compareAtPrice ? parseFloat(p.node.compareAtPrice.amount) : 0;
      return compare > priceOf(p) ? 1 - priceOf(p) / compare : 0;
    };
    const filtered = products.filter((p) => {
      const price = priceOf(p);
      if (min > 0 && price < min) return false;
      if (max > 0 && price > max) return false;
      return true;
    });
    const sorted = [...filtered];
    if (sort === "menor-preco") sorted.sort((a, b) => priceOf(a) - priceOf(b));
    if (sort === "maior-preco") sorted.sort((a, b) => priceOf(b) - priceOf(a));
    if (sort === "desconto") sorted.sort((a, b) => discountOf(b) - discountOf(a));
    return sorted;
  }, [products, sort, min, max]);

  const setSearch = (patch: Partial<CategorySearch>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });

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

        <header className="mt-6">
          <h1 className="text-3xl font-bold sm:text-4xl">{category.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{category.desc}</p>
        </header>

        <nav className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to="/categoria/$slug"
              params={{ slug: c.slug }}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                c.slug === category.slug
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </nav>

        {/* Filtros */}
        <div className="mt-8 flex flex-wrap items-end gap-4 rounded-2xl border border-border/70 bg-card/60 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <SlidersHorizontal className="h-4 w-4 text-primary" /> Filtros
          </div>
          <label className="text-xs text-muted-foreground">
            Preço mínimo
            <input
              type="number"
              min={0}
              value={min || ""}
              placeholder="0"
              onChange={(e) => setSearch({ min: Number(e.target.value) || 0 })}
              className="mt-1 block w-32 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground"
            />
          </label>
          <label className="text-xs text-muted-foreground">
            Preço máximo
            <input
              type="number"
              min={0}
              value={max || ""}
              placeholder="Sem limite"
              onChange={(e) => setSearch({ max: Number(e.target.value) || 0 })}
              className="mt-1 block w-32 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground"
            />
          </label>
          <label className="text-xs text-muted-foreground">
            Ordenar por
            <select
              value={sort}
              onChange={(e) => setSearch({ sort: e.target.value as SortOption })}
              className="mt-1 block w-44 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground"
            >
              {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
                <option key={key} value={key}>
                  {SORT_LABELS[key]}
                </option>
              ))}
            </select>
          </label>
          <p className="ml-auto text-xs text-muted-foreground">
            {visible.length} produto{visible.length !== 1 ? "s" : ""}
          </p>
        </div>

        {isPending ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : visible.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border py-20 text-center">
            <p className="text-lg font-semibold">Nenhum produto encontrado</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Ajuste os filtros de preço para ver mais opções.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
