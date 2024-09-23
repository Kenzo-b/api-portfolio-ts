import upload from "../config/fileUpload";
import multer from "multer";
import {Request, Response, NextFunction} from "express";
import logger from "../config/logger";

function Upload(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                logger.error(err.message);
                return res.status(400).end();
            } else if (err) {
                logger.error(err.message);
                return res.status(500).end();
            }
            originalMethod.call(this, req, res, next);
        });
    };
}

export default Upload;