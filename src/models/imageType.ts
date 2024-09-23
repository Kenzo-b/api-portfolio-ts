import {Schema, model, Document, Model} from "mongoose";

interface IImageType {
    name: string;
}

interface IImageTypeDocument extends  IImageType, Document {}

const ImageTypeSchema: Schema<IImageTypeDocument> = new Schema<IImageTypeDocument>({
    name: {
        type: String,
        required: true
    }
});

const ImageType: Model<IImageTypeDocument> = model<IImageTypeDocument>('ImageType', ImageTypeSchema);

export default ImageType;