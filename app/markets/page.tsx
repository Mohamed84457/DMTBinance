"use client";

// components
import TableOfBinanceTickers from "../components/tableofmarketbinances";
import { useMemo } from "react";
import {
  filterByVolume,
  gainerbinances,
  losersbinances,
  excludeStable,
  newLows,
  newHighs,
} from "../helpers/filters";
import { useMareketcontext } from "../providers/marketprovider";

export default function Markets() {
  const data = useMareketcontext() || [];
console.log(data)
  // USDT only
  const USDTbinances = useMemo(() => excludeStable(data), [data]);

  // top gainers (real volume)
  const gainersBinances = useMemo(() => {
    const gainers = gainerbinances(USDTbinances);
    return filterByVolume(gainers);
  }, [USDTbinances]);

  // losers
  const losersBinances = useMemo(
    () => losersbinances(USDTbinances),
    [USDTbinances],
  );

  // new highs
  const newHighBinances = useMemo(() => newHighs(USDTbinances), [USDTbinances]);

  // new lows
  const newLowBinances = useMemo(() => newLows(USDTbinances), [USDTbinances]);

  // limiting to top 10
  const topGainers = gainersBinances.slice(0, 5);
  const topLosers = losersBinances.slice(0, 5);
  const topNewHigh = newHighBinances.slice(0, 5);
  const topNewLow = newLowBinances.slice(0, 5);

  console.log(topGainers)

  const sentiment =
    (gainersBinances.length /
      (gainersBinances.length + losersBinances.length)) *
    100;

  return (
    <div className="px-4 py-6 space-y-8">
      {/* Sentiment */}
      <div className="flex items-center gap-4 text-lg font-semibold">
        <span className="text-green-400 flex items-center gap-1">
          🟢 {sentiment.toFixed(1)}% Bullish
        </span>
        <span className="text-red-400 flex items-center gap-1">
          🔴 {(100 - sentiment).toFixed(1)}% Bearish
        </span>
      </div>

      {/* Top Gainers */}
      <section className="bg-gray-900/50 border border-white/10 rounded-xl p-4">
        <h2 className="text-xl font-bold text-white mb-3">🔥 Top Gainers</h2>
        <TableOfBinanceTickers binances={topGainers} />
      </section>

      {/* Top Losers */}
      <section className="bg-gray-900/50 border border-white/10 rounded-xl p-4">
        <h2 className="text-xl font-bold text-white mb-3">📉 Top Losers</h2>
        <TableOfBinanceTickers binances={topLosers} />
      </section>

      {/* New Highs */}
      <section className="bg-gray-900/50 border border-white/10 rounded-xl p-4">
        <h2 className="text-xl font-bold text-white mb-3">🚀 New Highs</h2>
        <TableOfBinanceTickers binances={topNewHigh} />
      </section>

      {/* New Lows */}
      <section className="bg-gray-900/50 border border-white/10 rounded-xl p-4">
        <h2 className="text-xl font-bold text-white mb-3">📉 New Lows</h2>
        <TableOfBinanceTickers binances={topNewLow} />
      </section>
    </div>
  );
}
