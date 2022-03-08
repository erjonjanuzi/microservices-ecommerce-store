import { BadRequestError, validateRequest } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { Password } from '../services/Password';
import { TokenService } from '../services/TokenService';

const router = express.Router();

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
        const userJwt = TokenService.create({
            id: existingUser.id,
            email: existingUser.email,
            role: existingUser.role
        })

        // Store it on session object
        req.session = {
            jwt: userJwt,
        };

        res.status(200).send(existingUser);
    }
);

export { router as signInRoute };
