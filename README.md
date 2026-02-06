# Microsoft Services REST Client

Uma interface web **100% offline** para interagir com APIs REST dos serviços Microsoft.

## Características

- Interface estilo Steam (tema dark/preto)
- Roda de seleção circular para navegação entre serviços
- 100% client-side (sem necessidade de servidor)
- Autenticação via Service Principal
- Histórico de requisições
- Favoritos
- Gerador de código (Python, PowerShell, cURL)
- Suporte a múltiplos ambientes (Dev, QA, Prod)

## Serviços Suportados

### Dados & Analytics
1. **Power BI** - Dashboards, Reports, Datasets, Dataflows, Workspaces, Pipelines, Apps, Capacities, Gateways
2. **Microsoft Purview** - Catalog, Glossary, Lineage, Collections, Scans
3. **Microsoft Fabric** - Workspaces, Items, Lakehouses, Notebooks
4. **Azure Synapse** - Workspaces, SQL Pools, Spark Pools, Pipelines, Notebooks
5. **Azure Data Factory** - Pipelines, Datasets, Linked Services, Triggers, Pipeline Runs
6. **Azure Databricks** - Clusters, Jobs, Workspace, DBFS, SQL Warehouses

### Identidade & Segurança
7. **Microsoft Entra ID** - Applications, Service Principals, Conditional Access, Directory Roles, Domains
8. **Microsoft Defender** - Alerts, Incidents, Machines, Vulnerabilities, Indicators, Advanced Hunting
9. **Microsoft Sentinel** - Incidents, Alert Rules, Watchlists, Threat Intelligence, Bookmarks
10. **Azure Key Vault** - Secrets, Keys, Certificates

### Produtividade & Colaboração
11. **Microsoft Graph API** - Users, Groups, Mail, Calendar, Teams, Sites
12. **Microsoft Teams** - Teams, Channels, Messages, Members, Apps, Meetings
13. **Exchange Online** - Mail, Mail Folders, Calendar, Contacts, Rules
14. **OneDrive** - Drive, Items, Sharing, Search
15. **SharePoint** - Sites, Lists, Document Libraries

### Infraestrutura & DevOps
16. **Azure** - Resource Groups, Virtual Machines, Storage Accounts, Subscriptions
17. **Azure DevOps** - Projects, Repositories, Pipelines, Work Items, Builds, Releases
18. **Azure Logic Apps** - Workflows, Runs, Triggers, Actions
19. **Azure Monitor** - Metrics, Alerts, Action Groups, Log Analytics, Diagnostic Settings
20. **Azure Cost Management** - Cost Analysis, Budgets, Usage Details, Exports

### AI & Automação
21. **Azure AI Services** - Azure OpenAI, Text Analytics, Computer Vision, Translator
22. **Power Automate** - Flows, Flow Runs, Connections, Environments
23. **Power Apps** - Apps, Environments, Connectors, Connections

### CRM & ERP
24. **Dynamics 365** - Accounts, Contacts, Leads, Opportunities, Cases, Activities

### Gestão de Dispositivos
25. **Microsoft Intune** - Managed Devices, Compliance Policies, Device Configurations, Mobile Apps

## Como Usar

### 1. Abrir a Aplicação

Basta abrir o arquivo `index.html` em qualquer navegador moderno (Chrome, Edge, Firefox, etc).

**Não é necessário servidor web!**

### 2. Configurar Credenciais

1. Clique no botão **CONFIGURE** no painel de autenticação
2. Preencha os campos:
   - **Tenant ID**: ID do seu Azure Active Directory
   - **Client ID**: ID da aplicação do Service Principal
   - **Client Secret**: Secret da aplicação
   - **Subscription ID**: (Opcional) Necessário apenas para serviços Azure
3. Clique em **SAVE CREDENTIALS**

**Segurança**: As credenciais são armazenadas apenas no LocalStorage do seu navegador. Nunca são enviadas para nenhum servidor externo além das APIs Microsoft oficiais.

### 3. Selecionar Serviço

Clique em um dos 25 serviços na roda circular para iniciar.

### 4. Fazer Requisição

1. **Selecione uma Categoria** no dropdown (ex: Dashboards, Reports, etc)
2. **Escolha um Endpoint** da lista
3. **Configure a requisição**:
   - Método HTTP (GET, POST, PUT, PATCH, DELETE)
   - URL do endpoint (pré-preenchido)
   - Request Body (para POST/PUT/PATCH)
   - Custom Headers (opcional)
4. Clique em **EXECUTE REQUEST**
5. Veja a resposta na seção abaixo

## Funcionalidades Avançadas

### Histórico

- Clique no ícone de relógio no topo do painel
- Visualize todas as requisições feitas
- Veja status, tempo de resposta e timestamp

### Favoritos

1. Configure uma requisição
2. Clique em **SAVE TO FAVORITES**
3. Dê um nome ao favorito
4. Acesse pelo ícone de estrela no topo

### Gerador de Código

1. Configure uma requisição
2. Clique em **GENERATE CODE**
3. Escolha a linguagem (Python, PowerShell, cURL)
4. Clique em **COPY TO CLIPBOARD**

### Ambientes

- Clique no ícone de hexágono no topo
- Alterne entre Production, Development e QA
- As URLs base serão ajustadas automaticamente

## Estrutura de Arquivos

```
├── index.html       # Estrutura HTML principal
├── styles.css       # Estilos (tema Steam)
├── services.js      # Configuração de todos os serviços e endpoints
├── auth.js          # Gerenciamento de autenticação
├── storage.js       # Gerenciamento de LocalStorage
└── app.js           # Lógica principal da aplicação
```

## Requisitos

- Navegador moderno (Chrome 90+, Edge 90+, Firefox 88+, Safari 14+)
- JavaScript habilitado
- LocalStorage habilitado
- Conexão com internet (para fazer as requisições às APIs Microsoft)

## Configuração de Service Principal

Para usar esta aplicação, você precisa criar um Service Principal no Azure:

1. Acesse o **Azure Portal**
2. Vá para **Azure Active Directory** > **App registrations**
3. Clique em **New registration**
4. Configure a aplicação:
   - Nome: ex. "REST Client App"
   - Supported account types: selecione a opção adequada
5. Após criar, copie:
   - **Application (client) ID**
   - **Directory (tenant) ID**
6. Vá para **Certificates & secrets**
7. Crie um novo **Client secret** e copie o valor
8. Configure as permissões necessárias em **API permissions**

### Permissões Necessárias

Dependendo dos serviços que você quer usar, adicione as permissões:

- **Power BI**: `https://analysis.windows.net/powerbi/api`
- **Purview**: `https://purview.azure.net`
- **Azure**: `https://management.azure.com`
- **Fabric**: `https://api.fabric.microsoft.com`
- **Graph API**: `https://graph.microsoft.com`

## Troubleshooting

### "Authentication failed"
- Verifique se as credenciais estão corretas
- Confirme que o Service Principal tem as permissões necessárias
- Verifique se o Client Secret não expirou

### "CORS Error"
- Algumas APIs Microsoft podem bloquear requisições de origens file://
- Solução: use um servidor web local simples:
  ```bash
  python -m http.server 8000
  ```
  Depois acesse: `http://localhost:8000`

### "Access token expired"
- A aplicação gerencia tokens automaticamente
- Se houver problema, limpe os dados e configure novamente

## Limitações

- Requisições com upload de arquivos grandes podem não funcionar adequadamente
- Algumas APIs avançadas podem requerer autenticação delegada (usuário) ao invés de Service Principal
- Rate limits das APIs Microsoft se aplicam

## Segurança

- **Não compartilhe suas credenciais**
- **Não use em computadores públicos**
- Use o botão **CLEAR ALL DATA** ao terminar de usar em computadores compartilhados
- As credenciais ficam apenas no seu navegador (LocalStorage)
- Todas as comunicações são feitas via HTTPS

## Licença

Este projeto é fornecido "como está", sem garantias de qualquer tipo.

## Suporte

Para documentação oficial das APIs Microsoft:
- [Power BI REST API](https://learn.microsoft.com/en-us/rest/api/power-bi/)
- [Microsoft Purview](https://learn.microsoft.com/en-us/rest/api/purview/)
- [Azure REST API](https://learn.microsoft.com/en-us/rest/api/azure/)
- [Microsoft Graph API](https://learn.microsoft.com/en-us/graph/api/overview)

---

**Desenvolvido com foco em simplicidade, segurança e usabilidade.**
