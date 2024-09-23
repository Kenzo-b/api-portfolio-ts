import { promises as fs } from 'fs';
import path from 'path';
import logger from "../config/logger";

// Delete a file
const deleteFile = async (filePath: string): Promise<void> => {
    try {
        await fs.unlink(filePath);
        logger.info(`File deleted: ${filePath}`);
    } catch (err: any) {
        if (err.code === 'ENOENT') {
            logger.error(`File not found: ${filePath}`);
        } else {
            throw new Error(`Error deleting file: ${err.message}`);
        }
    }
};

// Delete an empty directory
const deleteEmptyDirectory = async (dirPath: string): Promise<void> => {
    try {
        const files = await fs.readdir(dirPath);
        if (files.length === 0) {
            await fs.rm(dirPath, { recursive: true, force: true });
            logger.info(`Directory deleted: ${dirPath}`);
        }
    } catch (err: any) {
        throw new Error(`Error checking or deleting directory: ${err.message}`);
    }
};

// Delete a file and its parent directory if empty
const deleteImageAndDirectory = async (filePath: string): Promise<void> => {
    try {
        const dirPath = path.dirname(filePath);
        await deleteFile(filePath);
        await deleteEmptyDirectory(dirPath);
    } catch (err: any) {
        throw err;
    }
};

export { deleteFile, deleteEmptyDirectory, deleteImageAndDirectory };