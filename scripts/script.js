document.querySelector('.menu-toggle').addEventListener('click', function () {
    const navLinks = document.querySelector('nav ul');
    navLinks.classList.toggle('show'); // Toggle the 'show' class
});

const current_year = new Date().getFullYear();
document.querySelector('#update-year').textContent = current_year;