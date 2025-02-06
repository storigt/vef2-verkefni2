// public/main.js

document.addEventListener('DOMContentLoaded', () => {
  // Find all answer buttons on the page.
  const answerButtons = document.querySelectorAll('button.answer-button');

  answerButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Prevent any further processing if the button is already disabled.
      if (button.disabled) return;

      // Check if the clicked answer is correct using the data-correct attribute.
      const isCorrect = button.dataset.correct === 'true';
      const questionIdx = button.dataset.question;

      // Mark the clicked button based on whether it's correct.
      if (isCorrect) {
        button.classList.add('correct');
      } else {
        button.classList.add('incorrect');
      }

      // Disable all answer buttons for this question and reveal the correct answer.
      const sameQuestionButtons = document.querySelectorAll(
        `button.answer-button[data-question="${questionIdx}"]`
      );
      sameQuestionButtons.forEach((btn) => {
        btn.disabled = true;
        // Add the "correct" styling to the button that is correct.
        if (btn.dataset.correct === 'true') {
          btn.classList.add('correct');
        }
      });
    });
  });
});
