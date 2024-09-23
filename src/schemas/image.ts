import {FromSchema} from "json-schema-to-ts";

const imagePostSchema = {
    type: 'object',
    properties: {
        imageTypeId: { type: 'string' }
    },
    required: ['imageTypeId'],
    additionalProperties: false
} as const;

type imageInput = FromSchema<typeof imagePostSchema>;

export {imagePostSchema, imageInput};