import { NotAuthorizedError, requireAuth } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { Wishlist } from '../models/wishlist';

const router = express.Router();

router.get('/api/wishlist', requireAuth, async (req: Request, res: Response) => {
    const userWishlist = await Wishlist.findOne({ userId: req.currentUser!.id })

    // if user does not have a wishlist then create a new empty wishlist
    if (!userWishlist) {
        const wishlist = Wishlist.build({userId: req.currentUser!.id})
        return res.send(wishlist)
    }

    if (userWishlist.userId !== req.currentUser!.id){
        throw new NotAuthorizedError();
    }
    
    res.send(userWishlist);
});

export { router as getwishlistRoute };
