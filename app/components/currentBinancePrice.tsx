"use client";

import CircularProgress from "@mui/material/CircularProgress";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

// interface
import { BinancePrice } from "../Tsutilities/interfaces";

function formatPrice(price: number) {
  if (price >= 1000) return price.toFixed(2);
  if (price >= 1) return price.toFixed(4);
  return price.toFixed(6);
}

export default function CurrentBinancePrice({
  binancetype = "BTCUSDT",
}: {
  binancetype: string;
}) {
  const [binancePrice, setBinancePrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPriceUp, setIsPriceUp] = useState<boolean | null>(null);

  const prevPriceRef = useRef<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBinancePrice = async () => {
      try {
        const symbol = binancetype.trim().toUpperCase();

        const res = await axios.get<BinancePrice>(
          "https://api.binance.com/api/v3/ticker/price",
          { params: { symbol } }
        );

        const currentPrice = Number(res.data.price);

        if (prevPriceRef.current !== null) {
          setIsPriceUp(currentPrice > prevPriceRef.current);
        }

        prevPriceRef.current = currentPrice;

        if (isMounted) {
          setBinancePrice(currentPrice);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch binance price", error);
      }
    };

    fetchBinancePrice();
    const intervalId = setInterval(fetchBinancePrice, 2000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [binancetype]);

  return (
    <div className="flex items-center gap-2 font-mono">
      {loading && <CircularProgress size={18} />}

      {binancePrice !== null && (
        <span
          className={`flex items-center gap-1 transition-colors duration-300
            ${
              isPriceUp === null
                ? "text-gray-400"
                : isPriceUp
                ? "text-green-500"
                : "text-red-500"
            }
          `}
        >
          {formatPrice(binancePrice)} $
          {isPriceUp === null ? null : isPriceUp ? (
            <ArrowUpwardIcon fontSize="inherit" />
          ) : (
            <ArrowDownwardIcon fontSize="inherit" />
          )}
        </span>
      )}
    </div>
  );
}
