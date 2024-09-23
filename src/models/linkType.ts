import {Schema, model, Document, Model} from "mongoose";

interface ILinkType {
    name: string;
}

interface ILinkTypeDocument extends ILinkType, Document {}

const LinkTypeSchema: Schema<ILinkTypeDocument> = new Schema<ILinkTypeDocument>({
    name: {
        type: String,
        required: true
    }
});

const LinkType: Model<ILinkTypeDocument> = model<ILinkTypeDocument>('LinkType', LinkTypeSchema);

export default LinkType;