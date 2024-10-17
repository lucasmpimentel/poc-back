import { BaseResponseEntity, BaseResponseErrorEntity } from "../../../../core/base.response.entity";

export type BinanceSymbolResponse = (string | number)[]

export interface IBinanceSymbolResponse {
  success: boolean;
  data: BinanceSymbolResponseModel[];
}

export class BinanceSymbolResponseModel {
  constructor(
    public openTime: number,
    public open: string,
    public high: string,
    public low: string,
    public close: string,
    public volume: string,
    public closeTime: number,
    public quoteAssetVolume: string,
    public numberOfTrades: number,
    public takerBuyBaseAssetVolume: string,
    public takerBuyQuoteAssetVolume: string,
    public ignore: string
  ) {}
}

export class BinanceSymbolResponseEntity extends BaseResponseEntity {
  constructor(
    public success: boolean,
    public data: BinanceSymbolResponseModel[]
  ) {
    super(success, data);
  }
}

export class BinanceSymbolResponseErrorEntity extends BaseResponseErrorEntity {
  constructor(
    public success: boolean,
    public message: string,
    public stack?: any
  ) {
    super(success, message);
  }
}