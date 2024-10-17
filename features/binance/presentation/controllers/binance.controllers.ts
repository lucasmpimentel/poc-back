import type { NextFunction, Request, RequestHandler, Response } from "express"
import BinanceServices, { serviceImpl } from "../../domain/services/binance.services";
import type IBinanceRequestEntity from "../../domain/models/binance.request.entity";

export default class BinanceController {
  binanceServices: BinanceServices;
  constructor() {
    this.binanceServices = this.injectServices()
  }
  private injectServices() {
    return serviceImpl
  }

  getBinanceData: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { symbol, interval, limit } = req.query;

    if (!symbol || !interval) {
      res.status(422).send('Missing required query parameters');
      return;
    }

    const queryObject: IBinanceRequestEntity = {
      symbol: symbol as string,
      interval: interval as string,
      limit: parseInt(limit as string) as number,
    }

    try {
      const data = await this.binanceServices.getBinanceData(queryObject);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
};
