document.addEventListener('DOMContentLoaded', () => {
  const questions = [
    { question: 'You receive an unexpected message asking you to sign in through a link. What is the safest first step?', options: ['Click quickly before the link expires', 'Open the service using its official app or a saved address', 'Reply with your password to confirm your identity'], answer: 1, explanation: 'Use a trusted route you already know instead of an unexpected link.' },
    { question: 'Which password habit is safest?', options: ['Reuse one memorable password everywhere', 'Use a unique, long password for each account', 'Add “123” to the end of an old password'], answer: 1, explanation: 'Unique passwords help prevent one exposed account from putting other accounts at risk.' },
    { question: 'What should you do with a one-time verification code?', options: ['Share it with anyone who says they are support', 'Post it in a group chat for safekeeping', 'Keep it private and enter it only in the service you intended to use'], answer: 2, explanation: 'Verification codes are private. A real support agent should not ask you to read one out.' },
    { question: 'A public Wi-Fi network has a name similar to the café’s network. What is a safer choice?', options: ['Ask staff to confirm the correct network and avoid sensitive activity if unsure', 'Connect to both networks to compare them', 'Assume the strongest signal is the official one'], answer: 0, explanation: 'Confirm network details with staff; a familiar-looking name alone is not proof.' },
    { question: 'A website address looks slightly misspelled. What should you do?', options: ['Continue if the page looks professional', 'Avoid entering information and navigate to the known official address', 'Enter a fake password to test it'], answer: 1, explanation: 'A polished page can still be deceptive. Use a known official address instead.' }
  ];

  const form = document.querySelector('#quiz-form');
  const options = document.querySelector('#quiz-options');
  const legend = document.querySelector('#quiz-question');
  const counter = document.querySelector('#quiz-counter');
  const progress = document.querySelector('.quiz-progress');
  const progressFill = document.querySelector('#quiz-progress-fill');
  const feedback = document.querySelector('#quiz-feedback');
  const action = document.querySelector('#quiz-action');
  const result = document.querySelector('#quiz-result');
  const scoreOutput = document.querySelector('#quiz-score');
  const summary = document.querySelector('#quiz-summary');
  const restart = document.querySelector('#quiz-restart');
  if (!form || !options || !legend || !counter || !progress || !progressFill || !feedback || !action || !result || !restart) return;

  let current = 0;
  let score = 0;
  let answered = false;

  function renderQuestion() {
    const item = questions[current];
    counter.textContent = `Question ${current + 1} of ${questions.length}`;
    progress.setAttribute('aria-valuenow', String(current));
    progressFill.style.width = `${(current / questions.length) * 100}%`;
    legend.textContent = item.question;
    feedback.textContent = '';
    action.disabled = false;
    action.firstChild.textContent = 'Check answer ';
    options.querySelectorAll('.quiz-choice').forEach((choice) => choice.remove());
    item.options.forEach((option, index) => {
      const label = document.createElement('label');
      label.className = 'quiz-choice';
      const radio = document.createElement('input');
      radio.type = 'radio'; radio.name = 'answer'; radio.value = String(index); radio.required = true;
      const text = document.createElement('span'); text.textContent = option;
      label.append(radio, text); options.append(label);
    });
  }

  function finishQuiz() {
    form.hidden = true;
    counter.hidden = true;
    progress.setAttribute('aria-valuenow', String(questions.length));
    progressFill.style.width = '100%';
    result.hidden = false;
    scoreOutput.textContent = `You scored ${score} out of ${questions.length}`;
    summary.textContent = score === questions.length
      ? 'Excellent work. You spotted the safer choice in every scenario.'
      : 'Every question is a chance to practise. Review the explanations and try again when you’re ready.';
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (answered) {
      current += 1;
      if (current >= questions.length) { finishQuiz(); return; }
      answered = false;
      renderQuestion();
      return;
    }
    const selected = form.querySelector('input[name="answer"]:checked');
    if (!selected) { feedback.textContent = 'Choose an answer to continue.'; return; }
    const isCorrect = Number(selected.value) === questions[current].answer;
    if (isCorrect) score += 1;
    feedback.textContent = `${isCorrect ? 'That’s right.' : 'Not quite.'} ${questions[current].explanation}`;
    options.querySelectorAll('input').forEach((radio) => { radio.disabled = true; });
    answered = true;
    action.firstChild.textContent = current === questions.length - 1 ? 'See my score ' : 'Next question ';
  });

  restart.addEventListener('click', () => {
    current = 0; score = 0; answered = false;
    result.hidden = true; form.hidden = false; counter.hidden = false;
    renderQuestion();
  });

  renderQuestion();
});
