document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open', !expanded);
    });
  }

  const taskForm = document.querySelector('#task-form');
  if (taskForm) {
    const input = document.querySelector('#task-input');
    const list = document.querySelector('#task-list');
    const count = document.querySelector('#remaining-count');
    const empty = document.querySelector('#empty-state');
    const message = document.querySelector('#planner-message');
    const storageKey = 'studentPortfolioTasks';
    let tasks = [];
    try { tasks = JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch { tasks = []; }

    function saveAndRender() {
      localStorage.setItem(storageKey, JSON.stringify(tasks));
      list.replaceChildren();
      tasks.forEach((task) => {
        const item = document.createElement('li');
        item.className = `task-row${task.done ? ' done' : ''}`;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox'; checkbox.checked = task.done;
        checkbox.setAttribute('aria-label', `Mark ${task.text} ${task.done ? 'not completed' : 'completed'}`);
        checkbox.addEventListener('change', () => { task.done = checkbox.checked; saveAndRender(); });
        const label = document.createElement('span'); label.textContent = task.text;
        const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'delete-task'; remove.textContent = 'Delete';
        remove.setAttribute('aria-label', `Delete ${task.text}`);
        remove.addEventListener('click', () => { tasks = tasks.filter((entry) => entry.id !== task.id); saveAndRender(); });
        item.append(checkbox, label, remove); list.append(item);
      });
      count.textContent = String(tasks.filter((task) => !task.done).length);
      empty.hidden = tasks.length > 0;
    }

    taskForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const text = input.value.trim();
      if (!text) { message.textContent = 'Please enter a task first.'; input.focus(); return; }
      tasks.push({ id: `${Date.now()}-${Math.random()}`, text, done: false });
      input.value = ''; message.textContent = 'Task added.'; saveAndRender(); input.focus();
    });
    saveAndRender();
  }

  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    const status = document.querySelector('#contact-status');
    const fields = ['name', 'email', 'phone', 'message'];
    const patterns = { email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, phone: /^\d+$/ };
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      let valid = true;
      fields.forEach((fieldName) => {
        const field = contactForm.elements[fieldName];
        const error = document.querySelector(`#${fieldName}-error`);
        let text = '';
        if (!field.value.trim()) text = 'Please fill in this field.';
        else if (fieldName === 'email' && !patterns.email.test(field.value.trim())) text = 'Enter a valid email address.';
        else if (fieldName === 'phone' && !patterns.phone.test(field.value.trim())) text = 'Use digits only for the phone number.';
        error.textContent = text;
        field.setAttribute('aria-invalid', String(Boolean(text)));
        if (text) valid = false;
      });
      if (!valid) {
        status.textContent = 'Please correct the highlighted fields and try again.';
        contactForm.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }
      status.textContent = 'All fields look good. This demo form does not send messages to a server.';
      contactForm.reset();
      fields.forEach((fieldName) => { document.querySelector(`#${fieldName}-error`).textContent = ''; contactForm.elements[fieldName].removeAttribute('aria-invalid'); });
    });
  }
});
