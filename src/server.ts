import http from 'http';
import logger from "./config/logger";
import app from "./app";
import {DB, SERVER} from "./config/config";
import mongoose from "mongoose";

let httpServer: ReturnType<typeof http.createServer>;

const main = () => {
    logger.info('Initializing api...');
    httpServer = http.createServer(app);
    mongoose.connect(DB).then(()=> {
        httpServer.listen(SERVER.EXPRESS_PORT, SERVER.EXPRESS_HOST, () => {
            logger.info(`server started : ${SERVER.EXPRESS_HOST}:${SERVER.EXPRESS_PORT}`);
        })
    })
}

main()