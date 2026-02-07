// /app/binance/[binancetype]/page.tsx
import { binancetype } from "@/app/Tsutilities/enums";
// mui icons
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// components
import BinanceChart from "../../components/bianancechart";
import Booktrades from "../../components/booktrades";
import Displaybinancetype from "@/app/components/diplaybinancetype";
import Link from "next/link";
// mui
import { Tooltip } from "@mui/material";
// interface
interface BinancePageProps {
  params: { binancecoin: string };
}

export default async function BinancePage({ params }: BinancePageProps) {
  const { binancecoin } = await params;

  const binanceSymbolMap: Record<string, binancetype> = {
    bitcoin: binancetype.Bitcoin,
    ethereum: binancetype.Ethereum,
    solana: binancetype.Solana,
    binance_coin: binancetype.Binance_Coin,
    ripple: binancetype.Ripple,
    cardano: binancetype.Cardano,
    dogecoin: binancetype.Dogecoin,
    avalanche: binancetype.Avalanche,
    polkadot: binancetype.Polkadot,
    polygon: binancetype.Polygon,
    arbitrum: binancetype.Arbitrum,
    optimism: binancetype.Optimism,
    render: binancetype.Render,
    ocean: binancetype.Ocean,
    chainlink: binancetype.Chainlink,
    uniswap: binancetype.Uniswap,
    aave: binancetype.Aave,
    maker: binancetype.Maker,
    sandbox: binancetype.Sandbox,
    decentraland: binancetype.Decentraland,
    axieinfinity: binancetype.AxieInfinity,
    shibainu: binancetype.ShibaInu,
    pepe: binancetype.Pepe,
    cosmos: binancetype.Cosmos,
    near: binancetype.Near,
    algorand: binancetype.Algorand,
    filecoin: binancetype.Filecoin,
  };
  if (!binancecoin) return;
  // coin type
  const mappedSymbol = binanceSymbolMap[binancecoin.toLowerCase()];
  if (!mappedSymbol) {
    console.warn("Unknown coin symbol:", binancecoin);
    return;
  }
  console.log(mappedSymbol);
  return (
    <div className="min-h-screen w-full p-4">
      <div className="text-amber-100">
        <Link href={"/binance"}>
          <Tooltip title="back">
            <ArrowBackIosNewIcon className="hover:text-[#F0B90B]  cursor-pointer mb-2" />
          </Tooltip>
        </Link>
        <Displaybinancetype binancecointype={mappedSymbol} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="col-span-1 p-4 rounded-xl shadow-lg">
          <BinanceChart key={mappedSymbol} Coinsymbol={mappedSymbol} />
        </div>
        <Booktrades binancecoinsymbol={mappedSymbol} />
      </div>
    </div>
  );
}
