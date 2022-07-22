import { requireAuth, validateRequest, OrderStatus } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { Order } from '../models/order';

const router = express.Router();

router.get(
    '/api/orders/my',
    requireAuth,
    validateRequest,
    async (req: Request, res: Response) => {

        const orders = await Order.find({userId: req.currentUser?.id, status: {$ne: OrderStatus.CANCELLED}})

        res.send(orders)
    }
);

export {router as getMyOrders}