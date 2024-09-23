import {FromSchema} from "json-schema-to-ts";

const projectSchema = {
    type: 'object',
    properties: {
        projectId: { type: 'string' },
        projectName: { type: 'string' },
        projectDescription: { type: 'string' },
        projectSkills: {
            type: 'array',
            minItems: 1,
            maxItems: 6,
            items: {
                type: 'object',
                properties: {
                    projectSkillId: { type: 'string' },
                    skillId: { type: 'string' },
                    linkTypeId: { type: 'string' },
                    link: { type: 'string' }
                },
                required: ['skillId', 'linkTypeId', 'link'],
                additionalProperties: false
            }
        }
    },
    required: ['projectId','projectName', 'projectSkills', 'projectDescription'],
    additionalProperties: false
} as const;

type ProjectInput = FromSchema<typeof projectSchema>;

export {projectSchema, ProjectInput};