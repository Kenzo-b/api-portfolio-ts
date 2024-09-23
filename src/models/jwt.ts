import {Schema, model, Model, Document} from "mongoose";

interface IJwt {
    token: string;
    secret: string;
}

interface IJwtDocument extends  IJwt, Document {}

const JwtSchema: Schema<IJwtDocument> = new Schema<IJwtDocument>({
    token: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        required: true
    }
});

const Jwt: Model<IJwtDocument> = model<IJwtDocument>('Jwt', JwtSchema);

export {Jwt, IJwtDocument};