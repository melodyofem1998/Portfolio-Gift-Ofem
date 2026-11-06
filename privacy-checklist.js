document.addEventListener('DOMContentLoaded', () => {
  const checks = [...document.querySelectorAll('.privacy-item input[type="checkbox"]')];
  const count = document.querySelector('#privacy-count');
  const progress = document.querySelector('.privacy-progress');
  const fill = document.querySelector('#privacy-progress-fill');
  const status = document.querySelector('#privacy-status');
  const reset = document.querySelector('#privacy-reset');
  if (!checks.length || !count || !progress || !fill || !status || !reset) return;

  function updateProgress() {
    const completed = checks.filter((checkbox) => checkbox.checked).length;
    count.textContent = `${completed} / ${checks.length}`;
    progress.setAttribute('aria-valuenow', String(completed));
    progress.setAttribute('aria-valuetext', `${completed} of ${checks.length} items checked`);
    fill.style.width = `${(completed / checks.length) * 100}%`;
    status.textContent = completed === checks.length
      ? 'All items checked. You can revisit any setting whenever you like.'
      : completed === 0
        ? 'Nothing is checked yet. Choose any items you want to review.'
        : `${completed} of ${checks.length} items checked. Your progress stays only in this open page.`;
  }

  checks.forEach((checkbox) => checkbox.addEventListener('change', updateProgress));
  reset.addEventListener('click', () => {
    checks.forEach((checkbox) => { checkbox.checked = false; });
    updateProgress();
  });
  updateProgress();
});
