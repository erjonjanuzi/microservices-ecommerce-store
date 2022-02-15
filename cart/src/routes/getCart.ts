import { NotFoundError } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { Cart } from '../models/cart';

const router = express.Router();

router.get('/api/cart/:userId', async (req: Request, res: Response) => {
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart){
        throw new NotFoundError();
    }

    res.send(cart);
});

export { router as getCartRoute };
