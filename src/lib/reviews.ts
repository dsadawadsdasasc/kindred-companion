// Avaliações determinísticas por produto (sem backend):
// nota entre 4.7 e 5.0 e quantidade baseada em preço + popularidade do modelo.

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

const OVERRIDES: Record<string, { rating: number; count: number }> = {
  "iphone-18-pro-max-1tb": { rating: 5, count: 13 },
};

/** Modelos "topo de linha" vendem menos; modelos de entrada vendem muito. */
export function getPopularityScore(title: string) {
  const t = title.toLowerCase();
  let score = 1;

  if (/pro max|ultra|1tb|2tb|titânio|titanio/.test(t)) score *= 0.35;
  else if (/\bpro\b|\bmax\b|plus|512gb|premium/.test(t)) score *= 0.6;

  if (/\b(128gb|256gb|8gb)\b/.test(t)) score *= 1.35;
  if (/ps5|playstation 5|series x|series s|switch|airpods|galaxy s2[0-9] |redmi|moto g/.test(t))
    score *= 1.4;
  if (/\bse\b|lite|\bmini\b|nord|\ba1[0-9]\b/.test(t)) score *= 1.25;

  return score;
}

export function getProductReviews(handle: string, price: number, title = handle) {
  const override = OVERRIDES[handle];
  if (override) return override;

  const safePrice = Math.max(price, 100);
  // quanto mais barato, mais avaliações (curva forte)
  const base = 30000 / Math.pow(safePrice, 0.78);
  const popularity = getPopularityScore(title || handle);
  // variação ampla para não ficar tudo parecido
  const variation = 0.55 + hash(handle) * 1.15;

  const count = Math.max(7, Math.min(890, Math.round(base * popularity * variation)));
  const rating = Math.round((4.7 + hash(handle + "#r") * 0.3) * 10) / 10;

  return { rating, count };
}
