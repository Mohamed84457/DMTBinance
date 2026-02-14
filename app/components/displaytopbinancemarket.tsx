import BinanceRow from "./displayrowtopbinancematket";
import { Binanceinfoaround24 } from "../Tsutilities/interfaces";

interface Props {
  data: Binanceinfoaround24[];
}

export default function BinanceList({ data }: Props) {
  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-5 px-4 py-2 bg-gray-100 text-sm font-semibold">
        <div>Pair</div>
        <div>Price</div>
        <div>24h %</div>
        <div>Volume</div>
        <div></div>
      </div>

      {data.map((item) => (
        <BinanceRow key={item.symbol} item={item} />
      ))}
    </div>
  );
}
