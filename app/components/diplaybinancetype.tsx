"use client";

import { binancetype } from "../Tsutilities/enums";
import CurrentBinancePrice from "./currentBinancePrice";

const imageMap: Record<binancetype, string> = {
  [binancetype.Bitcoin]: "/bitcoin.jpg",
  [binancetype.Ethereum]: "/ethereum.jpg",
  [binancetype.Binance_Coin]: "/binance_coin.png",
  [binancetype.Solana]: "/solana.png",
  [binancetype.Ripple]: "/ripple.jpg",
  [binancetype.Cardano]: "/cardano.png",
  [binancetype.Dogecoin]: "/dogecoin.png",
  [binancetype.Avalanche]: "/avalanche.png",
  [binancetype.Polkadot]: "/polkadot.png",
  [binancetype.Polygon]: "/polygon.jpg",
};

export default function Displaybinancetype({
  binancecointype = binancetype.Bitcoin,
}: {
  binancecointype: binancetype;
}) {
  const imageSrc = imageMap[binancecointype] ?? "/bitcoin.jpg";

  return (
    <div className="flex items-center gap-4">
      <img
        src={imageSrc}
        alt={binancecointype}
        className="
            w-9 h-9 lg:w-11 lg:h-11
            rounded-full
            ring-2 ring-white/20
            shadow-md
            transition-all duration-300
            hover:scale-105 hover:ring-amber-400/60
          "
      />
      <h2 className="font-semibold">{binancecointype}</h2>
      <CurrentBinancePrice binancetype={binancecointype} />
      USD
    </div>
  );
}
