import { NotAuthorizedError, NotFoundError, requireAuth, validateRequest } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';

const router = express.Router();

router.put(
    '/api/users/account/addDeliveryAddress',
    requireAuth,
    [
        body('deliveryAddress').not().isEmpty().withMessage('Delivery Address is required'),
        body('deliveryAddress.country').not().isEmpty().withMessage('Country is required'),
        body('deliveryAddress.city').not().isEmpty().withMessage('City is required'),
        body('deliveryAddress.postCode').not().isEmpty().withMessage('Post code is required'),
        body('deliveryAddress.street').not().isEmpty().withMessage('Street is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const {
            deliveryAddress
        } = req.body;

        const user = await User.findById(req.currentUser!.id);

        if (!user) {
            throw new NotFoundError();
        }

        if (user.id !== req.currentUser!.id){
            throw new NotAuthorizedError();
        }

        user.set({
            deliveryAddress
        })
        await user.save();

        res.status(200).send(user);
    }
);

export { router as addDeliveryAddressRoute };