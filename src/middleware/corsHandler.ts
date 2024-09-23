import { Request, Response, NextFunction } from 'express';

function corsHandler(req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', req.header('Origin'));
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Method', 'GET, POST, PATCH, DELETE, PUT');
        return res.status(200).end();
    }
    next();
}

export { corsHandler };