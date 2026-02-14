"use client";

import {
  BinanceCoinItem,
  Binanceinfoaround24,
} from "../Tsutilities/interfaces";
import DisplayBinanceComponent from "./displaybinancecomponent";

interface TableOfDisplayBinancesProps {
  binances: BinanceCoinItem[]; // now strongly typed array
}

export default function TableOfDisplayBinances({
  binances,
}: TableOfDisplayBinancesProps) {
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
                Change
              </th>
              <th scope="col" className="px-5 py-3 text-left">
                Current
              </th>
              <th scope="col" className="px-5 py-3 text-left">
                24h
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
            {binances.map((item) => (
              <DisplayBinanceComponent
                key={item.value}
                route={item.value}
                symbol={item.value}
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
