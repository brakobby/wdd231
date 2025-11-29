// scripts/discover.js
const grid = document.getElementById('places-grid');
const messageEl = document.getElementById('message-text');
const visitMsg = document.getElementById('visit-message');
const closeBtn = document.getElementById('close-message');

// Fetch and render places from JSON
async function loadPlaces() {
    try {
        const response = await fetch('data/accra-places.json');
        const places = await response.json();

        grid.innerHTML = places.map(place => `
            <article class="place-card ${place.area}">
                <figure>
                    <img src="${place.image}" 
                         alt="${place.name}" 
                         loading="lazy" 
                         width="300" 
                         height="200">
                </figure>
                <figcaption>
                    <h2>${place.name}</h2>
                    <address>${place.address}</address>
                    <p>${place.description}</p>
                    <button aria-label="Learn more about ${place.name}">Learn More</button>
                </figcaption>
            </article>
        `).join('');

    } catch (error) {
        grid.innerHTML = `<p style="text-align:center; color:red;">Failed to load places. Please try again later.</p>`;
        console.error("Error loading places:", error);
    }
}

loadPlaces();

// === Last Visit Message using localStorage ===
const lastVisit = localStorage.getItem('accraChamberLastVisit');
const now = Date.now();

if (!lastVisit) {
    messageEl.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const daysBetween = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
    
    if (daysBetween === 0) {
        messageEl.textContent = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
        messageEl.textContent = "You last visited 1 day ago.";
    } else {
        messageEl.textContent = `You last visited ${daysBetween} days ago.`;
    }
}

// Always update the last visit time
localStorage.setItem('accraChamberLastVisit', now);

// Close message button
closeBtn.addEventListener('click', () => {
    visitMsg.style.display = 'none';
});