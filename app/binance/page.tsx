"use client";
// component
import { useState } from "react";
import DisplayBimamceComponent from "../components/displaybinancecomponent";
// enum
import { binancetype } from "../Tsutilities/enums";
import { Tooltip } from "@mui/material";

export default function Binances() {
  // search
  const [searchbinance, setsearchbinance] = useState<string>("");
  const binances = [
    { label: "Bitcoin", value: binancetype.Bitcoin },
    { label: "Ethereum", value: binancetype.Ethereum },
    { label: "Binance_Coin", value: binancetype.Binance_Coin },
    { label: "Solana", value: binancetype.Solana },
    { label: "Ripple", value: binancetype.Ripple },
    { label: "Cardano", value: binancetype.Cardano },
    { label: "Dogecoin", value: binancetype.Dogecoin },
    { label: "Avalanche", value: binancetype.Avalanche },
    { label: "Polkadot", value: binancetype.Polkadot },
    { label: "Polygon", value: binancetype.Polygon },
    { label: "Arbitrum", value: binancetype.Arbitrum },
    { label: "Optimism", value: binancetype.Optimism },
    { label: "Render", value: binancetype.Render },
    { label: "Ocean", value: binancetype.Ocean },
    { label: "Chainlink", value: binancetype.Chainlink },
    { label: "Uniswap", value: binancetype.Uniswap },
    { label: "Aave", value: binancetype.Aave },
    { label: "Maker", value: binancetype.Maker },
    { label: "Sandbox", value: binancetype.Sandbox },
    { label: "Decentraland", value: binancetype.Decentraland },
    { label: "AxieInfinity", value: binancetype.AxieInfinity },
    { label: "ShibaInu", value: binancetype.ShibaInu },
    { label: "Pepe", value: binancetype.Pepe },
    { label: "Cosmos", value: binancetype.Cosmos },
    { label: "Near", value: binancetype.Near },
    { label: "Algorand", value: binancetype.Algorand },
    { label: "Filecoin", value: binancetype.Filecoin },
  ];

  const filteredBinances = binances.filter((item) =>
    item.label.toLowerCase().includes(searchbinance.toLowerCase()),
  );

  const mappingbinances = filteredBinances.map((item) => {
    return (
      <DisplayBimamceComponent
        route={item.label}
        key={item.value}
        binancecointype={item.value}
        symbol={item.value}
      />
    );
  });

  return (
    <div className="min-h-screen bg-[#0b0e11] p-6">
      {/* search */}
      <div className="flex justify-end pb-6 ">
        <input
          type="text"
          placeholder="Search coin..."
          className="
    w-full max-w-sm
    rounded-lg
    bg-[#0f172a]
    border border-white/10
    px-4 py-3
    text-sm text-white
    placeholder-gray-400
    outline-none
    transition
    focus:border-yellow-500
    focus:ring-2
    focus:ring-yellow-500/20
  "
          onChange={(e) => {
            setsearchbinance(e.target.value);
          }}
        />
      </div>
      <div className="max-w-6xl mx-auto overflow-x-auto rounded-xl border border-white/10 bg-[#111827] shadow-lg">
        <table className="w-full border-collapse">
          <thead className="bg-white/5 text-gray-400 text-sm uppercase tracking-wide">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Change</th>
              <th className="px-6 py-4 text-left">current value</th>
              <th className="px-6 py-4 text-left">24h Value</th>
              {/* <th className="px-6 py-4 text-left">Market Cap</th> */}
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">{mappingbinances}</tbody>
        </table>
      </div>
    </div>
  );
}

// symbol    symbol
//change about 24h     priceChangePercent=   "-2.625"      mean he lost from his value -2%     "persentage"
// change about 24h    priceChange: "-1846.55"             mean he lost from his value -1846  "real value"
// 24value             quoteVolume: "8249418970.16284430"  $8.24 BILLION USDT traded in the last 24 hours
