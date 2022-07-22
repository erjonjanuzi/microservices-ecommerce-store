import { OrderStatus } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { Order, OrderDoc } from '../models/order';

const router = express.Router();

router.get(
    '/api/orders/getRevenue',
    async (req: Request, res: Response) => {
        const orders = await Order.find({status: OrderStatus.DELIVERED})

        let total = 0;
        for (let order of orders){
            total += order.totalPrice;
        }

        res.json(total);
    }
);

export { router as getRevenue }