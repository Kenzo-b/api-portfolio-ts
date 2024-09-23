import expressWinston from 'express-winston';
import logger from '../config/logger';


const logMessageTemplate =  "{{(req.protocol).toUpperCase()}} <{{req.method}}> '{{req.url}}' : {{res.statusCode}} {{res.responseTime}}ms [{{req.ip}}]";

const logHandler = expressWinston.logger({
    winstonInstance: logger,
    msg: logMessageTemplate,
    meta: true,
    colorize: false,
});

const errorLogHandler = expressWinston.errorLogger({
    winstonInstance: logger,
    msg: logMessageTemplate,
    meta: true
});

export { logHandler, errorLogHandler };
