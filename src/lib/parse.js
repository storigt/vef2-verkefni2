// src/lib/parse.js

/**
 * Parses the content of the index.json file.
 * The file is expected to be an array of objects, each with:
 *  - title: string
 *  - file: string
 *
 * @param {string} content - Raw JSON string from index.json
 * @returns {Array<{ title: string, file: string }>}
 */
export function parseIndexFile(content) {
    let data;
    try {
      data = JSON.parse(content);
    } catch (error) {
      console.error('Error parsing index file JSON:', error.message);
      return [];
    }
  
    if (!Array.isArray(data)) {
      console.error('Index file data is not an array.');
      return [];
    }
  
    const validItems = [];
    data.forEach((item, index) => {
      if (typeof item !== 'object' || item === null) {
        console.error(`Item at index ${index} is not an object.`);
        return;
      }
      const { title, file } = item;
      if (typeof title !== 'string') {
        console.error(`Item at index ${index} has an invalid or missing "title".`);
        return;
      }
      if (typeof file !== 'string') {
        console.error(`Item at index ${index} has an invalid or missing "file".`);
        return;
      }
      validItems.push({ title, file });
    });
  
    return validItems;
  }
  
  /**
 * Parses a questions category JSON.
 * The category is expected to be an object with:
 *  - title: string
 *  - questions: array of objects, each with:
 *      - question: string
 *      - answers: array of objects with:
 *          - answer: string
 *          - correct: boolean (and exactly one answer should be correct)
 *
 * @param {string} content - Raw JSON string from a category file (e.g., html.json)
 * @returns {{ title: string, questions: Array<{ question: string, answers: Array<{ answer: string, correct: boolean }> }> } | null}
 */
export function parseQuestionsCategory(content) {
  let data;
  try {
    data = JSON.parse(content);
  } catch (error) {
    console.error('Error parsing category JSON:', error.message);
    return null;
  }

  if (typeof data !== 'object' || data === null) {
    console.error('Category data is not an object.');
    return null;
  }

  const { title, questions } = data;
  if (typeof title !== 'string') {
    console.error('Category "title" is missing or invalid.');
    return null;
  }

  if (!Array.isArray(questions)) {
    console.error(`Category "${title}" has no valid "questions" array.`);
    return null;
  }

  const validQuestions = [];
  questions.forEach((q, index) => {
    if (typeof q !== 'object' || q === null) {
      console.error(`Question at index ${index} is not an object. Skipping.`);
      return;
    }
    const { question, answers } = q;
    if (typeof question !== 'string') {
      console.error(`Question at index ${index} is missing or has an invalid "question" field. Skipping.`);
      return;
    }
    if (!Array.isArray(answers)) {
      console.error(`Question "${question}" has an invalid or missing "answers" array. Skipping.`);
      return;
    }

    let correctCount = 0;
    const validAnswers = [];
    answers.forEach((ans, ansIndex) => {
      if (typeof ans !== 'object' || ans === null) {
        console.error(`Answer at [${index}][${ansIndex}] is not an object. Skipping.`);
        return;
      }
      const { answer, correct } = ans;
      if (typeof answer !== 'string') {
        console.error(`Answer at [${index}][${ansIndex}] missing or invalid "answer" property. Skipping.`);
        return;
      }
      if (typeof correct !== 'boolean') {
        console.error(`Answer at [${index}][${ansIndex}] missing or invalid "correct" boolean. Skipping.`);
        return;
      }
      if (correct === true) correctCount++;
      validAnswers.push({ answer, correct });
    });

    if (correctCount !== 1) {
      console.error(
        `Question "${question}" does not have exactly 1 correct answer. Found ${correctCount}. Skipping.`
      );
      return;
    }

    validQuestions.push({
      question,
      answers: validAnswers,
    });
  });

  if (validQuestions.length === 0) {
    console.error(`Category "${title}" has no valid questions. Skipping.`);
    return null;
  }

  return { title, questions: validQuestions };
}
