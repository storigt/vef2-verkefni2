// src/types.js

/**
 * @typedef {Object} FileItem
 * @property {string} title - The title of the category.
 * @property {string} file - The filename of the category data.
 */

/**
 * @typedef {Object} Answer
 * @property {string} answer - The text for the answer.
 * @property {boolean} correct - Whether the answer is correct.
 */

/**
 * @typedef {Object} Question
 * @property {string} question - The question text.
 * @property {Answer[]} answers - An array of possible answers.
 */

/**
 * @typedef {Object} QuestionCategory
 * @property {string} title - The title of the category.
 * @property {Question[]} questions - An array of questions.
 * @property {string} [file] - The original filename (optional) associated with this category.
 */
