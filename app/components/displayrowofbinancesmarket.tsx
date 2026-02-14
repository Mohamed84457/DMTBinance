"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { DisplayBinanceComponentProps } from "../Tsutilities/interfaces";

// Helpers
const formatNumber = (num?: string) => {
  if (!num) return "--";
  const n = Number(num);
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(2) + "K";
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
};

const formatPrice = (price?: string) =>
  price
    ? `$${Number(price).toLocaleString(undefined, { maximumFractionDigits: 6 })}`
    : "--";

// Get base coin from symbol, e.g., DFUSDT → DF
const getBaseCoin = (symbol: string) => symbol.replace("USDT", "");



export default function DisplayrowBinancemarketComponent({
  symbol,
  route,
  lastPrice,
  priceChangePercent,
  quoteVolume,
  highPrice,
  lowPrice,
}: DisplayBinanceComponentProps) {
  const router = useRouter();

  const isUp = useMemo(
    () => priceChangePercent && Number(priceChangePercent) >= 0,
    [priceChangePercent],
  );

  const baseCoin = getBaseCoin(symbol);

  return (
    <tr
      onClick={() => router.push(`/binance/${route}`)}
      className="group cursor-pointer transition hover:bg-white/5 active:bg-white/10"
    >
      {/* Coin image & name */}
      <td className="px-5 py-3">
        <div className="flex items-center gap-3">
          <img
            src={`/coins/${baseCoin}.png`}
            className="w-10 h-10 rounded-full ring-2 ring-white/10 transition group-hover:ring-amber-400/60 group-hover:scale-105"
            alt={baseCoin}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/coins/default.png";
            }}
          />

          <div>
            <p className="text-white font-medium">{baseCoin}</p>
            <p className="text-xs text-gray-400 uppercase">{symbol}</p>
          </div>
        </div>
      </td>

      {/* 24h Change */}
      <td
        className={`px-5 py-3 font-semibold ${
          isUp ? "text-green-400" : "text-red-400"
        }`}
      >
        {isUp && "+"}
        {priceChangePercent
          ? Number(priceChangePercent).toFixed(2) + "%"
          : "--"}
      </td>

      {/* Last Price */}
      <td className="px-5 py-3 text-gray-300 font-medium">
        {formatPrice(lastPrice)}
      </td>

      {/* 24h Volume */}
      <td className="px-5 py-3 text-gray-300 font-medium">
        {formatNumber(quoteVolume)}$
      </td>

      {/* Action */}
      <td className="px-5 py-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/binance/${route}`);
          }}
          className="rounded-md bg-amber-400/10 px-3 py-1 text-sm text-amber-400 hover:bg-amber-400/20 transition"
        >
          View
        </button>
      </td>
    </tr>
  );
}
