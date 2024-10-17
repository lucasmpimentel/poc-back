import axios from "axios";
import type { BinanceRepository } from "../../domain/binance.repository";
import type { BinanceSymbolResponse } from "../../domain/models/binance.symbol.response";

class BinanceRepositoryImpl implements BinanceRepository {
  private baseURL = 'https://api.binance.com/api/v3/klines'
  async getBinanceData(symbol: string, interval: string, limit: number): Promise<BinanceSymbolResponse[] | Error> {
    try {
      const qs = `?symbol=${symbol}&interval=${interval}&limit=${limit}`
      
      const data = axios.get(`${this.baseURL}${qs}`).
      then(response => {
        return response.data;
      })
      return data
    } catch (error: any) {
      if (error instanceof Error) {
        return error
      } 
      if (error.response) {
        return Error(error.response.data, error.response)
      }
      return Error(error.toString())
    }
  }
}

export default new BinanceRepositoryImpl()
