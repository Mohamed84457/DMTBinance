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
  symbol: binancetype|string;
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

export interface BinanceCoinItem {
  label: string;
  value: binancetype;
}

// binance info around 24 h to filter it
export interface Binanceinfoaround24 {
  askPrice: string;
  askQty: string;
  bidPrice: string;
  bidQty: string;
  closeTime: number;
  count: number;
  firstId: number;
  highPrice: string;
  lastId: number;
  lastPrice: string;
  lastQty: string;
  lowPrice: string;
  openPrice: string;
  openTime: number;
  prevClosePrice: string;
  priceChange: string;
  priceChangePercent: string;
  quoteVolume: string;
  symbol: string;
  volume: string;
  weightedAvgPrice: string;
}

// for row binance market 
export interface DisplayBinanceComponentProps {
  symbol: string;                 // e.g., "DFUSDT"
  route: string;                  // route-friendly string for navigation
  lastPrice?: string;             // current last price
  priceChangePercent?: string;    // 24h % change
  quoteVolume?: string;           // 24h volume
  highPrice?: string;             // 24h high price
  lowPrice?: string;              // 24h low price
}
