import {
    adminRoute,
    BadRequestError,
    NotFoundError,
    requireAuth,
    Roles,
    validateRequest,
} from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Admin } from '../models/admin';
import { User } from '../models/user';

const router = express.Router();

router.delete(
    '/api/users/:id',
    requireAuth,
    adminRoute,
    validateRequest,
    async (req: Request, res: Response) => {
        const {id} = req.params;

        const user = await User.findByIdAndDelete(id)

        if(!user) {
            throw new NotFoundError()
        }

        res.send();
    }
);

export { router as deleteUserRoute };
