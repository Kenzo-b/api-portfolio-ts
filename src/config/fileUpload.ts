import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import randomString from '../utils/randomString'; // You would need to implement this or import it as you did

const allowedExtensions = ['.jpg', '.png', '.jpeg'];
const allowedMimeTypes = ['image/png', 'image/jpeg'];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const randomFolder = randomString(16, 'hex');
        const uploadPath = path.join(__dirname, '../../public/images', randomFolder);
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, randomString(16, 'hex') + path.extname(file.originalname));
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const mimeType = file.mimetype;
    if (!allowedExtensions.includes(ext)) {
        return cb(new Error(`File extension ${ext} is not allowed.`));
    }
    if (!allowedMimeTypes.includes(mimeType)) {
        return cb(new Error(`MIME type ${mimeType} is not allowed.`));
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
}).single('file');

export default upload;