import express, { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { Order, OrderDoc } from '../models/order';

const router = express.Router();

router.get(
    '/api/orders/:status/',
    async (req: Request, res: Response) => {
        const { status } = req.params;
        const { pageNumber = 1, pageSize = 8 } = req.query;

        let filter: FilterQuery<OrderDoc> = {};

        if (status !== '') {
            filter = {
                status
            };
        }

        const orders = await Order.find(filter)
            .limit(parseInt(pageSize as string) * 1)
            .skip((parseInt(pageNumber as string) - 1) * parseInt(pageSize as string))

        const count = await Order.find(filter).count();

        res.set(
            'Pagination',
            JSON.stringify({
                currentPage: pageNumber,
                itemsPerPage: pageSize,
                totalItems: count,
                totalPages: Math.ceil(count / parseInt(pageSize as string)),
            })
        );

        res.send(orders)
    }
);

export { router as getOrdersByStatus }