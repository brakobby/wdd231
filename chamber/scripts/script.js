// ==============================
// ACCRA CHAMBER – HOMEPAGE SCRIPT
// Works perfectly with your current setup
// ==============================

document.addEventListener('DOMContentLoaded', () => {
    // ============ FOOTER DATES ============
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;

    // ============ MOBILE MENU TOGGLE ============
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('primary-nav');
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !expanded);
    });

    // ============ WEATHER ============
    const API_KEY = '15174f9f7e834f594b46c7a3ca1765e9'; // ← Your key (safe to keep public)
    const CITY = 'Accra,GH';

    async function loadWeather() {
        try {
            const currentRes = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
            );
            const current = await currentRes.json();

            const forecastRes = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric`
            );
            const forecast = await forecastRes.json();

            // Current Weather
            document.getElementById('current-temp').textContent = `${Math.round(current.main.temp)}°C`;
            document.getElementById('current-desc').textContent = 
                current.weather[0].description.charAt(0).toUpperCase() + 
                current.weather[0].description.slice(1);
            document.getElementById('current-icon').src = 
                `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
            document.getElementById('current-icon').alt = current.weather[0].description;

            // 3-Day Forecast
            const daily = forecast.list
                .filter(item => item.dt_txt.includes('12:00:00'))
                .slice(0, 3);

            const forecastHTML = daily.map(day => {
                const date = new Date(day.dt * 1000).toLocaleDateString('en-GB', {
                    weekday: 'short',
                    day: 'numeric'
                });
                return `
                    <div class="forecast-day">
                        <strong>${date}</strong>
                        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" 
                             alt="${day.weather[0].description}">
                        <p>${Math.round(day.main.temp)}°C</p>
                    </div>
                `;
            }).join('');

            document.getElementById('forecast-box').innerHTML = forecastHTML;

        } catch (error) {
            console.error('Weather failed:', error);
            document.getElementById('weather-box').innerHTML = 
                '<p>Weather service unavailable</p>';
        }
    }

    // ============ SPOTLIGHTS – Gold & Silver Members Only ============
    async function loadSpotlights() {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) throw new Error('Members file not found');

            const members = await response.json();

            // Only Gold (3) and Silver (2) members
            const eligible = members.filter(m => 
                m.membershipLevel === 2 || m.membershipLevel === 3
            );

            if (eligible.length === 0) {
                document.getElementById('spotlights').innerHTML = 
                    '<p>No spotlight members available.</p>';
                return;
            }

            // Shuffle and pick 2–3 random members
            const shuffled = eligible.sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, Math.min(3, shuffled.length));

            const container = document.querySelector('#spotlights .spotlight-grid');
            container.innerHTML = selected.map(member => {
                const levelClass = member.membershipLevel === 3 ? 'gold' : 'silver';
                const levelText = member.membershipLevel === 3 ? 'Gold' : 'Silver';

                const imagePath = member.imageFileName.startsWith('images/')
                    ? member.imageFileName
                    : `images/${member.imageFileName}`;

                const website = member.websiteURL && member.websiteURL.startsWith('http')
                    ? `<a href="${member.websiteURL}" target="_blank" rel="noopener">Visit Website</a>`
                    : '<span style="color:#888;">Website not listed</span>';

                return `
                    <article class="spotlight-card">
                        <img src="${imagePath}" 
                             alt="${member.name}" 
                             loading="lazy"
                             onerror="this.src='images/placeholder.jpg'">
                        <h3>${member.name}</h3>
                        <span class="membership-badge ${levelClass}">${levelText} Member</span>
                        <p>${member.description}</p>
                        <p><strong>Phone:</strong> ${member.phone}</p>
                        ${website}
                    </article>
                `;
            }).join('');

        } catch (error) {
            console.error('Spotlights failed:', error);
            document.getElementById('spotlights').innerHTML = 
                '<p>Unable to load featured members.</p>';
        }
    }

    loadWeather();
    loadSpotlights();
});