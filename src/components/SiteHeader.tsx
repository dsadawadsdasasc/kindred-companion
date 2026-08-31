import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Zap, Search } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import { CATEGORIES } from "@/lib/categories";

export function SiteHeader() {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = term.trim();
    if (!q) return;
    navigate({ to: "/busca", search: { q } });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            Nova <span className="text-primary">Store</span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center gap-5 xl:flex">
          {CATEGORIES.map((item) => (
            <Link
              key={item.slug}
              to="/categoria/$slug"
              params={{ slug: item.slug }}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <form
            onSubmit={submit}
            className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-2 focus-within:border-primary/60 md:flex"
          >
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Buscar produtos"
              aria-label="Buscar produtos"
              className="w-40 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground lg:w-56"
            />
          </form>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
