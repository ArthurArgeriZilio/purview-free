// ============================================
// MICROSOFT SERVICES REST CLIENT - SERVICES CONFIGURATION
// ============================================

const SERVICES = {
    powerbi: {
        name: 'Power BI',
        baseUrl: 'https://api.powerbi.com/v1.0/myorg',
        authScope: 'https://analysis.windows.net/powerbi/api/.default',
        categories: {
            dashboards: {
                name: 'Dashboards',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/dashboards',
                        description: 'Returns a list of dashboards from "My Workspace"',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/dashboards/get-dashboards'
                    },
                    {
                        method: 'GET',
                        path: '/groups/{groupId}/dashboards',
                        description: 'Returns a list of dashboards from the specified workspace',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/dashboards/get-dashboards-in-group'
                    },
                    {
                        method: 'GET',
                        path: '/dashboards/{dashboardId}',
                        description: 'Returns the specified dashboard from "My Workspace"',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/dashboards/get-dashboard'
                    },
                    {
                        method: 'GET',
                        path: '/dashboards/{dashboardId}/tiles',
                        description: 'Returns a list of tiles within the specified dashboard',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/dashboards/get-tiles'
                    },
                    {
                        method: 'POST',
                        path: '/dashboards/{dashboardId}/Clone',
                        description: 'Clones the specified dashboard',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/dashboards/clone-dashboard'
                    },
                    {
                        method: 'POST',
                        path: '/dashboards/GenerateToken',
                        description: 'Generates an embed token for dashboard embedding',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/embed-token/dashboards-generate-token-in-group'
                    }
                ]
            },
            reports: {
                name: 'Reports',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/reports',
                        description: 'Returns a list of reports from "My Workspace"',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/reports/get-reports'
                    },
                    {
                        method: 'GET',
                        path: '/groups/{groupId}/reports',
                        description: 'Returns a list of reports from the specified workspace',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/reports/get-reports-in-group'
                    },
                    {
                        method: 'GET',
                        path: '/reports/{reportId}',
                        description: 'Returns the specified report from "My Workspace"',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/reports/get-report'
                    },
                    {
                        method: 'GET',
                        path: '/groups/{groupId}/reports/{reportId}',
                        description: 'Returns the specified report from the specified workspace',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/reports/get-report-in-group'
                    },
                    {
                        method: 'POST',
                        path: '/reports/{reportId}/Clone',
                        description: 'Clones the specified report',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/reports/clone-report'
                    },
                    {
                        method: 'POST',
                        path: '/reports/{reportId}/Export',
                        description: 'Exports the specified report to .pbix file',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/reports/export-report'
                    },
                    {
                        method: 'GET',
                        path: '/reports/{reportId}/pages',
                        description: 'Returns a list of pages within the specified report',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/reports/get-pages'
                    },
                    {
                        method: 'DELETE',
                        path: '/reports/{reportId}',
                        description: 'Deletes the specified report from "My Workspace"',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/reports/delete-report'
                    }
                ]
            },
            datasets: {
                name: 'Datasets',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/datasets',
                        description: 'Returns a list of datasets from "My Workspace"',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/datasets/get-datasets'
                    },
                    {
                        method: 'GET',
                        path: '/groups/{groupId}/datasets',
                        description: 'Returns a list of datasets from the specified workspace',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/datasets/get-datasets-in-group'
                    },
                    {
                        method: 'GET',
                        path: '/datasets/{datasetId}',
                        description: 'Returns the specified dataset from "My Workspace"',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/datasets/get-dataset'
                    },
                    {
                        method: 'POST',
                        path: '/datasets/{datasetId}/refreshes',
                        description: 'Triggers a refresh for the specified dataset',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/datasets/refresh-dataset'
                    },
                    {
                        method: 'GET',
                        path: '/datasets/{datasetId}/refreshes',
                        description: 'Returns the refresh history for the specified dataset',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/datasets/get-refresh-history'
                    },
                    {
                        method: 'GET',
                        path: '/datasets/{datasetId}/datasources',
                        description: 'Returns a list of datasources for the specified dataset',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/datasets/get-datasources'
                    },
                    {
                        method: 'PATCH',
                        path: '/datasets/{datasetId}/Default.UpdateParameters',
                        description: 'Updates the parameters values for the specified dataset',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/datasets/update-parameters'
                    },
                    {
                        method: 'DELETE',
                        path: '/datasets/{datasetId}',
                        description: 'Deletes the specified dataset from "My Workspace"',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/datasets/delete-dataset'
                    }
                ]
            },
            dataflows: {
                name: 'Dataflows',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/groups/{groupId}/dataflows',
                        description: 'Returns a list of dataflows from the specified workspace',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/dataflows/get-dataflows'
                    },
                    {
                        method: 'GET',
                        path: '/groups/{groupId}/dataflows/{dataflowId}',
                        description: 'Returns the specified dataflow from the specified workspace',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/dataflows/get-dataflow'
                    },
                    {
                        method: 'POST',
                        path: '/groups/{groupId}/dataflows/{dataflowId}/refreshes',
                        description: 'Triggers a refresh for the specified dataflow',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/dataflows/refresh-dataflow'
                    },
                    {
                        method: 'GET',
                        path: '/groups/{groupId}/dataflows/{dataflowId}/transactions',
                        description: 'Returns a list of transactions for the specified dataflow',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/dataflows/get-dataflow-transactions'
                    }
                ]
            },
            groups: {
                name: 'Workspaces/Groups',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/groups',
                        description: 'Returns a list of workspaces the user has access to',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/groups/get-groups'
                    },
                    {
                        method: 'GET',
                        path: '/groups/{groupId}',
                        description: 'Returns the specified workspace',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/groups/get-group'
                    },
                    {
                        method: 'POST',
                        path: '/groups',
                        description: 'Creates a new workspace',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/groups/create-group'
                    },
                    {
                        method: 'DELETE',
                        path: '/groups/{groupId}',
                        description: 'Deletes the specified workspace',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/groups/delete-group'
                    },
                    {
                        method: 'GET',
                        path: '/groups/{groupId}/users',
                        description: 'Returns a list of users that have access to the specified workspace',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/groups/get-group-users'
                    },
                    {
                        method: 'POST',
                        path: '/groups/{groupId}/users',
                        description: 'Grants the specified user permissions to the specified workspace',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/groups/add-group-user'
                    }
                ]
            },
            pipelines: {
                name: 'Deployment Pipelines',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/pipelines',
                        description: 'Returns a list of deployment pipelines the user has access to',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/pipelines/get-pipelines'
                    },
                    {
                        method: 'GET',
                        path: '/pipelines/{pipelineId}',
                        description: 'Returns the specified deployment pipeline',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/pipelines/get-pipeline'
                    },
                    {
                        method: 'POST',
                        path: '/pipelines/{pipelineId}/Deploy',
                        description: 'Deploys content from source stage to target stage',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/pipelines/deploy'
                    },
                    {
                        method: 'GET',
                        path: '/pipelines/{pipelineId}/stages',
                        description: 'Returns the stages of the specified deployment pipeline',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/pipelines/get-pipeline-stages'
                    },
                    {
                        method: 'GET',
                        path: '/pipelines/{pipelineId}/operations',
                        description: 'Returns a list of operations for the specified deployment pipeline',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/pipelines/get-pipeline-operations'
                    }
                ]
            },
            apps: {
                name: 'Apps',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/apps',
                        description: 'Returns a list of installed apps',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/apps/get-apps'
                    },
                    {
                        method: 'GET',
                        path: '/apps/{appId}',
                        description: 'Returns the specified installed app',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/apps/get-app'
                    },
                    {
                        method: 'GET',
                        path: '/apps/{appId}/reports',
                        description: 'Returns a list of reports from the specified app',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/apps/get-reports'
                    },
                    {
                        method: 'GET',
                        path: '/apps/{appId}/dashboards',
                        description: 'Returns a list of dashboards from the specified app',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/apps/get-dashboards'
                    }
                ]
            },
            capacities: {
                name: 'Capacities',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/capacities',
                        description: 'Returns a list of capacities the user has access to',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/capacities/get-capacities'
                    },
                    {
                        method: 'GET',
                        path: '/capacities/{capacityId}',
                        description: 'Returns the specified capacity',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/capacities/get-capacity'
                    },
                    {
                        method: 'PATCH',
                        path: '/capacities/{capacityId}',
                        description: 'Updates the specified capacity',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/capacities/patch-capacity'
                    }
                ]
            },
            gateways: {
                name: 'Gateways',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/gateways',
                        description: 'Returns a list of gateways',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/gateways/get-gateways'
                    },
                    {
                        method: 'GET',
                        path: '/gateways/{gatewayId}',
                        description: 'Returns the specified gateway',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/gateways/get-gateway'
                    },
                    {
                        method: 'GET',
                        path: '/gateways/{gatewayId}/datasources',
                        description: 'Returns a list of datasources from the specified gateway',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/power-bi/gateways/get-datasources'
                    }
                ]
            }
        }
    },

    purview: {
        name: 'Microsoft Purview',
        baseUrl: 'https://{accountName}.purview.azure.com',
        authScope: 'https://purview.azure.net/.default',
        categories: {
            catalog: {
                name: 'Catalog',
                endpoints: [
                    {
                        method: 'POST',
                        path: '/catalog/api/search/query',
                        description: 'Gets data using search',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/purview/catalogdataplane/discovery/query'
                    },
                    {
                        method: 'GET',
                        path: '/catalog/api/atlas/v2/entity/guid/{guid}',
                        description: 'Gets entity by GUID',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/purview/catalogdataplane/entity/get-by-guid'
                    },
                    {
                        method: 'POST',
                        path: '/catalog/api/atlas/v2/entity',
                        description: 'Creates or updates an entity',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/purview/catalogdataplane/entity/create-or-update'
                    },
                    {
                        method: 'PUT',
                        path: '/catalog/api/atlas/v2/entity',
                        description: 'Updates entity by attribute',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/purview/catalogdataplane/entity/partial-update-entity-attribute-by-guid'
                    },
                    {
                        method: 'DELETE',
                        path: '/catalog/api/atlas/v2/entity/guid/{guid}',
                        description: 'Deletes an entity by GUID',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/purview/catalogdataplane/entity/delete-by-guid'
                    }
                ]
            },
            glossary: {
                name: 'Glossary',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/catalog/api/atlas/v2/glossary',
                        description: 'Gets all glossaries',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/purview/catalogdataplane/glossary/list'
                    },
                    {
                        method: 'POST',
                        path: '/catalog/api/atlas/v2/glossary',
                        description: 'Creates a glossary',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/purview/catalogdataplane/glossary/create'
                    },
                    {
                        method: 'GET',
                        path: '/catalog/api/atlas/v2/glossary/{glossaryGuid}',
                        description: 'Gets a specific glossary',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/purview/catalogdataplane/glossary/get'
                    },
                    {
                        method: 'GET',
                        path: '/catalog/api/atlas/v2/glossary/{glossaryGuid}/terms',
                        description: 'Gets all terms from a glossary',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/purview/catalogdataplane/glossary/list-terms'
                    },
                    {
                        method: 'POST',
                        path: '/catalog/api/atlas/v2/glossary/term',
                        description: 'Creates a glossary term',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/purview/catalogdataplane/glossary/create-term'
                    }
                ]
            },
            lineage: {
                name: 'Lineage',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/catalog/api/atlas/v2/lineage/{guid}',
                        description: 'Gets lineage information about entity',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/purview/catalogdataplane/lineage/get'
                    },
                    {
                        method: 'GET',
                        path: '/catalog/api/browse',
                        description: 'Browse entities by path',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/purview/catalogdataplane/discovery/browse'
                    }
                ]
            },
            collections: {
                name: 'Collections',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/account/collections',
                        description: 'Lists all collections',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/purview/accountdataplane/collections/list-collections'
                    },
                    {
                        method: 'GET',
                        path: '/account/collections/{collectionName}',
                        description: 'Gets a specific collection',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/purview/accountdataplane/collections/get-collection'
                    },
                    {
                        method: 'PUT',
                        path: '/account/collections/{collectionName}',
                        description: 'Creates or updates a collection',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/purview/accountdataplane/collections/create-or-update-collection'
                    }
                ]
            },
            scans: {
                name: 'Scans',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/scan/datasources',
                        description: 'Lists all data sources',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/purview/scandataplane/data-sources/list-all'
                    },
                    {
                        method: 'GET',
                        path: '/scan/datasources/{dataSourceName}',
                        description: 'Gets a specific data source',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/purview/scandataplane/data-sources/get'
                    },
                    {
                        method: 'PUT',
                        path: '/scan/datasources/{dataSourceName}',
                        description: 'Creates or updates a data source',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/purview/scandataplane/data-sources/create-or-update'
                    },
                    {
                        method: 'GET',
                        path: '/scan/datasources/{dataSourceName}/scans',
                        description: 'Lists scans in data source',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/purview/scandataplane/scans/list-by-data-source'
                    },
                    {
                        method: 'PUT',
                        path: '/scan/datasources/{dataSourceName}/scans/{scanName}/run',
                        description: 'Runs a scan',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/purview/scandataplane/scan-rulesets/get'
                    }
                ]
            }
        }
    },

    azure: {
        name: 'Azure Resource Manager',
        baseUrl: 'https://management.azure.com',
        authScope: 'https://management.azure.com/.default',
        categories: {
            resourceGroups: {
                name: 'Resource Groups',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/subscriptions/{subscriptionId}/resourcegroups',
                        description: 'Gets all resource groups for a subscription',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/resources/resource-groups/list'
                    },
                    {
                        method: 'GET',
                        path: '/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}',
                        description: 'Gets a specific resource group',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/resources/resource-groups/get'
                    },
                    {
                        method: 'PUT',
                        path: '/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}',
                        description: 'Creates or updates a resource group',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/resources/resource-groups/create-or-update'
                    },
                    {
                        method: 'DELETE',
                        path: '/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}',
                        description: 'Deletes a resource group',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/resources/resource-groups/delete'
                    }
                ]
            },
            virtualMachines: {
                name: 'Virtual Machines',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/subscriptions/{subscriptionId}/providers/Microsoft.Compute/virtualMachines',
                        description: 'Lists all virtual machines in the subscription',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/compute/virtual-machines/list-all'
                    },
                    {
                        method: 'GET',
                        path: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}',
                        description: 'Gets information about a virtual machine',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/compute/virtual-machines/get'
                    },
                    {
                        method: 'POST',
                        path: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/start',
                        description: 'Starts a virtual machine',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/compute/virtual-machines/start'
                    },
                    {
                        method: 'POST',
                        path: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/powerOff',
                        description: 'Powers off a virtual machine',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/compute/virtual-machines/power-off'
                    },
                    {
                        method: 'POST',
                        path: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/restart',
                        description: 'Restarts a virtual machine',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/compute/virtual-machines/restart'
                    }
                ]
            },
            storageAccounts: {
                name: 'Storage Accounts',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/subscriptions/{subscriptionId}/providers/Microsoft.Storage/storageAccounts',
                        description: 'Lists all storage accounts in the subscription',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/storagerp/storage-accounts/list'
                    },
                    {
                        method: 'GET',
                        path: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}',
                        description: 'Gets properties of a storage account',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/storagerp/storage-accounts/get-properties'
                    },
                    {
                        method: 'PUT',
                        path: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}',
                        description: 'Creates or updates a storage account',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/storagerp/storage-accounts/create'
                    }
                ]
            },
            subscriptions: {
                name: 'Subscriptions',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/subscriptions',
                        description: 'Gets all subscriptions for a tenant',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/resources/subscriptions/list'
                    },
                    {
                        method: 'GET',
                        path: '/subscriptions/{subscriptionId}',
                        description: 'Gets details about a specific subscription',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/resources/subscriptions/get'
                    },
                    {
                        method: 'GET',
                        path: '/subscriptions/{subscriptionId}/providers',
                        description: 'Gets all resource providers for a subscription',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/resources/providers/list'
                    }
                ]
            }
        }
    },

    fabric: {
        name: 'Microsoft Fabric',
        baseUrl: 'https://api.fabric.microsoft.com',
        authScope: 'https://api.fabric.microsoft.com/.default',
        categories: {
            workspaces: {
                name: 'Workspaces',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/v1/workspaces',
                        description: 'Lists all workspaces',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/fabric/core/workspaces/list-workspaces'
                    },
                    {
                        method: 'GET',
                        path: '/v1/workspaces/{workspaceId}',
                        description: 'Gets a specific workspace',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/fabric/core/workspaces/get-workspace'
                    },
                    {
                        method: 'POST',
                        path: '/v1/workspaces',
                        description: 'Creates a new workspace',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/fabric/core/workspaces/create-workspace'
                    },
                    {
                        method: 'PATCH',
                        path: '/v1/workspaces/{workspaceId}',
                        description: 'Updates workspace properties',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/fabric/core/workspaces/update-workspace'
                    },
                    {
                        method: 'DELETE',
                        path: '/v1/workspaces/{workspaceId}',
                        description: 'Deletes a workspace',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/fabric/core/workspaces/delete-workspace'
                    }
                ]
            },
            items: {
                name: 'Items',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/v1/workspaces/{workspaceId}/items',
                        description: 'Lists all items in a workspace',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/fabric/core/items/list-items'
                    },
                    {
                        method: 'POST',
                        path: '/v1/workspaces/{workspaceId}/items',
                        description: 'Creates a new item in a workspace',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/fabric/core/items/create-item'
                    },
                    {
                        method: 'GET',
                        path: '/v1/workspaces/{workspaceId}/{itemType}/{itemId}',
                        description: 'Gets a specific item',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/fabric/core/items/get-item'
                    },
                    {
                        method: 'DELETE',
                        path: '/v1/workspaces/{workspaceId}/{itemType}/{itemId}',
                        description: 'Deletes an item',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/fabric/core/items/delete-item'
                    }
                ]
            },
            lakehouses: {
                name: 'Lakehouses',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/v1/workspaces/{workspaceId}/lakehouses',
                        description: 'Lists all lakehouses in a workspace',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/fabric/lakehouse/items/list-lakehouses'
                    },
                    {
                        method: 'POST',
                        path: '/v1/workspaces/{workspaceId}/lakehouses',
                        description: 'Creates a new lakehouse',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/fabric/lakehouse/items/create-lakehouse'
                    },
                    {
                        method: 'GET',
                        path: '/v1/workspaces/{workspaceId}/lakehouses/{lakehouseId}',
                        description: 'Gets a specific lakehouse',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/fabric/lakehouse/items/get-lakehouse'
                    },
                    {
                        method: 'GET',
                        path: '/v1/workspaces/{workspaceId}/lakehouses/{lakehouseId}/tables',
                        description: 'Lists all tables in a lakehouse',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/fabric/lakehouse/tables/list-tables'
                    }
                ]
            },
            notebooks: {
                name: 'Notebooks',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/v1/workspaces/{workspaceId}/notebooks',
                        description: 'Lists all notebooks in a workspace',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/fabric/notebook/items/list-notebooks'
                    },
                    {
                        method: 'POST',
                        path: '/v1/workspaces/{workspaceId}/notebooks',
                        description: 'Creates a new notebook',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/fabric/notebook/items/create-notebook'
                    },
                    {
                        method: 'GET',
                        path: '/v1/workspaces/{workspaceId}/notebooks/{notebookId}',
                        description: 'Gets a specific notebook',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/fabric/notebook/items/get-notebook'
                    }
                ]
            }
        }
    },

    graph: {
        name: 'Microsoft Graph API',
        baseUrl: 'https://graph.microsoft.com/v1.0',
        authScope: 'https://graph.microsoft.com/.default',
        categories: {
            users: {
                name: 'Users',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/users',
                        description: 'Lists all users in the organization',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/user-list'
                    },
                    {
                        method: 'GET',
                        path: '/users/{userId}',
                        description: 'Gets a specific user',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/user-get'
                    },
                    {
                        method: 'POST',
                        path: '/users',
                        description: 'Creates a new user',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/user-post-users'
                    },
                    {
                        method: 'PATCH',
                        path: '/users/{userId}',
                        description: 'Updates user properties',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/user-update'
                    },
                    {
                        method: 'DELETE',
                        path: '/users/{userId}',
                        description: 'Deletes a user',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/user-delete'
                    }
                ]
            },
            groups: {
                name: 'Groups',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/groups',
                        description: 'Lists all groups in the organization',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/group-list'
                    },
                    {
                        method: 'GET',
                        path: '/groups/{groupId}',
                        description: 'Gets a specific group',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/group-get'
                    },
                    {
                        method: 'POST',
                        path: '/groups',
                        description: 'Creates a new group',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/group-post-groups'
                    },
                    {
                        method: 'GET',
                        path: '/groups/{groupId}/members',
                        description: 'Lists group members',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/group-list-members'
                    },
                    {
                        method: 'POST',
                        path: '/groups/{groupId}/members/$ref',
                        description: 'Adds a member to a group',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/group-post-members'
                    }
                ]
            },
            mail: {
                name: 'Mail',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/users/{userId}/messages',
                        description: 'Gets messages in user mailbox',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/user-list-messages'
                    },
                    {
                        method: 'GET',
                        path: '/users/{userId}/messages/{messageId}',
                        description: 'Gets a specific message',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/message-get'
                    },
                    {
                        method: 'POST',
                        path: '/users/{userId}/sendMail',
                        description: 'Sends an email message',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/user-sendmail'
                    },
                    {
                        method: 'GET',
                        path: '/users/{userId}/mailFolders',
                        description: 'Lists mail folders',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/user-list-mailfolders'
                    }
                ]
            },
            calendar: {
                name: 'Calendar',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/users/{userId}/events',
                        description: 'Lists calendar events',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/user-list-events'
                    },
                    {
                        method: 'GET',
                        path: '/users/{userId}/events/{eventId}',
                        description: 'Gets a specific event',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/event-get'
                    },
                    {
                        method: 'POST',
                        path: '/users/{userId}/events',
                        description: 'Creates a new calendar event',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/user-post-events'
                    },
                    {
                        method: 'GET',
                        path: '/users/{userId}/calendars',
                        description: 'Lists user calendars',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/user-list-calendars'
                    }
                ]
            },
            teams: {
                name: 'Teams',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/teams',
                        description: 'Lists all teams',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/team-list'
                    },
                    {
                        method: 'GET',
                        path: '/teams/{teamId}',
                        description: 'Gets a specific team',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/team-get'
                    },
                    {
                        method: 'GET',
                        path: '/teams/{teamId}/channels',
                        description: 'Lists team channels',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/channel-list'
                    },
                    {
                        method: 'POST',
                        path: '/teams/{teamId}/channels',
                        description: 'Creates a new channel',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/channel-post'
                    }
                ]
            },
            sites: {
                name: 'Sites (SharePoint)',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/sites/{siteId}',
                        description: 'Gets a site',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/site-get'
                    },
                    {
                        method: 'GET',
                        path: '/sites/{siteId}/lists',
                        description: 'Lists site lists',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/list-list'
                    },
                    {
                        method: 'GET',
                        path: '/sites/{siteId}/drive',
                        description: 'Gets the default drive of a site',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/drive-get'
                    }
                ]
            }
        }
    },

    onedrive: {
        name: 'OneDrive',
        baseUrl: 'https://graph.microsoft.com/v1.0',
        authScope: 'https://graph.microsoft.com/.default',
        categories: {
            drive: {
                name: 'Drive',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/me/drive',
                        description: 'Gets the default drive for user',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/drive-get'
                    },
                    {
                        method: 'GET',
                        path: '/drives/{driveId}',
                        description: 'Gets a specific drive',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/drive-get'
                    },
                    {
                        method: 'GET',
                        path: '/me/drive/root/children',
                        description: 'Lists items in the root folder',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/driveitem-list-children'
                    }
                ]
            },
            items: {
                name: 'Items',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/drives/{driveId}/items/{itemId}',
                        description: 'Gets metadata for an item',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/driveitem-get'
                    },
                    {
                        method: 'GET',
                        path: '/drives/{driveId}/items/{itemId}/children',
                        description: 'Lists children of an item',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/driveitem-list-children'
                    },
                    {
                        method: 'POST',
                        path: '/drives/{driveId}/items/{parentId}/children',
                        description: 'Creates a new item',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/driveitem-post-children'
                    },
                    {
                        method: 'PUT',
                        path: '/drives/{driveId}/items/{itemId}/content',
                        description: 'Uploads or replaces file content',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/driveitem-put-content'
                    },
                    {
                        method: 'GET',
                        path: '/drives/{driveId}/items/{itemId}/content',
                        description: 'Downloads file content',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/driveitem-get-content'
                    },
                    {
                        method: 'DELETE',
                        path: '/drives/{driveId}/items/{itemId}',
                        description: 'Deletes an item',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/driveitem-delete'
                    }
                ]
            },
            sharing: {
                name: 'Sharing',
                endpoints: [
                    {
                        method: 'POST',
                        path: '/drives/{driveId}/items/{itemId}/createLink',
                        description: 'Creates a sharing link',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/driveitem-createlink'
                    },
                    {
                        method: 'GET',
                        path: '/drives/{driveId}/items/{itemId}/permissions',
                        description: 'Lists sharing permissions',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/driveitem-list-permissions'
                    },
                    {
                        method: 'POST',
                        path: '/drives/{driveId}/items/{itemId}/invite',
                        description: 'Sends a sharing invitation',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/driveitem-invite'
                    }
                ]
            },
            search: {
                name: 'Search',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/drives/{driveId}/root/search(q=\'{query}\')',
                        description: 'Searches for files and folders',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/driveitem-search'
                    },
                    {
                        method: 'GET',
                        path: '/me/drive/root/search(q=\'{query}\')',
                        description: 'Searches user\'s OneDrive',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/driveitem-search'
                    }
                ]
            }
        }
    },

    sharepoint: {
        name: 'SharePoint',
        baseUrl: 'https://graph.microsoft.com/v1.0',
        authScope: 'https://graph.microsoft.com/.default',
        categories: {
            sites: {
                name: 'Sites',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/sites/{siteId}',
                        description: 'Gets a SharePoint site',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/site-get'
                    },
                    {
                        method: 'GET',
                        path: '/sites/{hostname}:/{serverRelativeUrl}',
                        description: 'Gets a site by path',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/site-getbypath'
                    },
                    {
                        method: 'GET',
                        path: '/sites/{siteId}/sites',
                        description: 'Lists subsites',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/site-list-subsites'
                    }
                ]
            },
            lists: {
                name: 'Lists',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/sites/{siteId}/lists',
                        description: 'Gets lists in a site',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/list-list'
                    },
                    {
                        method: 'GET',
                        path: '/sites/{siteId}/lists/{listId}',
                        description: 'Gets a specific list',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/list-get'
                    },
                    {
                        method: 'POST',
                        path: '/sites/{siteId}/lists',
                        description: 'Creates a new list',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/list-create'
                    },
                    {
                        method: 'GET',
                        path: '/sites/{siteId}/lists/{listId}/items',
                        description: 'Gets items in a list',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/listitem-list'
                    },
                    {
                        method: 'POST',
                        path: '/sites/{siteId}/lists/{listId}/items',
                        description: 'Creates a new list item',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/listitem-create'
                    },
                    {
                        method: 'PATCH',
                        path: '/sites/{siteId}/lists/{listId}/items/{itemId}',
                        description: 'Updates a list item',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/listitem-update'
                    }
                ]
            },
            documentLibraries: {
                name: 'Document Libraries',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/sites/{siteId}/drive',
                        description: 'Gets the default document library',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/drive-get'
                    },
                    {
                        method: 'GET',
                        path: '/sites/{siteId}/drives',
                        description: 'Lists all document libraries',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/drive-list'
                    },
                    {
                        method: 'GET',
                        path: '/sites/{siteId}/drive/root/children',
                        description: 'Lists items in root folder',
                        docs: 'https://learn.microsoft.com/en-us/graph/api/driveitem-list-children'
                    }
                ]
            }
        }
    },

    synapse: {
        name: 'Azure Synapse',
        baseUrl: 'https://{workspaceName}.dev.azuresynapse.net',
        authScope: 'https://dev.azuresynapse.net/.default',
        categories: {
            workspaces: {
                name: 'Workspaces',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/subscriptions/{subscriptionId}/providers/Microsoft.Synapse/workspaces',
                        description: 'Lists all Synapse workspaces in subscription',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/synapse/data-plane/workspace'
                    },
                    {
                        method: 'GET',
                        path: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}',
                        description: 'Gets a specific workspace',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/synapse/data-plane/workspace'
                    }
                ]
            },
            sqlPools: {
                name: 'SQL Pools',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/sqlPools',
                        description: 'Lists SQL pools in workspace',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/synapse/data-plane/sql-pools/list'
                    },
                    {
                        method: 'GET',
                        path: '/sqlPools/{sqlPoolName}',
                        description: 'Gets a specific SQL pool',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/synapse/data-plane/sql-pools/get'
                    },
                    {
                        method: 'POST',
                        path: '/sqlPools/{sqlPoolName}/pause',
                        description: 'Pauses a SQL pool',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/synapse/data-plane/sql-pools/pause'
                    },
                    {
                        method: 'POST',
                        path: '/sqlPools/{sqlPoolName}/resume',
                        description: 'Resumes a SQL pool',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/synapse/data-plane/sql-pools/resume'
                    }
                ]
            },
            sparkPools: {
                name: 'Spark Pools',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/bigDataPools',
                        description: 'Lists Spark pools in workspace',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/synapse/data-plane/big-data-pools/list'
                    },
                    {
                        method: 'GET',
                        path: '/bigDataPools/{sparkPoolName}',
                        description: 'Gets a specific Spark pool',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/synapse/data-plane/big-data-pools/get'
                    }
                ]
            },
            pipelines: {
                name: 'Pipelines',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/pipelines',
                        description: 'Lists pipelines in workspace',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/synapse/data-plane/pipeline/get-pipelines-by-workspace'
                    },
                    {
                        method: 'GET',
                        path: '/pipelines/{pipelineName}',
                        description: 'Gets a specific pipeline',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/synapse/data-plane/pipeline/get-pipeline'
                    },
                    {
                        method: 'POST',
                        path: '/pipelines/{pipelineName}/createRun',
                        description: 'Runs a pipeline',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/synapse/data-plane/pipeline/create-pipeline-run'
                    },
                    {
                        method: 'GET',
                        path: '/pipelineruns/{runId}',
                        description: 'Gets pipeline run status',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/synapse/data-plane/pipeline-run/get-pipeline-run'
                    }
                ]
            },
            notebooks: {
                name: 'Notebooks',
                endpoints: [
                    {
                        method: 'GET',
                        path: '/notebooks',
                        description: 'Lists notebooks in workspace',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/synapse/data-plane/notebook/get-notebooks-by-workspace'
                    },
                    {
                        method: 'GET',
                        path: '/notebooks/{notebookName}',
                        description: 'Gets a specific notebook',
                        docs: 'https://learn.microsoft.com/en-us/rest/api/synapse/data-plane/notebook/get-notebook'
                    }
                ]
            }
        }
    }
};
