# Guia Completo de Features

## Índice
1. [Search & Filter](#search--filter)
2. [Variables](#variables)
3. [Templates](#templates)
4. [Batch Execution](#batch-execution)
5. [Response Comparison](#response-comparison)
6. [Import/Export](#importexport)
7. [Rate Limiting](#rate-limiting)
8. [Auto-Retry](#auto-retry)
9. [Quick Actions](#quick-actions)
10. [JSON Formatter](#json-formatter)
11. [Links de Documentação](#links-de-documentação)
12. [Fullscreen](#fullscreen)

---

## 🔍 Search & Filter

### Como Usar
1. Após selecionar um serviço, use a barra de pesquisa no topo do painel
2. Digite palavras-chave para filtrar endpoints por nome ou path
3. Use os botões de método (GET, POST, PUT, etc.) para filtrar por tipo de requisição
4. Clique em "ALL" para ver todos os endpoints novamente

### Filtros Disponíveis
- **ALL** - Mostra todos os endpoints
- **GET** - Apenas requisições de leitura
- **POST** - Apenas criação de recursos
- **PUT** - Apenas atualização completa
- **PATCH** - Apenas atualização parcial
- **DELETE** - Apenas exclusão

---

## 🔐 Variables

### O que são?
Variables permitem criar placeholders reutilizáveis em suas requisições. Use `{{variableName}}` em qualquer campo (URL, Headers, Body) e o valor será substituído automaticamente.

### Como Usar
1. Clique no botão **Variables** na barra de utilidades
2. Clique em **Add Variable**
3. Digite o nome da variável (ex: `tenantId`)
4. Digite o valor (ex: `12345678-1234-1234-1234-123456789abc`)
5. Use `{{tenantId}}` em suas requisições

### Exemplos de Uso

**URL com variável:**
```
https://graph.microsoft.com/v1.0/users/{{userId}}
```

**Body com variáveis:**
```json
{
  "displayName": "{{userName}}",
  "mail": "{{userEmail}}",
  "department": "{{department}}"
}
```

**Headers com variável:**
```json
{
  "X-Custom-Header": "{{customValue}}"
}
```

### Variáveis Comuns Recomendadas
- `tenantId` - ID do seu tenant Azure AD
- `subscriptionId` - ID da sua subscription Azure
- `resourceGroup` - Nome do resource group
- `workspaceId` - ID do workspace Power BI/Synapse
- `userId` - ID de usuário
- `apiVersion` - Versão da API (ex: `2023-11-01`)

---

## 📄 Templates

### O que são?
Templates são requisições completas salvas que você pode reutilizar. Cada template guarda:
- Serviço e categoria
- URL completa
- Método HTTP
- Headers customizados
- Body da requisição

### Como Usar

**Salvar Template:**
1. Configure uma requisição completa
2. Clique no botão **Templates**
3. Clique em **Save Current**
4. Digite um nome descritivo
5. Opcionalmente, adicione uma descrição

**Usar Template:**
1. Clique no botão **Templates**
2. Clique no template desejado
3. A requisição será carregada automaticamente

### Casos de Uso
- Requisições complexas frequentes
- Configurações de ambientes diferentes
- Exemplos de requisições para sua equipe
- Backup de configurações importantes

---

## 🔄 Batch Execution

### O que é?
Execute múltiplas requisições sequencialmente com um clique. Ideal para:
- Migração de dados
- Testes automatizados
- Processamento em lote
- Operações em múltiplos recursos

### Como Usar
1. Configure uma requisição
2. Clique em **Add to Batch**
3. Configure outra requisição e adicione novamente
4. Repita para todas as requisições desejadas
5. Clique em **Batch** para ver a fila
6. Clique em **Execute All** para executar

### Recursos
- Execução sequencial (uma por vez)
- Respeita rate limiting
- Mostra progresso no console
- Relatório final de sucesso/falha
- Remove itens individuais da fila
- Limpa toda a fila com **Clear All**

### Exemplo de Uso: Criar Múltiplos Usuários
```
Batch Item 1: POST /users (User A)
Batch Item 2: POST /users (User B)
Batch Item 3: POST /users (User C)
Execute All → 3 usuários criados sequencialmente
```

---

## 📊 Response Comparison

### O que é?
Compare lado a lado duas respostas diferentes para identificar mudanças, diferenças de ambiente, ou validar alterações.

### Como Usar
1. Execute uma requisição
2. Clique em **Save Left** ou **Save Right**
3. Execute outra requisição (ou modifique parâmetros)
4. Salve no lado oposto
5. Clique em **Compare** para ver as diferenças

### Casos de Uso
- Comparar dados entre Dev/QA/Prod
- Validar alterações em recursos
- Debug de diferenças inesperadas
- Auditoria de mudanças

---

## 💾 Import/Export

### Exportar Collection
Salva todos os seus dados em um arquivo JSON:
- ✅ Todas as variáveis
- ✅ Todos os templates
- ✅ Histórico de requisições
- ✅ Favoritos

**Como Usar:**
1. Clique em **Import/Export**
2. Clique em **Export Collection**
3. Arquivo será baixado automaticamente

### Importar Collection
Carrega dados de um arquivo exportado:

**Como Usar:**
1. Clique em **Import/Export**
2. Clique em **Import Collection**
3. Selecione o arquivo `.json`
4. Dados serão mesclados com os existentes

### Casos de Uso
- Backup de configurações
- Compartilhar com equipe
- Migrar entre computadores
- Versionar collections no Git

---

## ⚡ Rate Limiting

### O que é?
Rastreamento automático de quantas requisições você fez para cada serviço, evitando throttling.

### Como Funciona
- Rastreamento por serviço (cada API tem limites diferentes)
- Barra de progresso colorida:
  - **Verde** (0-79%): Uso normal
  - **Amarelo** (80-94%): Aviso - próximo do limite
  - **Vermelho** (95-100%): Perigo - limite quase atingido
- Previne requisições quando limite é atingido

### Limites por Serviço

| Serviço | Limite por Hora | Limite Adicional |
|---------|----------------|------------------|
| Power BI | 200 req/hora | 1000 req/dia |
| Microsoft Purview | 6,000 req/hora | 100 req/minuto |
| Azure Resource Manager | 12,000 reads/hora | 1,200 writes/hora |
| Microsoft Fabric | 200 req/hora | 1000 req/dia |
| Microsoft Graph | 600,000 req/10min | 2,000 req/segundo (burst) |
| OneDrive | 600,000 req/10min | 2,000 req/segundo (burst) |
| SharePoint | 600,000 req/10min | 2,000 req/segundo (burst) |
| Azure Synapse | 12,000 reads/hora | 1,200 writes/hora |

### Onde Ver
- Barra de rate limit aparece no topo do painel de cada serviço
- Mostra: progresso visual + contagem atual / limite

---

## 🔁 Auto-Retry

### O que é?
Tenta novamente requisições que falharam automaticamente, com delay progressivo.

### Como Usar
1. Marque o checkbox **Auto-retry on failure**
2. Execute sua requisição
3. Se falhar, tentará automaticamente até 3 vezes:
   - 1ª tentativa: imediato
   - 2ª tentativa: após 1 segundo
   - 3ª tentativa: após 2 segundos
   - 4ª tentativa: após 3 segundos

### Quando Usar
- Requisições em ambientes instáveis
- APIs com throttling ocasional
- Timeouts temporários
- Testes de resiliência

### Quando NÃO Usar
- Requisições de criação (POST) - pode duplicar dados
- Operações críticas que não devem repetir
- Debugging de erros específicos

---

## ⚡ Quick Actions

Atalhos rápidos disponíveis na resposta:

### Botões Disponíveis

**📋 Copy Response**
- Copia toda a resposta para clipboard
- Útil para análise em outras ferramentas

**🔗 Copy URL**
- Copia a URL completa da requisição
- Compartilhe com colegas ou documente

**✨ Format JSON**
- Formata JSON com indentação bonita (2 espaços)
- Facilita leitura de respostas grandes

**📊 Compare**
- Abre modal de comparação
- Veja diferenças entre respostas

**💾 Download**
- Baixa a resposta como arquivo `.json`
- Nome: `response-{timestamp}.json`

---

## 🎨 JSON Formatter

### Recursos
- Formatação automática com 2 espaços de indentação
- Syntax highlighting (colorização)
- Validação de JSON
- Minificação/prettify sob demanda

### Como Usar
1. Após receber resposta, clique em **Format JSON**
2. JSON será formatado automaticamente
3. Se inválido, mostrará erro

### Exemplo

**Antes:**
```
{"name":"John","age":30,"address":{"city":"NYC","zip":"10001"}}
```

**Depois (Format JSON):**
```json
{
  "name": "John",
  "age": 30,
  "address": {
    "city": "NYC",
    "zip": "10001"
  }
}
```

---

## ⌨️ Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| `Ctrl + K` | Foco na seleção de categoria |
| `Ctrl + Enter` | Executar requisição |
| `Escape` | Fechar modais |
| `← / →` | Navegar entre serviços na roda (requer foco/hover na roda) |
| `↑ / ↓` | Navegar entre serviços na roda (requer foco/hover na roda) |
| `Enter` | Selecionar serviço destacado na roda |

> **Nota:** As setas só funcionam após o mouse entrar na área da roda (ou um clique nela). Ao sair da roda com o mouse, a navegação por teclado é desativada automaticamente. Isso evita interferência ao digitar em outros campos.

---

## 💡 Dicas e Boas Práticas

### 1. Organize com Variáveis
Crie variáveis para valores que mudam entre ambientes:
```
{{apiVersion}} = "2023-11-01"
{{environment}} = "dev"
{{baseUrl}} = "https://dev.api.example.com"
```

### 2. Use Templates para Workflows Comuns
Salve sequências de requisições como templates:
- "Create User + Assign License"
- "Provision Workspace + Configure"
- "Query + Transform + Export"

### 3. Aproveite o Batch para Migrações
Adicione múltiplas requisições ao batch para:
- Migrar dados entre ambientes
- Criar recursos em lote
- Executar testes automatizados

### 4. Compare Respostas para Debug
Quando algo não funciona:
1. Execute em DEV → Save Left
2. Execute em PROD → Save Right
3. Compare para ver diferenças

### 5. Monitore Rate Limiting
- Observe a barra amarela/vermelha
- Pause quando próximo do limite
- Use batch com delay se necessário

### 6. Export Regularmente
Faça backup de suas collections:
- Semanalmente para projetos ativos
- Antes de mudanças grandes
- Compartilhe com time

---

## 🆘 Troubleshooting

### "Rate limit exceeded!"
**Solução:** Aguarde o período da janela de tempo passar (hora/minuto)

### "Invalid JSON in Body"
**Solução:** Use Format JSON para validar, verifique vírgulas e chaves

### "Variables not replaced"
**Solução:** Verifique se a variável está salva e usa `{{nome}}` correto

### "Template not loading"
**Solução:** Aguarde 100ms após clicar, serviço deve estar carregado

### "Batch execution stuck"
**Solução:** Verifique console (F12), pode haver erro de autenticação

---

## Links de Documentação

### Por Serviço
Ao selecionar um serviço na roda, um link "Service docs" aparece abaixo do nome do serviço no painel. Ele aponta para a documentação oficial do serviço no Microsoft Learn e abre em nova aba.

### Por Endpoint
Na lista de endpoints, cada item que possui documentação oficial exibe um ícone discreto à direita. Clicando nesse ícone você abre a página de referência da API diretamente no Microsoft Learn, sem sair da aplicação ou selecionar o endpoint.

---

## Fullscreen

O botão **FULLSCREEN** no canto superior direito da interface entra ou sai do modo de tela cheia usando a Fullscreen API do navegador. Útil para gravações de tela ou demonstrações. O ícone do botão muda de acordo com o estado atual.

---

## Próximos Passos

1. **Configure Variáveis Básicas**
   - Crie `tenantId`, `subscriptionId`, `apiVersion`

2. **Salve Templates Comuns**
   - Requisições que você usa frequentemente

3. **Teste Batch Execution**
   - Comece com 2-3 requisições simples

4. **Export sua Collection**
   - Faça backup inicial de suas configurações

5. **Explore Rate Limits**
   - Observe o comportamento em cada serviço

---

**Todas as features estão prontas para uso!**
