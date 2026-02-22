// ============================================
// MICROSOFT SERVICES REST CLIENT - AUTHENTICATION
// ============================================

class AuthManager {
    constructor() {
        this.credentials = null;
        this.accessToken = null;
        this.tokenExpiry = null;
    }

    // Load credentials from storage
    loadCredentials() {
        this.credentials = storage.getAuth();
        return this.credentials;
    }

    // Save credentials to storage
    saveCredentials(credentials, remember = false) {
        this.credentials = credentials;
        return storage.saveAuth(credentials, remember);
    }

    // Check if credentials are configured
    hasCredentials() {
        const guidRegex = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
        return this.credentials && 
               this.credentials.tenantId && guidRegex.test(this.credentials.tenantId) &&
               this.credentials.clientId && guidRegex.test(this.credentials.clientId) &&
               this.credentials.clientSecret && this.credentials.clientSecret.length >= 8;
    }

    // Get access token (with caching)
    async getAccessToken(scope) {
        // Check if we have a valid cached token
        if (this.accessToken && this.tokenExpiry && new Date() < this.tokenExpiry) {
            return this.accessToken;
        }

        // Request new token
        return await this.requestAccessToken(scope);
    }

    // Request new access token from Azure AD
    async requestAccessToken(scope) {
        if (!this.hasCredentials()) {
            throw new Error('No credentials configured. Please configure Service Principal credentials first.');
        }

        const tokenEndpoint = `https://login.microsoftonline.com/${this.credentials.tenantId}/oauth2/v2.0/token`;
        
        const body = new URLSearchParams({
            client_id: this.credentials.clientId,
            client_secret: this.credentials.clientSecret,
            scope: scope,
            grant_type: 'client_credentials'
        });

        try {
            const response = await fetch(tokenEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: body.toString()
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Authentication failed: ${errorData.error_description || response.statusText}`);
            }

            const data = await response.json();
            
            // Cache the token
            this.accessToken = data.access_token;
            // Set expiry time (subtract 5 minutes for safety)
            this.tokenExpiry = new Date(Date.now() + (data.expires_in - 300) * 1000);
            
            return this.accessToken;
        } catch (error) {
            console.warn('Token request failed. Check credentials and network connectivity.');
            throw new Error(`Failed to obtain access token: ${error.message}`);
        }
    }

    // Clear cached token
    clearToken() {
        this.accessToken = null;
        this.tokenExpiry = null;
    }

    // Clear all credentials
    clearCredentials() {
        this.credentials = null;
        this.clearToken();
        storage.clearAuth();
    }

    // Get subscription ID (for Azure services)
    getSubscriptionId() {
        return this.credentials?.subscriptionId || null;
    }
}

// Create global instance
const auth = new AuthManager();
