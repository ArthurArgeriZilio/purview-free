# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2025-01-XX

### Primeira Release Oficial 🎉

Esta é a primeira versão estável do Microsoft Services REST Client.

### ✨ Funcionalidades Principais

#### Interface
- Interface estilo Steam com tema dark (preto/cinza/azul)
- Roda de seleção circular para navegação entre 8 serviços Microsoft
- Design 100% responsivo
- Animações suaves e transições

#### Serviços Suportados
- **Power BI** - Dashboards, Reports, Datasets, Dataflows, Workspaces, Pipelines, Apps, Capacities, Gateways
- **Microsoft Purview** - Catalog, Glossary, Lineage, Collections, Scans
- **Azure** - Resource Groups, Virtual Machines, Storage Accounts, Subscriptions
- **Microsoft Fabric** - Workspaces, Items, Lakehouses, Notebooks
- **Microsoft Graph API** - Users, Groups, Mail, Calendar, Teams, Sites
- **OneDrive** - Drive, Items, Sharing, Search
- **SharePoint** - Sites, Lists, Document Libraries
- **Azure Synapse** - Workspaces, SQL Pools, Spark Pools, Pipelines, Notebooks

#### Autenticação
- Autenticação via Service Principal (Client Credentials flow)
- Suporte a Tenant ID, Client ID e Client Secret
- SessionStorage por padrão (credenciais limpas ao fechar navegador)
- Opção "Remember me" para persistência com LocalStorage
- Validação de formato GUID para IDs
- Teste de conexão integrado

#### Requisições HTTP
- Suporte a todos os métodos HTTP (GET, POST, PUT, PATCH, DELETE)
- Editor de Request Body com syntax highlighting JSON
- Custom Headers configuráveis
- Substituição de variáveis em URLs e body
- Preview e validação de JSON

#### Histórico
- Armazenamento automático de todas as requisições
- Visualização de status, método, URL e timestamp
- Tempo de resposta registrado
- Possibilidade de re-executar requisições do histórico
- Limpeza de histórico

#### Favoritos
- Salvar requisições favoritas com nome personalizado
- Organização por serviço
- Acesso rápido a requisições frequentes
- Edição e exclusão de favoritos

#### Gerador de Código
- Geração automática de código em 3 linguagens:
  - **Python** (requests library)
  - **PowerShell** (Invoke-RestMethod)
  - **cURL** (linha de comando)
- Cópia para clipboard com um clique
- Código pronto para executar com autenticação incluída

#### Ambientes
- Suporte a múltiplos ambientes: Production, Development, QA
- Troca rápida de ambiente
- URLs base ajustadas automaticamente por ambiente

#### Gerenciamento de Dados
- LocalStorage para persistência de dados
- SessionStorage para dados temporários
- Botão "Clear All Data" para limpeza completa
- Import/Export de configurações e favoritos

#### Rate Limiting
- Proteção contra abuso de APIs
- Rastreamento de uso por serviço
- Indicadores visuais de limite de taxa
- Bloqueio automático ao atingir 100% do limite

### 🔒 Segurança

- XSS Prevention: Todos os outputs escapados com textContent
- Input Validation: Validação rigorosa de inputs do usuário
- Sanitização de dados importados
- Try-catch em todas operações de parsing JSON
- Limites de tamanho para variáveis e templates
- Tokens não persistidos (apenas em memória)
- HTTPS obrigatório para todas as chamadas de API
- Avisos de segurança sobre exposição de Client Secret

### 📋 Arquitetura

- 100% client-side (sem necessidade de backend)
- JavaScript vanilla com classes ES6
- CSS moderno com CSS Variables
- HTML5 semântico
- Sem dependências externas
- Funciona offline (exceto para chamadas às APIs)

### 🎨 Design

- Tema inspirado no Steam
- Paleta de cores azul (#1e90ff, #00bfff) sobre preto/cinza
- Glassmorphism effects
- Animações e transições suaves
- Ícones SVG customizados
- Responsivo e acessível

### 📚 Documentação

- README.md completo em português
- FEATURES.md detalhando todas as funcionalidades
- QUICKSTART.md para início rápido
- SECURITY.md com análise de segurança completa
- CONTRIBUTING.md com guia para contribuidores
- Comentários inline no código

### 🚀 Performance

- Carregamento instantâneo (sem dependências externas)
- Cache de tokens de autenticação
- Lazy loading de dados
- Otimização de re-renders

### ♿ Acessibilidade

- Estrutura HTML semântica
- Contraste adequado de cores
- Navegação por teclado
- Labels descritivos

### 🧪 Testes

- Testado em Chrome 90+
- Testado em Edge 90+
- Testado em Firefox 88+
- Testado em Safari 14+

### 📦 Estrutura de Arquivos

```
├── index.html          # Estrutura HTML principal
├── styles.css          # Estilos (tema Steam)
├── services.js         # Configuração de serviços e endpoints
├── auth.js             # Gerenciamento de autenticação
├── storage.js          # Gerenciamento de LocalStorage
├── app.js              # Lógica principal da aplicação
├── ratelimits.js       # Gerenciamento de rate limiting
├── README.md           # Documentação principal
├── FEATURES.md         # Documentação de funcionalidades
├── QUICKSTART.md       # Guia rápido
├── SECURITY.md         # Análise de segurança
├── CONTRIBUTING.md     # Guia de contribuição
├── CHANGELOG.md        # Este arquivo
├── LICENSE             # Licença MIT
└── .gitignore          # Arquivos ignorados pelo Git
```

### 🔄 Compatibilidade

- **Navegadores**: Chrome 90+, Edge 90+, Firefox 88+, Safari 14+
- **JavaScript**: ES6+
- **CSS**: CSS3 com variáveis
- **APIs**: Fetch API nativa

### ⚡ Limitações Conhecidas

- Requisições com upload de arquivos grandes podem ter problemas
- Algumas APIs avançadas podem requerer autenticação delegada
- Rate limits das APIs Microsoft se aplicam
- CORS pode ser um problema com file:// protocol (use servidor local)

### 🎯 Próximos Passos (Roadmap)

Possíveis melhorias futuras:
- Suporte a OAuth 2.0 com fluxo delegado
- Tema claro como opção
- Mais serviços Microsoft (Teams, Intune, etc)
- Export de coleções de requisições
- Temas customizáveis
- Plugins/extensibilidade

---

## Como Usar Este Changelog

- **Added** - Novas funcionalidades
- **Changed** - Mudanças em funcionalidades existentes
- **Deprecated** - Funcionalidades que serão removidas
- **Removed** - Funcionalidades removidas
- **Fixed** - Correções de bugs
- **Security** - Correções de vulnerabilidades

---

**Formato**: [Versão] - Data AAAA-MM-DD

---

*Para detalhes de cada release, veja as [releases no GitHub](https://github.com/ArthurArgeriZilio/purview-free/releases)*
