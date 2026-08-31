import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts } from "@/lib/shopify";
import { CATEGORIES, getCategory } from "@/lib/categories";

export const Route = createFileRoute("/categoria/$slug")({
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

function CategoryPage() {
  const { category } = Route.useLoaderData();

  const { data: products = [], isPending } = useQuery({
    queryKey: ["products", category.slug],
    queryFn: () => fetchProducts(24, category.query),
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

        {isPending ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : products.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border py-20 text-center">
            <p className="text-lg font-semibold">Nenhum produto encontrado</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Peça no chat para criar um produto informando nome e preço.
            </p>
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
