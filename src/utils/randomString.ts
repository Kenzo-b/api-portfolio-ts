import * as crypto from "node:crypto";

const randomString = (size: number, encoding: any) => {
    return crypto.randomBytes(size).toString(encoding);
}

export default randomString;