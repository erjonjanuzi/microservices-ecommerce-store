import {
    adminRoute,
    NotFoundError,
    requireAuth,
    validateRequest,
} from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Admin } from '../models/admin';

const router = express.Router();

router.put(
    '/api/users/updateadmin/:id',
    requireAuth,
    adminRoute,
    [
        body('firstName').isString().withMessage('First name is required'),
        body('lastName').isString().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Email must be valid'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { firstName, lastName, email } = req.body;
        const {id} = req.params;

        const admin = await Admin.findById(id)

        if (!admin) {
            throw new NotFoundError()
        }

        admin.set({
            firstName, lastName, email,
        })
        await admin.save();

        res.status(200).send(admin);
    }
);

export { router as updateAdminRoute };
