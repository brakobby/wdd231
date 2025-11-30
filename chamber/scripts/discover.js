import places from '../data/accra-places.mjs';

const grid = document.getElementById('places-grid');
const messageEl = document.getElementById('message-text');
const visitMsg = document.getElementById('visit-message');
const closeBtn = document.getElementById('close-message');

function renderPlaces() {
    grid.innerHTML = places.map(place => `
        <article class="place-card ${place.area}">
            <figure>
                <img src="${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">
            </figure>
            <figcaption>
                <h2>${place.name}</h2>
                <address>${place.address}</address>
                <p>${place.description}</p>
                <button aria-label="Learn more about ${place.name}">Learn More</button>
            </figcaption>
        </article>
    `).join('');
}
renderPlaces();

// Last Visit Message
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (!lastVisit) {
    messageEl.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const daysAgo = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (daysAgo === 0) {
        messageEl.textContent = "Back so soon! Awesome!";
    } else {
        messageEl.textContent = `You last visited ${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago.`;
    }
}
localStorage.setItem('lastVisit', now);

// Close message
closeBtn.addEventListener('click', () => {
    visitMsg.style.display = 'none';
});