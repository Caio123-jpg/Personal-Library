# 📚 The Reading Nook - Gerenciador de Biblioteca Pessoal

Uma aplicação web elegante e responsiva para gerenciar sua coleção de livros pessoal com persistência de dados local.

## ✨ Características Principais

### 🎯 Funcionalidades CRUD
- **Create**: Formulário intuitivo para cadastrar novos livros com múltiplos gêneros
- **Read**: Visualização de toda a coleção em cards responsivos
- **Update**: Modal elegante para editar qualquer campo do livro sem deletar
- **Delete**: Remova livros com confirmação de segurança

### 🎨 Design e UX
- **Design responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Paleta de cores aconchegante**: Cores que evocam uma biblioteca acolhedora
- **Animações suaves**: Transições elegantes para melhor experiência
- **Estado vazio inteligente**: Mensagem motivadora quando a biblioteca está vazia

### 🔍 Filtros e Busca
- **Busca em tempo real**: Filtre por título ou autor enquanto digita
- **Filtros de status**: Visualize apenas "Quero Ler", "Lendo" ou "Lido"
- **Estatísticas**: Contador de livros na biblioteca

### ✏️ Sistema de Edição
- **Modal de edição**: Clique no botão de lápis no card para editar qualquer informação
- **Múltiplos gêneros**: Adicione quantos gêneros desejar como tags separadas
- **Rating dinâmico**: Nota obrigatória apenas para livros "Lidos"
- **Edição rápida de status**: Mude direto do card com o dropdown
- **Auto-preenchimento**: Modal se abre automaticamente quando você marca como "Lido" sem nota

### 💾 Persistência de Dados
- **LocalStorage**: Seus dados são salvos automaticamente e persistem entre sessões
- **Sincronização automática**: Cada ação é salva instantaneamente

## 🛠️ Stack Tecnológico

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Tailwind CSS via CDN para estilos modulares
- **JavaScript Vanilla**: Lógica sem dependências externas
- **Web Storage API**: localStorage para persistência
- **Font Awesome**: Ícones profissionais
- **Google Fonts**: Tipografia elegante (Merriweather + Inter)

## 📋 Campos do Livro

Cada livro cadastrado possui:
- **Título**: Nome do livro
- **Autor**: Nome do autor
- **Gêneros**: Múltiplas categorias como tags (ex: Ficção, Romance, Suspense)
- **Número de Páginas**: Total de páginas
- **Nota**: Avaliação de 1 a 5 estrelas (⭐) - obrigatória apenas para "Lido"
- **Status**: Quero Ler 📖 | Lendo 📕 | Lido ✅
- **Data de Adição**: Data em que foi adicionado à biblioteca

## 🎨 Paleta de Cores

- **Fundo**: Stone-50 (tons de papel antigo)
- **Texto Principal**: Stone-900 (quase preto, suave)
- **Destaques**: Amber-800 (caramelo acolhedor) e Teal-700 (contraste moderno)
- **Status Colors**:
  - Verde para "Lido" ✅
  - Amarelo para "Lendo" 📕
  - Azul para "Quero Ler" 📖

## 📱 Responsividade

- **Mobile First**: Otimizado para celulares
- **Grid Adaptativo**: 
  - 1 coluna em mobile
  - 2 colunas em tablet
  - 3 colunas em desktop
  - 4 colunas em telas grandes

## 🚀 Como Usar

1. **Abrir a aplicação**: Simplesmente abra `index.html` no navegador
2. **Adicionar um livro**: Preencha o formulário com os dados do livro
   - Adicione múltiplos gêneros como tags (clique em "+ Adicionar" ou tecle Enter)
   - Nota é obrigatória apenas se o status for "Lido"
3. **Buscar livros**: Digite na barra de busca para filtrar por título ou autor
4. **Filtrar por status**: Clique nos botões de status para visualizar categorias
5. **Editar um livro**: Clique no botão ✏️ (lápis) no card para:
   - Corrigir título, autor, número de páginas
   - Adicionar/remover gêneros
   - Alterar status e adicionar/editar nota
6. **Atualizar status rápido**: Use o dropdown no card para mudar o status
   - Se mudar para "Lido" sem nota, o editor abre automaticamente
7. **Remover livro**: Clique no ícone de lixeira para deletar (com confirmação)

## 📁 Estrutura do Projeto

```
Personal-Library/
├── index.html              # Página principal
├── css/
│   └── styles.css         # Estilos customizados
├── js/
│   ├── main.js           # Lógica principal e renderização
│   └── storage.js        # Gerenciamento de localStorage
└── README.md             # Este arquivo
```

## 🔧 Estrutura do Código

### storage.js
Funções para interação com localStorage:
- `getAllBooks()` - Obtém todos os livros
- `addBook(book)` - Adiciona novo livro
- `updateBook(id, data)` - Atualiza livro existente
- `deleteBook(id)` - Remove um livro
- `searchBooks(term)` - Busca por termo
- `filterByStatus(status)` - Filtra por status

### main.js
Lógica da interface e eventos:
- `init()` - Inicializa a aplicação
- `renderBooks()` - Renderiza os cards
- `createBookCard(book)` - Cria um card de livro
- `handleAddBook(e)` - Submissão do formulário de adição
- `handleEditBook(e)` - Submissão do formulário de edição
- `openEditModal(id)` - Abre o modal de edição
- `closeEditModal()` - Fecha o modal de edição
- `addGenreTag()` - Adiciona gênero no formulário principal
- `addEditGenreTag()` - Adiciona gênero no modal de edição
- `renderGenreTags()` - Renderiza tags de gênero
- `handleSearch(e)` - Busca em tempo real
- `handleFilter(e)` - Filtro por status
- `updateStatusHandler()` - Muda status (com abertura automática do editor se necessário)
- `updateBook()` - Atualiza livro no storage

## ✅ Validações

- Campos obrigatórios no formulário (título, autor, páginas, status)
- Pelo menos um gênero deve ser adicionado
- Números de páginas positivos
- Notas entre 1 e 5 (obrigatória apenas se status = "Lido")
- Prevenção de gêneros duplicados
- Confirmação antes de deletar
- Rating obrigatório ao marcar livro como "Lido"

## 🌟 Recursos Profissionais de Portfólio

✅ CRUD completo funcional  
✅ Modal elegante para edição de dados  
✅ Sistema de tags para múltiplos gêneros  
✅ Rating dinâmico (obrigatório baseado em status)  
✅ Busca em tempo real  
✅ Múltiplos critérios de filtro  
✅ Persistência com localStorage  
✅ Design responsivo e elegante  
✅ Animações suaves e feedback visual  
✅ Código limpo e bem comentado  
✅ Acessibilidade considerada  
✅ Tratamento completo de erros e validações  
✅ UX fluida e intuitiva  
✅ Interações inteligentes (auto-edição ao marcar como lido)  

## 💡 Possíveis Extensões Futuras

- Adicionar categorias personalizadas
- Sistema de rating e resenhas
- Exportar/Importar dados (CSV, JSON)
- Sincronização com cloud (Firebase)
- Dark mode toggle
- Integração com API de livros (Google Books)
- Modo offline com Service Workers
- Compartilhamento de listas com amigos

## 📄 Licença

Desenvolvido com ❤️ para amantes de livros.

---

**Versão**: 2.0  
**Última atualização**: Abril de 2026  
**Status**: ✅ Completo e Funcional com Sistema de Edição
