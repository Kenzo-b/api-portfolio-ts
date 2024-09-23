import express, {Express} from 'express';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import expressMongoSanitize from "express-mongo-sanitize";
import {errorLogHandler, logHandler} from "./middleware/logHandler";
import 'reflect-metadata';
import defineRoutes from "./modules/routes";
import ProjectController from "./controllers/project";
import {corsHandler} from "./middleware/corsHandler";
import AuthController from "./controllers/auth";
import ImageController from "./controllers/image";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(expressMongoSanitize({replaceWith: '_'}));

app.use(logHandler);
app.use(corsHandler);
app.use(errorLogHandler);


defineRoutes([ProjectController, AuthController, ImageController], app);

app.use(errorLogHandler);

export default app;