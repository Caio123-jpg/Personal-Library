// Storage.js - Gerenciamento de localización com localStorage

const STORAGE_KEY = 'readingNookBooks';

/**
 * Obtém todos os livros do localStorage
 * @returns {Array} Array de livros
 */
function getAllBooks() {
    const books = localStorage.getItem(STORAGE_KEY);
    return books ? JSON.parse(books) : [];
}

/**
 * Salva todos os livros no localStorage
 * @param {Array} books - Array de livros a serem salvos
 */
function saveBooks(books) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

/**
 * Adiciona um novo livro
 * @param {Object} book - Objeto do livro com propriedades: title, author, genres, pages, rating, status
 * @returns {Object} O livro adicionado com id gerado
 */
function addBook(book) {
    const books = getAllBooks();
    const newBook = {
        id: Date.now(), // ID único baseado em timestamp
        title: book.title,
        author: book.author,
        genres: Array.isArray(book.genres) ? book.genres : [book.genres], // Garantir que é um array
        pages: parseInt(book.pages),
        rating: book.rating || 0, // Default 0 se não informado
        status: book.status,
        addedDate: new Date().toLocaleDateString('pt-BR')
    };
    books.push(newBook);
    saveBooks(books);
    return newBook;
}

/**
 * Atualiza um livro existente
 * @param {number} id - ID do livro
 * @param {Object} updatedData - Dados atualizados do livro
 */
function updateBook(id, updatedData) {
    const books = getAllBooks();
    const bookIndex = books.findIndex(b => b.id === id);
    if (bookIndex !== -1) {
        books[bookIndex] = { ...books[bookIndex], ...updatedData };
        saveBooks(books);
    }
}

/**
 * Remove um livro
 * @param {number} id - ID do livro a ser removido
 */
function deleteBook(id) {
    const books = getAllBooks();
    const filteredBooks = books.filter(b => b.id !== id);
    saveBooks(filteredBooks);
}

/**
 * Busca livros por título ou autor
 * @param {string} searchTerm - Termo de busca
 * @returns {Array} Array de livros que correspondem à busca
 */
function searchBooks(searchTerm) {
    const books = getAllBooks();
    const term = searchTerm.toLowerCase();
    return books.filter(book => 
        book.title.toLowerCase().includes(term) || 
        book.author.toLowerCase().includes(term)
    );
}

/**
 * Filtra livros por status
 * @param {string} status - Status a filtrar ('Lido', 'Lendo', 'Quero Ler', 'all')
 * @returns {Array} Array de livros filtrados
 */
function filterByStatus(status) {
    const books = getAllBooks();
    if (status === 'all') return books;
    return books.filter(book => book.status === status);
}

/**
 * Retorna a quantidade total de livros
 * @returns {number} Quantidade de livros
 */
function getTotalBooks() {
    return getAllBooks().length;
}

/**
 * Limpa todos os dados (para testes)
 */
function clearAllBooks() {
    localStorage.removeItem(STORAGE_KEY);
}
