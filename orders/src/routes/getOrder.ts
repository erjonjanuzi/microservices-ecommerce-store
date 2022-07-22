import express, { Request, Response } from 'express';
import { Order } from '../models/order';

const router = express.Router();

router.get(
    '/api/orders/:id',
    async (req: Request, res: Response) => {
        const { id } = req.params;

        const orders = await Order.findById(id);

        res.send(orders)
    }
);

export { router as getOrder }