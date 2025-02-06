
document.addEventListener('DOMContentLoaded', () => {
  // Find all answer buttons on the page.
  const answerButtons = document.querySelectorAll('button.answer-button');

  answerButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.disabled) return;

      const isCorrect = button.dataset.correct === 'true';
      const questionIdx = button.dataset.question;

      if (isCorrect) {
        button.classList.add('correct');
      } else {
        button.classList.add('incorrect');
      }

      const sameQuestionButtons = document.querySelectorAll(
        `button.answer-button[data-question="${questionIdx}"]`
      );
      sameQuestionButtons.forEach((btn) => {
        btn.disabled = true;
        if (btn.dataset.correct === 'true') {
          btn.classList.add('correct');
        }
      });
    });
  });
});
