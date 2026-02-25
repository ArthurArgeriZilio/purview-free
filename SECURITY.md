# 🔒 Análise de Segurança - Microsoft Services REST Client

> **⛔ USO LOCAL APENAS**: Este projeto é para execução local/desenvolvimento. **Não o hospede publicamente** (ex: GitHub Pages). O Client Secret fica visível no navegador — hospedagem pública colocaria as credenciais em risco para qualquer pessoa com acesso à URL.

> **⚠️ IMPORTANTE**: Esta ferramenta utiliza o fluxo `client_credentials` OAuth2 diretamente no frontend. Isso significa que o Client Secret é transmitido pelo navegador e pode ser visto no DevTools (Network tab). Use APENAS Service Principals dedicados de baixo privilégio. Para detalhes completos, leia este documento.

## ✅ CORREÇÕES IMPLEMENTADAS

### 1. **XSS (Cross-Site Scripting) - RESOLVIDO**

#### Problema Original:
```javascript
// ❌ VULNERÁVEL - innerHTML com dados não sanitizados
item.innerHTML = `<span>${template.name}</span>`;  // XSS!
```

#### Solução Implementada:
```javascript
// ✅ SEGURO - textContent escapa automaticamente
const span = document.createElement('span');
span.textContent = template.name;  // Safe!
```

**Arquivos Corrigidos:**
- `showVariables()` - Removido onclick inline, usando textContent
- `showTemplates()` - DOM elements seguros
- `updateBatchList()` - URLs escapadas
- `showHistory()` - Dados de histórico seguros
- `showFavorites()` - Favoritos escapados

---

### 2. **Validação de Input - IMPLEMENTADO**

#### Função de Sanitização:
```javascript
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
```

#### Validações Adicionadas:
```javascript
// Variáveis - apenas alphanumeric, underscore, hyphen
if (!/^[a-zA-Z0-9_-]+$/.test(key)) {
    alert('Invalid variable name');
    return;
}

// Limite de tamanho
if (key.length > 100) {
    alert('Variable name too long');
    return;
}

if (value.length > 5000) {
    alert('Variable value too long');
    return;
}
```

---

### 3. **JSON.parse com Try-Catch - IMPLEMENTADO**

#### Antes (Vulnerável):
```javascript
// ❌ Pode crashar o app
this.variables = JSON.parse(localStorage.getItem('data'));
```

#### Depois (Seguro):
```javascript
// ✅ Com validação e fallback
try {
    const saved = localStorage.getItem('msrest_variables');
    if (saved) {
        const parsed = JSON.parse(saved);
        // Valida tipo
        if (typeof parsed === 'object' && !Array.isArray(parsed)) {
            this.variables = parsed;
        } else {
            console.warn('Invalid format, resetting');
            this.variables = {};
        }
    }
} catch (error) {
    console.error('Error loading:', error);
    this.variables = {};
}
```

**Aplicado em:**
- `loadVariables()`
- `loadTemplates()`
- `importCollection()`

---

### 4. **Import/Export Seguro - IMPLEMENTADO**

#### Validação de Collection Importada:
```javascript
// Valida estrutura
if (typeof collection !== 'object') {
    throw new Error('Invalid collection format');
}

// Valida cada variável
Object.entries(collection.variables).forEach(([key, value]) => {
    // Regex de segurança
    if (typeof key === 'string' && 
        /^[a-zA-Z0-9_-]+$/.test(key) && 
        key.length <= 100) {
        
        if (typeof value === 'string' && value.length <= 5000) {
            this.variables[key] = value;
        }
    }
});

// Limita descrições
template.description = (template.description || '').substring(0, 500);
```

---

### 5. **Inline Event Handlers - REMOVIDOS**

#### Antes (problemático):
```javascript
// ❌ onclick inline - difícil debug, não CSP-compliant
<button onclick="app.deleteVariable('${key}')">Delete</button>
```

#### Depois (correto):
```javascript
// ✅ Event listener apropriado
const deleteBtn = document.createElement('button');
deleteBtn.addEventListener('click', () => this.deleteVariable(key));
```

---

## 🛡️ MEDIDAS DE SEGURANÇA ATIVAS

### 1. **SessionStorage por Default**
- Credenciais limpas ao fechar navegador
- Opt-in para persistência (LocalStorage)
- Double confirmation para "Remember me"

### 2. **Validação de Credenciais**
- Formato GUID obrigatório (tenant/client ID)
- Comprimento mínimo para secrets
- Validação em tempo real com feedback visual

### 3. **Rate Limiting**
- Previne abuso de APIs
- Rastreamento por serviço
- Bloqueio automático em 100%

### 4. **Token Caching Seguro**
- Tokens não persistidos (apenas em memória)
- Expiração respeitada
- Renovação automática

### 5. **CORS Seguro**
- Fetch API nativo (não expõe credenciais)
- Headers controlados
- Apenas HTTPS endpoints

---

## ⚠️ LIMITAÇÕES CONHECIDAS

### 1. **Client-Side Storage**
**Risco:** Credenciais em LocalStorage podem ser acessadas por JavaScript
**Mitigação:** 
- SessionStorage por padrão
- Aviso explícito ao usuário sobre "Remember me"
- Ferramenta offline - não há backend alternativo

### 2. **No Backend**
**Risco:** Não pode usar proxy para esconder credenciais
**Mitigação:**
- Aplicação 100% offline é a proposta
- Usuário tem controle total dos dados
- Ideal para ambientes isolados/air-gapped

### 3. **Browser DevTools**
**Risco:** Usuário com DevTools pode ver tokens
**Mitigação:**
- Documentação clara sobre segurança
- Recomendação: usar service principals dedicados
- Princípio de menor privilégio

---

## ✅ CHECKLIST DE SEGURANÇA

### Code Injection:
- ✅ XSS prevenido (textContent, não innerHTML)
- ✅ Sem eval() ou Function()
- ✅ Sem document.write()
- ✅ Inline handlers removidos

### Input Validation:
- ✅ Regex validation para nomes
- ✅ Limites de tamanho
- ✅ Tipo checking
- ✅ Sanitização de output

### Data Storage:
- ✅ Try-catch em JSON.parse
- ✅ Schema validation
- ✅ Fallback seguro
- ✅ Size limits

### Authentication:
- ✅ Token não persistido
- ✅ Expiration handling
- ✅ Credential validation
- ✅ Clear on logout

### API Calls:
- ✅ HTTPS only
- ✅ Rate limiting
- ✅ Error handling
- ✅ Timeout handling

---

## 📋 RECOMENDAÇÕES DE USO SEGURO

> ⛔ **Este projeto é para uso local/desenvolvimento apenas. Não o hospede publicamente** (ex: GitHub Pages, Netlify, Vercel). O Client Secret fica exposto no navegador — hospedagem pública colocaria suas credenciais em risco.

### 1. **Service Principal Dedicado**
Crie um Service Principal específico para esta ferramenta:
```bash
az ad sp create-for-rbac --name "MSRESTClient-ReadOnly"
```

### 2. **Princípio de Menor Privilégio**
Dê apenas as permissões mínimas necessárias:
- ❌ Não dê Owner/Contributor
- ✅ Use Reader roles
- ✅ Use scope específico (resource group)

### 3. **Rotação de Credenciais**
- Troque secrets a cada 90 dias
- Monitore uso de Service Principal
- Revogue imediatamente se comprometido

### 4. **Limpar Dados Após o Uso**
Se usou algo próximo de produção (ex: tenant real):
- Clique em **CLEAR ALL DATA** na interface
- Confirme na aba `Application` do DevTools (LocalStorage e SessionStorage) que não ficou nada salvo
- Revogue e recrie o Client Secret do Service Principal se necessário

### 5. **Verificar se o Navegador Salvou Credenciais**
Após o uso, confirme que o navegador não armazenou nada:
- Verifique o **gerenciador de senhas** do navegador (autofill / senhas salvas)
- Verifique o **histórico de formulários** (sugestões de preenchimento automático)
- Se necessário, limpe os dados de navegação do domínio `localhost`

### 6. **Perfil Separado do Navegador**
- Use um **perfil dedicado** para desenvolvimento (ex: "Perfil Dev") ou uma **janela anônima/privada**
- Perfis separados isolam cookies, extensões e histórico de formulários

### 7. **Extensões do Navegador**
- Revise as extensões instaladas antes de usar
- **Desative extensões suspeitas** ou desnecessárias durante o uso
- Evite extensões de "coupon", "download helper", "produtividade" de fontes desconhecidas — elas podem ler o conteúdo das páginas

### 8. **Máquina Confiável**
- Use somente em máquina pessoal, confiável e sem malware
- Não use em computadores públicos, compartilhados ou corporativos sem autorização
- Mantenha o sistema operacional e o navegador atualizados

### 9. **Ambiente Seguro**
- Use em máquina confiável
- Não compartilhe exports com credenciais
- Limpe cookies/storage ao sair

### 10. **Auditoria**
- Revise logs do Azure AD
- Monitore chamadas de API
- Use Conditional Access policies

---

## 🔍 COMO AUDITAR O CÓDIGO

### Procure por Padrões Perigosos:
```bash
# XSS vulnerabilities
grep -r "innerHTML" *.js
grep -r "eval(" *.js
grep -r "Function(" *.js

# Inline handlers
grep -r "onclick=" *.html
grep -r "onerror=" *.html

# Unsafe parsing
grep -r "JSON.parse" *.js | grep -v "try"

# Storage sem validação
grep -r "localStorage.getItem" *.js
```

### Teste Manual:
1. Tente injetar `<script>alert('xss')</script>` em:
   - Variable names/values
   - Template names/descriptions
   - Import files

2. Tente importar JSON malicioso:
```json
{
  "variables": {
    "<script>alert(1)</script>": "xss",
    "test": "<img src=x onerror=alert(1)>"
  }
}
```

3. Verifique se:
   - Nada é executado
   - Valores são escapados
   - App não quebra

---

## 🚀 MELHORIAS FUTURAS (Opcional)

### 1. **Content Security Policy**
Adicionar meta tag no HTML:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               connect-src https://*.microsoft.com https://*.azure.com;">
```

### 2. **Subresource Integrity**
Se adicionar CDN no futuro:
```html
<script src="https://cdn.example.com/lib.js"
        integrity="sha384-..."
        crossorigin="anonymous"></script>
```

### 3. **Web Crypto API**
Criptografar credenciais em storage:
```javascript
const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    data
);
```

### 4. **Certificate Pinning**
Para ambientes enterprise, validar certificados específicos.

---

## 📞 REPORTAR VULNERABILIDADES

Se encontrar problemas de segurança:

1. **NÃO** abra issue pública
2. Entre em contato direto
3. Descreva o problema detalhadamente
4. Aguarde fix antes de divulgar

---

## ✨ RESUMO

### Antes das Correções:
- ❌ 18 ocorrências de innerHTML com dados não sanitizados
- ❌ Onclick inline (não CSP-compliant)
- ❌ JSON.parse sem tratamento de erro
- ❌ Import sem validação
- ❌ Sem limites de tamanho

### Depois das Correções:
- ✅ Todos os outputs escapados (textContent/createElement)
- ✅ Event listeners apropriados
- ✅ Try-catch em todas as operações de parse
- ✅ Validação rigorosa de imports
- ✅ Limites de segurança aplicados
- ✅ Regex validation
- ✅ Schema validation

**Status: SEGURO para uso em ambientes controlados com Service Principals de baixo privilégio** 🔒

---

*Última atualização: Fevereiro 2026*
*Versão: 1.1*
