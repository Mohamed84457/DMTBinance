"use client";

import {  useContext, useEffect, useState } from "react";
// context
import { MarketsContext } from "../context/marketcontext";
// apis
import { allbinacesaound24h } from "../apis/getapis";
// interface
import { Binanceinfoaround24 } from "../Tsutilities/interfaces";



export function MarketsProvider({
  children,
}: {
  children: React.ReactNode;
}) {


  const [data, setData] = useState<Binanceinfoaround24[] | null>(null);

  useEffect(() => {
    let mounted = true;

    allbinacesaound24h().then((res) => {
      if (mounted) setData(res);
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <MarketsContext.Provider value={data}>
      {children}
    </MarketsContext.Provider>
  );
}


export const  useMareketcontext=()=>{
  return useContext(MarketsContext)
}