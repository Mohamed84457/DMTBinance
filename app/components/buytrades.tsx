import { useMemo } from "react";
// mui
import CircularProgress from "@mui/material/CircularProgress";

// interface
import { trade } from "../Tsutilities/interfaces";

export default function BuyTradesComponent({
  buyTrades,
  loading = true,
}: {
  buyTrades: trade[];
  loading: boolean;
}) {
  const mappedSellTrades = useMemo(() => {
    return buyTrades.map((t) => {
      const total = t.price * t.qty;

      return (
        <div
          key={t.id}
          className="grid grid-cols-4 gap-2 px-2 py-1 text-sm hover:bg-gray-800 transition"
        >
          {/* Price */}
          <span className="text-green-500 font-medium">
            {t.price.toFixed(2)}
          </span>

          {/* Quantity */}
          <span className="text-gray-300">{t.qty.toFixed(4)}</span>

          {/* Total */}
          <span className="text-gray-200">{total.toFixed(2)}</span>

          {/* Time */}
          <span className="text-gray-400 text-xs text-right">
            {new Date(t.time).toLocaleTimeString()}
          </span>
        </div>
      );
    });
  }, [buyTrades]);
  return (
    <div
      className="
    flex-1 overflow-y-auto px-2 py-1 bg-gray-900 text-white
    scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800
    scroll-smooth
    overscroll-contain
  "
    >
      <div className="grid grid-cols-4 gap-2 px-2 py-1 text-xs text-gray-400 border-b border-gray-700">
        <span>Price</span>
        <span>Amount (BTC)</span>
        <span>Total</span>
        <span className="text-right">Time</span>
      </div>
      {loading ? (
        <CircularProgress size={20} />
      ) : buyTrades.length ? (
        mappedSellTrades
      ) : (
        <p className="text-gray-400">No sell trades yet</p>
      )}
    </div>
  );
}
