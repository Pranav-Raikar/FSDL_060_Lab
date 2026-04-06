document.addEventListener('DOMContentLoaded', () => {
    const bookList = document.getElementById('bookList');
    const addBookForm = document.getElementById('addBookForm');

    // Fetch and display books
    const loadBooks = async () => {
        try {
            const response = await fetch('/books');
            const books = await response.json();
            renderBooks(books);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    // Render books to the DOM
    const renderBooks = (books) => {
        bookList.innerHTML = '';
        if (books.length === 0) {
            bookList.innerHTML = '<p style="color: var(--text-secondary); padding: 1rem;">No books found. Add one above!</p>';
            return;
        }

        books.forEach(book => {
            const card = document.createElement('div');
            card.className = 'book-card';
            card.innerHTML = `
                <div class="book-id">#${book.id}</div>
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <button class="btn-delete" onclick="deleteBook(${book.id})">Delete Book</button>
            `;
            bookList.appendChild(card);
        });
    };

    // Add a new book
    addBookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const newBook = {
            id: parseInt(document.getElementById('bookId').value),
            title: document.getElementById('bookTitle').value,
            author: document.getElementById('bookAuthor').value
        };

        try {
            const response = await fetch('/books', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBook)
            });

            if (response.ok) {
                addBookForm.reset();
                loadBooks();
            }
        } catch (error) {
            console.error('Error adding book:', error);
        }
    });

    const updateBookForm = document.getElementById('updateBookForm');

    // Update an existing book
    updateBookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const id = document.getElementById('updateBookId').value;
        const updatedBook = {
            id: parseInt(id),
            title: document.getElementById('updateBookTitle').value,
            author: document.getElementById('updateBookAuthor').value
        };

        try {
            const response = await fetch(`/books/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedBook)
            });

            if (response.ok) {
                updateBookForm.reset();
                loadBooks();
            } else {
                console.error('Failed to update book');
                alert('Book ID not found or could not be updated.');
            }
        } catch (error) {
            console.error('Error updating book:', error);
        }
    });

    // Delete a book
    window.deleteBook = async (id) => {
        try {
            const response = await fetch(`/books/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                loadBooks();
            }
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    // Initial load
    loadBooks();
});