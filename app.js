// ============================================
// MICROSOFT SERVICES REST CLIENT - MAIN APPLICATION
// ============================================

class MSRESTClient {
    constructor() {
        this.currentService = null;
        this.currentCategory = null;
        this.currentEndpoint = null;
        this.currentEnvironment = 'prod';
        this.variables = {};
        this.templates = [];
        this.batchQueue = [];
        this.comparisonData = { left: null, right: null };
        this.rateLimitTracker = new RateLimitTracker();
        this.wheelFocusIndex = -1;
        this.wheelKeyboardArmed = false;
        
        this.init();
    }

    init() {
        // Load saved data
        auth.loadCredentials();
        this.currentEnvironment = storage.getEnvironment();
        this.loadVariables();
        this.loadTemplates();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Load auth form if credentials exist
        this.loadAuthForm();
        
        // Setup keyboard shortcuts
        this.setupKeyboardShortcuts();
        
        // Setup input validation
        this.setupInputValidation();
        
        // Setup search and filter
        this.setupSearch();
    }

    // ============================================
    // SECURITY - HTML SANITIZATION
    // ============================================

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    sanitizeForAttribute(text) {
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Skip keyboard shortcuts when focus is inside an editable element
            const active = document.activeElement;
            const inEditableField = active && (
                active.tagName === 'INPUT' ||
                active.tagName === 'TEXTAREA' ||
                active.tagName === 'SELECT' ||
                active.isContentEditable
            );

            // Ctrl/Cmd + K - Focus search/category
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                if (this.currentService) {
                    document.getElementById('categorySelect').focus();
                }
            }
            
            // Ctrl/Cmd + Enter - Execute request
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                if (this.currentEndpoint && !document.getElementById('requestConfig').classList.contains('hidden')) {
                    this.executeRequest();
                }
            }
            
            // Escape - Close modals or go back
            if (e.key === 'Escape') {
                if (document.querySelector('.modal.active')) {
                    this.closeModals();
                } else if (this.currentService) {
                    this.showWheel();
                }
            }

            // Arrow keys - navigate service wheel (only when wheel is visible, armed, and not in editable field)
            if (!inEditableField && this.wheelKeyboardArmed && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                const wheelContainer = document.getElementById('wheelContainer');
                if (!wheelContainer.classList.contains('hidden')) {
                    e.preventDefault();
                    const wheelItems = Array.from(document.querySelectorAll('.wheel-item'));
                    if (wheelItems.length === 0) return;

                    if (this.wheelFocusIndex < 0) {
                        this.wheelFocusIndex = 0;
                    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                        this.wheelFocusIndex = (this.wheelFocusIndex + 1) % wheelItems.length;
                    } else {
                        this.wheelFocusIndex = (this.wheelFocusIndex - 1 + wheelItems.length) % wheelItems.length;
                    }

                    wheelItems.forEach((item, i) => {
                        item.classList.toggle('keyboard-focused', i === this.wheelFocusIndex);
                    });
                }
            }

            // Enter - confirm keyboard-focused wheel item
            if (!inEditableField && e.key === 'Enter') {
                const wheelContainer = document.getElementById('wheelContainer');
                if (!wheelContainer.classList.contains('hidden') && this.wheelFocusIndex >= 0) {
                    const wheelItems = Array.from(document.querySelectorAll('.wheel-item'));
                    const focused = wheelItems[this.wheelFocusIndex];
                    if (focused) {
                        e.preventDefault();
                        this.selectService(focused.dataset.service);
                    }
                }
            }
        });
    }

    setupInputValidation() {
        // Real-time validation for credential fields
        const guidRegex = /^[a-f0-9-]{36}$/i;
        
        ['tenantId', 'clientId'].forEach(fieldId => {
            const input = document.getElementById(fieldId);
            input.addEventListener('blur', () => {
                const value = input.value.trim();
                if (value) {
                    if (guidRegex.test(value)) {
                        input.classList.remove('invalid');
                        input.classList.add('valid');
                    } else {
                        input.classList.remove('valid');
                        input.classList.add('invalid');
                    }
                } else {
                    input.classList.remove('valid', 'invalid');
                }
            });
            
            input.addEventListener('input', () => {
                input.classList.remove('valid', 'invalid');
            });
        });
        
        // Client Secret validation
        document.getElementById('clientSecret').addEventListener('blur', (e) => {
            const value = e.target.value.trim();
            if (value) {
                if (value.length >= 10) {
                    e.target.classList.remove('invalid');
                    e.target.classList.add('valid');
                } else {
                    e.target.classList.remove('valid');
                    e.target.classList.add('invalid');
                }
            } else {
                e.target.classList.remove('valid', 'invalid');
            }
        });
    }

    setupEventListeners() {
        // Authentication
        document.getElementById('toggleAuth').addEventListener('click', () => this.toggleAuthForm());
        document.getElementById('saveAuth').addEventListener('click', () => this.saveAuth());
        document.getElementById('testAuth').addEventListener('click', () => this.testConnection());
        document.getElementById('clearAuth').addEventListener('click', () => this.clearAllData());
        
        // Remember credentials checkbox
        document.getElementById('rememberCredentials').addEventListener('change', (e) => {
            this.updateAuthWarning(e.target.checked);
        });

        // Service wheel
        document.querySelectorAll('.wheel-item').forEach(item => {
            item.addEventListener('click', () => this.selectService(item.dataset.service));
        });

        // Arm keyboard navigation on wheel interaction
        const wheelContainer = document.getElementById('wheelContainer');
        wheelContainer.addEventListener('mouseenter', () => { this.wheelKeyboardArmed = true; });
        wheelContainer.addEventListener('mouseleave', () => { this.wheelKeyboardArmed = false; });
        wheelContainer.addEventListener('click', () => { this.wheelKeyboardArmed = true; });

        // Back to wheel
        document.getElementById('backToWheel').addEventListener('click', () => this.showWheel());

        // Category selector
        document.getElementById('categorySelect').addEventListener('change', (e) => {
            this.selectCategory(e.target.value);
        });

        // Execute request
        document.getElementById('executeRequest').addEventListener('click', () => this.executeRequest());

        // Toolbar buttons
        document.getElementById('btnHistory').addEventListener('click', () => this.showHistory());
        document.getElementById('btnFavorites').addEventListener('click', () => this.showFavorites());
        document.getElementById('btnEnvironments').addEventListener('click', () => this.showEnvironments());
        document.getElementById('generateCode').addEventListener('click', () => this.showCodeGenerator());
        document.getElementById('saveFavorite').addEventListener('click', () => this.saveToFavorites());

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => this.closeModals());
        });

        // Click outside modal to close
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeModals();
            });
        });

        // Fullscreen button
        document.getElementById('btnFullscreen').addEventListener('click', () => this.toggleFullscreen());
        document.addEventListener('fullscreenchange', () => this.onFullscreenChange());

        // Code generator tabs
        document.querySelectorAll('.code-tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchCodeTab(tab.dataset.lang));
        });

        // Copy code button
        document.getElementById('copyCode').addEventListener('click', () => this.copyCode());

        // Environment selection
        document.querySelectorAll('.environment-item').forEach(item => {
            item.addEventListener('click', () => this.selectEnvironment(item.dataset.env));
        });
    }

    // ============================================
    // AUTHENTICATION
    // ============================================

    toggleAuthForm() {
        const form = document.getElementById('authForm');
        form.classList.toggle('hidden');
    }

    loadAuthForm() {
        const credentials = auth.credentials;
        if (credentials) {
            document.getElementById('tenantId').value = credentials.tenantId || '';
            document.getElementById('clientId').value = credentials.clientId || '';
            document.getElementById('clientSecret').value = credentials.clientSecret || '';
            document.getElementById('subscriptionId').value = credentials.subscriptionId || '';
        }
        
        // Load remember preference
        const remember = storage.getRememberPreference();
        document.getElementById('rememberCredentials').checked = remember;
        this.updateAuthWarning(remember);
    }

    updateAuthWarning(remember) {
        const warningDiv = document.querySelector('.auth-warning');
        const warningText = document.getElementById('authWarningText');
        
        if (remember) {
            warningDiv.classList.add('danger');
            warningText.textContent = 'WARNING: Credentials will be stored permanently in your browser. Only enable this on your personal computer. Anyone with access to this browser can see your credentials.';
        } else {
            warningDiv.classList.remove('danger');
            warningText.textContent = 'By default, credentials are stored only for this session (cleared when you close the browser). Enable "Remember credentials" to keep them permanently.';
        }
    }

    showAuthStatus(message, isSuccess) {
        const statusDiv = document.getElementById('authStatus');
        statusDiv.textContent = message;
        statusDiv.className = 'auth-status';
        statusDiv.classList.add(isSuccess ? 'success' : 'error');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            statusDiv.classList.add('hidden');
        }, 5000);
    }

    validateCredentials(credentials) {
        const errors = [];
        
        if (!credentials.tenantId || credentials.tenantId.trim() === '') {
            errors.push('Tenant ID is required');
        } else if (!/^[a-f0-9-]{36}$/i.test(credentials.tenantId.trim())) {
            errors.push('Tenant ID must be a valid GUID');
        }
        
        if (!credentials.clientId || credentials.clientId.trim() === '') {
            errors.push('Client ID is required');
        } else if (!/^[a-f0-9-]{36}$/i.test(credentials.clientId.trim())) {
            errors.push('Client ID must be a valid GUID');
        }
        
        if (!credentials.clientSecret || credentials.clientSecret.trim() === '') {
            errors.push('Client Secret is required');
        } else if (credentials.clientSecret.trim().length < 10) {
            errors.push('Client Secret seems too short');
        }
        
        return errors;
    }

    saveAuth() {
        const credentials = {
            tenantId: document.getElementById('tenantId').value.trim(),
            clientId: document.getElementById('clientId').value.trim(),
            clientSecret: document.getElementById('clientSecret').value.trim(),
            subscriptionId: document.getElementById('subscriptionId').value.trim()
        };

        // Validate
        const errors = this.validateCredentials(credentials);
        if (errors.length > 0) {
            this.showAuthStatus('Validation errors: ' + errors.join(', '), false);
            return;
        }

        const remember = document.getElementById('rememberCredentials').checked;
        
        // Double check for permanent storage
        if (remember) {
            if (!confirm('Are you sure you want to store credentials permanently? This is only recommended on your personal computer.')) {
                return;
            }
        }

        if (auth.saveCredentials(credentials, remember)) {
            this.showAuthStatus('Credentials saved successfully! ' + (remember ? '(Permanent storage)' : '(Session only)'), true);
            auth.clearToken(); // Clear any cached token
        } else {
            this.showAuthStatus('Error saving credentials. Please try again.', false);
        }
    }

    async testConnection() {
        if (!auth.hasCredentials()) {
            this.showAuthStatus('Please save credentials first before testing', false);
            return;
        }

        const btn = document.getElementById('testAuth');
        const originalText = btn.textContent;
        btn.classList.add('loading');
        btn.disabled = true;
        btn.textContent = 'TESTING...';

        const statusDiv = document.getElementById('authStatus');
        statusDiv.textContent = 'Testing connection...';
        statusDiv.className = 'auth-status';
        
        try {
            // Try to get a token for Microsoft Graph
            const token = await auth.getAccessToken('https://graph.microsoft.com/.default');
            
            if (token) {
                this.showAuthStatus('✓ Connection successful! Authentication is working correctly.', true);
            } else {
                this.showAuthStatus('✗ Connection failed: Unable to obtain access token', false);
            }
        } catch (error) {
            this.showAuthStatus('✗ Connection failed: ' + error.message, false);
        } finally {
            btn.classList.remove('loading');
            btn.disabled = false;
            btn.textContent = originalText;
        }
    }

    clearAllData() {
        const msg = 'This will delete ALL saved data including:\n' +
                   '- Credentials (both session and permanent)\n' +
                   '- Request history\n' +
                   '- Favorites\n' +
                   '- Environment settings\n\n' +
                   'Continue?';
        
        if (confirm(msg)) {
            storage.clearAll();
            auth.clearCredentials();
            
            // Clear form
            document.getElementById('tenantId').value = '';
            document.getElementById('clientId').value = '';
            document.getElementById('clientSecret').value = '';
            document.getElementById('subscriptionId').value = '';
            document.getElementById('rememberCredentials').checked = false;
            
            this.showAuthStatus('All data cleared successfully!', true);
        }
    }

    // ============================================
    // SERVICE SELECTION
    // ============================================

    selectService(serviceKey) {
        this.currentService = SERVICES[serviceKey];
        this.currentCategory = null;
        this.currentEndpoint = null;
        
        // Update UI
        document.getElementById('wheelContainer').classList.add('hidden');
        document.getElementById('servicePanel').classList.remove('hidden');
        document.getElementById('serviceName').textContent = this.currentService.name;

        // Show service docs link if available
        const serviceDocsLink = document.getElementById('serviceDocs');
        if (this.currentService.serviceDocs) {
            serviceDocsLink.href = this.currentService.serviceDocs;
            serviceDocsLink.classList.remove('hidden');
        } else {
            serviceDocsLink.classList.add('hidden');
        }
        
        // Populate categories
        this.populateCategories();
        
        // Reset panels
        document.getElementById('requestConfig').classList.add('hidden');
        document.getElementById('responsePanel').classList.add('hidden');

        // Update rate limit display
        this.updateRateLimitDisplay();
    }

    showWheel() {
        document.getElementById('wheelContainer').classList.remove('hidden');
        document.getElementById('servicePanel').classList.add('hidden');
        this.currentService = null;
        // Reset keyboard navigation state
        this.wheelFocusIndex = -1;
        this.wheelKeyboardArmed = false;
        document.querySelectorAll('.wheel-item.keyboard-focused').forEach(item => {
            item.classList.remove('keyboard-focused');
        });
    }

    populateCategories() {
        const select = document.getElementById('categorySelect');
        select.innerHTML = '<option value="">Select a category...</option>';
        
        Object.entries(this.currentService.categories).forEach(([key, category]) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = category.name;
            select.appendChild(option);
        });
    }

    // ============================================
    // CATEGORY & ENDPOINT SELECTION
    // ============================================

    selectCategory(categoryKey) {
        if (!categoryKey) {
            document.getElementById('endpointList').innerHTML = 
                '<div class="no-selection">Select a category to view available endpoints</div>';
            return;
        }

        this.currentCategory = this.currentService.categories[categoryKey];
        this.populateEndpoints();
    }

    populateEndpoints() {
        const container = document.getElementById('endpointList');
        container.innerHTML = '';

        this.currentCategory.endpoints.forEach((endpoint, index) => {
            const item = document.createElement('div');
            item.className = 'endpoint-item';
            item.dataset.index = index;

            const methodSpan = document.createElement('span');
            methodSpan.className = `endpoint-method ${endpoint.method.toLowerCase()}`;
            methodSpan.textContent = endpoint.method;

            const pathSpan = document.createElement('span');
            pathSpan.className = 'endpoint-path';
            pathSpan.textContent = endpoint.path;

            const descSpan = document.createElement('span');
            descSpan.className = 'endpoint-desc';
            descSpan.textContent = endpoint.description;

            item.appendChild(methodSpan);
            item.appendChild(pathSpan);
            item.appendChild(descSpan);

            if (endpoint.docs) {
                const docsLink = document.createElement('a');
                docsLink.className = 'endpoint-doc-link';
                docsLink.href = endpoint.docs;
                docsLink.target = '_blank';
                docsLink.rel = 'noopener noreferrer';
                docsLink.title = 'Official documentation';
                docsLink.innerHTML = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9"/><path d="M10 2h4v4M14 2L8 8"/></svg>';
                docsLink.addEventListener('click', (e) => e.stopPropagation());
                item.appendChild(docsLink);
            }

            item.addEventListener('click', () => this.selectEndpoint(index));
            container.appendChild(item);
        });
    }

    selectEndpoint(index) {
        // Update selection UI
        document.querySelectorAll('.endpoint-item').forEach(item => item.classList.remove('selected'));
        document.querySelector(`.endpoint-item[data-index="${index}"]`).classList.add('selected');
        
        // Set current endpoint
        this.currentEndpoint = this.currentCategory.endpoints[index];
        
        // Show request config
        this.loadRequestConfig();
    }

    loadRequestConfig() {
        const config = document.getElementById('requestConfig');
        config.classList.remove('hidden');
        
        // Set method
        document.getElementById('httpMethod').value = this.currentEndpoint.method;
        
        // Set base URL (with environment consideration)
        let baseUrl = this.currentService.baseUrl;
        if (this.currentEnvironment === 'dev') {
            baseUrl = baseUrl.replace('.com', '-dev.com');
        } else if (this.currentEnvironment === 'qa') {
            baseUrl = baseUrl.replace('.com', '-qa.com');
        }
        document.getElementById('baseUrl').value = baseUrl;
        
        // Set endpoint URL
        document.getElementById('endpointUrl').value = this.currentEndpoint.path;
        
        // Set description
        document.getElementById('endpointDescription').textContent = this.currentEndpoint.description;
        
        // Set docs link
        const docsLink = document.getElementById('endpointDocs');
        docsLink.href = this.currentEndpoint.docs;
        
        // Clear body and headers
        document.getElementById('requestBody').value = '';
        document.getElementById('requestHeaders').value = '';
        
        // Show example body for POST/PUT/PATCH
        if (['POST', 'PUT', 'PATCH'].includes(this.currentEndpoint.method)) {
            document.getElementById('requestBody').value = this.getExampleBody();
        }
    }

    getExampleBody() {
        // Return example bodies based on endpoint
        return '{\n  "key": "value"\n}';
    }

    // ============================================
    // REQUEST EXECUTION
    // ============================================

    async executeRequest(retryCount = 0) {
        if (!auth.hasCredentials()) {
            alert('Please configure Service Principal credentials first!');
            document.getElementById('authForm').classList.remove('hidden');
            return;
        }

        // Check rate limiting
        if (!this.rateLimitTracker.canMakeRequest(this.currentService)) {
            const status = this.rateLimitTracker.getStatus(this.currentService);
            alert(`Rate limit exceeded! ${status.message}`);
            return;
        }

        const method = document.getElementById('httpMethod').value;
        const baseUrl = document.getElementById('baseUrl').value;
        const endpointUrl = document.getElementById('endpointUrl').value;
        const bodyText = document.getElementById('requestBody').value.trim();
        const headersText = document.getElementById('requestHeaders').value.trim();
        const autoRetry = document.getElementById('autoRetry')?.checked || false;

        // Build full URL with variable replacement
        const fullUrl = this.replaceVariables(baseUrl + endpointUrl);

        // Parse custom headers
        let customHeaders = {};
        if (headersText) {
            try {
                customHeaders = JSON.parse(headersText);
            } catch (error) {
                alert('Invalid JSON in Custom Headers field');
                return;
            }
        }

        // Parse body with variable replacement
        let body = null;
        if (bodyText && ['POST', 'PUT', 'PATCH'].includes(method)) {
            try {
                const replacedBody = this.replaceVariables(bodyText);
                body = JSON.parse(replacedBody);
            } catch (error) {
                alert('Invalid JSON in Request Body field');
                return;
            }
        }

        // Show loading state
        const btn = document.getElementById('executeRequest');
        const originalText = btn.textContent;
        btn.classList.add('loading');
        btn.disabled = true;
        btn.textContent = retryCount > 0 ? `RETRYING (${retryCount})...` : 'EXECUTING...';

        // Show response panel with loading
        const responsePanel = document.getElementById('responsePanel');
        responsePanel.classList.remove('hidden');
        document.getElementById('responseContent').textContent = 'Executing request...';

        const startTime = Date.now();

        try {
            // Get access token
            const token = await auth.getAccessToken(this.currentService.authScope);

            // Build headers
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                ...customHeaders
            };

            // Make request
            const response = await fetch(fullUrl, {
                method: method,
                headers: headers,
                body: body ? JSON.stringify(body) : undefined
            });

            const endTime = Date.now();
            const duration = endTime - startTime;

            // Parse response
            let responseData;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                responseData = await response.json();
            } else {
                responseData = await response.text();
            }

            // Display response
            this.displayResponse(response.status, response.statusText, responseData, duration);

            // Record rate limit
            this.rateLimitTracker.recordRequest(this.currentService);
            this.updateRateLimitDisplay();

            // Save to history
            storage.addToHistory({
                service: this.currentService.name,
                method: method,
                url: fullUrl,
                status: response.status,
                duration: duration
            });

            // Auto-retry on failure
            if (!response.ok && autoRetry && retryCount < 3) {
                console.log(`Request failed with status ${response.status}, retrying...`);
                await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
                return this.executeRequest(retryCount + 1);
            }

        } catch (error) {
            const endTime = Date.now();
            const duration = endTime - startTime;
            
            this.displayResponse(0, 'Error', { error: error.message }, duration);

            // Auto-retry on error
            if (autoRetry && retryCount < 3) {
                console.log(`Request error: ${error.message}, retrying...`);
                await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
                return this.executeRequest(retryCount + 1);
            }
        } finally {
            btn.classList.remove('loading');
            btn.disabled = false;
            btn.textContent = originalText;
        }
    }

    displayResponse(status, statusText, data, duration) {
        const statusElement = document.getElementById('responseStatus');
        const timeElement = document.getElementById('responseTime');
        const contentElement = document.getElementById('responseContent');

        // Status
        statusElement.textContent = `${status} ${statusText}`;
        statusElement.className = 'response-status';
        if (status >= 200 && status < 300) {
            statusElement.classList.add('success');
        } else {
            statusElement.classList.add('error');
        }

        // Time
        timeElement.textContent = `${duration}ms`;

        // Content
        if (typeof data === 'object') {
            contentElement.textContent = JSON.stringify(data, null, 2);
        } else {
            contentElement.textContent = data;
        }
    }

    // ============================================
    // HISTORY
    // ============================================

    showHistory() {
        const modal = document.getElementById('historyModal');
        const list = document.getElementById('historyList');
        
        const history = storage.getHistory();
        
        if (history.length === 0) {
            const noData = document.createElement('div');
            noData.className = 'no-selection';
            noData.textContent = 'No request history yet';
            list.innerHTML = '';
            list.appendChild(noData);
        } else {
            list.innerHTML = '';
            history.forEach(item => {
                const div = document.createElement('div');
                div.className = 'history-item';
                
                const header = document.createElement('div');
                header.className = 'history-item-header';
                
                const methodSpan = document.createElement('span');
                methodSpan.className = `history-item-method ${item.method.toLowerCase()}`;
                methodSpan.textContent = item.method;
                
                const timeSpan = document.createElement('span');
                timeSpan.className = 'history-item-time';
                timeSpan.textContent = new Date(item.timestamp).toLocaleString();
                
                header.appendChild(methodSpan);
                header.appendChild(timeSpan);
                
                const urlDiv = document.createElement('div');
                urlDiv.className = 'history-item-url';
                urlDiv.textContent = item.url;
                
                const infoDiv = document.createElement('div');
                infoDiv.style.marginTop = '0.5rem';
                infoDiv.style.fontSize = '0.85rem';
                infoDiv.style.color = 'var(--color-text-muted)';
                infoDiv.textContent = `${item.service} - ${item.status} - ${item.duration}ms`;
                
                div.appendChild(header);
                div.appendChild(urlDiv);
                div.appendChild(infoDiv);
                
                div.addEventListener('click', () => {
                    // Could implement "re-run this request" functionality here
                    this.closeModals();
                });
                
                list.appendChild(div);
            });
        }
        
        modal.classList.add('active');
    }

    // ============================================
    // FAVORITES
    // ============================================

    saveToFavorites() {
        if (!this.currentEndpoint) {
            alert('Please select an endpoint first');
            return;
        }

        const name = prompt('Enter a name for this favorite:');
        if (!name) return;

        const favorite = {
            name: name,
            service: this.currentService.name,
            method: document.getElementById('httpMethod').value,
            url: document.getElementById('baseUrl').value + document.getElementById('endpointUrl').value,
            body: document.getElementById('requestBody').value,
            headers: document.getElementById('requestHeaders').value
        };

        if (storage.addToFavorites(favorite)) {
            alert('Added to favorites!');
        } else {
            alert('Error saving favorite');
        }
    }

    showFavorites() {
        const modal = document.getElementById('favoritesModal');
        const list = document.getElementById('favoritesList');
        
        const favorites = storage.getFavorites();
        
        if (favorites.length === 0) {
            const noData = document.createElement('div');
            noData.className = 'no-selection';
            noData.textContent = 'No favorites yet';
            list.innerHTML = '';
            list.appendChild(noData);
        } else {
            list.innerHTML = '';
            favorites.forEach(item => {
                const div = document.createElement('div');
                div.className = 'favorite-item';
                
                const header = document.createElement('div');
                header.className = 'favorite-item-header';
                
                const methodSpan = document.createElement('span');
                methodSpan.className = `favorite-item-method ${item.method.toLowerCase()}`;
                methodSpan.textContent = item.method;
                
                const nameSpan = document.createElement('span');
                nameSpan.className = 'favorite-item-name';
                nameSpan.textContent = item.name || '';
                
                header.appendChild(methodSpan);
                header.appendChild(nameSpan);
                
                const urlDiv = document.createElement('div');
                urlDiv.className = 'favorite-item-url';
                urlDiv.textContent = item.url;
                
                const serviceDiv = document.createElement('div');
                serviceDiv.style.marginTop = '0.5rem';
                serviceDiv.style.fontSize = '0.85rem';
                serviceDiv.style.color = 'var(--color-text-muted)';
                serviceDiv.textContent = item.service;
                
                div.appendChild(header);
                div.appendChild(urlDiv);
                div.appendChild(serviceDiv);
                
                div.addEventListener('click', () => {
                    // Could implement "load this favorite" functionality here
                    this.closeModals();
                });
                
                list.appendChild(div);
            });
        }
        
        modal.classList.add('active');
    }

    // ============================================
    // CODE GENERATOR
    // ============================================

    showCodeGenerator() {
        if (!this.currentEndpoint) {
            alert('Please select an endpoint first');
            return;
        }

        const modal = document.getElementById('codeGenModal');
        modal.classList.add('active');
        
        // Generate code for current language (default Python)
        this.generateCode('python');
    }

    switchCodeTab(lang) {
        // Update tab UI
        document.querySelectorAll('.code-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelector(`.code-tab[data-lang="${lang}"]`).classList.add('active');
        
        // Generate code
        this.generateCode(lang);
    }

    generateCode(lang) {
        const method = document.getElementById('httpMethod').value;
        const url = document.getElementById('baseUrl').value + document.getElementById('endpointUrl').value;
        const body = document.getElementById('requestBody').value.trim();
        const scope = this.currentService.authScope;

        const codeElement = document.getElementById('generatedCode');

        if (lang === 'python') {
            codeElement.textContent = this.generatePythonCode(method, url, body, scope);
        } else if (lang === 'powershell') {
            codeElement.textContent = this.generatePowerShellCode(method, url, body, scope);
        } else if (lang === 'curl') {
            codeElement.textContent = this.generateCurlCode(method, url, body);
        }
    }

    generatePythonCode(method, url, body, scope) {
        const creds = auth.credentials;
        return `import requests
from msal import ConfidentialClientApplication

# Configuration
tenant_id = "${creds.tenantId}"
client_id = "${creds.clientId}"
client_secret = "${creds.clientSecret}"
scope = ["${scope}"]

# Get access token
app = ConfidentialClientApplication(
    client_id=client_id,
    client_credential=client_secret,
    authority=f"https://login.microsoftonline.com/{tenant_id}"
)

result = app.acquire_token_for_client(scopes=scope)
access_token = result.get("access_token")

# Make request
url = "${url}"
headers = {
    "Authorization": f"Bearer {access_token}",
    "Content-Type": "application/json"
}
${body ? `\ndata = ${body}` : ''}

response = requests.${method.toLowerCase()}(url, headers=headers${body ? ', json=data' : ''})

print(f"Status: {response.status_code}")
print(f"Response: {response.json()}")`;
    }

    generatePowerShellCode(method, url, body, scope) {
        const creds = auth.credentials;
        return `# Configuration
$tenantId = "${creds.tenantId}"
$clientId = "${creds.clientId}"
$clientSecret = "${creds.clientSecret}"
$scope = "${scope}"

# Get access token
$tokenUrl = "https://login.microsoftonline.com/$tenantId/oauth2/v2.0/token"
$tokenBody = @{
    client_id     = $clientId
    client_secret = $clientSecret
    scope         = $scope
    grant_type    = "client_credentials"
}

$tokenResponse = Invoke-RestMethod -Uri $tokenUrl -Method POST -Body $tokenBody
$accessToken = $tokenResponse.access_token

# Make request
$url = "${url}"
$headers = @{
    "Authorization" = "Bearer $accessToken"
    "Content-Type"  = "application/json"
}
${body ? `\n$body = @'\n${body}\n'@` : ''}

$response = Invoke-RestMethod -Uri $url -Method ${method} -Headers $headers${body ? ' -Body $body' : ''}

$response | ConvertTo-Json -Depth 10`;
    }

    generateCurlCode(method, url, body) {
        return `# First, get the access token
curl -X POST \\
  "https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/token" \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "client_id={CLIENT_ID}" \\
  -d "client_secret={CLIENT_SECRET}" \\
  -d "scope=${this.currentService.authScope}" \\
  -d "grant_type=client_credentials"

# Then, use the token in your request
curl -X ${method} \\
  "${url}" \\
  -H "Authorization: Bearer {ACCESS_TOKEN}" \\
  -H "Content-Type: application/json"${body ? ` \\\\\n  -d '${body}'` : ''}`;
    }

    copyCode() {
        const code = document.getElementById('generatedCode').textContent;
        navigator.clipboard.writeText(code).then(() => {
            alert('Code copied to clipboard!');
        }).catch(() => {
            alert('Failed to copy code');
        });
    }

    // ============================================
    // ENVIRONMENTS
    // ============================================

    selectEnvironment(env) {
        this.currentEnvironment = env;
        storage.setEnvironment(env);
        
        // Update UI
        document.querySelectorAll('.environment-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('input').checked = false;
        });
        
        const selected = document.querySelector(`.environment-item[data-env="${env}"]`);
        selected.classList.add('active');
        selected.querySelector('input').checked = true;
        
        // Update base URL if config is loaded
        if (this.currentEndpoint) {
            this.loadRequestConfig();
        }
        
        this.closeModals();
    }

    showEnvironments() {
        const modal = document.getElementById('environmentsModal');
        modal.classList.add('active');
    }

    // ============================================
    // MODAL MANAGEMENT
    // ============================================

    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    // ============================================
    // SEARCH & FILTER
    // ============================================

    setupSearch() {
        const searchInput = document.getElementById('searchEndpoint');
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.filterEndpoints());
        }
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                btn.classList.toggle('active');
                this.filterEndpoints();
            });
        });
    }

    filterEndpoints() {
        if (!this.currentService) return;
        
        const searchTerm = document.getElementById('searchEndpoint').value.toLowerCase();
        const activeMethods = Array.from(document.querySelectorAll('.filter-btn.active'))
            .map(btn => btn.dataset.method);
        
        const categorySelect = document.getElementById('categorySelect');
        const endpointSelect = document.getElementById('endpointSelect');
        
        // Clear current options
        endpointSelect.innerHTML = '<option value="">Selecione um Endpoint</option>';
        
        // Get all endpoints from all categories
        const service = SERVICES[this.currentService];
        let matchedEndpoints = [];
        
        service.categories.forEach(category => {
            category.endpoints.forEach(endpoint => {
                // Filter by method
                const methodMatch = activeMethods.length === 0 || 
                                  activeMethods.includes('ALL') || 
                                  activeMethods.includes(endpoint.method);
                
                // Filter by search term
                const searchMatch = !searchTerm || 
                    endpoint.description.toLowerCase().includes(searchTerm) ||
                    endpoint.path.toLowerCase().includes(searchTerm);
                
                if (methodMatch && searchMatch) {
                    matchedEndpoints.push({
                        category: category.name,
                        endpoint: endpoint
                    });
                }
            });
        });
        
        // Add matched endpoints to select
        matchedEndpoints.forEach(match => {
            const option = document.createElement('option');
            option.value = match.endpoint.path;
            option.textContent = `[${match.endpoint.method}] ${match.endpoint.description} (${match.category})`;
            option.dataset.method = match.endpoint.method;
            option.dataset.category = match.category;
            endpointSelect.appendChild(option);
        });
    }

    // ============================================
    // VARIABLES
    // ============================================

    loadVariables() {
        try {
            const saved = localStorage.getItem('msrest_variables');
            if (saved) {
                const parsed = JSON.parse(saved);
                // Validate it's an object
                if (typeof parsed === 'object' && !Array.isArray(parsed)) {
                    this.variables = parsed;
                } else {
                    console.warn('Invalid variables format, resetting');
                    this.variables = {};
                }
            } else {
                this.variables = {};
            }
        } catch (error) {
            console.error('Error loading variables:', error);
            this.variables = {};
        }
    }

    saveVariables() {
        localStorage.setItem('msrest_variables', JSON.stringify(this.variables));
    }

    showVariables() {
        const modal = document.getElementById('variablesModal');
        const list = document.getElementById('variablesList');
        
        list.innerHTML = '';
        
        Object.entries(this.variables).forEach(([key, value]) => {
            const item = document.createElement('div');
            item.className = 'variable-item';
            
            // Create elements safely
            const keyInput = document.createElement('input');
            keyInput.type = 'text';
            keyInput.value = key;
            keyInput.placeholder = 'Variable Name';
            keyInput.dataset.role = 'key';
            
            const valueInput = document.createElement('input');
            valueInput.type = 'text';
            valueInput.value = value;
            valueInput.placeholder = 'Variable Value';
            valueInput.dataset.role = 'value';
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-delete-var';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => this.deleteVariable(key));
            
            keyInput.addEventListener('change', (e) => {
                delete this.variables[key];
                this.variables[e.target.value] = value;
                this.saveVariables();
            });
            
            valueInput.addEventListener('change', (e) => {
                this.variables[key] = e.target.value;
                this.saveVariables();
            });
            
            item.appendChild(keyInput);
            item.appendChild(valueInput);
            item.appendChild(deleteBtn);
            list.appendChild(item);
        });
        
        modal.classList.add('active');
    }

    addVariable() {
        const key = prompt('Variable Name (ex: tenantId):');
        if (!key) return;
        
        // Validate key format (alphanumeric, underscore, hyphen only)
        if (!/^[a-zA-Z0-9_-]+$/.test(key)) {
            alert('Variable name can only contain letters, numbers, underscore and hyphen');
            return;
        }
        
        if (key.length > 100) {
            alert('Variable name too long (max 100 characters)');
            return;
        }
        
        const value = prompt('Variable Value:');
        if (value === null) return;
        
        if (value.length > 5000) {
            alert('Variable value too long (max 5000 characters)');
            return;
        }
        
        this.variables[key] = value;
        this.saveVariables();
        this.showVariables();
    }

    deleteVariable(key) {
        if (confirm(`Delete variable "${key}"?`)) {
            delete this.variables[key];
            this.saveVariables();
            this.showVariables();
        }
    }

    replaceVariables(text) {
        if (!text) return text;
        
        let result = text;
        Object.entries(this.variables).forEach(([key, value]) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            result = result.replace(regex, value);
        });
        
        return result;
    }

    // ============================================
    // TEMPLATES
    // ============================================

    loadTemplates() {
        try {
            const saved = localStorage.getItem('msrest_templates');
            if (saved) {
                const parsed = JSON.parse(saved);
                // Validate it's an array
                if (Array.isArray(parsed)) {
                    this.templates = parsed;
                } else {
                    console.warn('Invalid templates format, resetting');
                    this.templates = [];
                }
            } else {
                this.templates = [];
            }
        } catch (error) {
            console.error('Error loading templates:', error);
            this.templates = [];
        }
    }

    saveTemplates() {
        localStorage.setItem('msrest_templates', JSON.stringify(this.templates));
    }

    showTemplates() {
        const modal = document.getElementById('templatesModal');
        const list = document.getElementById('templatesList');
        
        list.innerHTML = '';
        
        this.templates.forEach((template, index) => {
            const item = document.createElement('div');
            item.className = 'template-item';
            
            // Sanitize all user input
            const header = document.createElement('div');
            header.className = 'template-item-header';
            
            const nameSpan = document.createElement('span');
            nameSpan.className = 'template-item-name';
            nameSpan.textContent = template.name;
            
            const serviceSpan = document.createElement('span');
            serviceSpan.className = 'template-item-service';
            serviceSpan.textContent = template.service;
            
            header.appendChild(nameSpan);
            header.appendChild(serviceSpan);
            
            const desc = document.createElement('div');
            desc.className = 'template-item-desc';
            desc.textContent = template.description || '';
            
            item.appendChild(header);
            item.appendChild(desc);
            
            item.addEventListener('click', () => {
                this.loadTemplate(index);
                this.closeModals();
            });
            
            list.appendChild(item);
        });
        
        modal.classList.add('active');
    }

    saveCurrentAsTemplate() {
        if (!this.currentEndpoint) {
            alert('No request to save!');
            return;
        }
        
        const name = prompt('Template Name:');
        if (!name) return;
        
        if (name.length > 200) {
            alert('Template name too long (max 200 characters)');
            return;
        }
        
        const description = prompt('Description (optional):') || '';
        
        if (description.length > 500) {
            alert('Description too long (max 500 characters)');
            return;
        }
        
        const template = {
            name,
            description,
            service: this.currentService,
            category: this.currentCategory,
            endpoint: this.currentEndpoint,
            url: document.getElementById('requestURL').value,
            method: document.getElementById('requestMethod').value,
            headers: document.getElementById('requestHeaders').value,
            body: document.getElementById('requestBody').value,
            savedAt: new Date().toISOString()
        };
        
        this.templates.push(template);
        this.saveTemplates();
        
        alert('Template saved!');
    }

    loadTemplate(index) {
        const template = this.templates[index];
        
        // Switch to service
        this.selectService(template.service);
        
        // Load configuration
        setTimeout(() => {
            document.getElementById('requestURL').value = template.url;
            document.getElementById('requestMethod').value = template.method;
            document.getElementById('requestHeaders').value = template.headers;
            document.getElementById('requestBody').value = template.body;
        }, 100);
    }

    // ============================================
    // BATCH EXECUTION
    // ============================================

    showBatch() {
        const modal = document.getElementById('batchModal');
        this.updateBatchList();
        modal.classList.add('active');
    }

    addToBatch() {
        if (!this.currentEndpoint) {
            alert('No request configured!');
            return;
        }
        
        const request = {
            service: this.currentService,
            method: document.getElementById('requestMethod').value,
            url: document.getElementById('requestURL').value,
            headers: document.getElementById('requestHeaders').value,
            body: document.getElementById('requestBody').value
        };
        
        this.batchQueue.push(request);
        this.updateBatchList();
        
        alert('Added to batch queue!');
    }

    updateBatchList() {
        const list = document.getElementById('batchList');
        list.innerHTML = '';
        
        this.batchQueue.forEach((req, index) => {
            const item = document.createElement('div');
            item.className = 'batch-item';
            
            const info = document.createElement('div');
            info.className = 'batch-item-info';
            
            const methodSpan = document.createElement('span');
            methodSpan.className = `batch-item-method method-${req.method.toLowerCase()}`;
            methodSpan.textContent = req.method;
            
            const urlSpan = document.createElement('span');
            urlSpan.className = 'batch-item-url';
            urlSpan.textContent = req.url;
            
            info.appendChild(methodSpan);
            info.appendChild(urlSpan);
            
            const actions = document.createElement('div');
            actions.className = 'batch-actions';
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'btn-secondary btn-sm';
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', () => this.removeBatchItem(index));
            
            actions.appendChild(removeBtn);
            item.appendChild(info);
            item.appendChild(actions);
            list.appendChild(item);
        });
    }

    removeBatchItem(index) {
        this.batchQueue.splice(index, 1);
        this.updateBatchList();
    }

    clearBatch() {
        if (confirm('Clear all batch items?')) {
            this.batchQueue = [];
            this.updateBatchList();
        }
    }

    async executeBatch() {
        if (this.batchQueue.length === 0) {
            alert('Batch queue is empty!');
            return;
        }
        
        const results = [];
        const total = this.batchQueue.length;
        
        for (let i = 0; i < this.batchQueue.length; i++) {
            const req = this.batchQueue[i];
            
            console.log(`Executing batch ${i + 1}/${total}...`);
            
            try {
                const token = await auth.getAccessToken(SERVICES[req.service].authScope);
                
                const headers = {};
                if (req.headers) {
                    req.headers.split('\n').forEach(line => {
                        const [key, value] = line.split(':').map(s => s.trim());
                        if (key) headers[key] = value;
                    });
                }
                headers['Authorization'] = `Bearer ${token}`;
                
                const options = {
                    method: req.method,
                    headers
                };
                
                if (req.body && req.method !== 'GET') {
                    options.body = this.replaceVariables(req.body);
                }
                
                const url = this.replaceVariables(req.url);
                const response = await fetch(url, options);
                const data = await response.json();
                
                results.push({
                    request: req,
                    success: response.ok,
                    status: response.status,
                    data
                });
                
                // Record rate limit
                this.rateLimitTracker.recordRequest(req.service);
                
            } catch (error) {
                results.push({
                    request: req,
                    success: false,
                    error: error.message
                });
            }
        }
        
        console.log('Batch execution completed:', results);
        alert(`Batch completed! ${results.filter(r => r.success).length}/${total} successful`);
        
        this.closeModals();
    }

    // ============================================
    // RESPONSE COMPARISON
    // ============================================

    saveForComparison(side) {
        const responseContent = document.getElementById('responseContent');
        
        if (!responseContent.textContent) {
            alert('No response to save!');
            return;
        }
        
        this.comparisonData[side] = {
            response: responseContent.textContent,
            savedAt: new Date().toISOString()
        };
        
        alert(`Saved to ${side} side!`);
    }

    showComparison() {
        const modal = document.getElementById('compareModal');
        
        document.getElementById('compareLeft').textContent = 
            this.comparisonData.left ? JSON.stringify(JSON.parse(this.comparisonData.left.response), null, 2) : 'No data';
        
        document.getElementById('compareRight').textContent = 
            this.comparisonData.right ? JSON.stringify(JSON.parse(this.comparisonData.right.response), null, 2) : 'No data';
        
        modal.classList.add('active');
    }

    // ============================================
    // IMPORT/EXPORT
    // ============================================

    showImportExport() {
        const modal = document.getElementById('importExportModal');
        modal.classList.add('active');
    }

    exportCollection() {
        const collection = {
            version: '1.0',
            exportedAt: new Date().toISOString(),
            variables: this.variables,
            templates: this.templates,
            history: storage.getHistory(),
            favorites: storage.getFavorites()
        };
        
        const blob = new Blob([JSON.stringify(collection, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `msrest-collection-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    importCollection() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = (event) => {
                try {
                    const collection = JSON.parse(event.target.result);
                    
                    // Validate collection structure
                    if (typeof collection !== 'object') {
                        throw new Error('Invalid collection format');
                    }
                    
                    // Import variables with validation
                    if (collection.variables && typeof collection.variables === 'object') {
                        Object.entries(collection.variables).forEach(([key, value]) => {
                            // Validate key format
                            if (typeof key === 'string' && /^[a-zA-Z0-9_-]+$/.test(key) && key.length <= 100) {
                                if (typeof value === 'string' && value.length <= 5000) {
                                    this.variables[key] = value;
                                }
                            }
                        });
                        this.saveVariables();
                    }
                    
                    // Import templates with validation
                    if (collection.templates && Array.isArray(collection.templates)) {
                        collection.templates.forEach(template => {
                            if (template.name && typeof template.name === 'string' && template.name.length <= 200) {
                                this.templates.push({
                                    name: template.name,
                                    description: (template.description || '').substring(0, 500),
                                    service: template.service,
                                    category: template.category,
                                    endpoint: template.endpoint,
                                    url: template.url,
                                    method: template.method,
                                    headers: template.headers,
                                    body: template.body,
                                    savedAt: template.savedAt
                                });
                            }
                        });
                        this.saveTemplates();
                    }
                    
                    alert('Collection imported successfully!');
                } catch (error) {
                    alert('Error importing collection: ' + error.message);
                }
            };
            
            reader.readAsText(file);
        };
        
        input.click();
    }

    // ============================================
    // RATE LIMITING
    // ============================================

    updateRateLimitDisplay() {
        if (!this.currentService) return;
        
        const usage = this.rateLimitTracker.getUsage(this.currentService);
        const status = this.rateLimitTracker.getStatus(this.currentService);
        
        const rateLimitInfo = document.querySelector('.rate-limit-info');
        const rateLimitFill = document.querySelector('.rate-limit-fill');
        const rateLimitText = document.querySelector('.rate-limit-text');
        
        if (!rateLimitInfo) return;
        
        rateLimitInfo.classList.remove('hidden', 'warning', 'danger');
        
        if (status.level === 'warning') {
            rateLimitInfo.classList.add('warning');
        } else if (status.level === 'danger') {
            rateLimitInfo.classList.add('danger');
        }
        
        rateLimitFill.style.width = `${usage.percentage}%`;
        rateLimitText.innerHTML = `
            <span>${status.message}</span>
            <span>${usage.count} / ${usage.limit} requests</span>
        `;
    }

    // ============================================
    // RESPONSE ACTIONS
    // ============================================

    copyResponse() {
        const responseContent = document.getElementById('responseContent');
        navigator.clipboard.writeText(responseContent.textContent);
        alert('Response copied!');
    }

    copyURL() {
        const url = document.getElementById('requestURL').value;
        navigator.clipboard.writeText(url);
        alert('URL copied!');
    }

    formatJSON() {
        const responseContent = document.getElementById('responseContent');
        try {
            const json = JSON.parse(responseContent.textContent);
            responseContent.textContent = JSON.stringify(json, null, 2);
        } catch (error) {
            alert('Invalid JSON');
        }
    }

    downloadResponse() {
        const responseContent = document.getElementById('responseContent');
        const blob = new Blob([responseContent.textContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `response-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // ============================================
    // FULLSCREEN
    // ============================================

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.warn('Fullscreen request failed:', err.message);
            });
        } else {
            document.exitFullscreen();
        }
    }

    onFullscreenChange() {
        const enterIcon = document.getElementById('iconEnterFS');
        const exitIcon = document.getElementById('iconExitFS');
        if (document.fullscreenElement) {
            enterIcon.style.display = 'none';
            exitIcon.style.display = '';
        } else {
            enterIcon.style.display = '';
            exitIcon.style.display = 'none';
        }
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MSRESTClient();
});
