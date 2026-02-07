"use client";
// mui icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
// mui
import Tooltip from "@mui/material/Tooltip";

// components
import SellTradesComponent from "./selltrades";
import BuyTradesComponent from "./buytrades";
import BoxOrderBooks from "./boxorderbookshape";
import TradePressureBars from "./comapertradesbar";
import CurrentBinancePrice from "./currentBinancePrice";
// config
import { CHART_CONFIG } from "../config/config";
// enum
import { tradestype, binancetype } from "../Tsutilities/enums";
import { useEffect, useState } from "react";
// apis
import { getbooktrades } from "../apis/getapis";
// interface
import { chart_config, trade } from "../Tsutilities/interfaces";
// helpers
import { filtertrades } from "../helpers/filters";
export default function Booktrades({
  binancecoinsymbol,
}: {
  binancecoinsymbol: binancetype;
}) {
  // change binance config
  const [chart_configration, setchart_configration] =
    useState<chart_config>(CHART_CONFIG);

  // change coin binance by params
  useEffect(() => {
    setchart_configration((prev) => ({
      ...prev,
      symbol: binancecoinsymbol,
    }));
  }, [binancecoinsymbol]);

  //loading
  const [loading, setLoading] = useState(true);
  //   book trades
  const [buytrades, setBuyTrades] = useState<trade[]>([]);
  const [selltrades, setSellTrades] = useState<trade[]>([]);
  // choose sell or buy trades
  const [tradetype, settradetype] = useState<tradestype>(tradestype.both);

  // book trade type
  const booktradetype = [
    {
      name: "both",
      type: tradestype.both,
    },
    {
      name: "sell",
      type: tradestype.selltrades,
    },
    {
      name: "buy",
      type: tradestype.buytrades,
    },
  ];
  // get trades

  useEffect(() => {
    if (!chart_configration.symbol) return;
    const fetchTrades = async () => {
      try {
        const res = (await getbooktrades(chart_configration)) || [];
        setBuyTrades(filtertrades(res, tradestype.buytrades));
        setSellTrades(filtertrades(res, tradestype.selltrades));
      } catch (err) {
        console.error("Failed to fetch trades", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrades(); // initial fetch

    const intervalId = setInterval(fetchTrades, 2000);

    return () => clearInterval(intervalId);
  }, [chart_configration.symbol]);

  // mapping trade type
  const mappingtradetype = booktradetype.map((item) => (
    <Tooltip title={item.name} key={item.name}>
      <div onClick={() => settradetype(item.type)} className="cursor-pointer">
        <BoxOrderBooks type={item.type} />
      </div>
    </Tooltip>
  ));

  return (
    <div className="flex flex-col gap-6">
      <div className="text-amber-100 flex justify-between">
        <h1>Order Book</h1>
            <Tooltip title="more">

        <MoreVertIcon className="text-gray-100 hover:cursor-pointer" />
        </Tooltip>
      </div>
      <div className="flex justify-between gap-4">
        <div className=" flex gap-4">{mappingtradetype}</div>
      </div>
      <hr />
      <CurrentBinancePrice binancetype={chart_configration.symbol} />
      {/* Buys Trades */}
      <div
        className={`bg-slate-900 p-4 rounded-xl shadow-md flex-1 transition-all ${tradetype == tradestype.selltrades ? "hidden" : "block"}`}
      >
        <h2 className="text-lg font-semibold mb-2 text-gray-100">Buy Trades</h2>
        <div className="h-64 flex  justify-center text-gray-400">
          {/* Placeholder content */}
          <BuyTradesComponent buyTrades={buytrades} loading={loading} />
        </div>
      </div>

      {/* Sell Trades */}
      <div
        className={`bg-slate-900 p-4 rounded-xl shadow-md flex-1  ${tradetype == tradestype.buytrades ? "hidden" : "block"}`}
      >
        <h2 className="text-lg font-semibold mb-2 text-gray-100">
          Sell Trades
        </h2>
        <div className="h-64 flex  justify-center text-gray-400">
          {/* Placeholder content */}
          <SellTradesComponent sellTrades={selltrades} loading={loading} />
        </div>
      </div>

      {tradetype === tradestype.both && (
        <div className="bg-slate-900 p-4 rounded-xl shadow-md mt-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-100">
            Buy/Sell Pressure
          </h2>
          <TradePressureBars buyTrades={buytrades} sellTrades={selltrades} />
        </div>
      )}
    </div>
  );
}
