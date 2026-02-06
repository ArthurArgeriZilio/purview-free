# Contribuindo para Microsoft Services REST Client

Obrigado por considerar contribuir para este projeto! 🎉

## Como Contribuir

### 1. Fork e Clone

1. Faça um fork deste repositório
2. Clone o seu fork localmente:
   ```bash
   git clone https://github.com/SEU_USUARIO/purview-free.git
   cd purview-free
   ```

### 2. Crie uma Branch

Crie uma branch para sua feature ou correção:
```bash
git checkout -b feature/minha-feature
# ou
git checkout -b fix/minha-correcao
```

### 3. Faça suas Alterações

- Siga as diretrizes de estilo do código (veja abaixo)
- Teste suas mudanças localmente
- Certifique-se de que tudo funciona como esperado

### 4. Commit e Push

```bash
git add .
git commit -m "Descrição clara da mudança"
git push origin feature/minha-feature
```

### 5. Abra um Pull Request

1. Vá para o repositório original no GitHub
2. Clique em "Pull Request"
3. Descreva suas mudanças detalhadamente
4. Aguarde o review

## Diretrizes de Estilo de Código

### JavaScript

- **Vanilla JavaScript**: Este projeto usa JavaScript puro, sem frameworks
- **Classes ES6**: Use classes para organizar a lógica
- **Nomeação**: Use camelCase para variáveis e funções
- **Constantes**: Use UPPER_CASE para constantes
- **Comentários**: Comente código complexo em português

Exemplo:
```javascript
class MinhaClasse {
    constructor() {
        this.minhaVariavel = 'valor';
    }
    
    meuMetodo() {
        // Comentário explicativo
        return this.minhaVariavel;
    }
}
```

### CSS

- **Tema Steam**: Mantenha consistência com o tema dark (preto/cinza)
- **Variáveis CSS**: Use as variáveis CSS existentes em `:root`
- **Classes BEM-like**: Use nomes descritivos e hierárquicos
- **Cores principais**:
  - `--color-bg-primary`: Fundo principal
  - `--color-accent-primary`: Azul (#1e90ff)
  - `--color-accent-secondary`: Cyan (#00bfff)

Exemplo:
```css
.meu-componente {
    background: var(--color-bg-primary);
    color: var(--color-text-primary);
}

.meu-componente-header {
    border-bottom: 1px solid var(--color-border);
}
```

### HTML

- **Semântico**: Use tags HTML5 semânticas
- **Acessibilidade**: Adicione atributos ARIA quando necessário
- **IDs únicos**: Use IDs únicos para elementos JavaScript
- **Classes descritivas**: Use classes CSS descritivas

## Como Testar Localmente

Este projeto é 100% client-side, então testar é muito simples:

1. **Abra o arquivo HTML**:
   ```bash
   # Opção 1: Abra diretamente no navegador
   open index.html
   
   # Opção 2: Use um servidor local (recomendado para evitar problemas de CORS)
   python -m http.server 8000
   # Depois acesse: http://localhost:8000
   ```

2. **Configure credenciais de teste**:
   - Use um Service Principal de desenvolvimento/teste
   - **NUNCA** use credenciais de produção

3. **Teste todas as funcionalidades**:
   - [ ] Autenticação funciona
   - [ ] Seleção de serviços na roda
   - [ ] Endpoints carregam corretamente
   - [ ] Requisições são executadas
   - [ ] Histórico salva corretamente
   - [ ] Favoritos funcionam
   - [ ] Gerador de código funciona
   - [ ] Ambientes (Dev/QA/Prod) alternam

4. **Teste em diferentes navegadores**:
   - Chrome/Edge
   - Firefox
   - Safari (se disponível)

## Reportando Issues

### Antes de Reportar

1. Verifique se a issue já não foi reportada
2. Certifique-se de que não é um problema de configuração
3. Teste em um navegador atualizado

### Ao Reportar

Inclua as seguintes informações:

```markdown
**Descrição do Problema**
[Descrição clara e concisa]

**Passos para Reproduzir**
1. Vá para...
2. Clique em...
3. Veja o erro...

**Comportamento Esperado**
[O que deveria acontecer]

**Comportamento Atual**
[O que está acontecendo]

**Screenshots**
[Se aplicável]

**Ambiente**
- Navegador: [ex: Chrome 120]
- OS: [ex: Windows 11, macOS 14]
- Versão do projeto: [ex: commit hash ou tag]

**Logs do Console**
[Se houver erros no console do navegador]
```

## Tipos de Contribuições

### 🐛 Correções de Bugs

- Correções de bugs são sempre bem-vindas
- Adicione testes se possível
- Descreva o bug no PR

### ✨ Novas Features

- Discuta a feature em uma issue primeiro
- Mantenha consistência com o design existente
- Documente a nova funcionalidade

### 📝 Documentação

- Correções de typos
- Melhorias em exemplos
- Traduções (mantendo português como padrão)

### 🎨 Melhorias de UI/UX

- Mantenha o tema Steam
- Preserve a acessibilidade
- Teste em diferentes resoluções

## Checklist do Pull Request

Antes de submeter seu PR, verifique:

- [ ] O código segue as diretrizes de estilo
- [ ] Testei localmente em pelo menos 2 navegadores
- [ ] Adicionei comentários em código complexo
- [ ] Atualizei documentação se necessário
- [ ] Não introduzi quebras de compatibilidade
- [ ] O commit tem uma mensagem descritiva
- [ ] Não inclui credenciais ou dados sensíveis

## Código de Conduta

- Seja respeitoso e construtivo
- Aceite feedback de forma profissional
- Ajude outros contribuidores
- Foque em melhorar o projeto

## Dúvidas?

- Abra uma issue com a tag `question`
- Descreva sua dúvida claramente
- Seja paciente aguardando resposta

## Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença MIT do projeto.

---

**Obrigado por contribuir! 🚀**
