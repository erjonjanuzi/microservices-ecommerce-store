import { NotFoundError } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { Cart } from '../models/cart';

const router = express.Router();

router.post('/api/cart', async (req: Request, res: Response) => {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOneAndUpdate(
        { userId: req.currentUser?.id },
        { $push: { products: productId } },
        { upsert: true }
    ).exec();

    res.send(cart);
});

export { router as addToCartRoute };
