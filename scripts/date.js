document.getElementById('current-year').textContent = new Date().getFullYear();

const span = document.querySelector('#last-modified span');
const modified = new Date(document.lastModified);
span.textContent = modified.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});