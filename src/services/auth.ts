import { Request, Response } from 'express';
import { authInput, loginInput } from "../schemas/auth";
import { IJwtDocument, Jwt } from "../models/jwt";
import { User, IUserDocument } from "../models/user";
import randomString from '../utils/randomString';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { HydratedDocument } from "mongoose";

// Configurable secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';

async function login(req: Request<{}, {}, loginInput>, res: Response) {
    try {
        const user: HydratedDocument<IUserDocument> | null = await User.findOne({ pseudo: req.body.pseudo }, { password: 1 });
        if (!user) {
            return res.status(404).end();
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).end();
        }
        const token = jsonwebtoken.sign({ pseudo: req.body.pseudo }, JWT_SECRET, { expiresIn: '1h' });
        await new Jwt({ token }).save();
        return token;
    } catch (error) {
        return res.status(500).end();
    }
}

async function authValidate(req: Request<{}, {}, authInput>, res: Response) {
    try {
        const result: HydratedDocument<IJwtDocument> | null = await Jwt.findOne({ token: req.body.token });
        if (!result) {
            return res.status(401).end();
        }
        return jsonwebtoken.verify(req.body.token, result.secret);
    } catch (error) {
        return res.status(500).end();
    }
}

async function logout(req: Request<{}, {}, authInput>, res: Response) {
    try {
        const token: HydratedDocument<IJwtDocument> | null = await Jwt.findOne({ token: req.body.token });
        if (!token) {
            return res.status(404).end();
        }
        return await Jwt.findByIdAndDelete(token._id);
    } catch (error) {
        return res.status(500).end();
    }
}

export { login, authValidate, logout };
