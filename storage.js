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
            storage.setItem(this.KEYS.AUTH, JSON.stringify(credentials));
            return true;
        } catch (error) {
            console.error('Error saving credentials:', error);
            return false;
        }
    }

    getAuth() {
        try {
            // Check both session and local storage
            let data = sessionStorage.getItem(this.KEYS.AUTH);
            if (!data) {
                data = localStorage.getItem(this.KEYS.AUTH);
            }
            return data ? JSON.parse(data) : null;
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
