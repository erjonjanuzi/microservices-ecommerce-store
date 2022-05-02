import { BadRequestError, validateRequest } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';

const router = express.Router();

router.post(
    '/api/users/checkuser',
    [
        body('email').isEmail().withMessage('Email must be valid'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email in use');
        }

        res.status(200).send({})
    }
);

export { router as checkUserRoute };
