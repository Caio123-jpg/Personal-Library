// Main.js - Lógica principal da aplicação

let currentFilter = 'all';
let currentSearch = '';
let genresList = []; // Array para armazenar gêneros adicionados
let editGenresList = []; // Array para armazenar gêneros do formulário de edição
let currentEditingId = null; // ID do livro sendo editado

/**
 * Inicializa a aplicação
 */
function init() {
    renderBooks();
    setupEventListeners();
    updateStatistics();
    updateRatingRequirement(); // Inicializa o estado do rating
    
    // Permitir adicionar gênero com Enter
    const genreInput = document.getElementById('genreInput');
    if (genreInput) {
        genreInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addGenreTag();
            }
        });
    }

    // Permitir adicionar gênero com Enter no modal de edição
    const editGenreInput = document.getElementById('editGenreInput');
    if (editGenreInput) {
        editGenreInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addEditGenreTag();
            }
        });
    }

    // Setup do formulário de edição
    const editForm = document.getElementById('editForm');
    if (editForm) {
        editForm.addEventListener('submit', handleEditBook);
    }
}

/**
 * Adiciona um gênero à lista de gêneros
 */
function addGenreTag() {
    const genreInput = document.getElementById('genreInput');
    const genre = genreInput.value.trim();

    if (!genre) {
        alert('Por favor, digite um gênero!');
        return;
    }

    if (genresList.includes(genre)) {
        alert('Este gênero já foi adicionado!');
        return;
    }

    genresList.push(genre);
    genreInput.value = '';
    renderGenreTags();
    genreInput.focus();
}

/**
 * Remove um gênero da lista
 */
function removeGenreTag(genre) {
    genresList = genresList.filter(g => g !== genre);
    renderGenreTags();
}

/**
 * Renderiza as tags de gênero
 */
function renderGenreTags() {
    const container = document.getElementById('genreTagsContainer');
    const hiddenInput = document.getElementById('genres');
    
    container.innerHTML = '';
    genresList.forEach(genre => {
        const tag = document.createElement('span');
        tag.className = 'inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-semibold';
        tag.innerHTML = `
            ${genre}
            <button type="button" onclick="removeGenreTag('${genre}')" class="hover:text-red-700 font-bold">
                ✕
            </button>
        `;
        container.appendChild(tag);
    });

    // Atualizar input hidden com os gêneros
    hiddenInput.value = JSON.stringify(genresList);
}

/**
 * Adiciona um gênero à lista de edição
 */
function addEditGenreTag() {
    const genreInput = document.getElementById('editGenreInput');
    const genre = genreInput.value.trim();

    if (!genre) {
        alert('Por favor, digite um gênero!');
        return;
    }

    if (editGenresList.includes(genre)) {
        alert('Este gênero já foi adicionado!');
        return;
    }

    editGenresList.push(genre);
    genreInput.value = '';
    renderEditGenreTags();
    genreInput.focus();
}

/**
 * Remove um gênero da lista de edição
 */
function removeEditGenreTag(genre) {
    editGenresList = editGenresList.filter(g => g !== genre);
    renderEditGenreTags();
}

/**
 * Renderiza as tags de gênero do modal de edição
 */
function renderEditGenreTags() {
    const container = document.getElementById('editGenreTagsContainer');
    
    container.innerHTML = '';
    editGenresList.forEach(genre => {
        const tag = document.createElement('span');
        tag.className = 'inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-semibold';
        tag.innerHTML = `
            ${genre}
            <button type="button" onclick="removeEditGenreTag('${genre}')" class="hover:text-red-700 font-bold">
                ✕
            </button>
        `;
        container.appendChild(tag);
    });
}

/**
 * Atualiza o requirement do campo rating baseado no status
 */
function updateRatingRequirement() {
    const status = document.getElementById('status').value;
    const ratingInput = document.getElementById('rating');
    const ratingRequired = document.getElementById('ratingRequired');

    if (status === 'Lido') {
        ratingInput.required = true;
        ratingRequired.textContent = '*';
    } else {
        ratingInput.required = false;
        ratingRequired.textContent = '';
    }
}

/**
 * Atualiza o requirement do campo rating no modal de edição
 */
function updateEditRatingRequirement() {
    const status = document.getElementById('editStatus').value;
    const ratingInput = document.getElementById('editRating');
    const ratingRequired = document.getElementById('editRatingRequired');

    if (status === 'Lido') {
        ratingInput.required = true;
        ratingRequired.textContent = '*';
    } else {
        ratingInput.required = false;
        ratingRequired.textContent = '';
    }
}

/**
 * Configura todos os event listeners
 */
function setupEventListeners() {
    // Formulário
    const bookForm = document.getElementById('bookForm');
    if (bookForm) {
        bookForm.addEventListener('submit', handleAddBook);
    }

    // Busca em tempo real
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // Botões de filtro
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });
}

/**
 * Adiciona um novo livro através do formulário
 * @param {Event} e - Evento do formulário
 */
function handleAddBook(e) {
    e.preventDefault();

    // Validar gêneros
    if (genresList.length === 0) {
        alert('Por favor, adicione pelo menos um gênero!');
        return;
    }

    const status = document.getElementById('status').value.trim();
    const rating = document.getElementById('rating').value;

    // Validar rating apenas se status for "Lido"
    if (status === 'Lido' && !rating) {
        alert('Por favor, adicione uma nota para livros que você já leu!');
        return;
    }

    const formData = {
        title: document.getElementById('title').value.trim(),
        author: document.getElementById('author').value.trim(),
        genres: [...genresList], // Cópia do array
        pages: document.getElementById('pages').value,
        rating: rating ? parseInt(rating) : 0, // 0 se não informado
        status: status
    };

    // Validação básica
    if (!formData.title || !formData.author || !formData.pages || !formData.status) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }

    // Adicionar livro ao storage
    addBook(formData);

    // Limpar formulário
    e.target.reset();
    genresList = [];
    renderGenreTags();

    // Atualizar visualização e estatísticas
    renderBooks();
    updateStatistics();

    // Mostrar feedback visual
    showSuccessMessage('Livro adicionado com sucesso! 📚');
}

/**
 * Filtra livros por termo de busca em tempo real
 * @param {Event} e - Evento do input
 */
function handleSearch(e) {
    currentSearch = e.target.value.trim();
    renderBooks();
}

/**
 * Filtra livros por status
 * @param {Event} e - Evento do botão de filtro
 */
function handleFilter(e) {
    currentFilter = e.target.dataset.filter;
    
    // Atualiza o estilo do botão ativo
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('ring-2', 'ring-amber-800');
    });
    e.target.classList.add('ring-2', 'ring-amber-800');

    renderBooks();
}

/**
 * Renderiza os livros conforme os filtros aplicados
 */
function renderBooks() {
    const container = document.getElementById('booksContainer');
    const emptyState = document.getElementById('emptyState');
    
    if (!container) return;

    // Obter livros
    let books = getAllBooks();

    // Aplicar filtro de status
    if (currentFilter !== 'all') {
        books = books.filter(book => book.status === currentFilter);
    }

    // Aplicar filtro de busca
    if (currentSearch) {
        books = books.filter(book =>
            book.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
            book.author.toLowerCase().includes(currentSearch.toLowerCase())
        );
    }

    // Limpar container
    container.innerHTML = '';

    // Se não há livros, mostrar estado vazio
    if (books.length === 0) {
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    // Renderizar cards
    books.forEach(book => {
        const card = createBookCard(book);
        container.appendChild(card);
    });
}

/**
 * Cria um card HTML para um livro
 * @param {Object} book - Objeto do livro
 * @returns {HTMLElement} Elemento do card
 */
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = `bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 overflow-hidden border-l-4 animate-fadeIn`;
    
    // Definir cor da borda conforme status
    const statusColors = {
        'Lido': 'border-green-500',
        'Lendo': 'border-yellow-500',
        'Quero Ler': 'border-blue-500'
    };
    card.classList.add(statusColors[book.status] || 'border-stone-300');

    // Gerar estrelas (apenas se tiver nota)
    const stars = book.rating > 0 ? generateStars(book.rating) : 'Sem nota';
    
    // Renderizar gêneros como tags
    const genresHTML = Array.isArray(book.genres) 
        ? book.genres.map(g => `<span class="inline-block bg-stone-100 rounded-full px-2 py-1 text-xs">${g}</span>`).join('')
        : `<span class="inline-block bg-stone-100 rounded-full px-2 py-1 text-xs">${book.genres || 'N/A'}</span>`;

    card.innerHTML = `
        <div class="p-5">
            <!-- Status Badge -->
            <div class="flex justify-between items-start mb-3">
                <span class="inline-block px-2 py-1 rounded-full text-xs font-bold ${getStatusBadge(book.status)}">
                    ${book.status}
                </span>
                <button onclick="deleteBookHandler(${book.id})" class="text-red-500 hover:text-red-700 transition text-lg" title="Remover livro">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>

            <!-- Título -->
            <h3 class="text-lg font-bold text-stone-900 mb-2 line-clamp-2" style="font-family: 'Merriweather', serif;" title="${book.title}">
                ${book.title}
            </h3>

            <!-- Autor -->
            <p class="text-sm text-stone-600 mb-3">
                <i class="fas fa-pen-fancy mr-2 text-amber-800"></i>
                <strong>${book.author}</strong>
            </p>

            <!-- Gêneros como tags -->
            <div class="flex flex-wrap gap-1 mb-3">
                ${genresHTML}
            </div>

            <!-- Informações do Livro -->
            <div class="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div class="bg-stone-50 p-2 rounded text-center">
                    <p class="text-stone-600 text-xs">Páginas</p>
                    <p class="font-bold text-stone-900">${book.pages}</p>
                </div>
                <div class="bg-stone-50 p-2 rounded text-center">
                    <p class="text-stone-600 text-xs">Nota</p>
                    <p class="font-bold ${book.rating > 0 ? 'text-yellow-500' : 'text-stone-400'}">${stars}</p>
                </div>
            </div>

            <!-- Data de Adição -->
            <p class="text-xs text-stone-400 mb-4">
                <i class="fas fa-calendar-alt mr-1"></i>Adicionado: ${book.addedDate}
            </p>

            <!-- Botões de Ação -->
            <div class="flex gap-2">
                <select onchange="updateStatusHandler(${book.id}, this.value)" class="flex-1 text-xs px-2 py-2 border border-stone-300 rounded bg-white hover:border-teal-700 transition cursor-pointer">
                    <option value="Quero Ler" ${book.status === 'Quero Ler' ? 'selected' : ''}>📖 Quero Ler</option>
                    <option value="Lendo" ${book.status === 'Lendo' ? 'selected' : ''}>📕 Lendo</option>
                    <option value="Lido" ${book.status === 'Lido' ? 'selected' : ''}>✅ Lido</option>
                </select>
                <button type="button" onclick="openEditModal(${book.id})" class="px-3 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded transition" title="Editar livro">
                    <i class="fas fa-edit"></i>
                </button>
            </div>
        </div>
    `;

    return card;
}

/**
 * Retorna as classes CSS para o badge de status
 * @param {string} status - Status do livro
 * @returns {string} Classes CSS do badge
 */
function getStatusBadge(status) {
    const badges = {
        'Lido': 'bg-green-100 text-green-800',
        'Lendo': 'bg-yellow-100 text-yellow-800',
        'Quero Ler': 'bg-blue-100 text-blue-800'
    };
    return badges[status] || 'bg-stone-100 text-stone-800';
}

/**
 * Gera uma string de estrelas baseada na nota
 * @param {number} rating - Nota de 1 a 5
 * @returns {string} String com estrelas
 */
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return '⭐'.repeat(fullStars) + '☆'.repeat(emptyStars);
}

/**
 * Handler para deletar um livro com confirmação
 * @param {number} id - ID do livro
 */
function deleteBookHandler(id) {
    if (confirm('Tem certeza que deseja remover este livro da sua biblioteca?')) {
        deleteBook(id);
        renderBooks();
        updateStatistics();
        showSuccessMessage('Livro removido com sucesso! 🗑️');
    }
}

/**
 * Abre o modal de edição com dados do livro
 * @param {number} id - ID do livro a editar
 */
function openEditModal(id) {
    const books = getAllBooks();
    const book = books.find(b => b.id === id);

    if (!book) {
        alert('Livro não encontrado!');
        return;
    }

    currentEditingId = id;
    editGenresList = Array.isArray(book.genres) ? [...book.genres] : [book.genres];

    // Preencher campos
    document.getElementById('editBookId').value = id;
    document.getElementById('editTitle').value = book.title;
    document.getElementById('editAuthor').value = book.author;
    document.getElementById('editPages').value = book.pages;
    document.getElementById('editStatus').value = book.status;
    document.getElementById('editRating').value = book.rating || '';
    document.getElementById('editGenreInput').value = '';

    // Renderizar gêneros
    renderEditGenreTags();
    updateEditRatingRequirement();

    // Mostrar modal
    document.getElementById('editModal').classList.remove('hidden');
}

/**
 * Fecha o modal de edição
 */
function closeEditModal() {
    document.getElementById('editModal').classList.add('hidden');
    editGenresList = [];
    currentEditingId = null;
    document.getElementById('editForm').reset();
}

/**
 * Salva as alterações do livro
 * @param {Event} e - Evento do formulário
 */
function handleEditBook(e) {
    e.preventDefault();

    if (editGenresList.length === 0) {
        alert('Por favor, adicione pelo menos um gênero!');
        return;
    }

    const status = document.getElementById('editStatus').value.trim();
    const rating = document.getElementById('editRating').value;

    // Validar rating apenas se status for "Lido"
    if (status === 'Lido' && !rating) {
        alert('Por favor, adicione uma nota para livros que você já leu!');
        return;
    }

    const updatedBook = {
        title: document.getElementById('editTitle').value.trim(),
        author: document.getElementById('editAuthor').value.trim(),
        genres: [...editGenresList],
        pages: parseInt(document.getElementById('editPages').value),
        rating: rating ? parseInt(rating) : 0,
        status: status
    };

    // Atualizar livro
    updateBook(currentEditingId, updatedBook);

    // Fechar modal e atualizar UI
    closeEditModal();
    renderBooks();
    updateStatistics();
    showSuccessMessage('Livro atualizado com sucesso! ✨');
}

/**
 * Handler para atualizar o status de um livro
 * @param {number} id - ID do livro
 * @param {string} newStatus - Novo status
 */
function updateStatusHandler(id, newStatus) {
    const books = getAllBooks();
    const book = books.find(b => b.id === id);

    // Se mudando para "Lido" e não tem nota, abrir modal para adicionar
    if (newStatus === 'Lido' && (!book.rating || book.rating === 0)) {
        updateBook(id, { status: newStatus });
        renderBooks();
        setTimeout(() => {
            openEditModal(id);
            showSuccessMessage('Agora adicione uma nota ao livro! ⭐');
        }, 100);
    } else {
        updateBook(id, { status: newStatus });
        renderBooks();
        updateStatistics();
        showSuccessMessage('Status atualizado! ✨');
    }
}

/**
 * Atualiza as estatísticas exibidas
 */
function updateStatistics() {
    const totalBooksElement = document.getElementById('totalBooks');
    if (totalBooksElement) {
        totalBooksElement.textContent = getTotalBooks();
    }
}

/**
 * Mostra uma mensagem de sucesso temporária
 * @param {string} message - Mensagem a exibir
 */
function showSuccessMessage(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg animate-slideIn';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remover após 3 segundos
    setTimeout(() => {
        notification.classList.add('animate-slideOut');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Inicializar quando o DOM está pronto
document.addEventListener('DOMContentLoaded', init);
