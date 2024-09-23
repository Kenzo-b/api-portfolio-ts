//Express import
import {NextFunction, Request, Response} from 'express';

//Project import
import Route from "../decorators/route";
import Validate from "../decorators/validate";
import Controller from "../decorators/controller";
import {authSchema, loginSchema} from "../schemas/auth";
import {authValidate, login, logout} from "../services/auth";
import logger from "../config/logger";



@Controller('/auth')
class AuthController {

    @Route('post', '/')
    @Validate(loginSchema)
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const token = await login(req, res);
            if (!token) return res.status(401).end();
            res.status(200).json({token: token})
        } catch (err) {
            logger.error(err);
            return res.status(500).end();
        }
    }

    @Route('get', '/')
    @Validate(authSchema)
    async authVerify(req: Request, res: Response, next: NextFunction) {
        try {
            const verified = await authValidate(req, res);
            if (!verified) return res.status(401).end();
            res.status(200).end();
        } catch (err) {
            logger.error(err);
            return res.status(500).end();
        }
    }

    @Route('delete', '/')
    @Validate(authSchema)
    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const isLoggedOut = await logout(req, res);
            if (!isLoggedOut) return res.status(401).end();
            res.status(200).end();
        } catch (err) {
            logger.error(err);
            return res.status(500).end();
        }
    }
}

export default AuthController;