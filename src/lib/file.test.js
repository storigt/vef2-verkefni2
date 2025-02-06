import { describe, it } from 'node:test';
import assert from 'node:assert';
import { createDirIfNotExists, readFile, writeFile } from './file.js';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import os from 'node:os';

describe('File module', () => {
  it('should create a directory if it does not exist', async () => {
    const tempDir = path.join(os.tmpdir(), 'test-dir-' + Date.now());
    await createDirIfNotExists(tempDir);
    // Check that the directory exists
    const stats = await fs.stat(tempDir);
    assert.ok(stats.isDirectory());
    // Clean up: remove the directory
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  it('should write and read a file', async () => {
    const tempDir = path.join(os.tmpdir(), 'test-dir-' + Date.now());
    await createDirIfNotExists(tempDir);
    const testFilePath = path.join(tempDir, 'test.txt');
    const content = 'Hello, world!';
    const writeResult = await writeFile(testFilePath, content);
    assert.strictEqual(writeResult, true);
    const readContent = await readFile(testFilePath);
    assert.strictEqual(readContent, content);
    // Clean up: remove the file and directory
    await fs.unlink(testFilePath);
    await fs.rm(tempDir, { recursive: true, force: true });
  });
});
