# Design do Microsoft Services REST Client

## 📐 Arquivo de Design Figma

Este diretório contém o arquivo de design Figma (.fig) do projeto.

### Como Usar o Arquivo .fig

1. **Baixe o arquivo** `.fig` deste diretório
2. **Acesse o Figma**:
   - Vá para [figma.com](https://figma.com)
   - Crie uma conta gratuita se ainda não tiver (é grátis!)
3. **Importe o arquivo**:
   - Clique em "Import" no Figma
   - Selecione o arquivo `.fig` baixado
   - O design será aberto no seu workspace

### 📱 Estrutura do Layout - Dashboard

O design apresenta um dashboard de monitoramento com os seguintes componentes:

#### Menu Lateral (Sidebar)
- **Synapse** - Azure Synapse Analytics
- **Databricks** - Azure Databricks
- **Power BI** - Microsoft Power BI
- **Portal Admin** - Portal de Administração

#### Cartões de Métricas
O dashboard exibe 4 cartões principais:
1. **Dataset** - Informações sobre datasets
2. **Sucesso** - Taxa de requisições bem-sucedidas
3. **Falha** - Taxa de requisições com falha
4. **Total acumulado de falhas** - Contador cumulativo de erros

#### Botões de Navegação
Botões para navegar entre diferentes recursos:
- **Workspace** - Gerenciar workspaces
- **Dataflow** - Fluxos de dados
- **Dataset** - Conjuntos de dados
- **Report** - Relatórios
- **User** - Gerenciamento de usuários

### 🎨 Paleta de Cores

O design segue o tema Steam (dark theme):
- **Fundo principal**: Preto (#000000) e Cinza escuro (#1a1a1a)
- **Accent primário**: Azul (#1e90ff)
- **Accent secundário**: Cyan (#00bfff)
- **Texto primário**: Branco (#ffffff)
- **Texto secundário**: Cinza claro (#a0a0a0)
- **Sucesso**: Verde (#4caf50)
- **Erro**: Vermelho (#f44336)
- **Warning**: Amarelo/Laranja (#ff9800)

### 🔧 Tipografia

- **Font principal**: Segoe UI, Roboto, sans-serif
- **Títulos**: 24-32px, bold
- **Subtítulos**: 18-20px, semi-bold
- **Corpo**: 14-16px, regular
- **Labels**: 12-14px, regular

### 📐 Grid e Espaçamento

- **Grid**: 8px base unit
- **Margens laterais**: 24px
- **Espaçamento entre cards**: 16px
- **Padding interno de cards**: 20px
- **Border radius**: 8-12px

### 🎯 Componentes Principais

#### Cards
- Background: Cinza escuro (#1e1e1e)
- Border: 1px sólida cinza (#333)
- Shadow: Sombra suave para profundidade
- Hover: Elevação e brilho aumentado

#### Botões
- **Primary**: Gradiente azul (#1e90ff → #00bfff)
- **Secondary**: Contorno branco com fundo transparente
- **Danger**: Vermelho (#f44336)
- **Height**: 40px
- **Border radius**: 6px

#### Sidebar
- **Width**: 240px
- **Background**: Preto (#000000)
- **Item hover**: Cinza escuro (#1e1e1e)
- **Item active**: Gradiente azul com borda esquerda

### 💡 Dicas de Uso

- O design é responsivo e se adapta a diferentes tamanhos de tela
- Use os componentes do Figma para manter consistência
- Siga o sistema de design ao adicionar novas telas
- Mantenha o contraste para acessibilidade (WCAG AA)

### 📚 Recursos Adicionais

- [Figma Documentation](https://help.figma.com/)
- [Design System Best Practices](https://www.designsystems.com/)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)

### 🤝 Contribuindo com Designs

Se você quiser sugerir melhorias no design:
1. Faça alterações no arquivo Figma
2. Exporte o novo `.fig`
3. Abra um PR com o arquivo atualizado
4. Descreva as mudanças no PR

---

**Desenvolvido com foco em usabilidade e experiência do usuário** ✨
