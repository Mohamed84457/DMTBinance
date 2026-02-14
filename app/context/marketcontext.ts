"use client";
// interface
import { Binanceinfoaround24 } from "../Tsutilities/interfaces";
import { createContext } from "react";

export const MarketsContext = createContext<Binanceinfoaround24[] | null>(null);
