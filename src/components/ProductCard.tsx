import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice, type ShopifyProduct } from "@/lib/catalog";
import { toast } from "sonner";

export function ProductCard({
  product,
  compact = false,
}: {
  product: ShopifyProduct;
  compact?: boolean;
}) {
  const addItem = useCartStore((state) => state.addItem);
  const node = product.node;
  const variant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const compareAt = node.compareAtPrice ? parseFloat(node.compareAtPrice.amount) : null;
  const discount = compareAt && compareAt > price ? Math.round((1 - price / compareAt) * 100) : 0;

  const handleAddToCart = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Adicionado ao carrinho", {
      description: node.title,
      position: "top-center",
    });
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all hover:border-primary/50 hover:shadow-[0_0_0_1px_var(--color-primary)]">
      <Link
        to="/product/$handle"
        params={{ handle: node.handle }}
        className={`relative block overflow-hidden bg-secondary ${compact ? "aspect-[4/3]" : "aspect-square"}`}
      >
        {discount > 0 && (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold text-primary-foreground">
            -{discount}%
          </span>
        )}
        {image ? (
          <img
            src={image.url}
            alt={image.altText ?? node.title}
            loading="lazy"
            className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${compact ? "object-contain p-2" : "object-contain p-3"}`}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Sem imagem
          </div>
        )}
      </Link>
      <div className={`flex flex-1 flex-col ${compact ? "gap-2 p-3" : "gap-3 p-4"}`}>
        <Link to="/product/$handle" params={{ handle: node.handle }}>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug">{node.title}</h3>
        </Link>
        {!compact && (
          <p className="line-clamp-2 text-xs text-muted-foreground">{node.description}</p>
        )}
        <div className={`mt-auto ${compact ? "space-y-2" : "space-y-3"}`}>
          <div>
            {compareAt && compareAt > price && (
              <p className="text-xs text-muted-foreground line-through">
                {formatPrice(compareAt)}
              </p>
            )}
            <p className={`${compact ? "text-base" : "text-lg"} font-bold text-primary`}>
              {formatPrice(price)}
            </p>
            <p className="text-[11px] text-muted-foreground">
              10x de {formatPrice(price / 10)} sem juros
            </p>
          </div>
          <Button onClick={handleAddToCart} disabled={!variant} className="w-full" size="sm">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
}
