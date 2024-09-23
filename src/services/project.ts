// Express import
import { Request, Response } from "express";

// Project import
import { IProjectDocument, Project } from "../models/project";
import { ProjectSkill } from "../models/projectSkill";
import { ProjectInput } from "../schemas/project";

// Lib import
import mongoose, { HydratedDocument } from "mongoose";

async function getAllProjects(res: Response) {
    try {
        return await Project.find().populate({
            path: 'skills',
            model: 'ProjectSkill',
            populate: [
                {
                    path: 'skillId',
                    model: 'Skill'
                },
                {
                    path: 'linkTypeId',
                    model: 'LinkType'
                }
            ]
        }).sort({ createdAt: 1 });
    } catch (error) {
        res.status(500).end(); // Internal server error
    }
}

async function getProject(req: Request, res: Response) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).end(); // Bad request
        return; // Exit early
    }
    const project: HydratedDocument<IProjectDocument> | null = await Project.findById(req.params.id).populate({
        path: 'skills',
        model: 'ProjectSkill',
        populate: [
            {
                path: 'skillId',
                model: 'Skill'
            },
            {
                path: 'linkTypeId',
                model: 'LinkType'
            }
        ]
    });
    if (!project) {
        res.status(404).end(); // Not found
        return; // Exit early
    }
    return project; // Return the found project
}

async function createProject(req: Request<{},{},ProjectInput>, res: Response) {
    try {
        const projectSkillDocuments = req.body.projectSkills.map(skill => ({
            skillId: new mongoose.Types.ObjectId(skill.skillId),
            linkTypeId: new mongoose.Types.ObjectId(skill.linkTypeId),
            link: skill.link
        }));
        const projectSkillsResult = await ProjectSkill.insertMany(projectSkillDocuments);
        const projectSkillIds = projectSkillsResult.map(ps => ps._id);
        const project = new Project({
            name: req.body.projectName,
            description: req.body.projectDescription,
            projectSkills: projectSkillIds
        });
        return await project.save(); // Return the saved project
    } catch (error) {
        res.status(500).end(); // Internal server error
    }
}

async function deleteProject(req: Request, res: Response) {
    const project: HydratedDocument<IProjectDocument> | null = await Project.findById(req.params.id);
    if (!project) {
        res.status(404).end(); // Not found
        return; // Exit early
    }
    if (project.projectSkills && project.projectSkills.length > 0) {
        await Promise.all(project.projectSkills.map(skill =>
            ProjectSkill.findByIdAndDelete(skill._id)
        ));
    }
    await Project.findByIdAndDelete(req.params.id);
    return; // Optionally return something if needed
}

async function updateProject(req: Request, res: Response) {
    const updateProject = await Project.findByIdAndUpdate(req.body.projectId, {
        name: req.body.projectName,
        description: req.body.projectDescription
    }, { runValidators: true, new: true });

    if (!updateProject) {
        res.status(404).end(); // Not found
        return; // Exit early
    }

    const updatedSkillsPromises = req.body.projectSkills.map(async (skill: any) => {
        const { skillId, linkTypeId, link } = skill;
        return ProjectSkill.findOneAndUpdate(
            { skillId: skillId },
            { linkTypeId: new mongoose.Types.ObjectId(linkTypeId), link: link, skill: new mongoose.Types.ObjectId(skillId) },
            { new: true, upsert: true, runValidators: true }
        );
    });
    await Promise.all(updatedSkillsPromises);
    return updateProject; // Return the updated project
}

export { getProject, getAllProjects, createProject, deleteProject, updateProject };
