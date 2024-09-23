import {Schema, model, Types, Model} from "mongoose";

interface IProjectSkill {
    skillId: Types.ObjectId;
    linkTypeId: Types.ObjectId;
    link?: string | string[];
}

interface IProjectSkillDocument extends IProjectSkill, Document {_id: Types.ObjectId}

const ProjectSkillSchema: Schema = new Schema<IProjectSkillDocument>({
    skillId: {
        type: Schema.Types.ObjectId,
        ref: "Skill",
        required: true
    },
    linkTypeId: {
        type: Schema.Types.ObjectId,
        ref: "LinkType",
        required: true
    },
    link: {
        type: Schema.Types.Mixed,
        required: false
    }
}, {timestamps: true});

const ProjectSkill: Model<IProjectSkillDocument> = model<IProjectSkillDocument>('ProjectSkill', ProjectSkillSchema);

export {ProjectSkill, IProjectSkillDocument};