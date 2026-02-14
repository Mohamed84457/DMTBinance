"use client";

import { getBaseAsset, getCoinImage } from "../helpers/baseassest";
import { binancetype } from "../Tsutilities/enums";
import CurrentBinancePrice from "./currentBinancePrice";

export default function Displaybinancetype({
  binancecointype = binancetype.Bitcoin,
}: {
  binancecointype: binancetype|string;
}) {
  // const imageSrc = imageMap[binancecointype] ?? "/bitcoin.jpg";
  const baseCoin = getBaseAsset(binancecointype);
  const imageSrc = getCoinImage(binancecointype);
  return (
    <div className="flex items-center gap-4">
      <img
        src={imageSrc}
        alt={baseCoin}
        className="
            w-9 h-9 lg:w-11 lg:h-11
            rounded-full
            ring-2 ring-white/20
            shadow-md
            transition-all duration-300
            hover:scale-105 hover:ring-amber-400/60
          "
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/coins/default.png";
        }}
      />
      <h2 className="font-semibold">{binancecointype}</h2>
      <CurrentBinancePrice binancetype={binancecointype} />
      
    </div>
  );
}
