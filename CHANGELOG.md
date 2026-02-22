# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

## [1.1.0] - 2026-02-22

### Adicionado
- Content Security Policy (CSP) para proteção contra scripts maliciosos
- Aviso de segurança visual no painel de autenticação
- Ofuscação de credenciais no armazenamento local
- Validação de formato GUID para Tenant ID e Client ID
- Arquivo LICENSE (MIT)
- Guia de contribuição (CONTRIBUTING.md)
- GitHub Actions para deploy automático no GitHub Pages
- Seção de autores no README

### Melhorado
- Sanitização de logs de erro (sem stack traces expostos)
- Campos de credenciais com autocomplete desabilitado
- Documentação de segurança atualizada

### Segurança
- CSP header adicionado
- Credenciais ofuscadas em base64 no storage (não mais texto puro)
- Warning visual obrigatório sobre exposição do Client Secret
- Validação de input reforçada

## [1.0.0] - 2026-01-15

### Adicionado
- Interface web 100% offline para APIs Microsoft
- 8 serviços suportados: Power BI, Purview, Azure, Fabric, Graph, OneDrive, SharePoint, Synapse
- Roda de seleção circular estilo Steam
- Autenticação via Service Principal
- Histórico de requisições
- Sistema de favoritos
- Gerador de código (Python, PowerShell, cURL)
- Suporte a múltiplos ambientes (Dev, QA, Prod)
- Rate limiting por serviço
- Import/Export de configurações
