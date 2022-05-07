import { NotFoundError, validateRequest } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';

const router = express.Router();

router.put(
    '/api/users/update/:id',
    [
        body('firstName').isString().withMessage('First name is required'),
        body('lastName').isString().withMessage('Last name is required'),
        body('phoneNumber').isString().withMessage('Phone number is required'),
        body('country').isString().withMessage('Country is required'),
        body('city').isString().withMessage('City is required'),
        body('postalCode').isString().withMessage('Postal code is required'),
        body('street').isString().withMessage('Street is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const {
            firstName,
            lastName,
            phoneNumber,
            country,
            city,
            postalCode,
            street,
        } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            throw new NotFoundError();
        }

        user.set({
            firstName,
            lastName,
            personalDetails: {
                phoneNumber,
            },
            address: {
                country,
                city,
                postalCode,
                street
            }
        })
        await user.save();

        res.status(200).send(user);
    }
);

export { router as updateCustomerRoute };