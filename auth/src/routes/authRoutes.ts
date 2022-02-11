import express, { Request, Response } from 'express';
import { currentUser } from '@labcourseapp/common';
import { body } from 'express-validator';
import { BadRequestError, validateRequest } from '@labcourseapp/common';
import { User } from '../models/user';
import { Password } from '../services/Password';
import jwt from 'jsonwebtoken';
import { UserCreatedPublisher } from '../events/publishers/UserCreatedPublisher';
import { natsWrapper } from '../natsWrapper';

const router = express.Router();

router.get('/api/auth/currentuser', currentUser, (req, res) => {
    res.send({ currentUser: req.currentUser || null });
});

router.post(
    '/api/auth/signin',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('Password must be provided'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new BadRequestError('Invalid credentials');
        }

        const passwordsMatch = await Password.compare(
            existingUser.password,
            password
        );

        if (!passwordsMatch) {
            throw new BadRequestError('Invalid credentials');
        }

        // Generate JWT
        const userJwt = jwt.sign(
            {
                id: existingUser.id,
                email: existingUser.email,
            },
            process.env.JWT_KEY!
        );

        // Store it on session object
        req.session = {
            jwt: userJwt,
        };

        res.status(200).send(existingUser);
    }
);

router.get('/api/auth/signout', (req, res) => {
    req.session = null;

    res.send({});
});

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

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email in use');
        }

        const user = User.build({ email, password });
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
        });

        // Generate JWT
        const userJwt = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_KEY!
        );

        // Store it on session object
        req.session = {
            jwt: userJwt,
        };

        res.status(201).send(user);
    }
);

export { router as authRoutes };
