document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('#sample-password');
  const toggle = document.querySelector('#toggle-visibility');
  const clear = document.querySelector('#clear-sample');
  const label = document.querySelector('#strength-label');
  const scoreText = document.querySelector('#strength-score');
  const meter = document.querySelector('#strength-meter');
  const fill = document.querySelector('#strength-fill');
  const feedback = document.querySelector('#strength-feedback');
  const tips = document.querySelector('#checker-tips');

  if (!input || !toggle || !clear || !label || !scoreText || !meter || !fill || !feedback || !tips) return;

  const levels = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong'];

  function updateChecker() {
    const sample = input.value;
    const checks = {
      length: sample.length >= 12,
      variety: /[a-z]/.test(sample) && /[A-Z]/.test(sample),
      number: /\d/.test(sample),
      symbol: /[^A-Za-z0-9]/.test(sample),
      unique: !/(.)\1{2,}/.test(sample) && !/password|qwerty|letmein|admin/i.test(sample)
    };
    const score = sample.length ? Object.values(checks).filter(Boolean).length : 0;
    const level = sample.length === 0 ? 'waiting for a sample' : levels[score];

    label.textContent = sample.length ? `Strength estimate: ${level}` : 'Strength: waiting for a sample';
    scoreText.textContent = `${score} / 5`;
    meter.setAttribute('aria-valuenow', String(score));
    meter.setAttribute('aria-valuetext', sample.length ? `${level}, ${score} of 5 checks` : 'No sample entered');
    fill.style.width = `${sample.length ? score * 20 : 0}%`;

    const missed = Object.entries(checks).filter(([, passed]) => !passed).map(([name]) => name);
    tips.querySelectorAll('[data-tip]').forEach((tip) => {
      tip.classList.toggle('tip-passed', checks[tip.dataset.tip]);
    });

    if (!sample.length) {
      feedback.textContent = 'Start typing a fictional sample to get suggestions.';
    } else if (score === 5) {
      feedback.textContent = 'Nice work: this sample meets all five simple checks. Keep using unique passwords for different accounts.';
    } else {
      const suggestions = missed.map((name) => ({
        length: 'make it longer',
        variety: 'mix uppercase and lowercase letters',
        number: 'add a number',
        symbol: 'consider a symbol',
        unique: 'avoid common words and repeated characters'
      }[name]));
      feedback.textContent = `Try to ${suggestions.join(', ')}.`;
    }
  }

  input.addEventListener('input', updateChecker);
  toggle.addEventListener('click', () => {
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    toggle.textContent = show ? 'Hide' : 'Show';
    toggle.setAttribute('aria-pressed', String(show));
    input.focus();
  });
  clear.addEventListener('click', () => {
    input.value = '';
    updateChecker();
    input.focus();
  });

  updateChecker();
});
