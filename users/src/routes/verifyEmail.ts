import { BadRequestError, NotFoundError } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { redisWrapper } from '../redisWrapper';

const router = express.Router()

router.get('/api/users/verifyemail', async (req: Request, res: Response) => {
    let token = req.query.token as string
    let email = req.query.email as string

    if (!token || !email){
        throw new BadRequestError('Something went wrong')
    }

    const user = await User.findOne({email})

    if (!user) {
        throw new NotFoundError()
    }

    const userToken = await redisWrapper.client.get(user.email)

    if (!userToken) {
        throw new BadRequestError('Token has expired')
    }

    token = Buffer.from(token, 'base64').toString('ascii')
    if (token !== userToken){
        throw new BadRequestError('Could not verify email address')
    }

    user.set({
        emailConfirmed: true
    });
    await user.save();

    const redirectUrl = `http://${req.headers.host!}/emailConfirmed`;

    res.redirect(redirectUrl);
})

export {router as verifyEmail}