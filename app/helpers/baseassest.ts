// Helper to extract base coin from symbol
export const getBaseAsset = (symbol: string) =>
  symbol.replace("USDT", "");

// Helper to resolve image path
export const getCoinImage = (symbol: string) => {
  const base = getBaseAsset(symbol);
  return `/coins/${base}.png`;
};
