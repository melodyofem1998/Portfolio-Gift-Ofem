document.addEventListener('DOMContentLoaded', () => {
  const checks = [...document.querySelectorAll('.response-steps input[type="checkbox"]')];
  const count = document.querySelector('#incident-count');
  const progress = document.querySelector('.incident-progress');
  const fill = document.querySelector('#incident-progress-fill');
  const status = document.querySelector('#incident-status');
  const reset = document.querySelector('#incident-reset');
  if (!checks.length || !count || !progress || !fill || !status || !reset) return;

  function updateProgress() {
    const completed = checks.filter((checkbox) => checkbox.checked).length;
    count.textContent = `${completed} / ${checks.length}`;
    progress.setAttribute('aria-valuenow', String(completed));
    progress.setAttribute('aria-valuetext', `${completed} of ${checks.length} steps complete`);
    fill.style.width = `${(completed / checks.length) * 100}%`;
    status.textContent = completed === checks.length
      ? 'You’ve reviewed every step. Keep monitoring the account and follow the service’s official guidance.'
      : completed === 0
        ? 'Check off the steps you’ve completed. Your progress is only kept while this page is open.'
        : `${completed} of ${checks.length} steps marked complete. Your progress is only kept while this page is open.`;
  }

  checks.forEach((checkbox) => checkbox.addEventListener('change', updateProgress));
  reset.addEventListener('click', () => {
    checks.forEach((checkbox) => { checkbox.checked = false; });
    updateProgress();
  });
  updateProgress();
});
