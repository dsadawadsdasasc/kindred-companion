// Avaliações determinísticas por produto (sem backend):
// nota entre 4.7 e 5.0 e quantidade inversamente proporcional ao preço.

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

const OVERRIDES: Record<string, { rating: number; count: number }> = {
  "iphone-18-pro-max": { rating: 5, count: 13 },
};

export function getProductReviews(handle: string, price: number) {
  const override = OVERRIDES[handle];
  if (override) return override;

  const r1 = hash(handle);
  const r2 = hash(handle + "#rating");

  const safePrice = Math.max(price, 100);
  // quanto mais barato, mais avaliações
  const base = 4200 / Math.sqrt(safePrice);
  const variation = 0.75 + r1 * 0.5;
  const count = Math.max(11, Math.min(640, Math.round(base * variation)));

  const rating = Math.round((4.7 + r2 * 0.3) * 10) / 10;

  return { rating, count };
}
