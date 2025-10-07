// validation-script.js
class AdvancedFormValidation {
    constructor() {
        this.setupRealTimeValidation();
       // this.setupPasswordStrength();
    }

    setupRealTimeValidation() {
        const emailField = document.getElementById('email');
        const passwordField = document.getElementById('pass');

        emailField.addEventListener('input', this.debounce(() => {
            this.validateEmailRealTime(emailField);
        }, 300));

        passwordField.addEventListener('input', this.debounce(() => {
            this.validatePasswordRealTime(passwordField);
        }, 300));
    }

    setupPasswordStrength() {
        const passwordField = document.getElementById('pass');
        let strengthIndicator = document.createElement('div');
        strengthIndicator.className = 'password-strength';
        strengthIndicator.style.cssText = `
            height: 4px;
            margin-top: 8px;
            border-radius: 2px;
            transition: all 0.3s ease;
        `;

        passwordField.parentNode.appendChild(strengthIndicator);

        passwordField.addEventListener('input', () => {
            const strength = this.calculatePasswordStrength(passwordField.value);
            this.updateStrengthIndicator(strengthIndicator, strength);
        });
    }

    validateEmailRealTime(field) {
        const value = field.value.trim();
        const isValid = this.isValidEmailOrPhone(value);
        
        if (value && !isValid) {
            field.style.borderColor = '#f02849';
            field.style.backgroundColor = '#fffafa';
        } else {
            field.style.borderColor = value ? '#42b883' : '#dddfe2';
            field.style.backgroundColor = '#f5f6f7';
        }
    }

    validatePasswordRealTime(field) {
        const value = field.value;
        
        if (value && value.length < 6) {
            field.style.borderColor = '#fa383e';
        } else if (value) {
            field.style.borderColor = '#42b883';
        } else {
            field.style.borderColor = '#dddfe2';
        }
    }

    calculatePasswordStrength(password) {
        if (!password) return 0;
        
        let strength = 0;
        
        // Comprimento
        if (password.length >= 8) strength += 25;
        if (password.length >= 12) strength += 15;
        
        // Diversidade de caracteres
        if (/[a-z]/.test(password)) strength += 15;
        if (/[A-Z]/.test(password)) strength += 15;
        if (/[0-9]/.test(password)) strength += 15;
        if (/[^a-zA-Z0-9]/.test(password)) strength += 15;
        
        return Math.min(strength, 100);
    }

    updateStrengthIndicator(indicator, strength) {
        if (strength === 0) {
            indicator.style.width = '0%';
            indicator.style.backgroundColor = 'transparent';
            return;
        }

        indicator.style.width = `${strength}%`;
        
        if (strength < 40) {
            indicator.style.backgroundColor = '#fa383e';
        } else if (strength < 70) {
            indicator.style.backgroundColor = '#faa73f';
        } else {
            indicator.style.backgroundColor = '#42b883';
        }
    }

    isValidEmailOrPhone(input) {
        if (!input) return false;
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(input)) return true;
        
        // Phone validation (Brazilian format)
        const phoneRegex = /^(\+\d{1,3})?[\s-]?(\(?\d{2}\)?)?[\s-]?\d{4,5}[\s-]?\d{4}$/;
        const cleanPhone = input.replace(/\D/g, '');
        
        if (cleanPhone.length >= 10 && cleanPhone.length <= 13) return true;
        
        return false;
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Inicializar validação avançada
new AdvancedFormValidation();