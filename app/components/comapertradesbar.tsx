import { trade } from "../Tsutilities/interfaces";

interface Props {
  buyTrades: trade[];
  sellTrades: trade[];
  maxWidth?: number; // max width of the bar in px
}

export default function TradePressureBars({
  buyTrades,
  sellTrades,
  maxWidth = 500,
}: Props) {
  // Calculate total volume
  const totalVolume =
    buyTrades.reduce((sum, t) => sum + t.qty * t.price, 0) +
    sellTrades.reduce((sum, t) => sum + t.qty * t.price, 0);

  const buyPercent = totalVolume
    ? (buyTrades.reduce((sum, t) => sum + t.qty * t.price, 0) / totalVolume) *
      100
    : 0;
  const sellPercent = totalVolume
    ? (sellTrades.reduce((sum, t) => sum + t.qty * t.price, 0) / totalVolume) *
      100
    : 0;

  return (
    <div className="bg-gray-900 p-4 rounded-xl w-full max-w-[750px] shadow-lg border border-gray-700">
      {/* Header */}
      <div className="flex justify-between text-xs text-gray-400 mb-2 font-semibold">
        <span>Buy Pressure</span>
        <span>Sell Pressure</span>
      </div>

      {/* Main pressure bar */}
      <div className="relative h-8 bg-gray-800 rounded-full overflow-hidden shadow-inner">
        {/* Buy Bar */}
        <div
          className="absolute left-0 top-0 h-full rounded-l-full bg-gradient-to-r from-green-400 to-green-600 shadow-[0_0_10px_rgba(0,255,0,0.5)] transition-all duration-500 ease-out"
          style={{ width: `${buyPercent}%` }}
          title={`Buy: ${buyPercent.toFixed(2)}%`}
        ></div>

        {/* Sell Bar */}
        <div
          className="absolute right-0 top-0 h-full rounded-r-full bg-gradient-to-l from-red-400 to-red-600 shadow-[0_0_10px_rgba(255,0,0,0.5)] transition-all duration-500 ease-out"
          style={{ width: `${sellPercent}%` }}
          title={`Sell: ${sellPercent.toFixed(2)}%`}
        ></div>

        {/* Percentage Labels */}
        <div className="absolute left-1 top-1 text-green-100 text-xs font-bold">
          {buyPercent.toFixed(1)}%
        </div>
        <div className="absolute right-1 top-1 text-red-100 text-xs font-bold">
          {sellPercent.toFixed(1)}%
        </div>
      </div>
    </div>
  );
}
