// component
import DisplayBimamceComponent from "../components/displaybinancecomponent";
// enum
import { binancetype } from "../Tsutilities/enums";

export default function Binances() {
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
  ];
  const mappingbinances = binances.map((item) => {
    return (
      <DisplayBimamceComponent
        route={item.label}
        key={item.value}
        binancecointype={item.value}
        symbol={item.value}
      />
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0e11] p-6">
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
