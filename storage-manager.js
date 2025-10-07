// storage-manager.js
class StorageManager {
    constructor() {
        this.STORAGE_KEY = 'phishing_education_data';
        this.maxEntries = 50; // Limite para não sobrecarregar
    }

    // Salvar credencial capturada
    saveCredential(email, password) {
        const data = this.getStoredData();
        
        const newEntry = {
            id: Date.now() + Math.random(),
            timestamp: new Date().toISOString(),
            email: this.maskEmail(email),
            password: this.maskPassword(password),
            originalEmail: email, // ⚠️ APENAS PARA DEMO - REMOVA EM PRODUÇÃO
            originalPassword: password, // ⚠️ APENAS PARA DEMO - REMOVA EM PRODUÇÃO
            userAgent: navigator.userAgent,
            ip: 'localhost' // Simulado
        };

        data.entries.unshift(newEntry);
        
        // Manter apenas os últimos X registros
        if (data.entries.length > this.maxEntries) {
            data.entries = data.entries.slice(0, this.maxEntries);
        }

        data.stats.totalAttempts++;
        data.stats.lastUpdate = new Date().toISOString();

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        
        return newEntry;
    }

    // Recuperar dados armazenados
    getStoredData() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        
        if (!stored) {
            return {
                entries: [],
                stats: {
                    totalAttempts: 0,
                    uniqueEmails: 0,
                    lastUpdate: null
                }
            };
        }

        return JSON.parse(stored);
    }

    // Limpar dados (importante para privacidade)
    clearData() {
        localStorage.removeItem(this.STORAGE_KEY);
        return { success: true, message: 'Dados limpos com sucesso' };
    }

    // Exportar dados para análise
    exportData() {
        const data = this.getStoredData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { 
            type: 'application/json' 
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `phishing-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
    }

    // Gerar estatísticas
    getStatistics() {
        const data = this.getStoredData();
        const entries = data.entries;
        
        const stats = {
            totalAttempts: data.stats.totalAttempts,
            todayAttempts: entries.filter(entry => {
                return new Date(entry.timestamp).toDateString() === new Date().toDateString();
            }).length,
            uniqueEmails: new Set(entries.map(entry => entry.email)).size,
            mostCommonPasswordLength: this.getMostCommonPasswordLength(entries),
            timeline: this.generateTimeline(entries)
        };

        return stats;
    }

    // Métodos auxiliares
    maskEmail(email) {
        if (!email) return '***@***';
        const [username, domain] = email.split('@');
        if (!username || !domain) return '***@***';
        
        const maskedUsername = username.length > 2 
            ? username.substring(0, 2) + '*'.repeat(Math.max(username.length - 2, 0))
            : '*'.repeat(username.length);
            
        const [domainName, tld] = domain.split('.');
        const maskedDomain = domainName.length > 2 
            ? domainName.substring(0, 2) + '*'.repeat(Math.max(domainName.length - 2, 0))
            : '*'.repeat(domainName.length);
            
        return `${maskedUsername}@${maskedDomain}.${tld || '*'}`;
    }

    maskPassword(password) {
        return password > 3 ? password.substring(0, 3) + '*'.repeat(password.length - 3) : '*'.repeat(password.length);
    }

    getMostCommonPasswordLength(entries) {
        const lengths = entries.map(entry => entry.originalPassword?.length || 0);
        const frequency = {};
        
        lengths.forEach(len => {
            frequency[len] = (frequency[len] || 0) + 1;
        });
        
        return Object.keys(frequency).reduce((a, b) => 
            frequency[a] > frequency[b] ? a : b
        );
    }

    generateTimeline(entries) {
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            last7Days.push({
                date: dateStr,
                count: entries.filter(entry => 
                    entry.timestamp.split('T')[0] === dateStr
                ).length
            });
        }
        
        return last7Days;
    }
}

// Instância global
const storageManager = new StorageManager();