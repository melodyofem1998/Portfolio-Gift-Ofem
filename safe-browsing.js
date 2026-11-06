document.addEventListener('DOMContentLoaded', () => {
  const clueButton = document.querySelector('#address-clues-button');
  const clues = document.querySelector('#address-clues');
  if (clueButton && clues) {
    clueButton.addEventListener('click', () => {
      const expanded = clueButton.getAttribute('aria-expanded') === 'true';
      clueButton.setAttribute('aria-expanded', String(!expanded));
      clues.hidden = expanded;
      clueButton.firstChild.textContent = expanded ? 'Show what to inspect ' : 'Hide the explanation ';
    });
  }

  const checks = [...document.querySelectorAll('.browsing-items input[type="checkbox"]')];
  const count = document.querySelector('#browsing-count');
  const progress = document.querySelector('.browsing-progress');
  const fill = document.querySelector('#browsing-progress-fill');
  const status = document.querySelector('#browsing-status');
  const reset = document.querySelector('#browsing-reset');
  if (!checks.length || !count || !progress || !fill || !status || !reset) return;

  function updateProgress() {
    const complete = checks.filter((checkbox) => checkbox.checked).length;
    count.textContent = `${complete} / ${checks.length}`;
    progress.setAttribute('aria-valuenow', String(complete));
    progress.setAttribute('aria-valuetext', `${complete} of ${checks.length} checks marked`);
    fill.style.width = `${(complete / checks.length) * 100}%`;
    status.textContent = complete === checks.length
      ? 'All five habits considered. Keep checking carefully as you browse.'
      : complete === 0
        ? 'Mark any checks you’ve considered. Your choices stay only while this page is open.'
        : `${complete} of ${checks.length} checks marked. Your choices stay only while this page is open.`;
  }

  checks.forEach((checkbox) => checkbox.addEventListener('change', updateProgress));
  reset.addEventListener('click', () => {
    checks.forEach((checkbox) => { checkbox.checked = false; });
    updateProgress();
  });
  updateProgress();
});
