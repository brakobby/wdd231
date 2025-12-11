// Form handling and validation
class FormHandler {
    constructor() {
        this.initializeForm();
    }
    
    initializeForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        // Load saved form data if any
        this.loadSavedData();
        
        // Setup real-time validation
        this.setupValidation();
        
        // Setup form submission
        form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    loadSavedData() {
        const savedData = localStorage.getItem('contactFormDraft');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                Object.keys(data).forEach(key => {
                    const element = document.getElementById(key);
                    if (element) element.value = data[key];
                });
            } catch (e) {
                console.error('Error loading saved data:', e);
            }
        }
    }
    
    setupValidation() {
        const phoneInput = document.getElementById('phone');
        const emailInput = document.getElementById('email');
        
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                this.validatePhone(e.target);
            });
        }
        
        if (emailInput) {
            emailInput.addEventListener('blur', (e) => {
                this.validateEmail(e.target);
            });
        }
        
        // Auto-save form data
        document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select').forEach(element => {
            element.addEventListener('input', () => this.autoSave());
        });
    }
    
    validatePhone(input) {
        const value = input.value.replace(/\D/g, '');
        const isValid = /^(?:\+233|0)?[235]\d{8}$/.test(value);
        
        if (value && !isValid) {
            input.style.borderColor = 'var(--danger-color)';
            this.showError(input, 'Please enter a valid Ghanaian phone number');
        } else {
            input.style.borderColor = '';
            this.hideError(input);
        }
        
        return isValid;
    }
    
    validateEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(input.value);
        
        if (input.value && !isValid) {
            input.style.borderColor = 'var(--danger-color)';
            this.showError(input, 'Please enter a valid email address');
        } else {
            input.style.borderColor = '';
            this.hideError(input);
        }
        
        return isValid;
    }
    
    showError(input, message) {
        let errorElement = input.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = 'var(--danger-color)';
            errorElement.style.fontSize = '0.9rem';
            errorElement.style.marginTop = '5px';
            input.parentNode.insertBefore(errorElement, input.nextSibling);
        }
        errorElement.textContent = message;
    }
    
    hideError(input) {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
    }
    
    autoSave() {
        const formData = {};
        document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select').forEach(element => {
            if (element.name) {
                formData[element.name] = element.value;
            }
        });
        
        localStorage.setItem('contactFormDraft', JSON.stringify(formData));
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const phoneInput = document.getElementById('phone');
        const emailInput = document.getElementById('email');
        const requiredFields = document.querySelectorAll('[required]');
        
        let isValid = true;
        
        // Check required fields
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'var(--danger-color)';
                this.showError(field, 'This field is required');
            }
        });
        
        // Validate phone and email
        if (phoneInput && !this.validatePhone(phoneInput)) isValid = false;
        if (emailInput && !this.validateEmail(emailInput)) isValid = false;
        
        if (!isValid) {
            alert('Please fill in all required fields correctly');
            return;
        }
        
        // Collect form data
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Add timestamp
        data.timestamp = new Date().toISOString();
        data.receivedDate = new Date().toLocaleDateString('en-GB');
        
        // Save submission
        this.saveSubmission(data);
        
        // Clear draft
        localStorage.removeItem('contactFormDraft');
        
        // Redirect to thank you page with data
        const queryString = new URLSearchParams(data).toString();
        window.location.href = `thank-you.html?${queryString}`;
    }
    
    saveSubmission(data) {
        // Get existing submissions
        let submissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
        
        // Add new submission
        submissions.push(data);
        
        // Keep only last 50 submissions
        if (submissions.length > 50) {
            submissions = submissions.slice(-50);
        }
        
        // Save back to localStorage
        localStorage.setItem('formSubmissions', JSON.stringify(submissions));
        localStorage.setItem('lastFormSubmission', JSON.stringify(data));
        
        // Log to console (for demo)
        console.log('Form submission saved:', data);
    }
}

// Initialize form handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FormHandler();
});