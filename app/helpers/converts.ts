import { UTCTimestamp, Time } from "lightweight-charts";

export function toUTCTimestamp(time: Time): UTCTimestamp | null {
  if (typeof time === "number") {
    return time as UTCTimestamp;
  }
  return null; // ignore BusinessDay & string
}