import { NotAuthorizedError, NotFoundError, requireAuth } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { Cart } from '../models/cart';

const router = express.Router();

router.get('/api/cart', requireAuth, async (req: Request, res: Response) => {
    const userCart = await Cart.findOne({ userId: req.currentUser!.id })
        .populate('products.product')
        .select('-products._id');

    // if user does not have a cart then create a new empty cart
    if (!userCart) {
        const cart = Cart.build({userId: req.currentUser!.id})
        return res.send(cart)
    }

    if (userCart.userId !== req.currentUser!.id){
        throw new NotAuthorizedError();
    }
    
    res.send(userCart);
});

export { router as getCartRoute };
