//Express import
import {Request, Response, NextFunction} from "express";

//Project import
import Controller from "../decorators/controller";
import Route from "../decorators/route";
import Validate from "../decorators/validate";
import {imagePostSchema} from "../schemas/image";
import Upload from "../decorators/upload";
import {get, getAll, saveImage, getAllByType, deleteImage} from "../services/image";
import logger from "../config/logger";

@Controller('/image')
class ImageController {

    @Route('post', '/')
    @Validate(imagePostSchema)
    @Upload
    async save(req: Request, res: Response, next: NextFunction) {
        try {
            const image = await saveImage(req, res)
            if (!image) return res.status(401).end();
            res.status(200).end()
        } catch (err) {
            logger.error(err);
            return res.status(500).end();
        }
    }

    @Route('get', '/')
    async getAllImage(req: Request, res: Response, next: NextFunction) {
        try {
            const images = await getAll(req, res);
            if (!images) return res.status(404).end();
            res.status(200).json(images);
        } catch (err) {
            logger.error(err);
            return res.status(500).end();
        }
    }

    @Route('get', '/:id')
    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const image = await get(req, res);
            if (!image) return res.status(404).end();
            return res.status(200).json(image);
        } catch (err) {
            logger.error(err);
            return res.status(500).end();
        }
    }

    @Route('get', '/type/:id')
    async getAllByType(req: Request, res: Response, next: NextFunction) {
        try {
            const images = await getAllByType(req, res);
            if (!images) return res.status(404).end();
            res.status(200).json(images);
        } catch (err) {
            logger.error(err);
            return res.status(500).end();
        }
    }

    @Route('delete')
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const isDeleted = await deleteImage(req, res);
            if (!isDeleted) return res.status(404).end();
            res.status(200).end();
        } catch (err) {
            logger.error(err);
            return res.status(500).end();
        }
    }
}

export default ImageController;