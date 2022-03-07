import { BadRequestError } from '@labcourseapp/common';
import multer from 'multer';
import { Request } from 'express';

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    },
});

const fileFilter = (
    _: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    if (
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new BadRequestError('Unsupported file format'));
    }
};

const upload = multer({
    storage,
    fileFilter,
});

export { upload };
