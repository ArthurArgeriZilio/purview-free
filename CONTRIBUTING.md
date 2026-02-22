# 🤝 Como Contribuir

Obrigado pelo interesse em contribuir com o **Microsoft Services REST Client**!

## Como Participar

### 1. Fork & Clone
```bash
git clone https://github.com/SEU-USUARIO/purview-free.git
cd purview-free
```

### 2. Crie uma Branch
```bash
git checkout -b feature/minha-feature
```

### 3. Faça suas Alterações
- Mantenha o padrão de código (vanilla JS, classes ES6)
- Siga o tema visual Steam (variáveis CSS)
- Teste abrindo `index.html` no navegador

### 4. Teste Localmente
```bash
# Abra direto no navegador
open index.html

# Ou use um servidor local
python -m http.server 8000
```

### 5. Commit & Push
```bash
git add .
git commit -m "feat: descrição da alteração"
git push origin feature/minha-feature
```

### 6. Abra um Pull Request
- Descreva claramente o que foi alterado
- Inclua screenshots se houver mudanças visuais

## Diretrizes de Código

- **JavaScript**: Vanilla JS com classes ES6, sem frameworks
- **CSS**: Variáveis CSS do tema Steam, responsivo
- **HTML**: Semântico, acessível
- **Segurança**: Nunca use `innerHTML` com dados do usuário. Use `textContent` ou `createElement`
- **Idioma**: Comentários em inglês, documentação em português

## Reportar Bugs

1. Abra uma [Issue](../../issues/new)
2. Descreva o problema com passos para reproduzir
3. Inclua navegador e versão

## Segurança

Se encontrar uma vulnerabilidade, **NÃO** abra issue pública. Entre em contato direto.

---

Desenvolvido por **Arthur Argeri Zilio** & **Guilherme Leone** 🇧🇷
