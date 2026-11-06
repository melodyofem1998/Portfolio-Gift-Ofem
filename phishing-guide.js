document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('#reveal-clues');
  const panel = document.querySelector('#clue-panel');
  if (!button || !panel) return;

  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
    button.firstChild.textContent = expanded ? 'Reveal the clues ' : 'Hide the clues ';
  });
});
