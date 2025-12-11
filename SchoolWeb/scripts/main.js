// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Set active navigation link
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
    
    // Program data for home page
    if (document.querySelector('.programs-preview')) {
        loadProgramsPreview();
    }
    
    // Form handling for contact page
    if (document.getElementById('contactForm')) {
        setupContactForm();
    }
    
    // Update copyright year
    updateCopyrightYear();
});

const programsData = [
            {
                id: 'early-childhood',
                title: 'Early Childhood',
                description: 'A nurturing environment for our youngest learners with age-appropriate activities and experienced caregivers.',
                icon: 'fas fa-baby',
                link: 'programs.html#early-childhood',
                features: [
                    'Creche (6 months - 2 years)',
                    'Nursery (2-4 years)',
                    'Play-based learning',
                    'Early stimulation'
                ],
                modalContent: `
                    <div class="program-details">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                            <div>
                                <h4><i class="fas fa-baby"></i> Creche Program</h4>
                                <p><strong>Ages:</strong> 6 months - 2 years</p>
                                <p><strong>Hours:</strong> 7:30 AM - 4:00 PM</p>
                                <ul>
                                    <li>Safe, child-friendly environment</li>
                                    <li>Nutritional meals provided</li>
                                    <li>Regular health check-ups</li>
                                    <li>Experienced caregivers</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4><i class="fas fa-child"></i> Nursery Program</h4>
                                <p><strong>Ages:</strong> 2-4 years</p>
                                <p><strong>Hours:</strong> 7:30 AM - 4:00 PM</p>
                                <ul>
                                    <li>Play-based curriculum</li>
                                    <li>Basic literacy & numeracy</li>
                                    <li>Social skills development</li>
                                    <li>Creative arts & music</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 10px;">
                            <h4><i class="fas fa-graduation-cap"></i> Learning Objectives</h4>
                            <p>Our early childhood program focuses on developing:</p>
                            <ul style="columns: 2;">
                                <li>Language and communication skills</li>
                                <li>Fine and gross motor skills</li>
                                <li>Social and emotional development</li>
                                <li>Creative expression</li>
                                <li>Basic cognitive skills</li>
                                <li>Independence and self-care</li>
                            </ul>
                        </div>
                        
                        <div style="text-align: center; margin-top: 30px;">
                            <a href="contact.html?program=early-childhood" class="btn" style="margin-right: 10px;">
                                <i class="fas fa-calendar"></i> Schedule Visit
                            </a>
                            <a href="programs.html#early-childhood" class="btn btn-secondary">
                                <i class="fas fa-book"></i> Full Details
                            </a>
                        </div>
                    </div>
                `
            },
            {
                id: 'basic-school',
                title: 'Basic School',
                description: 'Building strong academic foundations with a balanced curriculum and extracurricular activities.',
                icon: 'fas fa-child',
                link: 'programs.html#basic-school',
                features: [
                    'Primary School (B1-B6)',
                    'Junior High School',
                    'ICT integration',
                    'French language classes'
                ],
                modalContent: `
                    <div class="program-details">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                            <div>
                                <h4><i class="fas fa-school"></i> Primary School (B1-B6)</h4>
                                <p><strong>Curriculum:</strong> Ghana Education Service</p>
                                <ul>
                                    <li>English Language & Mathematics</li>
                                    <li>Science & Environmental Studies</li>
                                    <li>Social Studies & Ghanaian Language</li>
                                    <li>ICT from Primary 4</li>
                                    <li>French Language classes</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4><i class="fas fa-graduation-cap"></i> Junior High School</h4>
                                <p><strong>Preparation:</strong> Basic Education Certificate Examination</p>
                                <ul>
                                    <li>Intensive BECE preparation</li>
                                    <li>Science & Computer labs</li>
                                    <li>Career guidance</li>
                                    <li>Leadership training</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 10px;">
                            <h4><i class="fas fa-trophy"></i> Extracurricular Activities</h4>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 15px;">
                                <div style="text-align: center;">
                                    <i class="fas fa-futbol" style="color: var(--primary-color);"></i>
                                    <p>Sports & Games</p>
                                </div>
                                <div style="text-align: center;">
                                    <i class="fas fa-music" style="color: var(--primary-color);"></i>
                                    <p>Music & Dance</p>
                                </div>
                                <div style="text-align: center;">
                                    <i class="fas fa-paint-brush" style="color: var(--primary-color);"></i>
                                    <p>Arts & Crafts</p>
                                </div>
                                <div style="text-align: center;">
                                    <i class="fas fa-code" style="color: var(--primary-color);"></i>
                                    <p>Coding Club</p>
                                </div>
                            </div>
                        </div>
                        
                        <div style="text-align: center; margin-top: 30px;">
                            <a href="contact.html?program=basic-school" class="btn" style="margin-right: 10px;">
                                <i class="fas fa-calendar"></i> Schedule Visit
                            </a>
                            <a href="programs.html#basic-school" class="btn btn-secondary">
                                <i class="fas fa-book"></i> Full Details
                            </a>
                        </div>
                    </div>
                `
            },
            {
                id: 'senior-high',
                title: 'Senior High School',
                description: 'Specialized programs preparing students for university and professional careers.',
                icon: 'fas fa-user-graduate',
                link: 'programs.html#senior-high',
                features: [
                    'General Science',
                    'Business',
                    'General Arts',
                    'WASSCE preparation'
                ],
                modalContent: `
                    <div class="program-details">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                            <div style="padding: 20px; background: #e8f4fc; border-radius: 10px;">
                                <h4><i class="fas fa-flask"></i> General Science</h4>
                                <p><strong>Core Subjects:</strong></p>
                                <ul>
                                    <li>Physics</li>
                                    <li>Chemistry</li>
                                    <li>Biology</li>
                                    <li>Elective Mathematics</li>
                                </ul>
                            </div>
                            
                            <div style="padding: 20px; background: #e8fce8; border-radius: 10px;">
                                <h4><i class="fas fa-chart-line"></i> Business</h4>
                                <p><strong>Core Subjects:</strong></p>
                                <ul>
                                    <li>Accounting</li>
                                    <li>Business Management</li>
                                    <li>Economics</li>
                                    <li>Costing</li>
                                </ul>
                            </div>
                            
                            <div style="padding: 20px; background: #fce8e8; border-radius: 10px;">
                                <h4><i class="fas fa-paint-brush"></i> General Arts</h4>
                                <p><strong>Core Subjects:</strong></p>
                                <ul>
                                    <li>Literature</li>
                                    <li>Government</li>
                                    <li>Religious Studies</li>
                                    <li>Geography</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 10px;">
                            <h4><i class="fas fa-university"></i> University Preparation</h4>
                            <p>Our SHS program includes:</p>
                            <ul style="columns: 2;">
                                <li>Career counseling</li>
                                <li>University application guidance</li>
                                <li>Scholarship information</li>
                                <li>Entrance exam preparation</li>
                                <li>Study skills workshops</li>
                                <li>Mock WASSCE examinations</li>
                            </ul>
                        </div>
                        
                        <div style="text-align: center; margin-top: 30px;">
                            <a href="contact.html?program=senior-high" class="btn" style="margin-right: 10px;">
                                <i class="fas fa-calendar"></i> Schedule Visit
                            </a>
                            <a href="programs.html#senior-high" class="btn btn-secondary">
                                <i class="fas fa-book"></i> Full Details
                            </a>
                        </div>
                    </div>
                `
            }
        ];

        document.addEventListener('DOMContentLoaded', function() {
            // Mobile menu functionality
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const navLinks = document.querySelector('.nav-links');
            
            if (mobileMenuBtn) {
                mobileMenuBtn.addEventListener('click', function() {
                    navLinks.classList.toggle('active');
                    this.innerHTML = navLinks.classList.contains('active') 
                        ? '<i class="fas fa-times"></i>' 
                        : '<i class="fas fa-bars"></i>';
                });
            }
            
            // Load programs
            loadPrograms();
            
            // Modal functionality
            const videoModal = document.getElementById('videoModal');
            const programModal = document.getElementById('programModal');
            const downloadModal = document.getElementById('downloadModal');
            const watchVideoBtn = document.getElementById('watchVideoBtn');
            const downloadProspectusBtn = document.getElementById('downloadProspectusBtn');
            const closeButtons = document.querySelectorAll('.close-modal');
            
            // Open video modal
            watchVideoBtn.addEventListener('click', () => {
                videoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            // Open download modal
            downloadProspectusBtn.addEventListener('click', () => {
                downloadModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            // Close modals
            closeButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    videoModal.classList.remove('active');
                    programModal.classList.remove('active');
                    downloadModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            });
            
            // Close modal when clicking outside
            [videoModal, programModal, downloadModal].forEach(modal => {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                });
            });
            
            // Animated counter for stats
            animateStats();
            
            // Update copyright year
            document.getElementById('currentYear').textContent = new Date().getFullYear();
        });

        // Load programs function
        function loadPrograms() {
            const programsContainer = document.getElementById('programsContainer');
            
            if (!programsContainer) return;
            
            let html = '';
            
            programsData.forEach(program => {
                const featuresList = program.features.map(feature => 
                    `<li><i class="fas fa-check"></i> ${feature}</li>`
                ).join('');
                
                html += `
                    <div class="program-card">
                        <div class="program-icon-container">
                            <i class="${program.icon} program-icon"></i>
                            <h3 style="color: white; margin: 0; font-size: 1.8rem;">${program.title}</h3>
                        </div>
                        <div class="program-content">
                            <p>${program.description}</p>
                            <ul class="program-features">
                                ${featuresList}
                            </ul>
                            <div class="program-cta">
                                <a href="${program.link}" class="btn">Learn More</a>
                                <button class="btn btn-secondary view-details-btn" data-program-id="${program.id}">
                                    Quick View
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            programsContainer.innerHTML = html;
            
            // Add event listeners to quick view buttons
            document.querySelectorAll('.view-details-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const programId = this.dataset.programId;
                    const program = programsData.find(p => p.id === programId);
                    
                    if (program) {
                        document.getElementById('modalProgramTitle').textContent = program.title + ' Program';
                        document.getElementById('modalProgramContent').innerHTML = program.modalContent;
                        
                        const programModal = document.getElementById('programModal');
                        programModal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                });
            });
        }

        // Animated stats counter
        function animateStats() {
            const statNumbers = document.querySelectorAll('.stat-number');
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current);
                }, 16);
            });
        }

        // Download file function
        function downloadFile() {
            alert('Downloading school prospectus... In a production environment, this would download a PDF file.');
            
            document.getElementById('downloadModal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

// Setup contact form
function setupContactForm() {
    const form = document.getElementById('contactForm');
    const urlParams = new URLSearchParams(window.location.search);
    const program = urlParams.get('program');
    
    // Pre-select program if coming from programs page
    if (program && document.getElementById('program')) {
        document.getElementById('program').value = program;
    }
    
    // Form validation
    form.addEventListener('submit', function(e) {
        const phone = document.getElementById('phone').value;
        const phonePattern = /^\+?[\d\s-]{10,}$/;
        
        if (!phonePattern.test(phone)) {
            e.preventDefault();
            alert('Please enter a valid phone number');
            document.getElementById('phone').focus();
            return false;
        }
        
        // Store form data in localStorage for thank you page
        const formData = {
            fullname: document.getElementById('fullname').value,
            email: document.getElementById('email').value,
            phone: phone,
            program: document.getElementById('program').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('lastFormSubmission', JSON.stringify(formData));
        
        // You would typically send this to a server here
        // For demo purposes, we'll just proceed to thank you page
        return true;
    });
}

// Update copyright year
function updateCopyrightYear() {
    const copyrightElements = document.querySelectorAll('.copyright p');
    const currentYear = new Date().getFullYear();
    
    copyrightElements.forEach(element => {
        element.innerHTML = element.innerHTML.replace('2024', currentYear);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Program tabs navigation
            const programTabs = document.querySelectorAll('.program-tab');
            const programCategories = document.querySelectorAll('.program-category');
            const facilitiesSection = document.getElementById('facilities');
            const faqSection = document.getElementById('faq');
            
            programTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const target = this.dataset.target;
                    
                    // Update active tab
                    programTabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Scroll to target section
                    if (target === 'facilities') {
                        facilitiesSection.scrollIntoView({ behavior: 'smooth' });
                    } else if (target === 'faq') {
                        faqSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        const targetSection = document.getElementById(target);
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
            
            // FAQ Accordion
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                question.addEventListener('click', () => {
                    // Close other items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current item
                    item.classList.toggle('active');
                });
            });
            
            // Curriculum Modal
            const curriculumModal = document.getElementById('curriculumModal');
            const viewCurriculumBtns = document.querySelectorAll('.view-curriculum');
            const closeModalBtn = document.querySelector('.close-modal');
            
            // Curriculum data
            const curriculumData = {
                'creche': {
                    title: 'Creche Program Curriculum',
                    content: `
                        <div class="curriculum-content">
                            <h4>Developmental Focus Areas</h4>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0;">
                                <div style="background: #e8f4fc; padding: 15px; border-radius: 10px;">
                                    <h5><i class="fas fa-brain"></i> Cognitive Development</h5>
                                    <ul>
                                        <li>Sensory exploration</li>
                                        <li>Object permanence</li>
                                        <li>Cause and effect</li>
                                        <li>Early problem-solving</li>
                                    </ul>
                                </div>
                                <div style="background: #e8fce8; padding: 15px; border-radius: 10px;">
                                    <h5><i class="fas fa-language"></i> Language Skills</h5>
                                    <ul>
                                        <li>Babbling and vocal play</li>
                                        <li>First words and sounds</li>
                                        <li>Non-verbal communication</li>
                                        <li>Listening skills</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <h4>Daily Schedule</h4>
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 15px 0;">
                                <p><strong>7:30 AM - 8:30 AM:</strong> Arrival & Free Play</p>
                                <p><strong>8:30 AM - 9:00 AM:</strong> Morning Circle & Songs</p>
                                <p><strong>9:00 AM - 10:00 AM:</strong> Sensory Activities</p>
                                <p><strong>10:00 AM - 10:30 AM:</strong> Snack Time</p>
                                <p><strong>10:30 AM - 11:30 AM:</strong> Outdoor Play</p>
                                <p><strong>11:30 AM - 12:30 PM:</strong> Nap Time</p>
                                <p><strong>12:30 PM - 1:30 PM:</strong> Lunch</p>
                                <p><strong>1:30 PM - 3:30 PM:</strong> Developmental Activities</p>
                                <p><strong>3:30 PM - 4:00 PM:</strong> Free Play & Departure</p>
                            </div>
                        </div>
                    `
                },
                'nursery': {
                    title: 'Nursery Program Curriculum',
                    content: `
                        <div class="curriculum-content">
                            <h4>Core Learning Areas</h4>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
                                <div style="text-align: center; padding: 15px; background: #f0f8ff; border-radius: 10px;">
                                    <i class="fas fa-book" style="color: var(--primary-color); font-size: 1.5rem; margin-bottom: 10px;"></i>
                                    <h5>Literacy</h5>
                                    <p>Phonics, Pre-writing, Storytelling</p>
                                </div>
                                <div style="text-align: center; padding: 15px; background: #fff0f5; border-radius: 10px;">
                                    <i class="fas fa-calculator" style="color: var(--primary-color); font-size: 1.5rem; margin-bottom: 10px;"></i>
                                    <h5>Numeracy</h5>
                                    <p>Counting, Shapes, Patterns</p>
                                </div>
                                <div style="text-align: center; padding: 15px; background: #f0fff0; border-radius: 10px;">
                                    <i class="fas fa-globe" style="color: var(--primary-color); font-size: 1.5rem; margin-bottom: 10px;"></i>
                                    <h5>World Awareness</h5>
                                    <p>Our Community, Nature, Culture</p>
                                </div>
                            </div>
                            
                            <h4>Assessment Methods</h4>
                            <ul style="columns: 2; margin: 15px 0;">
                                <li>Observational assessment</li>
                                <li>Portfolio collection</li>
                                <li>Developmental checklists</li>
                                <li>Parent-teacher conferences</li>
                                <li>Progress reports</li>
                                <li>Work samples</li>
                            </ul>
                        </div>
                    `
                }
                // Add more curriculum data for other programs
            };
            
            // Open curriculum modal
            viewCurriculumBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const program = this.dataset.program;
                    const curriculum = curriculumData[program];
                    
                    if (curriculum) {
                        document.getElementById('modalTitle').textContent = curriculum.title;
                        document.getElementById('modalBody').innerHTML = curriculum.content;
                        curriculumModal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                });
            });
            
            // Close modal
            closeModalBtn.addEventListener('click', () => {
                curriculumModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
            
            // Close modal when clicking outside
            curriculumModal.addEventListener('click', (e) => {
                if (e.target === curriculumModal) {
                    curriculumModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
            
            // Animate program cards on scroll
            function animateProgramCards() {
                const programCards = document.querySelectorAll('.program-card');
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0) rotateX(0)';
                        }
                    });
                }, { threshold: 0.1 });
                
                programCards.forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(50px) rotateX(10deg)';
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    observer.observe(card);
                });
            }
            
            // Update copyright year
            document.getElementById('currentYear').textContent = new Date().getFullYear();
            
            // Initialize animations
            animateProgramCards();
            
            // Add scroll spy for program tabs
            function updateActiveTabOnScroll() {
                const sections = [
                    { id: 'early-childhood', element: document.getElementById('early-childhood') },
                    { id: 'basic-school', element: document.getElementById('basic-school') },
                    { id: 'senior-high', element: document.getElementById('senior-high') },
                    { id: 'facilities', element: document.getElementById('facilities') },
                    { id: 'faq', element: document.getElementById('faq') }
                ];
                
                window.addEventListener('scroll', () => {
                    const scrollPosition = window.scrollY + 200;
                    
                    sections.forEach(section => {
                        if (section.element) {
                            const sectionTop = section.element.offsetTop;
                            const sectionBottom = sectionTop + section.element.offsetHeight;
                            
                            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                                programTabs.forEach(tab => tab.classList.remove('active'));
                                const activeTab = document.querySelector(`.program-tab[data-target="${section.id}"]`);
                                if (activeTab) activeTab.classList.add('active');
                            }
                        }
                    });
                });
            }
            
            updateActiveTabOnScroll();
  