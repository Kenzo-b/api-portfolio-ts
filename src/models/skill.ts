import {Schema, model, Model, Document} from 'mongoose';

interface ISkill {
    name: string;
}

interface ISkillDocument extends ISkill, Document{}

const SkillSchema: Schema = new Schema<ISkill>({
    name: {
        type: String,
        required: true
    }
});

const Skill: Model<ISkillDocument> = model<ISkillDocument>('skill', SkillSchema);

export default Skill;