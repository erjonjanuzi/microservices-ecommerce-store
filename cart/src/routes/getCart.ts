import { NotAuthorizedError, NotFoundError, requireAuth } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { Cart } from '../models/cart';

const router = express.Router();

router.get('/api/cart', requireAuth, async (req: Request, res: Response) => {
    const cart = await Cart.findOne({ userId: req.currentUser!.id })
        .populate('products.product')
        .select('-products._id');

    if (!cart) {
        return res.status(200).send([]);
    }

    if (cart.userId !== req.currentUser!.id){
        throw new NotAuthorizedError();
    }

    res.send(cart);
});

export { router as getCartRoute };
