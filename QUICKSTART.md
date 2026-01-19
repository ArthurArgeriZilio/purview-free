# Guia Rápido de Início

## Passo 1: Abrir a Aplicação

Simplesmente clique duas vezes no arquivo `index.html` ou arraste-o para o seu navegador.

## Passo 2: Configurar Service Principal

### Obter Credenciais no Azure Portal

1. Acesse https://portal.azure.com
2. Navegue para **Azure Active Directory** > **App registrations**
3. Clique em **+ New registration**
4. Preencha:
   - **Name**: "Microsoft REST Client" (ou outro nome)
   - **Supported account types**: "Accounts in this organizational directory only"
   - Clique em **Register**

5. Na página da aplicação criada, copie:
   - **Application (client) ID** → Este é o CLIENT ID
   - **Directory (tenant) ID** → Este é o TENANT ID

6. No menu lateral, clique em **Certificates & secrets**
7. Em **Client secrets**, clique em **+ New client secret**
8. Adicione descrição e escolha validade
9. Clique em **Add** e copie o **Value** → Este é o CLIENT SECRET
   ⚠️ **IMPORTANTE**: Copie agora! Não será mostrado novamente!

### Configurar Permissões

No menu lateral da app, clique em **API permissions**:

#### Para Power BI:
1. Clique em **+ Add a permission**
2. Selecione **Power BI Service**
3. Escolha **Delegated permissions** ou **Application permissions**
4. Selecione as permissões necessárias (ex: Dataset.Read.All, Report.Read.All)
5. Clique em **Add permissions**
6. Clique em **Grant admin consent**

#### Para Microsoft Graph:
1. Clique em **+ Add a permission**
2. Selecione **Microsoft Graph**
3. Escolha **Application permissions**
4. Selecione as permissões (ex: User.Read.All, Group.Read.All)
5. Clique em **Add permissions**
6. Clique em **Grant admin consent**

#### Para Azure (Resource Manager):
1. Clique em **+ Add a permission**
2. Selecione **Azure Service Management**
3. Escolha **Delegated permissions**
4. Selecione **user_impersonation**
5. Clique em **Add permissions**

#### Para Subscription ID (Azure):
1. No Azure Portal, vá para **Subscriptions**
2. Clique na subscription que você quer usar
3. Copie o **Subscription ID**

### Preencher na Aplicação

Na aplicação web:
1. Clique em **CONFIGURE**
2. Cole os valores:
   - **Tenant ID**: (copiado do passo 5)
   - **Client ID**: (copiado do passo 5)
   - **Client Secret**: (copiado do passo 9)
   - **Subscription ID**: (opcional, apenas para Azure)
3. Clique em **SAVE CREDENTIALS**

## Passo 3: Fazer sua Primeira Requisição

### Exemplo: Listar Workspaces do Power BI

1. Na roda de seleção, clique em **BI (Power BI)**
2. No dropdown **Category**, selecione **Workspaces/Groups**
3. Clique no endpoint: **GET /groups** - Returns a list of workspaces
4. Clique em **EXECUTE REQUEST**
5. Veja a resposta com a lista de workspaces!

### Exemplo: Listar Usuários do Azure AD

1. Clique em **BACK TO SERVICES**
2. Na roda de seleção, clique em **GR (Graph API)**
3. No dropdown **Category**, selecione **Users**
4. Clique no endpoint: **GET /users** - Lists all users
5. Clique em **EXECUTE REQUEST**
6. Veja a lista de usuários da organização!

### Exemplo: Listar Resource Groups do Azure

1. Clique em **BACK TO SERVICES**
2. Na roda de seleção, clique em **AZ (Azure)**
3. No dropdown **Category**, selecione **Resource Groups**
4. Clique no endpoint: **GET /subscriptions/{subscriptionId}/resourcegroups**
5. **EDITE** o endpoint URL substituindo `{subscriptionId}` pelo seu Subscription ID
6. Clique em **EXECUTE REQUEST**
7. Veja seus resource groups!

## Passo 4: Funcionalidades Avançadas

### Salvar nos Favoritos

1. Configure uma requisição
2. Clique em **SAVE TO FAVORITES**
3. Dê um nome descritivo
4. Acesse depois pelo ícone ⭐

### Gerar Código

1. Configure uma requisição
2. Clique em **GENERATE CODE**
3. Escolha Python, PowerShell ou cURL
4. Clique em **COPY TO CLIPBOARD**
5. Use o código no seu projeto!

### Ver Histórico

- Clique no ícone 🕐 para ver todas as requisições feitas
- Útil para debug e auditoria

## Dicas

### Substituir Parâmetros na URL

Muitos endpoints têm parâmetros como `{groupId}`, `{reportId}`, etc.

**Exemplo:**
- URL original: `/groups/{groupId}/reports`
- URL editada: `/groups/f089354e-8366-4e18-aea3-4cb4a3a50b48/reports`

### Filtrar Resultados (OData)

Power BI e Graph API suportam filtros OData:

**Exemplo:**
```
/users?$filter=startswith(displayName,'Admin')
/groups?$top=10
/reports?$select=id,name
```

### POST Requests com Body

Para criar recursos, você precisa enviar um JSON no body:

**Exemplo - Criar Workspace no Power BI:**
```json
{
  "name": "Meu Novo Workspace"
}
```

**Exemplo - Criar Usuário no Azure AD:**
```json
{
  "accountEnabled": true,
  "displayName": "João Silva",
  "mailNickname": "joao.silva",
  "userPrincipalName": "joao.silva@seudominio.com",
  "passwordProfile": {
    "forceChangePasswordNextSignIn": true,
    "password": "SenhaTemporaria123!"
  }
}
```

## Solução de Problemas Comuns

### Erro 401 - Unauthorized

**Problema**: Credenciais inválidas ou token expirado

**Solução**:
1. Verifique se Tenant ID, Client ID e Client Secret estão corretos
2. Verifique se o Client Secret não expirou
3. Tente limpar os dados e reconfigurar

### Erro 403 - Forbidden

**Problema**: Service Principal sem permissão

**Solução**:
1. No Azure Portal, vá para a app registration
2. Verifique se as permissões necessárias estão configuradas
3. Certifique-se de que o admin consent foi concedido
4. Para recursos específicos (ex: workspace do Power BI), adicione o Service Principal como membro

### Erro 404 - Not Found

**Problema**: Recurso não existe ou URL incorreta

**Solução**:
1. Verifique se substituiu todos os parâmetros como `{groupId}`
2. Confirme que o recurso existe fazendo um GET primeiro
3. Verifique a documentação do endpoint

### CORS Error

**Problema**: Navegador bloqueia requisições de file://

**Solução**:
Use um servidor web local:
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Depois acesse: `http://localhost:8000`

## Recursos Adicionais

### Documentação Oficial

- [Power BI REST API Reference](https://learn.microsoft.com/en-us/rest/api/power-bi/)
- [Microsoft Graph API Reference](https://learn.microsoft.com/en-us/graph/api/overview)
- [Azure REST API Reference](https://learn.microsoft.com/en-us/rest/api/azure/)
- [Purview REST API Reference](https://learn.microsoft.com/en-us/rest/api/purview/)

### Testes Úteis

**Testar se Service Principal funciona:**
```powershell
# PowerShell
$tenantId = "seu-tenant-id"
$clientId = "seu-client-id"
$clientSecret = "seu-client-secret"

$body = @{
    grant_type    = "client_credentials"
    client_id     = $clientId
    client_secret = $clientSecret
    scope         = "https://graph.microsoft.com/.default"
}

$response = Invoke-RestMethod -Method Post -Uri "https://login.microsoftonline.com/$tenantId/oauth2/v2.0/token" -Body $body

Write-Host "Token obtido com sucesso!" -ForegroundColor Green
```

---

**Pronto!** Agora você pode explorar todas as APIs Microsoft de forma simples e visual! 🚀
