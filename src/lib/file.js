
import { promises as fs } from 'node:fs';
import path from 'node:path';

/**
 * Reads the file at the given path and returns its contents as a string.
 * @param {string} filePath 
 * @returns {Promise<string|null>} 
 */
export async function readFile(filePath) {
  try {
    const absolutePath = path.resolve(filePath);
    const data = await fs.readFile(absolutePath, 'utf-8');
    return data;
  } catch (error) {
    console.error(`Error reading file at ${filePath}: ${error.message}`);
    return null;
  }
}

/**
 * Writes the given content to the file at the specified path.
 * @param {string} filePath
 * @param {string} content
 * @param {object} [options={}]
 * @returns {Promise<boolean>}
 */
export async function writeFile(filePath, content, options = {}) {
  try {
    const absolutePath = path.resolve(filePath);
    await fs.writeFile(absolutePath, content, options);
    return true;
  } catch (error) {
    console.error(`Error writing file at ${filePath}: ${error.message}`);
    return false;
  }
}

/**
 * Ensures that the directory at the given path exists. Creates it (including parent directories) if necessary.
 * @param {string} dirPath
 * @returns {Promise<void>}
 */
export async function createDirIfNotExists(dirPath) {
  try {
    const absolutePath = path.resolve(dirPath);
    await fs.mkdir(absolutePath, { recursive: true });
  } catch (error) {
    console.error(`Error creating directory at ${dirPath}: ${error.message}`);
    throw error;
  }
}
