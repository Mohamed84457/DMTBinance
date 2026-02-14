// components
import DisplayBimamceComponent from "../components/displaybinancecomponent";
import Tableofdisplaybinances from "../components/tableofdisplaybinances";
// emun
import { binancetype } from "../Tsutilities/enums";
// interface
import { BinanceCoinItem } from "../Tsutilities/interfaces";

export default function Markets() {
  //   majors
  const majorBinanceCoins = [
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
  ];
  // layer2 scaling
  const scaling_layer2BinanceCoin = [
    { label: "Arbitrum", value: binancetype.Arbitrum },
    { label: "Optimism", value: binancetype.Optimism },
  ];
  // ai /data
  const ai_dataBinanceCoin = [
    { label: "Render", value: binancetype.Render },
    { label: "Ocean", value: binancetype.Ocean },
  ];
  // defi
  const defiBinanceCoin = [
    { label: "Chainlink", value: binancetype.Chainlink },
    { label: "Uniswap", value: binancetype.Uniswap },
    { label: "Aave", value: binancetype.Aave },
    { label: "Maker", value: binancetype.Maker },
  ];
  //   Gaming / Metaverse
  const gaming_metaverseBinanceCoin = [
    { label: "Sandbox", value: binancetype.Sandbox },
    { label: "Decentraland", value: binancetype.Decentraland },
    { label: "AxieInfinity", value: binancetype.AxieInfinity },
  ];
  //   Meme Coins
  const memeBinanceCoin = [
    { label: "ShibaInu", value: binancetype.ShibaInu },
    { label: "Pepe", value: binancetype.Pepe },
  ];
  //   Infrastructure
  const infrasteuctureBinanceCoin = [
    { label: "Cosmos", value: binancetype.Cosmos },
    { label: "Near", value: binancetype.Near },
    { label: "Algorand", value: binancetype.Algorand },
    { label: "Filecoin", value: binancetype.Filecoin },
  ];
  // mapping coins

  const marketCategories = [
    {
      title: "Major Coins",
      coins: majorBinanceCoins,
    },
    {
      title: "Layer 2 Scaling",
      coins: scaling_layer2BinanceCoin,
    },
    {
      title: "AI / Data",
      coins: ai_dataBinanceCoin,
    },
    {
      title: "DeFi",
      coins: defiBinanceCoin,
    },
    {
      title: "Gaming / Metaverse",
      coins: gaming_metaverseBinanceCoin,
    },
    {
      title: "Meme Coins",
      coins: memeBinanceCoin,
    },
    {
      title: "Infrastructure",
      coins: infrasteuctureBinanceCoin,
    },
  ];

  //  ===mapping coins===
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0e11] to-black px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {marketCategories.map((category) => (
          <div
            key={category.title}
            className="
            rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md
            shadow-lg transition-all duration-300
            hover:-translate-y-0.5 hover:scale-[1.01]
            hover:shadow-amber-500/10
          "
          >
            <div className="p-4">
              <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-400">
                {category.title}
              </h2>

              <div className="h-px w-full bg-gradient-to-r from-amber-400/30 to-transparent mb-4" />

              <Tableofdisplaybinances binances={category.coins} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
