// ============================================
// MICROSOFT SERVICES REST CLIENT - STORAGE
// ============================================

class StorageManager {
    constructor() {
        this.KEYS = {
            AUTH: 'msrc_auth_credentials',
            HISTORY: 'msrc_request_history',
            FAVORITES: 'msrc_favorites',
            ENVIRONMENT: 'msrc_environment',
            REMEMBER: 'msrc_remember_credentials'
        };
    }

    // Get storage type (session or local)
    getStorageType() {
        return localStorage.getItem(this.KEYS.REMEMBER) === 'true' ? localStorage : sessionStorage;
    }

    // Set remember preference
    setRememberPreference(remember) {
        if (remember) {
            localStorage.setItem(this.KEYS.REMEMBER, 'true');
        } else {
            localStorage.removeItem(this.KEYS.REMEMBER);
        }
    }

    // Get remember preference
    getRememberPreference() {
        return localStorage.getItem(this.KEYS.REMEMBER) === 'true';
    }

    // Authentication
    saveAuth(credentials, remember = false) {
        try {
            this.setRememberPreference(remember);
            const storage = this.getStorageType();
            const obfuscated = this.obfuscateCredentials(credentials);
            storage.setItem(this.KEYS.AUTH, obfuscated);
            return true;
        } catch (error) {
            console.error('Error saving credentials:', error);
            return false;
        }
    }

    getAuth() {
        try {
            let data = sessionStorage.getItem(this.KEYS.AUTH);
            if (!data) {
                data = localStorage.getItem(this.KEYS.AUTH);
            }
            if (!data) return null;
            return this.deobfuscateCredentials(data);
        } catch (error) {
            console.error('Error loading credentials:', error);
            return null;
        }
    }

    clearAuth() {
        sessionStorage.removeItem(this.KEYS.AUTH);
        localStorage.removeItem(this.KEYS.AUTH);
        localStorage.removeItem(this.KEYS.REMEMBER);
    }

    // Request History
    addToHistory(request) {
        try {
            const history = this.getHistory();
            const newEntry = {
                ...request,
                timestamp: new Date().toISOString(),
                id: Date.now()
            };
            
            history.unshift(newEntry);
            
            // Keep only last 50 requests
            const trimmedHistory = history.slice(0, 50);
            
            localStorage.setItem(this.KEYS.HISTORY, JSON.stringify(trimmedHistory));
            return true;
        } catch (error) {
            console.error('Error adding to history:', error);
            return false;
        }
    }

    getHistory() {
        try {
            const data = localStorage.getItem(this.KEYS.HISTORY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading history:', error);
            return [];
        }
    }

    clearHistory() {
        localStorage.removeItem(this.KEYS.HISTORY);
    }

    deleteHistoryItem(id) {
        try {
            const history = this.getHistory();
            const filtered = history.filter(item => item.id !== id);
            localStorage.setItem(this.KEYS.HISTORY, JSON.stringify(filtered));
            return true;
        } catch (error) {
            console.error('Error deleting history item:', error);
            return false;
        }
    }

    // Favorites
    addToFavorites(request) {
        try {
            const favorites = this.getFavorites();
            const newFavorite = {
                ...request,
                timestamp: new Date().toISOString(),
                id: Date.now()
            };
            
            favorites.unshift(newFavorite);
            localStorage.setItem(this.KEYS.FAVORITES, JSON.stringify(favorites));
            return true;
        } catch (error) {
            console.error('Error adding to favorites:', error);
            return false;
        }
    }

    getFavorites() {
        try {
            const data = localStorage.getItem(this.KEYS.FAVORITES);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading favorites:', error);
            return [];
        }
    }

    deleteFavorite(id) {
        try {
            const favorites = this.getFavorites();
            const filtered = favorites.filter(item => item.id !== id);
            localStorage.setItem(this.KEYS.FAVORITES, JSON.stringify(filtered));
            return true;
        } catch (error) {
            console.error('Error deleting favorite:', error);
            return false;
        }
    }

    clearFavorites() {
        localStorage.removeItem(this.KEYS.FAVORITES);
    }

    // Environment
    setEnvironment(env) {
        localStorage.setItem(this.KEYS.ENVIRONMENT, env);
    }

    getEnvironment() {
        return localStorage.getItem(this.KEYS.ENVIRONMENT) || 'prod';
    }

    // Clear all data
    clearAll() {
        Object.values(this.KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
    }

    // Encryption key derivation from a user passphrase (optional future use)
    async deriveKey(passphrase) {
        const encoder = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            encoder.encode(passphrase),
            { name: 'PBKDF2' },
            false,
            ['deriveKey']
        );
        return await crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: encoder.encode('msrc-salt-v1'),
                iterations: 100000,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt']
        );
    }

    // Basic obfuscation for stored credentials (not encryption, but prevents casual reading)
    obfuscateCredentials(credentials) {
        try {
            const json = JSON.stringify(credentials);
            return btoa(encodeURIComponent(json).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode('0x' + p1)));
        } catch (error) {
            console.warn('Obfuscation failed, storing as-is');
            return JSON.stringify(credentials);
        }
    }

    deobfuscateCredentials(data) {
        try {
            // Try base64 first
            const json = decodeURIComponent(atob(data).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
            return JSON.parse(json);
        } catch {
            // Fallback: try plain JSON (backwards compatibility)
            try {
                return JSON.parse(data);
            } catch {
                return null;
            }
        }
    }

    // Export data
    exportData() {
        return {
            history: this.getHistory(),
            favorites: this.getFavorites(),
            environment: this.getEnvironment(),
            exportDate: new Date().toISOString()
        };
    }

    // Import data
    importData(data) {
        try {
            if (data.history) {
                localStorage.setItem(this.KEYS.HISTORY, JSON.stringify(data.history));
            }
            if (data.favorites) {
                localStorage.setItem(this.KEYS.FAVORITES, JSON.stringify(data.favorites));
            }
            if (data.environment) {
                this.setEnvironment(data.environment);
            }
            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }
}

// Create global instance
const storage = new StorageManager();
