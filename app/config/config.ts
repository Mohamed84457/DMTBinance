// enums
import { intervals, binancetype } from "../Tsutilities/enums";
// inteface
import { chart_config } from "../Tsutilities/interfaces";
export const CHART_CONFIG: chart_config = {
  symbol: binancetype.Bitcoin,
  interval: intervals.onehour,
  limit: 100,
};
