import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Zap, Search, Menu } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import { CATEGORIES } from "@/lib/categories";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteHeader() {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = term.trim();
    if (!q) return;
    setMenuOpen(false);
    navigate({ to: "/busca", search: { q } });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:gap-6 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight sm:text-xl">
            Nova <span className="text-primary">Store</span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
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

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Abrir menu de categorias">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[68vw] max-w-[280px] sm:max-w-xs">
              <SheetHeader>
                <SheetTitle>Categorias</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 px-4 pb-8">
                <form
                  onSubmit={submit}
                  className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 focus-within:border-primary/60 md:hidden"
                >
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Buscar produtos"
                    aria-label="Buscar produtos"
                    className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  />
                </form>
                <nav className="flex flex-col">
                  {CATEGORIES.map((item) => (
                    <Link
                      key={item.slug}
                      to="/categoria/$slug"
                      params={{ slug: item.slug }}
                      onClick={() => setMenuOpen(false)}
                      className="border-b border-border/60 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      activeProps={{ className: "text-primary" }}
                    >
                      {item.name}
                      <span className="block text-xs font-normal text-muted-foreground/70">
                        {item.desc}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
