import {Schema, model, Types, Document, Model} from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser {
    pseudo: string;
    password: string;
}

interface IUserDocument extends IUser, Document {_id: Types.ObjectId}

const UserSchema = new Schema<IUserDocument>({
    pseudo: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', async function (next) {
    const user = this as IUserDocument;
    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }

    next();
});

const User: Model<IUserDocument> = model<IUserDocument>("User", UserSchema);

export {User, IUserDocument};