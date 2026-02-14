"use client";
import {
  createChart,
  ColorType,
  CandlestickSeries,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
} from "lightweight-charts";
import type { MouseEventParams } from "lightweight-charts";
import type { CandlestickData } from "lightweight-charts";
// config
import { CHART_CONFIG } from "../config/config";

import { useEffect, useRef, useState } from "react";
// MUI
import CircularProgress from "@mui/material/CircularProgress";

// helpers
import { toUTCTimestamp } from "../helpers/converts";
// API
import { Getcandels, getOlderCandles } from "../apis/getapis";
// Interface
import { candle, chart_config } from "../Tsutilities/interfaces";
// enums
import { intervals, binancetype } from "../Tsutilities/enums";
export default function BinanceChart({
  Coinsymbol,
}: {
  Coinsymbol: binancetype|string;
}) {
  // change binance config
  const [chart_configration, setchart_configration] =
    useState<chart_config>(CHART_CONFIG);
  const intervalsList = [
    { label: "1m", value: intervals.oneMinute },
    { label: "5m", value: intervals.fiveMinute },
    { label: "1h", value: intervals.onehour },
    { label: "4h", value: intervals.fourhours },
    { label: "1d", value: intervals.oneday },
  ];

  // change coin binance by params
  useEffect(() => {
    const handelcoinsymbol = () => {
      setchart_configration((prev) => ({
        ...prev,
        symbol: Coinsymbol, // ✅ enum, not string
      }));
    };
    handelcoinsymbol();
  }, [Coinsymbol]);

  // candle details when i hover on it
  const [hoveredCandle, setHoveredCandle] = useState<candle | null>(null);

  // loading
  const [ifloaded, setIfLoaded] = useState(true);
  const candlesRef = useRef<candle[]>([]);
  const oldestTimeRef = useRef<UTCTimestamp | null>(null);
  const isLoadingRef = useRef(false);

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  /* =========================
     1️⃣ CREATE CHART
  ========================== */
  useEffect(() => {
    if (!chartContainerRef.current) return;

    chartRef.current = createChart(chartContainerRef.current, {
      layout: {
        textColor: "#e0e0e0",
        background: { type: ColorType.Solid, color: "#0d1117" },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      crosshair: {
        mode: 1,
        vertLine: { color: "#888", width: 1, style: 2 },
        horzLine: { color: "#888", width: 1, style: 2 },
      },
      rightPriceScale: {
        borderVisible: true,
        borderColor: "#555",
      },
      timeScale: {
        borderVisible: true,
        borderColor: "#555",
      },
    });

    seriesRef.current = chartRef.current.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    return () => {
      chartRef.current?.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  /* =========================
     🔥 RESPONSIVE RESIZE
  ========================== */
  useEffect(() => {
    if (!chartContainerRef.current || !chartRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;

      chartRef.current?.applyOptions({
        width: Math.floor(width),
        height: Math.floor(height),
      });
    });

    resizeObserver.observe(chartContainerRef.current);

    return () => resizeObserver.disconnect();
  }, []);
// fix the previuos candles 
  useEffect(() => {
    if (!seriesRef.current) return;

    // reset all previous candles
    candlesRef.current = [];
    oldestTimeRef.current = null;
    seriesRef.current.setData([]);

    // fetch new candles
    (async () => {
      setIfLoaded(true);
      const candles = await Getcandels({
        ...chart_configration,
        symbol: Coinsymbol,
      });

      candlesRef.current = candles;
      oldestTimeRef.current = candles[0]?.time ?? null;

      seriesRef.current?.setData(candles);
      chartRef.current?.timeScale().fitContent();

      setIfLoaded(false);
    })();
  }, [Coinsymbol,chart_configration]);

  /* =========================
     2️⃣ LOAD HISTORY (REST)
  ========================== */
  // useEffect(() => {
  //   if (!seriesRef.current) return;

  //   candlesRef.current = [];
  //   oldestTimeRef.current = null;

  //   (async () => {
  //     setIfLoaded(true);
  //     const candles = await Getcandels(chart_configration);

  //     candlesRef.current = candles;
  //     oldestTimeRef.current = candles[0]?.time ?? null;

  //     seriesRef.current!.setData(candles);
  //     chartRef.current?.timeScale().fitContent();

  //     setIfLoaded(false);
  //   })();
  // }, [chart_configration.symbol, chart_configration.interval]);

  /* =========================
     3️⃣ LIVE STREAM (WS)
  ========================== */
  useEffect(() => {
    if (!seriesRef.current || ifloaded) return;

    const { symbol, interval } = chart_configration;

    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`,
    );

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      const k = msg.k;

      const liveCandle: candle = {
        time: (k.t / 1000) as UTCTimestamp,
        open: Number(k.o),
        high: Number(k.h),
        low: Number(k.l),
        close: Number(k.c),
      };

      seriesRef.current!.update(liveCandle);

      const last = candlesRef.current.at(-1);
      if (!last || liveCandle.time > last.time) {
        candlesRef.current.push(liveCandle);
      } else {
        candlesRef.current[candlesRef.current.length - 1] = liveCandle;
      }
    };

    ws.onerror = console.error;
    return () => ws.close();
  }, [chart_configration.symbol, chart_configration.interval, ifloaded]);

  /* =========================
     4️⃣ LOAD OLDER CANDLES
  ========================== */
  useEffect(() => {
    if (!chartRef.current || !seriesRef.current) return;

    const timeScale = chartRef.current.timeScale();

    const handler = async () => {
      const range = timeScale.getVisibleRange();
      if (!range || isLoadingRef.current) return;

      const from = toUTCTimestamp(range.from);
      if (!from || !oldestTimeRef.current) return;

      if (from <= oldestTimeRef.current) {
        isLoadingRef.current = true;

        const olderCandles = await getOlderCandles(
          chart_configration,
          oldestTimeRef.current,
        );

        if (olderCandles.length) {
          candlesRef.current = [...olderCandles, ...candlesRef.current];
          oldestTimeRef.current = candlesRef.current[0].time;
          seriesRef.current!.setData(candlesRef.current);
        }

        isLoadingRef.current = false;
      }
    };

    timeScale.subscribeVisibleTimeRangeChange(handler);
    return () => timeScale.unsubscribeVisibleTimeRangeChange(handler);
  }, [chart_configration.symbol, chart_configration.interval]);
  // get candle details
  useEffect(() => {
    if (!chartRef.current || !seriesRef.current) return;

    const chart = chartRef.current;
    const series = seriesRef.current;

    const handler = (param: MouseEventParams) => {
      if (!param || !param.time || !param.seriesData) {
        setHoveredCandle(null);
        return;
      }

      const price = param.seriesData.get(series) as CandlestickData;
      if (!price) return setHoveredCandle(null);

      // price is a CandlestickData object
      setHoveredCandle((prev) =>
        prev?.time === param.time
          ? prev
          : {
              time: param.time as UTCTimestamp,
              open: price.open,
              high: price.high,
              low: price.low,
              close: price.close,
            },
      );
    };

    chart.subscribeCrosshairMove(handler);
    return () => chart.unsubscribeCrosshairMove(handler);
  }, []);

  return (
    <div
      ref={chartContainerRef}
      className="
        relative 
        w-full 
        max-w-6xl 
        mx-auto 
        rounded-xl 
        overflow-hidden 
        shadow-lg
        h-[300px] 
        sm:h-[400px] 
        md:h-[500px]
      "
    >
      {ifloaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
          <CircularProgress color="inherit" />
        </div>
      )}
      {hoveredCandle &&
        (() => {
          const isBullish = hoveredCandle.close >= hoveredCandle.open;

          return (
            <div
              className="
        absolute 
        top-3 
        left-3 
        z-30 
        rounded-lg 
        bg-black/85 
        backdrop-blur 
        text-xs 
        p-3 
        shadow-xl
        min-w-[160px]
      "
            >
              {/* Time */}
              <div className="text-gray-300 mb-2 flex items-center gap-1">
                🕒
                {new Date(
                  (hoveredCandle.time as number) * 1000,
                ).toLocaleString()}
              </div>

              {/* OHLC */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-400">Open</span>
                  <span className="text-blue-400">{hoveredCandle.open}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">High</span>
                  <span className="text-green-400">{hoveredCandle.high}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Low</span>
                  <span className="text-red-400">{hoveredCandle.low}</span>
                </div>

                <div className="flex justify-between font-semibold">
                  <span className="text-gray-400">Close</span>
                  <span
                    className={isBullish ? "text-green-400" : "text-red-400"}
                  >
                    {hoveredCandle.close}
                  </span>
                </div>
              </div>

              {/* Direction badge */}
              <div
                className={`
          mt-2 
          text-center 
          text-[10px] 
          rounded 
          px-2 
          py-1 
          font-semibold
          ${
            isBullish
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }
        `}
              >
                {isBullish ? "BULLISH ▲" : "BEARISH ▼"}
              </div>
            </div>
          );
        })()}
      <div className="grid grid-cols-5 gap-1 text-amber-50 w-fit p-2">
        {intervalsList.map(({ label, value }) => (
          <button
            key={value}
            onClick={() =>
              setchart_configration((prev) => ({
                ...prev,
                interval: value,
              }))
            }
            className={`
        px-3 py-1 text-xs rounded
        hover:bg-amber-700 border border-gray-500
        ${
          chart_configration.interval === value
            ? "bg-amber-600 font-bold"
            : "bg-transparent"
        }
      `}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* =========================
   BACKEND SAVE (EXAMPLE)
========================== */
function saveCandleToDB(candle: candle) {
  console.log("Saved candle:", candle);
}
