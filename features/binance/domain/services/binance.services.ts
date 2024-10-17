import { getRepository, type BinanceRepository } from "../binance.repository";
import type IBinanceRequestEntity from "../models/binance.request.entity";
import { BinanceSymbolResponseEntity, BinanceSymbolResponseErrorEntity, BinanceSymbolResponseModel, type BinanceSymbolResponse } from "../models/binance.symbol.response";

export default abstract class BinanceServices {
  abstract binanceRepository: BinanceRepository;
  async getBinanceData(queryObject: IBinanceRequestEntity): Promise<any> {}
}

class BinanceServicesImpl implements BinanceServices{
  binanceRepository: BinanceRepository;
  constructor() {
    this.binanceRepository = this.injectRepository()
  }
  private injectRepository() {
    return getRepository()
  }

  async getBinanceData(queryObject: IBinanceRequestEntity): Promise<BinanceSymbolResponseEntity | BinanceSymbolResponseErrorEntity> {
    const limit = queryObject.limit ? queryObject.limit : 100;
    const { symbol, interval } = queryObject;

    try{
      const binanceData = await this.binanceRepository.getBinanceData(symbol, interval, limit)
      
      if (binanceData instanceof Error) {
        throw binanceData
      }
      
      const result = binanceData.map((data: BinanceSymbolResponse) => {
        const [openTime, open, high, low, close, volume, closeTime, quoteAssetVolume, numberOfTrades, takerBuyBaseAssetVolume, takerBuyQuoteAssetVolume, ignore] = data
        
        return new BinanceSymbolResponseModel(
          Number(openTime),
          open.toString(),
          high.toString(),
          low.toString(),
          close.toString(),
          volume.toString(),
          Number(closeTime),
          quoteAssetVolume.toString(),
          Number(numberOfTrades),
          takerBuyBaseAssetVolume.toString(),
          takerBuyQuoteAssetVolume.toString(),
          ignore.toString()
        )
      })


      return new BinanceSymbolResponseEntity(true, result)
      
    } catch (error: any) {
      if (error instanceof Error) {
        return new BinanceSymbolResponseErrorEntity(
          false,
          error.message,
          error.stack
        )
      }
      if (error.response) {
        return new BinanceSymbolResponseErrorEntity(
          false,
          error.response.data,
        )
      }
      return new BinanceSymbolResponseErrorEntity(
        false,
        error.toString()
      )     
    }
  }
}

export const serviceImpl = new BinanceServicesImpl()
  
