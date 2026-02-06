import { UTCTimestamp } from "lightweight-charts";
// enums
import { intervals, binancetype } from "./enums";
// candle
export interface candle {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
}

// binance trade
export interface trade {
  time: UTCTimestamp;
  id: string;
  price: number;
  qty: number;
  quoteQty: number;
  isBuyerMaker: boolean;
  isBestMatch: boolean;
}

// Binance price
export interface BinancePrice {
  symbol: string;
  price: string;
}

// CHART_CONFIG
export interface chart_config {
  symbol: binancetype;
  interval: intervals;
  limit: number;
}

// 24h coin binance info
export interface Binance24hTicker {
  symbol: string;
  priceChangePercent: string;
  lastPrice: string;
  quoteVolume: string;
  
}
