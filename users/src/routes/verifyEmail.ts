import { BadRequestError, NotFoundError } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { redisClient } from '../index';
import { User } from '../models/user';

const router = express.Router()

router.get('/api/users/verifyemail', async (req: Request, res: Response) => {
    let token = req.query.token
    let email = req.query.email

    const user = await User.findOne({email})

    if (!user) {
        throw new NotFoundError()
    }

    const userToken = await redisClient.get(user.email)

    if (!userToken) {
        throw new BadRequestError('Token has expired')
    }

    if (token !== userToken){
        throw new BadRequestError('Could not verify email address')
    }

    res.send('Email verified')
})

export {router as verifyEmail}