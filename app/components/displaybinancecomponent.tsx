"use client";

import { useRouter } from "next/navigation";
import { binancetype } from "../Tsutilities/enums";
import { useEffect, useState, useMemo } from "react";
import { coinbinanceinfo } from "../apis/getapis";
import { Binance24hTicker } from "../Tsutilities/interfaces";

const imageMap: Record<binancetype, string> = {
  [binancetype.Bitcoin]: "/bitcoin.jpg",
  [binancetype.Ethereum]: "/ethereum.jpg",
  [binancetype.Binance_Coin]: "/binance_coin.png",
  [binancetype.Solana]: "/solana.png",
  [binancetype.Ripple]: "/ripple.jpg",
  [binancetype.Cardano]: "/cardano.jpg",
  [binancetype.Dogecoin]: "/dogecoin.png",
  [binancetype.Avalanche]: "/avalanche.png",
  [binancetype.Polkadot]: "/polkadot.png",
  [binancetype.Polygon]: "/polygon.jpg",
  [binancetype.Arbitrum]: "/Arbitrum.png",
  [binancetype.Optimism]: "/Optimism.png",
  [binancetype.Render]: "/Render.png",
  [binancetype.Ocean]: "/Ocean.jpg",
  [binancetype.Chainlink]: "/Chainlink.jpg",
  [binancetype.Uniswap]: "/Uniswap.png",
  [binancetype.Aave]: "/Aave.png",
  [binancetype.Maker]: "/Maker.png",
  [binancetype.Sandbox]: "/Sandbox.jpg",
  [binancetype.Decentraland]: "/Decentraland.png",
  [binancetype.AxieInfinity]: "/AxieInfinity.png",
  [binancetype.ShibaInu]: "/ShibaInu.png",
  [binancetype.Pepe]: "/Pepe.png",
  [binancetype.Cosmos]: "/Cosmos.jpg",
  [binancetype.Near]: "/Near.png",
  [binancetype.Algorand]: "/Algorand.png",
  [binancetype.Filecoin]: "/Filecoin.png",
};

// Format numbers like 1.2B / 3.4M / 5K
const formatNumber = (num?: string) => {
  if (!num) return "--";
  const n = Number(num);
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(2) + "K";
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
};

// Format price with $
const formatPrice = (price?: string) =>
  price
    ? `$${Number(price).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    : "--";

export default function DisplayBimamceComponent({
  binancecointype = binancetype.Bitcoin,
  route,
  symbol, // pass like BTCUSDT
}: {
  binancecointype: binancetype;
  route: string;
  symbol: string;
}) {
  const [coinBinanceInfo, setCoinBinanceInfo] =
    useState<Binance24hTicker | null>(null);
  const [prevPrice, setPrevPrice] = useState<string | null>(null);
  const router = useRouter();
  const imageSrc = imageMap[binancecointype] ?? "/bitcoin.jpg";

  useEffect(() => {
    // Fetch REST data first
    const fetchData = async () => {
      const data = await coinbinanceinfo(symbol);
      setCoinBinanceInfo(data);
      setPrevPrice(data?.lastPrice ?? null);
    };
    fetchData();

    // Live WebSocket
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`,
    );

    ws.onopen = () => console.log("WS connected:", symbol);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCoinBinanceInfo({
        symbol: data.s,
        lastPrice: data.c,
        priceChangePercent: data.P,
        quoteVolume: data.q,
      });
      setPrevPrice((prev) => coinBinanceInfo?.lastPrice ?? prev);
    };
    ws.onerror = () => {
      // Binance often triggers this with no useful info
    };
    ws.onclose = (event) => {
      console.log("WS closed:", symbol, event.code, event.reason);
    };

    return () => ws.close();
  }, [symbol]);

  const isUp = useMemo(
    () => coinBinanceInfo && Number(coinBinanceInfo.priceChangePercent) >= 0,
    [coinBinanceInfo],
  );

  const priceChangeClass = useMemo(() => {
    if (!prevPrice || !coinBinanceInfo?.lastPrice) return "";
    return Number(coinBinanceInfo.lastPrice) > Number(prevPrice)
      ? "text-green-400 animate-pulse"
      : "text-red-400 animate-pulse";
  }, [coinBinanceInfo, prevPrice]);

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
            alt={binancecointype}
            className="w-10 h-10 rounded-full ring-2 ring-white/10 transition group-hover:ring-amber-400/60 group-hover:scale-105"
          />
          <div>
            <p className="text-white font-medium">{binancecointype}</p>
            <p className="text-xs text-gray-400 uppercase">{route}</p>
          </div>
        </div>
      </td>

      {/* 24h Change */}
      <td
        className={`px-6 py-4 font-semibold ${isUp ? "text-green-400" : "text-red-400"}`}
      >
        {isUp ? "+" : ""}{" "}
        {coinBinanceInfo
          ? Number(coinBinanceInfo.priceChangePercent).toFixed(2) + "%"
          : "--"}
      </td>

      {/* Current price */}
      <td className={`px-6 py-4 text-gray-300 font-medium ${priceChangeClass}`}>
        {formatPrice(coinBinanceInfo?.lastPrice)}
      </td>

      {/* 24h Volume */}
      <td className="px-6 py-4 text-gray-300 font-medium">
        {formatNumber(coinBinanceInfo?.quoteVolume)}$
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
