import { BadRequestError, validateRequest } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { TokenService } from '../services/TokenService';
import { sendConfirmationEmail } from '../controllers/sendConfirmationEmail';

const router = express.Router();

router.post(
    '/api/users/register',
    [
        body('firstName').isString().withMessage('First name is required'),
        body('lastName').isString().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters'),
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
            email,
            password,
            phoneNumber,
            country,
            city,
            postalCode,
            street,
        } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email in use');
        }

        const user = User.build({
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            country,
            city,
            postalCode,
            street,
        });
        await user.save();

        await sendConfirmationEmail(req.headers.host!, email);

        const userJwt = TokenService.create({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        req.session = {
            jwt: userJwt,
        };

        res.status(201).send(user);
    }
);

export { router as signUpRoute };