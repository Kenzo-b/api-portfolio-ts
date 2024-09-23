import {FromSchema} from "json-schema-to-ts";

const loginSchema = {
    type: 'object',
    properties: {
        pseudo: {type: 'string'},
        password: {type: 'string'},
    },
    required: ['pseudo', 'password'],
    additionalProperties: false
} as const;

const authSchema = {
    type: 'object',
    properties: {
        token: {type: 'string'}
    },
    required: ['token'],
    additionalProperties: false
} as const;


type authInput = FromSchema<typeof authSchema>;
type loginInput = FromSchema<typeof loginSchema>;

export {authSchema, authInput};
export {loginSchema , loginInput};