// animations-script.js
class LoginAnimations {
    constructor() {
        this.setupHoverEffects();
        this.setupFocusEffects();
        this.setupButtonAnimations();
        this.setupPageTransitions();
    }

    setupHoverEffects() {
        const inputs = document.querySelectorAll('.inputtext');
        const buttons = document.querySelectorAll('button, a');
        
        inputs.forEach(input => {
            input.addEventListener('mouseenter', () => {
                input.style.transform = 'translateY(-1px)';
                input.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            });
            
            input.addEventListener('mouseleave', () => {
                input.style.transform = 'translateY(0)';
                input.style.boxShadow = '';
            });
        });

        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-1px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        });
    }

    setupFocusEffects() {
        const inputs = document.querySelectorAll('.inputtext');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.style.transform = 'scale(1.02)';
                input.parentElement.style.transition = 'transform 0.2s ease';
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.style.transform = 'scale(1)';
            });
        });
    }

    setupButtonAnimations() {
        const loginButton = document.getElementById('loginbutton');
        
        loginButton.addEventListener('mousedown', () => {
            loginButton.style.transform = 'scale(0.95)';
        });
        
        loginButton.addEventListener('mouseup', () => {
            loginButton.style.transform = 'scale(1)';
        });
        
        loginButton.addEventListener('mouseleave', () => {
            loginButton.style.transform = 'scale(1)';
        });
    }

    setupPageTransitions() {
        // Adicionar fade-in na página
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);

        // Animar entrada do formulário
        const formContainer = document.querySelector('._4-u2');
        formContainer.style.transform = 'translateY(20px)';
        formContainer.style.opacity = '0';
        formContainer.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            formContainer.style.transform = 'translateY(0)';
            formContainer.style.opacity = '1';
        }, 300);
    }
}

// Inicializar animações
new LoginAnimations();