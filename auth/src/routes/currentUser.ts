import { currentUser } from '@labcourseapp/common';
import express from 'express';

const router = express.Router();

router.get('/api/auth/currentuser', currentUser, (req, res) => {
    res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRoute };
