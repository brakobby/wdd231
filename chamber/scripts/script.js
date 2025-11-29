// DOM Elements
const membersDisplay = document.getElementById('members-display');
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');
const menuToggle = document.getElementById('menu-toggle');
const primaryNav = document.getElementById('primary-nav');
const copyrightYear = document.getElementById('copyright-year');
const lastModified = document.getElementById('last-modified');

// Current year and last modified date
copyrightYear.textContent = new Date().getFullYear();
lastModified.textContent = document.lastModified;

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    primaryNav.classList.toggle('show');
    menuToggle.setAttribute('aria-expanded', primaryNav.classList.contains('show'));
});
// ====================== WEATHER (OpenWeatherMap) ======================
// =============== WEATHER (Accra) – YOUR API KEY ===============
const API_KEY = '2047c77f83e1c65fa6702ab89eee0b93';  // ← Your key is already here
const CITY = 'Accra,GH';

async function loadWeather() {
    try {
        // Current weather
        const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`);
        const current = await currentRes.json();

        // 5-day / 3-hour forecast
        const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric`);
        const forecast = await forecastRes.json();

        // Display current weather
        document.getElementById('weather-box').innerHTML = `
            <img src="https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png" alt="${current.weather[0].description}" loading="lazy">
            <p class="temp">${Math.round(current.main.temp)}°C</p>
            <p class="desc">${current.weather[0].description.charAt(0).toUpperCase() + current.weather[0].description.slice(1)}</p>
            <p>Humidity: ${current.main.humidity}% • Wind: ${current.wind.speed} m/s</p>
        `;

        // 3-day forecast (noon data only)
        const daily = forecast.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
        document.getElementById('forecast-box').innerHTML = `
            <h3>3-Day Forecast</h3>
            <div class="forecast-grid">
                ${daily.map(day => {
                    const date = new Date(day.dt * 1000).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' });
                    return `
                        <div class="forecast-day">
                            <strong>${date}</strong>
                            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
                            <p>${Math.round(day.main.temp)}°C</p>
                        </div>
                    `;
                }).join('')}
            </div>
        `;

    } catch (error) {
        console.error('Weather error:', error);
        document.getElementById('weather-box').innerHTML = '<p>Weather temporarily unavailable</p>';
    }
}

// =============== SPOTLIGHTS – Matches your exact members.json ===============
async function loadSpotlights() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();

        // Gold = 3, Silver = 2 → filter only these
        const eligible = members.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);

        // Random shuffle + pick 2 or 3
        const shuffled = eligible.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 2); // 2–3 members

        const container = document.querySelector('#spotlights .spotlight-grid');

        container.innerHTML = selected.map(member => {
            const levelText = member.membershipLevel === 3 ? 'Gold' : 'Silver';
            const levelClass = member.membershipLevel === 3 ? 'gold' : 'silver';

            const websiteLink = member.websiteURL && member.websiteURL.startsWith('http')
                ? `<p><a href="${member.websiteURL}" target="_blank" rel="noopener">Visit Website</a></p>`
                : '';

            return `
                <article class="spotlight-card">
                    <img src="images/${member.imageFileName}" alt="${member.name} logo" loading="lazy">
                    <h3>${member.name}</h3>
                    <span class="membership-level ${levelClass}">${levelText} Member</span>
                    <p>${member.description}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Address:</strong> ${member.address}</p>
                    ${websiteLink}
                </article>
            `;
        }).join('');

    } catch (err) {
        console.error('Spotlights error:', err);
        document.getElementById('spotlights').innerHTML += '<p>Unable to load spotlights.</p>';
    }
}

// =============== RUN ON PAGE LOAD ===============
document.addEventListener('DOMContentLoaded', () => {
    loadWeather();
    loadSpotlights();
});