// enum
import { tradestype,knownQuotes } from "../Tsutilities/enums";
// interface
import { trade, Binanceinfoaround24 } from "../Tsutilities/interfaces";
export function filtertrades(trades: trade[], type: tradestype) {
  const ifbuyorsell: boolean = type === tradestype.selltrades ? true : false;
  const filterdtrades = trades.filter((trade) => {
    if (trade.isBuyerMaker === ifbuyorsell) {
      return true;
    }
  });
  return filterdtrades;
}

// filter by type of binance
export const excludeStable = (data: Binanceinfoaround24[]) =>
  data.filter(
    (i) => !["USDC", "BUSD", "TUSD"].some((s) => i.symbol.includes(s)),
  );

// filter binances
const toPercent = (v: string) => Number(v);
// top gainers
export const gainerbinances = (
  data: Binanceinfoaround24[] | null,
): Binanceinfoaround24[] => {
  if (!data) return [];

  return data
    .filter((item) => toPercent(item.priceChangePercent) > 0)
    .sort(
      (a, b) =>
        toPercent(b.priceChangePercent) - toPercent(a.priceChangePercent),
    );
};
// losers binances
export const losersbinances = (
  data: Binanceinfoaround24[] | null,
): Binanceinfoaround24[] => {
  if (!data) return [];

  return data
    .filter((item) => toPercent(item.priceChangePercent) < 0)
    .sort(
      (a, b) =>
        toPercent(a.priceChangePercent) - toPercent(b.priceChangePercent),
    ); // biggest loss first
};

// Big % change with low volume = fake move  , so filter real gainers
export const filterByVolume = (
  data: Binanceinfoaround24[],
  minVolume = 1_000_000,
) => data.filter((item) => Number(item.quoteVolume) >= minVolume);

// newhigh
export const newHighs = (
  data: Binanceinfoaround24[] | null,
): Binanceinfoaround24[] => {
  if (!data) return [];
  return data.filter(
    (item) => Number(item.lastPrice) >= Number(item.highPrice),
  );
};
// newlow
export const newLows = (
  data: Binanceinfoaround24[] | null,
): Binanceinfoaround24[] => {
  if (!data) return [];
  return data.filter((item) => Number(item.lastPrice) <= Number(item.lowPrice));
};


// get the right currency depend on coin
export function getQuoteCurrency(symbol: string) {
  return knownQuotes.find((quote) =>
    symbol.endsWith(quote)
  ) || "";
}
