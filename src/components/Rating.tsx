import { Star } from "lucide-react";

export function Rating({
  rating,
  count,
  size = "sm",
  className = "",
}: {
  rating: number;
  count: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const starSize = size === "md" ? "h-4 w-4" : "h-3 w-3";
  const textSize = size === "md" ? "text-sm" : "text-[11px]";

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            className={`${starSize} ${
              rating >= i + 0.75
                ? "fill-amber-400 text-amber-400"
                : rating >= i + 0.25
                  ? "fill-amber-400/60 text-amber-400"
                  : "text-muted-foreground/40"
            }`}
          />
        ))}
      </div>
      <span className={`${textSize} font-semibold text-foreground`}>
        {rating.toFixed(1).replace(".", ",")}
      </span>
      <span className={`${textSize} text-muted-foreground`}>
        ({count} {count === 1 ? "avaliação" : "avaliações"})
      </span>
    </div>
  );
}
