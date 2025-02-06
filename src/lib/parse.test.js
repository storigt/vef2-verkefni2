import { describe, it } from 'node:test';
import assert from 'node:assert';
import { parseIndexFile, parseQuestionsCategory } from './parse.js';

describe('parseIndexFile', () => {
  it('should correctly parse valid index content', () => {
    const validIndexContent = JSON.stringify([
      { title: 'HTML', file: 'html.json' },
      { title: 'CSS', file: 'css.json' }
    ]);
    const result = parseIndexFile(validIndexContent);
    assert.strictEqual(Array.isArray(result), true);
    assert.strictEqual(result.length, 2);
  });

  it('should return an empty array for invalid index content', () => {
    const invalidIndexContent = JSON.stringify({ foo: 'bar' });
    const result = parseIndexFile(invalidIndexContent);
    assert.strictEqual(Array.isArray(result), true);
    assert.strictEqual(result.length, 0);
  });
});

describe('parseQuestionsCategory', () => {
  it('should correctly parse valid category content', () => {
    const validCategoryContent = JSON.stringify({
      title: 'HTML',
      questions: [
        {
          question: 'What is HTML?',
          answers: [
            { answer: 'HyperText Markup Language', correct: true },
            { answer: 'HighText Machine Language', correct: false }
          ]
        }
      ]
    });
    const result = parseQuestionsCategory(validCategoryContent);
    assert.ok(result, 'Result should not be null');
    assert.strictEqual(result.title, 'HTML');
    assert.strictEqual(Array.isArray(result.questions), true);
    assert.strictEqual(result.questions.length, 1);
  });

  it('should return null for invalid category content', () => {
    const invalidCategoryContent = JSON.stringify({
      title: 'Broken',
      questions: [
        {
          question: 'Broken question',
          answers: 'Not an array'
        }
      ]
    });
    const result = parseQuestionsCategory(invalidCategoryContent);
    assert.strictEqual(result, null);
  });
});
