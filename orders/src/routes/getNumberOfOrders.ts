import express, { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { Order, OrderDoc } from '../models/order';

const router = express.Router();

router.get(
    '/api/orders/getNumberOfOrders',
    async (req: Request, res: Response) => {
        const count = await Order.find().count();

        res.json(count);
    }
);

export { router as getNumberOfOrders }