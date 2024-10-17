import binanceRepositoryImpl from "../data/external/binance.repository.impl";
import type { BinanceSymbolResponse } from "./models/binance.symbol.response";

export abstract class BinanceRepository {
  abstract getBinanceData(symbol: string, interval: string, limit: number): Promise<BinanceSymbolResponse[] | Error>;
}

export function getRepository(): BinanceRepository {
  return binanceRepositoryImpl;
}
