import axios from "axios";
// interface
import { candle } from "../Tsutilities/interfaces";
import {
  trade,
  chart_config,
  Binance24hTicker,
} from "../Tsutilities/interfaces";
// enum
import { binancetype } from "../Tsutilities/enums";

import { UTCTimestamp } from "lightweight-charts";

export const Getcandels = async (chart_configration: chart_config) => {
  const res = await axios.get("https://api.binance.com/api/v3/klines", {
    params: {
      symbol: chart_configration.symbol,
      interval: chart_configration.interval,
      limit: chart_configration.limit,
    },
  });
  const candels = res.data;
  const mappingcandles: candle[] = await candels.map(
    (item: (UTCTimestamp | number)[]) => {
      return {
        time: Number(item[0] / 1000) as UTCTimestamp,
        open: Number(item[1]),
        high: Number(item[2]),
        low: Number(item[3]),
        close: Number(item[4]),
      };
    },
  );
  console.log(res.data);
  return mappingcandles;
};

// get oldercandles candles
export const getOlderCandles = async (
  chart_configration: chart_config,
  endTime: UTCTimestamp,
) => {
  const res = await axios.get("https://api.binance.com/api/v3/klines", {
    params: {
      symbol: chart_configration.symbol,
      interval: chart_configration.interval,
      limit: chart_configration.limit,
      endTime: endTime * 1000 - 1, // IMPORTANT
    },
  });

  return res.data.map((k: (UTCTimestamp | number)[]) => ({
    time: (k[0] / 1000) as UTCTimestamp,
    open: Number(k[1]),
    high: Number(k[2]),
    low: Number(k[3]),
    close: Number(k[4]),
  }));
};

// get book trades (all trades (buy,sell))
export const getbooktrades = async (
  chart_configration: chart_config,
): Promise<trade[]> => {
  const res = await axios.get("https://api.binance.com/api/v3/trades", {
    params: {
      symbol: chart_configration.symbol,
      limit: chart_configration.limit,
    },
  });

  return res.data.map((t: trade) => ({
    id: String(t.id),
    time: t.time,
    price: Number(t.price),
    qty: Number(t.qty),
    quoteQty: Number(t.quoteQty),
    isBuyerMaker: t.isBuyerMaker,
    isBestMatch: t.isBestMatch,
  }));
};

// get info about coin binance
export const coinbinanceinfo = async (
  binancesymbol: string,
): Promise<Binance24hTicker | null> => {
  try {
    const res = await axios.get<Binance24hTicker>(
      "https://api.binance.com/api/v3/ticker/24hr",
      {
        params: {
          symbol: binancesymbol.toUpperCase(),
        },
      },
    );

    return res.data;
  } catch (err) {
    console.error("Binance API error:", err);
    return null;
  }
};
