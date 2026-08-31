import { Zap } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-4 w-4" />
            </span>
            <span className="font-display text-lg font-bold">
              Nova <span className="text-primary">Store</span>
            </span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Tecnologia premium com entrega rápida e checkout seguro.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Institucional</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Sobre a loja</li>
            <li>Trabalhe conosco</li>
            <li>Imprensa</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Atendimento</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Central de ajuda</li>
            <li>Trocas e devoluções</li>
            <li>Prazos de entrega</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Pagamento</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Checkout seguro Shopify</li>
            <li>Cartão, Pix e boleto</li>
            <li>Parcelamento disponível</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Nova Store. Todos os direitos reservados.
      </div>
    </footer>
  );
}
