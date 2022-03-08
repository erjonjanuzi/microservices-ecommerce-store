import { BadRequestError, UserPayload, validateRequest } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { UserCreatedPublisher } from '../events/publishers/UserCreatedPublisher';
import { User } from '../models/user';
import { natsWrapper } from '../natsWrapper';
import jwt from 'jsonwebtoken';
import { Roles } from './roles';

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
            .withMessage('Password must be between at least 8 characters'),
        body('country').isString().withMessage('Country is required'),
        body('city').isString().withMessage('City is required'),
        body('postalCode').isString().withMessage('Postal code is required'),
        body('street').isString().withMessage('Street is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const role = Roles.ADMIN; // temporary, change it back to Roles.USER later

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email in use');
        }

        const user = User.build({ email, password, role });
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

        const payload: UserPayload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };

        // Generate JWT
        const userJwt = jwt.sign(payload, process.env.JWT_KEY!);

        // Store it on session object
        req.session = {
            jwt: userJwt,
        };

        res.status(201).send(user);
    }
);

export { router as signUpRoute };
