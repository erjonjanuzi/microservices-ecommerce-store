import { BadRequestError, requireAuth } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { Cart } from '../models/cart';
import { Order } from '../models/order';

const router = express.Router();

router.post(
    '/api/orders',
    requireAuth,
    async (req: Request, res: Response) => {
        const cart = await Cart.findOne({userId: req.currentUser!.id})

        if (!cart){
            throw new BadRequestError("Error ketu")
        }

        const order = Order.build({
            cart,
            status: 'created'
        })
        await order.save()
        
        res.send(order)
    }
);

export {router as createOrderRoute}