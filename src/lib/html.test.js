import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  template,
  indexTemplate,
  replaceHtmlEntities,
  stringToHtml,
  questionsCategoryTemplate
} from './html.js';

describe('HTML module', () => {
  it('template should wrap content in HTML structure', () => {
    const title = 'Test Page';
    const body = '<p>Hello</p>';
    const result = template(title, body);
    assert.ok(result.includes('<!DOCTYPE html>'));
    assert.ok(result.includes('<title>Test Page</title>'));
    assert.ok(result.includes(body));
  });

  it('indexTemplate should include category links', () => {
    const categories = [
      { title: 'Category1', file: 'cat1.json' },
      { title: 'Category2', file: 'cat2.json' }
    ];
    const result = indexTemplate(categories);
    assert.ok(result.includes('<a href="cat1.html">Category1</a>'));
    assert.ok(result.includes('<a href="cat2.html">Category2</a>'));
  });

  it('replaceHtmlEntities should escape special characters', () => {
    const input = '<div>"Hello" & \'world\'</div>';
    const expected = '&lt;div&gt;&quot;Hello&quot; &amp; &#039;world&#039;&lt;/div&gt;';
    const result = replaceHtmlEntities(input);
    assert.strictEqual(result, expected);
  });

  it('stringToHtml should wrap text in paragraph tags and handle newlines', () => {
    const input = 'Line 1\n\nLine 2';
    const result = stringToHtml(input);
    assert.ok(result.includes('<p>Line 1</p>'));
    assert.ok(result.includes('<p>Line 2</p>'));
  });

  it('questionsCategoryTemplate should produce valid HTML for a category', () => {
    const category = {
      title: 'Sample Category',
      questions: [
        {
          question: 'What is 2+2?',
          answers: [
            { answer: '4', correct: true },
            { answer: '22', correct: false }
          ]
        }
      ]
    };
    const result = questionsCategoryTemplate(category);
    assert.ok(result.includes('Sample Category'));
    assert.ok(result.includes('What is 2+2?'));
    assert.ok(result.includes('data-correct="true"'));
    assert.ok(result.includes('data-correct="false"'));
  });
});
