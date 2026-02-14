"use client";

import { Binanceinfoaround24 } from "../Tsutilities/interfaces";
import DisplayrowBinancemarketComponent from "./displayrowofbinancesmarket";

interface TableOfBinanceTickersProps {
  binances: Binanceinfoaround24[]; // full 24h ticker data
}

export default function TableOfBinanceTickers({
  binances,
}: TableOfBinanceTickersProps) {
  if (!binances || binances.length === 0) {
    return <p className="text-gray-400 p-4">No binance data available.</p>;
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10">
      {/* scroll container */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          {/* header */}
          <thead
            className="
              sticky top-0 z-10
              bg-black/60 backdrop-blur
              text-xs uppercase tracking-wider text-gray-400
            "
          >
            <tr>
              <th scope="col" className="px-5 py-3 text-left">
                Name
              </th>
              <th scope="col" className="px-5 py-3 text-left">
                24h Change
              </th>
              <th scope="col" className="px-5 py-3 text-left">
                Last Price
              </th>
              <th scope="col" className="px-5 py-3 text-left">
                24h Volume
              </th>
              <th scope="col" className="px-5 py-3 text-left">
                Action
              </th>
            </tr>
          </thead>

          {/* body */}
          <tbody
            className="
              divide-y divide-white/5
              [&>tr:hover]:bg-white/5
              [&>tr]:transition-colors
            "
          >
            {binances.map((coin) => (
              <DisplayrowBinancemarketComponent
                key={coin.symbol}
                route={coin.symbol} // or map to a route-friendly string
                symbol={coin.symbol}
                lastPrice={coin.lastPrice}
                priceChangePercent={coin.priceChangePercent}
                quoteVolume={coin.quoteVolume}
                highPrice={coin.highPrice}
                lowPrice={coin.lowPrice}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* gradient fade bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
}
