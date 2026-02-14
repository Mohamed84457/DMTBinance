"use client";

import { Binanceinfoaround24 } from "../Tsutilities/interfaces";

interface Props {
  item: Binanceinfoaround24;
}

export default function BinanceRow({ item }: Props) {
  const change = Number(item.priceChangePercent);
  const isUp = change >= 0;

  return (
    <div className="grid grid-cols-5 items-center px-4 py-3 hover:bg-gray-50 cursor-pointer">
      {/* Coin */}
      <div className="flex items-center gap-2">
        <img
          src={`/coins/${item.symbol}.png`}
          alt={item.symbol}
          width={24}
          height={24}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/coins/default.png";
          }}
        />

        <span className="font-medium">{item.symbol.replace("USDT", "")}</span>
      </div>

      {/* Price */}
      <div>${Number(item.lastPrice).toFixed(4)}</div>

      {/* 24h % */}
      <div className={isUp ? "text-green-600" : "text-red-600"}>
        {change.toFixed(2)}%
      </div>

      {/* Volume */}
      <div>{Number(item.quoteVolume).toLocaleString()}</div>

      {/* Action */}
      <div className="text-blue-600 text-sm">View →</div>
    </div>
  );
}
