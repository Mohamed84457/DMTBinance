// enum
import { tradestype } from "../Tsutilities/enums";
// interface
import { trade } from "../Tsutilities/interfaces";
export function filtertrades(trades: trade[], type: tradestype) {
const ifbuyorsell: boolean = type === tradestype.selltrades ? true : false;
  const filterdtrades = trades.filter((trade) => {
    if (trade.isBuyerMaker === ifbuyorsell) {
      return true;
    }
  });
  return filterdtrades;
}
