import { BadRequestError, NotFoundError, requireAuth } from '@labcourseapp/common'
import express, {Request, Response} from 'express'
import { Admin } from '../models/admin'
import { Password } from '../services/Password'

const router = express.Router()

router.post('/api/users/updatepassword', requireAuth, async (req: Request, res: Response) => {
    const { currentPassword, newPassword } = req.body

    if (currentPassword === newPassword) {
        throw new BadRequestError('New password cannot be the same as your old password')
    }

    const user = await Admin.findById(req.currentUser!.id)

    if (!user){
        throw new NotFoundError()
    }

    const passwordsMatch = await Password.compare(
        user.password,
        currentPassword
    );

    if (!passwordsMatch) {
        throw new BadRequestError('Current password is invalid');
    }

    user.set({
        password: newPassword
    })
    await user.save();
    
    res.send(user)
})

export {router as changePasswordRoute}