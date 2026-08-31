import { Link } from "@tanstack/react-router";
import { Loader2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

export function ProductCard({
  product,
  compact = false,
}: {
  product: ShopifyProduct;
  compact?: boolean;
}) {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const node = product.node;
  const variant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;

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
        {image ? (
          <img
            src={image.url}
            alt={image.altText ?? node.title}
            loading="lazy"
            className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${compact ? "object-contain p-2" : "object-cover"}`}
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
          <p className={`${compact ? "text-base" : "text-lg"} font-bold text-primary`}>
            {formatPrice(
              node.priceRange.minVariantPrice.amount,
              node.priceRange.minVariantPrice.currencyCode,
            )}
          </p>
          <Button
            onClick={handleAddToCart}
            disabled={isLoading || !variant}
            className="w-full"
            size="sm"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Adicionar
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
