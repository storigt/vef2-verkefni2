import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createDirIfNotExists, readFile } from './lib/file.js';
import { indexTemplate, questionsCategoryTemplate } from './lib/html.js';
import { parseIndexFile, parseQuestionsCategory } from './lib/parse.js';

/**
 * @typedef {import('./types.js').FileItem} FileItem
 * @typedef {import('./types.js').QuestionsCategory} QuestionsCategory
 */

/** Mappa sem geymir Json skrár */
const INPUT_DIR = './data';

/**Mappa sem geymir skrár fyrir vef */
const OUTPUT_DIR = './dist';

/**
 * 
 * @param {FileItem} fileItem File item to process
 * @returns {Promise<QuestionsCategory|null>} Parced questions category or null if invalid
 */
async function readAndParseFile(fileItem) {
    const content = await readFile(join(INPUT_DIR, fileItem.file));

    if (!content) {
        console.error('Error reading file', fileItem);
        return null;
    }
    const parsed = parseQuestionsCategory(content);

    if (!parsed) {
        console.error('Error parsing file', fileItem);
        return null;
    }

    parsed.file = fileItem.file;

    return parsed;
}

async function createAndWriteCategoryFile(questionsCategory) {
    if (!questionsCategory.file) {
        console.error('Missing file name', questionsCategory);
        return;
    }
    const filename = questionsCategory.file.replace('.json', '.html');
    const categoryFileOutput = join(OUTPUT_DIR, filename);
    await writeFile(
        categoryFileOutput,
        questionsCategoryTemplate(questionsCategory),
        { flag: 'w+' }
    );
    console.info('category file written to', categoryFileOutput);
}

/**
 * Býr til HTML skrár úr JSON skrám
 * 
 * 1. Býr til OUTPUT_DIR ef hún er ekki til
 * 2. Les og þáttar index.json skránna úr INPUT_DIR möppu
 * 3. Les og þáttar hverja JSON skrá (flokka) í index.json
 * 4. Útbýr HTML skrár fyrir hvern flokk í OUTPUT_DIR
 * 5. Útbýr HTML skrá fyrir index síðu í OUTPUT_DIR
 */
async function main() {
    console.group('Building HTML files');

    // 1.
    await createDirIfNotExists(OUTPUT_DIR);

    // 2.
    console.group('Reading index file');
    const indexFile = await readFile(join(INPUT_DIR, 'index.json'));

    if (!indexFile) {
        console.error('Error reading index file');
        return;
    }
    const index = parseIndexFile(indexFile);
    console.info('Index file length', index.length);
    console.groupEnd();

    // 3.
    /** @type QuestionsCategory[] */
    let questionCategoryFiles = [];
    for await (const { title, file } of index) {
        console.group('Reading category file', file);
        const result = await readAndParseFile({ title, file });

        if (result) {
            questionCategoryFiles.push(result);
        }
        console.groupEnd();
    }

    // 4.
    console.group('Writing category files');
    const indexFileOutput = join(OUTPUT_DIR, 'index.html');
    await writeFile(indexFileOutput, indexTemplate(questionCategoryFiles), {
        flag: 'w+'
    });
    console.info('Index file written to', indexFileOutput);
    console.groupEnd();

    // 5.
    console.group('Writing category files');
    for await (const questionsCategory of questionCategoryFiles) {
        await createAndWriteCategoryFile(questionsCategory);
    }
    console.groupEnd();

    console.groupEnd();
    console.info('Build complete');
}

main().catch((error) => {
    console.error('Error building HTML files', error);
});
