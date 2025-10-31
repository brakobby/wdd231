document.querySelector('.menu-toggle').addEventListener('click', () => {
  const nav = document.querySelector('.nav');
  const btn = document.querySelector('.menu-toggle');
  const expanded = btn.getAttribute('aria-expanded') === 'true';

  nav.classList.toggle('active');
  btn.setAttribute('aria-expanded', !expanded);
});