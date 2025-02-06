// src/lib/html.js

/**
 * Generates a full HTML document with a given title and body content.
 * @param {string} title - The title of the page.
 * @param {string} body - The HTML content of the page.
 * @returns {string} - The complete HTML document as a string.
 */
export function template(title, body) {
    return /* html */ `<!DOCTYPE html>
  <html lang="is">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="styles.css">
    <script type="module" src="main.js"></script>
  </head>
  <body>
    ${body}
  </body>
  </html>`;
  }
  
  /**
   * Generates the index page HTML given an array of category objects.
   * Each category object should have at least 'title' and 'file' properties.
   * @param {Array<{ title: string, file: string }>} categories
   * @returns {string} - The complete HTML for the index page.
   */
  export function indexTemplate(categories) {
    const body = /* html */ `
    <div class="container">
      <h1>Spurningaflokkar</h1>
      <p>Velkomin á spurningavef</p>
      <ul>
        ${categories
          .map((category) => {
            return `<li>
              <a href="${category.file.replace('.json', '.html')}">${category.title}</a>
            </li>`;
          })
          .join('')}
      </ul>
    </div>`;
    return template('Spurningaflokkar', body);
  }
  
  /**
   * Escapes special HTML characters in a string.
   * @param {string} str
   * @returns {string}
   */
  export function replaceHtmlEntities(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  
  /**
   * Converts a plain string to HTML by escaping entities and replacing newlines.
   * @param {string} str
   * @returns {string}
   */
  export function stringToHtml(str) {
    return replaceHtmlEntities(str)
      .split('\n\n')
      .map((line) => `<p>${line}</p>`)
      .join('')
      .replace(/\n/g, '<br>')
      .replace(/ {2}/g, '&nbsp;&nbsp;');
  }
  
  /**
   * Generates the HTML for a category page (questions category) given a category object.
   * The category object should have a 'title' and a 'questions' array.
   * Each question in the array should have a 'question' property and an 'answers' array.
   * Each answer should have an 'answer' property and a 'correct' boolean.
   *
   * @param {{ title: string, questions: Array<{ question: string, answers: Array<{ answer: string, correct: boolean }> }> }} category
   * @returns {string} - The complete HTML for the category page.
   */
  export function questionsCategoryTemplate(category) {
    const questionsHtml = category.questions
      .map((q, questionIndex) => {
        const safeQuestionText = stringToHtml(q.question);
        const answersHtml = q.answers
          .map((a, answerIndex) => {
            const safeAnswer = stringToHtml(a.answer);
            return `<li>
              <button 
                type="button"
                class="answer-button"
                data-question="${questionIndex}"
                data-answer="${answerIndex}"
                data-correct="${a.correct ? 'true' : 'false'}">
                ${safeAnswer}
              </button>
            </li>`;
          })
          .join('\n');
        return `<section class="question">
          <h2>Spurning ${questionIndex + 1}</h2>
          <p>${safeQuestionText}</p>
          <ul>
            ${answersHtml}
          </ul>
        </section>`;
      })
      .join('\n');
  
    const body = /* html */ `
    <div class="container">
      <h1>${category.title}</h1>
      ${questionsHtml}
    </div>`;
    return template(category.title, body);
  }
  