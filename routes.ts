import { Router } from 'express';
import BinanceController from './features/binance/presentation/controllers/binance.controllers';

const router = Router();
const binanceController = new BinanceController();

router.route('/binance')
  .get(binanceController.getBinanceData);

export default router;