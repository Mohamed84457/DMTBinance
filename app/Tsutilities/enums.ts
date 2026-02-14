// type of trades
export enum tradestype {
  selltrades = "selltrades",
  buytrades = "buytrades",
  both = "both",
}

// duration candles
export enum intervals {
  oneMinute = "1m",
  fiveMinute = "5m",
  onehour = "1h",
  fourhours = "4h",
  oneday = "1d",
}

// binance type
export enum binancetype {
  // 🔥 Majors
  Bitcoin = "BTCUSDT",
  Ethereum = "ETHUSDT",
  Binance_Coin = "BNBUSDT",
  Solana = "SOLUSDT",
  Ripple = "XRPUSDT",
  Cardano = "ADAUSDT",
  Dogecoin = "DOGEUSDT",
  Avalanche = "AVAXUSDT",
  Polkadot = "DOTUSDT",
  Polygon = "MATICUSDT",

  // 🚀 Layer 2 / Scaling
  Arbitrum = "ARBUSDT",
  Optimism = "OPUSDT",

  // 🧠 AI / Data
  Render = "RNDRUSDT",
  Ocean = "OCEANUSDT",

  // 💎 DeFi
  Chainlink = "LINKUSDT",
  Uniswap = "UNIUSDT",
  Aave = "AAVEUSDT",
  Maker = "MKRUSDT",

  // 🎮 Gaming / Metaverse
  Sandbox = "SANDUSDT",
  Decentraland = "MANAUSDT",
  AxieInfinity = "AXSUSDT",

  // 🪙 Meme Coins
  ShibaInu = "SHIBUSDT",
  Pepe = "PEPEUSDT",

  // 🧱 Infrastructure
  Cosmos = "ATOMUSDT",
  Near = "NEARUSDT",
  Algorand = "ALGOUSDT",
  Filecoin = "FILUSDT",

  // ⚡ Others (High Volume)
  // Litecoin = "LTCUSDT",
  // Tron = "TRXUSDT",
  // Stellar = "XLMUSDT",
  // BitcoinCash = "BCHUSDT",
}

// currency stype
export const knownQuotes = [
  "USDT",
  "BUSD",
  "USDC",
  "BTC",
  "ETH",
  "BNB",
  "IDR",
  "TRY",
  "EUR",
];
