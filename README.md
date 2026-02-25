# Microsoft Services REST Client

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Offline](https://img.shields.io/badge/100%25-Offline-brightgreen)

Uma interface web **100% offline** para interagir com APIs REST dos serviços Microsoft.

## ⛔ Apenas para Uso Local — Não hospede publicamente

> **Este projeto foi criado para execução local/desenvolvimento. Não o hospede em servidores públicos (ex: GitHub Pages, Netlify, Vercel ou qualquer outro serviço de hosting).** O fluxo `client_credentials` inclui o Client Secret diretamente no navegador — hospedá-lo publicamente exporia as credenciais a qualquer pessoa que acessasse a URL.

### Como executar localmente

**Opção A — Abrir diretamente no navegador:**
```
Abra o arquivo index.html em qualquer navegador moderno (Chrome, Edge, Firefox).
Não é necessário servidor web!
```

**Opção B — Servidor local (recomendado se ocorrer erro de CORS):**
```bash
python -m http.server 8000
```
Depois acesse: `http://localhost:8000`

> **Nota sobre CORS:** Algumas APIs Microsoft bloqueiam requisições de origens `file://`. Nesses casos, use a Opção B com servidor local.

## ⚠️ Aviso Importante de Segurança

Esta ferramenta é para **uso pessoal/desenvolvimento apenas**. O fluxo `client_credentials` expõe o Client Secret no navegador (DevTools → aba Network).

**Recomendações obrigatórias:**
- ❌ **NUNCA** use secrets de produção
- ✅ Crie um Service Principal **exclusivo para testes** com permissões mínimas (Reader)
- ✅ Troque o secret a cada 90 dias
- ✅ Use em máquina confiável e rede segura
- ✅ Limpe os dados ao terminar (`CLEAR ALL DATA`)

**Se usou algo próximo de produção (ex: tenant real), após terminar:**
- Clique em **CLEAR ALL DATA**
- Verifique a aba `Application` do DevTools (LocalStorage/SessionStorage) para confirmar que não ficou nada salvo
- Verifique se o navegador salvou credenciais (gerenciador de senhas / autofill / histórico de formulários)
- Revogue e recrie o Client Secret do Service Principal se necessário

**Boas práticas adicionais:**
- 🌐 Use um **perfil separado do navegador** (ex: "Perfil Dev") ou janela anônima
- 🧩 Revise as extensões instaladas — desative extensões suspeitas ou de "coupon", "download helper", etc.
- 💻 Execute somente em máquinas confiáveis, sem malware

Para mais detalhes, consulte [SECURITY.md](SECURITY.md).

## Características

- Interface estilo Steam (tema dark/preto)
- Roda de seleção circular para navegação entre serviços
- 100% client-side (sem necessidade de servidor)
- Autenticação via Service Principal
- Histórico de requisições
- Favoritos
- Gerador de código (Python, PowerShell, cURL)
- Suporte a múltiplos ambientes (Dev, QA, Prod)
- Links de documentação oficial por serviço e por endpoint
- Botão de tela cheia (fullscreen) para facilitar gravação de tela

## Serviços Suportados

1. **Power BI** - Dashboards, Reports, Datasets, Dataflows, Workspaces, Pipelines, Apps, Capacities, Gateways
2. **Purview** - Catalog, Glossary, Lineage, Collections, Scans
3. **Azure** - Resource Groups, Virtual Machines, Storage Accounts, Subscriptions
4. **Microsoft Fabric** - Workspaces, Items, Lakehouses, Notebooks
5. **Microsoft Graph API** - Users, Groups, Mail, Calendar, Teams, Sites
6. **OneDrive** - Drive, Items, Sharing, Search
7. **SharePoint** - Sites, Lists, Document Libraries
8. **Azure Synapse** - Workspaces, SQL Pools, Spark Pools, Pipelines, Notebooks

## Como Usar

### 1. Abrir a Aplicação

Consulte a seção [⛔ Apenas para Uso Local](#-apenas-para-uso-local--não-hospede-publicamente) no topo deste documento para instruções de execução local.

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

Clique em um dos 8 serviços na roda circular:
- BI - Power BI
- PV - Purview
- AZ - Azure
- FB - Microsoft Fabric
- GR - Microsoft Graph API
- OD - OneDrive
- SP - SharePoint
- SY - Azure Synapse

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
├── .github/
│   └── workflows/          # (sem deploy automático — apenas uso local)
├── index.html                 # Estrutura HTML principal
├── styles.css                 # Estilos (tema Steam)
├── services.js                # Configuração de serviços e endpoints
├── auth.js                    # Gerenciamento de autenticação
├── storage.js                 # Gerenciamento de armazenamento
├── app.js                     # Lógica principal da aplicação
├── ratelimits.js              # Rate limiting por serviço
├── README.md                  # Este arquivo
├── FEATURES.md                # Lista completa de funcionalidades
├── QUICKSTART.md              # Guia de início rápido
├── SECURITY.md                # Análise de segurança
├── CONTRIBUTING.md            # Guia de contribuição
├── CHANGELOG.md               # Histórico de mudanças
└── LICENSE                    # Licença MIT
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
- Solução: use a Opção B (servidor local) descrita na seção [⛔ Apenas para Uso Local](#-apenas-para-uso-local--não-hospede-publicamente)

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

## Autores

- **Arthur Argeri Zilio** — Criador e desenvolvedor principal — [@ArthurArgeriZilio](https://github.com/ArthurArgeriZilio)
- **Guilherme Leone** — Colaborador e co-desenvolvedor

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

## Suporte

Para documentação oficial das APIs Microsoft:
- [Power BI REST API](https://learn.microsoft.com/en-us/rest/api/power-bi/)
- [Microsoft Purview](https://learn.microsoft.com/en-us/rest/api/purview/)
- [Azure REST API](https://learn.microsoft.com/en-us/rest/api/azure/)
- [Microsoft Graph API](https://learn.microsoft.com/en-us/graph/api/overview)

---

**Desenvolvido com foco em simplicidade, segurança e usabilidade.**
