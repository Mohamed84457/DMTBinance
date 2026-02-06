import { tradestype } from "../Tsutilities/enums";
import clsx from "clsx";

interface BoxOrderBooksProps {
  type?: tradestype;
}

export default function BoxOrderBooks({
  type = tradestype.both,
}: BoxOrderBooksProps) {
  return (
    <button className="grid grid-cols-2 gap-0.5 w-6 h-6 rounded overflow-hidden transition duration-100 hover:cursor-pointer active:scale-90">
      {/* SELL */}
      <div
        className={clsx(
          "transition-colors",
          type === tradestype.buytrades ? "bg-green-500" : "bg-red-500",
        )}
      />

      {/* MID */}
      <div className="bg-gray-600" />

      {/* BUY */}
      <div
        className={clsx(
          "transition-colors",
          type === tradestype.selltrades ? "bg-red-500" : "bg-green-500",
        )}
      />

      {/* MID */}
      <div className="bg-gray-600" />
    </button>
  );
}
