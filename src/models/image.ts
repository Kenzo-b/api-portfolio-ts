import {Schema, model, Types, Document, Model} from "mongoose";

interface IImage {
    fileName: string;
    imageTypeId: Types.ObjectId;
    path: string;
}

interface IImageDocument extends IImage, Document {}

const ImageSchema: Schema<IImageDocument> = new Schema<IImageDocument>({
    fileName: {
        type: String,
        required: true
    },
    imageTypeId: {
        type: Schema.Types.ObjectId,
        ref: "ImageType",
        required: true
    },
    path: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Image: Model<IImageDocument> = model<IImageDocument>("Image", ImageSchema);

export {Image, IImageDocument};