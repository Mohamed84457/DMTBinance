"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { coinbinanceinfo } from "../apis/getapis";
import { Binance24hTicker } from "../Tsutilities/interfaces";

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
    ? `$${Number(price).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    : "--";

// Extract base asset from symbol
const getBaseAsset = (symbol: string) => symbol.replace("USDT", "");

// Get coin image path dynamically
const getCoinImage = (symbol: string) => {
  const base = getBaseAsset(symbol);
  return `/coins/${base}.png`; // local coins folder
};

interface Props {
  symbol: string; // e.g., BTCUSDT
  route: string;
}

export default function DisplayBinanceComponent({ symbol, route }: Props) {
  const [coinInfo, setCoinInfo] = useState<Binance24hTicker | null>(null);
  const [prevPrice, setPrevPrice] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await coinbinanceinfo(symbol);
      setCoinInfo(data);
      setPrevPrice(data?.lastPrice ?? null);
    };
    fetchData();

    // WebSocket live updates
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCoinInfo({
        symbol: data.s,
        lastPrice: data.c,
        priceChangePercent: data.P,
        quoteVolume: data.q,
      });
      setPrevPrice((prev) => coinInfo?.lastPrice ?? prev);
    };

    return () => ws.close();
  }, [symbol]);

  const isUp = useMemo(
    () => coinInfo && Number(coinInfo.priceChangePercent) >= 0,
    [coinInfo]
  );

  const priceChangeClass = useMemo(() => {
    if (!prevPrice || !coinInfo?.lastPrice) return "";
    return Number(coinInfo.lastPrice) > Number(prevPrice)
      ? "text-green-400 animate-pulse"
      : "text-red-400 animate-pulse";
  }, [coinInfo, prevPrice]);

  const baseCoin = getBaseAsset(symbol);
  const imageSrc = getCoinImage(symbol);

  return (
    <tr
      onClick={() => router.push(`/binance/${route}`)}
      className="group cursor-pointer transition hover:bg-white/5 active:bg-white/10"
    >
      {/* Coin image & name */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={imageSrc}
            alt={baseCoin}
            className="w-10 h-10 rounded-full ring-2 ring-white/10 transition group-hover:ring-amber-400/60 group-hover:scale-105"
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
        className={`px-6 py-4 font-semibold ${
          isUp ? "text-green-400" : "text-red-400"
        }`}
      >
        {isUp ? "+" : ""}
        {coinInfo ? Number(coinInfo.priceChangePercent).toFixed(2) + "%" : "--"}
      </td>

      {/* Current price */}
      <td className={`px-6 py-4 text-gray-300 font-medium ${priceChangeClass}`}>
        {formatPrice(coinInfo?.lastPrice)}
      </td>

      {/* 24h Volume */}
      <td className="px-6 py-4 text-gray-300 font-medium">
        {formatNumber(coinInfo?.quoteVolume)}$
      </td>

      {/* Action */}
      <td className="px-6 py-4">
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
