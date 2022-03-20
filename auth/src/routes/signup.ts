import {
    BadRequestError,
    validateRequest,
} from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { UserCreatedPublisher } from '../events/publishers/UserCreatedPublisher';
import { User } from '../models/user';
import { natsWrapper } from '../natsWrapper';
import { Roles } from '@labcourseapp/common';
import { TokenService } from '../services/TokenService';

const router = express.Router();

router.post(
    '/api/auth/signup',
    [
        body('firstName').isString().withMessage('First name is required'),
        body('lastName').isString().withMessage('Last name is required'),
        body('gender').isString().withMessage('Gender is required'),
        body('phoneNumber').isString().withMessage('Phone number is required'),
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters'),
        body('country').isString().withMessage('Country is required'),
        body('city').isString().withMessage('City is required'),
        body('postalCode').isString().withMessage('Postal code is required'),
        body('street').isString().withMessage('Street is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email in use');
        }

        const user = User.build({ email, password, role: Roles.USER });
        await user.save();

        const {
            firstName,
            lastName,
            gender,
            phoneNumber,
            country,
            city,
            postalCode,
            street,
        } = req.body;

        await new UserCreatedPublisher(natsWrapper.client).publish({
            id: user.id,
            version: user.version,
            firstName,
            lastName,
            email: user.email,
            password: user.password,
            gender,
            phoneNumber,
            country,
            city,
            postalCode,
            street,
            role: user.role,
        });

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
