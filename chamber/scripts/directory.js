// scripts/directory.js
const grid = document.getElementById('members-grid');
const gridBtn = document.getElementById('grid-view');
const listBtn = document.getElementById('list-view');
const countEl = document.querySelector('.member-count');

async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const members = await response.json();
        countEl.textContent = `${members.length} Members Found`;

        function displayMembers(view = 'grid') {
            grid.className = `members-container ${view}`;

            grid.innerHTML = members.map(member => {
                // Build correct image path
                const imagePath = member.imageFileName.startsWith('images/') 
                    ? member.imageFileName 
                    : `images/${member.imageFileName}`;

                // Membership badge
                let levelClass = '';
                let levelText = '';
                if (member.membershipLevel === 3) { levelClass = 'gold'; levelText = 'Gold'; }
                else if (member.membershipLevel === 2) { levelClass = 'silver'; levelText = 'Silver'; }
                else { levelClass = 'member'; levelText = 'Member'; }

                const websiteLink = member.websiteURL && member.websiteURL.startsWith('http') 
                    ? `<a href="${member.websiteURL}" target="_blank" rel="noopener">Visit Website</a>` 
                    : '<span style="color:#999;">Website not available</span>';

                return view === 'list' ? `
                    <article class="member-card">
                        <img src="${imagePath}" 
                             alt="${member.name} logo" 
                             loading="lazy"
                             onerror="this.src='images/placeholder.jpg'">
                        <div class="member-info">
                            <h3>${member.name}</h3>
                            <p><strong>Address:</strong> ${member.address}</p>
                            <p><strong>Phone:</strong> ${member.phone}</p>
                            <p><strong>Website:</strong> ${websiteLink}</p>
                            <p>${member.description}</p>
                            <span class="membership-badge ${levelClass}">${levelText} Member</span>
                        </div>
                    </article>
                ` : `
                    <article class="member-card">
                        <img src="${imagePath}" 
                             alt="${member.name} logo" 
                             loading="lazy"
                             onerror="this.src='images/placeholder.jpg'">
                        <div class="member-info">
                            <h3>${member.name}</h3>
                            <p>${member.address}</p>
                            <p>${member.phone}</p>
                            <p>${websiteLink}</p>
                            <p>${member.description}</p>
                            <span class="membership-badge ${levelClass}">${levelText} Member</span>
                        </div>
                    </article>
                `;
            }).join('');
        }

        // Initial render
        displayMembers('grid');

        // Toggle buttons
        gridBtn.onclick = () => {
            gridBtn.classList.add('active');
            listBtn.classList.remove('active');
            displayMembers('grid');
        };

        listBtn.onclick = () => {
            listBtn.classList.add('active');
            gridBtn.classList.remove('active');
            displayMembers('list');
        };

    } catch (error) {
        console.error("Failed to load members:", error);
        grid.innerHTML = `
            <p style="grid-column: 1/-1; text-align:center; color:red; padding:3rem;">
                Unable to load members. Check console (F12) for details.<br>
                Make sure <code>data/members.json</code> exists and images are in <code>images/</code> folder.
            </p>`;
        countEl.textContent = "Error loading data";
    }
}

// Run when page loads
loadMembers();

// Footer updates
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;