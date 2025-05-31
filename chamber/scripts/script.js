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

// Fetch member data
async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching member data:', error);
        membersDisplay.innerHTML = '<p class="error">Error loading member data. Please try again later.</p>';
        return [];
    }
}

// Display members
function displayMembers(members, viewType = 'grid') {
    membersDisplay.className = `${viewType}-view`;
    membersDisplay.innerHTML = '';

    if (members.length === 0) {
        membersDisplay.innerHTML = '<p>No members found.</p>';
        return;
    }

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = `member-card ${viewType}-view`;

        // Determine membership level class
        let levelClass = '';
        let levelText = '';
        if (member.membershipLevel === 3) {
            levelClass = 'level-3';
            levelText = 'Gold Member';
        } else if (member.membershipLevel === 2) {
            levelClass = 'level-2';
            levelText = 'Silver Member';
        } else {
            levelClass = 'level-1';
            levelText = 'Member';
        }

        memberCard.innerHTML = `
            ${viewType === 'grid' ? 
                `<img src="images/${member.imageFileName}" alt="${member.name}" class="member-image">` : 
                `<img src="images/${member.imageFileName}" alt="${member.name}" class="member-image">`
            }
            <div class="member-info">
                <h3 class="member-name">${member.name}</h3>
                <span class="member-level ${levelClass}">${levelText}</span>
                ${viewType === 'list' ? `<p class="member-address">${member.address}</p>` : ''}
                <div class="member-details">
                    <p class="member-address">${viewType === 'grid' ? '' : ''}${viewType === 'grid' ? member.address : ''}</p>
                    <p class="member-phone">${member.phone}</p>
                    <p class="member-website"><a href="${member.websiteURL}" target="_blank" rel="noopener">Website</a></p>
                </div>
            </div>
        `;

        membersDisplay.appendChild(memberCard);
    });
}

// View toggle event listeners
gridViewBtn.addEventListener('click', () => {
    gridViewBtn.classList.add('active');
    gridViewBtn.setAttribute('aria-pressed', 'true');
    listViewBtn.classList.remove('active');
    listViewBtn.setAttribute('aria-pressed', 'false');
    getMembers().then(members => displayMembers(members, 'grid'));
});

listViewBtn.addEventListener('click', () => {
    listViewBtn.classList.add('active');
    listViewBtn.setAttribute('aria-pressed', 'true');
    gridViewBtn.classList.remove('active');
    gridViewBtn.setAttribute('aria-pressed', 'false');
    getMembers().then(members => displayMembers(members, 'list'));
});

// Initialize the page with grid view
getMembers().then(members => displayMembers(members, 'grid'));