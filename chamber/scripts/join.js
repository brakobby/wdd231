

document.getElementById('timestamp').value = new Date().toISOString();

const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('primary-nav');
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !expanded);
});

document.querySelectorAll('.level-card').forEach(card => {
    card.addEventListener('click', () => {
        const modalId = card.getAttribute('data-modal');
        document.getElementById(modalId).classList.add('show');
    });
});

document.querySelectorAll('.close').forEach(close => {
    close.addEventListener('click', () => {
        close.parentElement.parentElement.classList.remove('show');
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
    }
});