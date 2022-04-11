import {
    adminRoute,
    BadRequestError,
    requireAuth,
    validateRequest,
} from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Admin } from '../models/admin';

const router = express.Router();

router.post(
    '/api/users/createadmin',
    requireAuth,
    adminRoute,
    [
        body('firstName').isString().withMessage('First name is required'),
        body('lastName').isString().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await Admin.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email in use');
        }

        const admin = Admin.build({ firstName, lastName, email, password });
        await admin.save();

        res.status(201).send(admin);
    }
);

export { router as createAdminRoute };
