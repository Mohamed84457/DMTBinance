// /app/binance/[binancetype]/page.tsx

import { binancetype } from "@/app/Tsutilities/enums";
import { notFound } from "next/navigation";

// components
import BinanceChart from "../../components/bianancechart";
import Booktrades from "../../components/booktrades";
import Displaybinancetype from "@/app/components/diplaybinancetype";
import RouteBackComponent from "@/app/components/routebackcomponent";

import Link from "next/link";

interface BinancePageProps {
  params: { binancecoin: string };
}

export default async function BinancePage({ params }: BinancePageProps) {
  const { binancecoin: coinSlug } = await params;
  console.log(coinSlug);

  const symbol = coinSlug.toUpperCase();

  if (!/^[A-Z0-9]+$/.test(symbol)) {
    notFound();
  }
  const binanceSymbolMap: Record<string, binancetype> = Object.entries(
    binancetype,
  ).reduce(
    (acc, [key, value]) => {
      acc[key.toLowerCase()] = value;
      return acc;
    },
    {} as Record<string, binancetype>,
  );

  const mappedSymbol =coinSlug
  console.log(mappedSymbol);
  if (!mappedSymbol) {
    notFound();
  }

  return (
    <div className="min-h-screen w-full p-4">
      <div className="text-amber-100">
        <RouteBackComponent />

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
