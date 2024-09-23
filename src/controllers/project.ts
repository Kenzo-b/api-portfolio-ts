//Express import
import {Request, Response, NextFunction} from 'express';

//Project import
import Controller from '../decorators/controller'
import Route from '../decorators/route'
import {createProject, deleteProject, getAllProjects, getProject, updateProject} from "../services/project";
import logger from '../config/logger';
import Validate from "../decorators/validate";
import {projectSchema} from "../schemas/project";

@Controller('/project')
class ProjectController {

    @Route('get', '/')
    async getAll(req: Request, res: Response) {
        try {
            const projects = await getAllProjects(res);
            if (!projects) return res.status(404).end();
            return res.status(200).json(projects);
        } catch (err) {
            logger.error(err);
            return res.status(500).end();
        }
    }

    @Route('get', '/:id')
    async get(req: Request, res: Response) {
        try {
            const project = await getProject(req, res);
            if (!project) return res.status(404).end();
            return res.status(200).json(project);
        }catch (err) {
            logger.error(err);
            return res.status(500).end();
        }
    }

    @Route('post', '/')
    @Validate(projectSchema)
    async create(req: Request, res: Response) {
        try {
            const project = await createProject(req, res);
            return res.status(200).json(project);
        } catch (err) {
            logger.error(err);
            return res.status(500).end();
        }
    }

    @Route('patch', '/')
    @Validate(projectSchema)
    async update(req: Request, res: Response) {
        try {
            const project = await updateProject(req, res);
            if (!project) return res.status(404).end();
            return res.status(200).end();
        } catch (err) {
            logger.error(err);
            return res.status(500).end();
        }
    }

    @Route('delete', '/:id')
    async delete(req: Request, res: Response) {
        try {
            const project = await deleteProject(req, res);
            return res.status(200).end();
        } catch (err) {
            logger.error(err);
            return res.status(500).end();
        }
    }
}

export default ProjectController;