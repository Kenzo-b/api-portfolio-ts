//Express import
import {Request, Response} from 'express';

//Project import
import {Image, IImageDocument} from "../models/image";
import {deleteImageAndDirectory} from "../utils/fileHelper";
import {imageInput} from "../schemas/image";

//Lib import
import mongoose, {HydratedDocument} from "mongoose";
import path from "path";


function saveImage(req: Request<{},{},imageInput>, res: Response) {
    try {
        if (!req.file) return res.status(400).end();
        return new Image({
            filename: req.file?.filename,
            imageTypeId: new mongoose.Types.ObjectId(req.body.imageTypeId),
            path: req.file?.destination,
        }).save();
    } catch (err) {
        return res.status(500).end();
    }
}

async function getAll(req: Request, res: Response) {
   try {
       const images = Image.find().populate({path: 'imageTypeId', model: 'ImageType'});
       if (!images) return res.status(404).end();
   } catch (err) {
       return res.status(500).end();
   }
}

async function get(req: Request, res: Response) {
    try {
        const image: HydratedDocument<IImageDocument> | null =  await Image.findById(req.params.id).populate({path: 'imageTypeID', model: 'ImageType'}).setOptions({sanitizeFilter: true});
        if (!image) return res.status(404).end();
        return image;
    } catch (err) {
        return res.status(500).end();
    }
}

async function getAllByType(req: Request, res: Response) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).end();
        const images = await Image.find({imageTypeId: new mongoose.Types.ObjectId(req.params.id)}).setOptions({sanitizeFilter: true});
        if (images.length === 0) return res.status(404).end();
        return images;
    } catch (err) {
        return res.status(500).end();
    }
}

async function deleteImage(req: Request, res: Response) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).end();
        const result: HydratedDocument<IImageDocument> | null = await Image.findByIdAndDelete(req.params.id);
        if (!result) return new Error('image not found');
        const filePath = path.join(__dirname, '../../public/images', result.path, result.fileName);
        return await deleteImageAndDirectory(filePath);
    } catch (err) {
        return res.status(500).end();
    }
}

export {saveImage, deleteImage, getAllByType, get, getAll};