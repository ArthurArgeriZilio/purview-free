// ============================================
// RATE LIMITS POR SERVIÇO MICROSOFT
// ============================================

const RATE_LIMITS = {
    powerbi: {
        name: 'Power BI',
        limits: [
            { requests: 200, window: 3600, description: '200 requests per hour per user' },
            { requests: 1000, window: 86400, description: '1,000 requests per day per user' }
        ],
        docs: 'https://learn.microsoft.com/en-us/power-bi/developer/automation/api-automatic-retry-service-limits'
    },
    
    purview: {
        name: 'Microsoft Purview',
        limits: [
            { requests: 100, window: 60, description: '100 requests per minute' },
            { requests: 10000, window: 3600, description: '10,000 requests per hour' }
        ],
        docs: 'https://learn.microsoft.com/en-us/purview/catalog-api-rate-limits'
    },
    
    azure: {
        name: 'Azure Resource Manager',
        limits: [
            { requests: 12000, window: 3600, description: '12,000 read requests per hour' },
            { requests: 1200, window: 3600, description: '1,200 write requests per hour' }
        ],
        docs: 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling'
    },
    
    fabric: {
        name: 'Microsoft Fabric',
        limits: [
            { requests: 200, window: 3600, description: '200 requests per hour per user' },
            { requests: 1000, window: 86400, description: '1,000 requests per day per user' }
        ],
        docs: 'https://learn.microsoft.com/en-us/fabric/admin/service-admin-portal'
    },
    
    graph: {
        name: 'Microsoft Graph',
        limits: [
            { requests: 10000, window: 600, description: '10,000 requests per 10 minutes per app' },
            { requests: 2000, window: 1, description: 'Burst: 2,000 requests per second' }
        ],
        docs: 'https://learn.microsoft.com/en-us/graph/throttling'
    },
    
    onedrive: {
        name: 'OneDrive (Graph)',
        limits: [
            { requests: 10000, window: 600, description: '10,000 requests per 10 minutes per app' },
            { requests: 2000, window: 1, description: 'Burst: 2,000 requests per second' }
        ],
        docs: 'https://learn.microsoft.com/en-us/graph/throttling'
    },
    
    sharepoint: {
        name: 'SharePoint (Graph)',
        limits: [
            { requests: 10000, window: 600, description: '10,000 requests per 10 minutes per app' },
            { requests: 2000, window: 1, description: 'Burst: 2,000 requests per second' }
        ],
        docs: 'https://learn.microsoft.com/en-us/graph/throttling'
    },
    
    synapse: {
        name: 'Azure Synapse',
        limits: [
            { requests: 12000, window: 3600, description: '12,000 read requests per hour' },
            { requests: 1200, window: 3600, description: '1,200 write requests per hour' }
        ],
        docs: 'https://learn.microsoft.com/en-us/azure/synapse-analytics/sql-data-warehouse/what-is-a-data-warehouse-unit-dwu-cdwu'
    }
};

class RateLimitTracker {
    constructor() {
        this.requests = {};
        this.loadFromStorage();
    }

    loadFromStorage() {
        try {
            const data = localStorage.getItem('msrc_rate_limits');
            if (data) {
                this.requests = JSON.parse(data);
                // Clean old data
                this.cleanOldRequests();
            }
        } catch (error) {
            console.error('Error loading rate limits:', error);
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem('msrc_rate_limits', JSON.stringify(this.requests));
        } catch (error) {
            console.error('Error saving rate limits:', error);
        }
    }

    cleanOldRequests() {
        const now = Date.now();
        Object.keys(this.requests).forEach(service => {
            if (!this.requests[service]) return;
            this.requests[service] = this.requests[service].filter(timestamp => {
                return now - timestamp < 86400000; // Keep last 24 hours
            });
        });
        this.saveToStorage();
    }

    recordRequest(service) {
        if (!this.requests[service]) {
            this.requests[service] = [];
        }
        this.requests[service].push(Date.now());
        this.saveToStorage();
    }

    getUsage(service, windowSeconds) {
        if (!this.requests[service]) return 0;
        
        const now = Date.now();
        const windowMs = windowSeconds * 1000;
        
        return this.requests[service].filter(timestamp => {
            return now - timestamp < windowMs;
        }).length;
    }

    getStatus(service) {
        const limits = RATE_LIMITS[service];
        if (!limits) return null;

        const status = limits.limits.map(limit => {
            const usage = this.getUsage(service, limit.window);
            const percentage = (usage / limit.requests) * 100;
            
            return {
                usage,
                limit: limit.requests,
                window: limit.window,
                percentage: Math.min(percentage, 100),
                description: limit.description,
                warning: percentage > 80,
                danger: percentage > 95
            };
        });

        return {
            name: limits.name,
            docs: limits.docs,
            limits: status
        };
    }

    canMakeRequest(service) {
        const status = this.getStatus(service);
        if (!status) return true;

        // Check if any limit is at 100%
        return !status.limits.some(limit => limit.percentage >= 100);
    }

    getResetTime(service, windowSeconds) {
        if (!this.requests[service] || this.requests[service].length === 0) {
            return null;
        }

        const oldestRequest = Math.min(...this.requests[service]);
        const resetTime = oldestRequest + (windowSeconds * 1000);
        
        return new Date(resetTime);
    }
}

const rateLimitTracker = new RateLimitTracker();
