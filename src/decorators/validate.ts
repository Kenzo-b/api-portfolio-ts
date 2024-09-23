import {Request, Response, NextFunction} from 'express';
import {Schema} from 'ajv'
import logger from "../config/logger";
import {$Validator, wrapValidatorAsTypeGuard, FromSchema} from "json-schema-to-ts";
import ajvInstance from "../utils/ajvInstance";

function Validate(schema: Schema) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                const $validate: $Validator = (schema: Schema, data: any) => ajvInstance.validate(schema, data);
                const validate = wrapValidatorAsTypeGuard($validate);
                if ( !validate(schema, req.body)) {
                    logger.warn('validation failure : (maybe an attack)', req)
                    return res.status(422).end()
                }
                return originalMethod.call(this, req, res, next);
            } catch (err) {
                logger.error(err);
                return res.status(500).end();
            }
        };
    }
}

export default Validate;