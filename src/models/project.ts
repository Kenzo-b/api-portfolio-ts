import {Schema, model, Types, Document, Model} from "mongoose";

interface IProject {
    name: string;
    description: string;
    projectSkills: Types.ObjectId[];
}

interface IProjectDocument extends IProject , Document {_id: Types.ObjectId}

const ProjectSchema: Schema<IProjectDocument> = new Schema<IProjectDocument>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    projectSkills: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "ProjectSkill"
        }]
    }
}, {timestamps: true});

const Project: Model<IProjectDocument> = model<IProjectDocument>('Project', ProjectSchema);

export {Project, IProjectDocument};