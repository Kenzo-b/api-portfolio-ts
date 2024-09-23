import dotenv from "dotenv";
import dotenvExpend from "dotenv-expand";

dotenvExpend.expand(dotenv.config());

const EXPRESS_PORT = Number(process.env.EXPRESS_PORT);
const EXPRESS_HOST = String(process.env.EXPRESS_HOST);

const DB_URI = String(process.env.DB_URI);

const SERVER = {
    EXPRESS_PORT,
    EXPRESS_HOST
};

const DB = DB_URI;

export {SERVER, DB};