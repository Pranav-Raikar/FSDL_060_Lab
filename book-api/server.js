const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

let books = [
    { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
    { id: 2, title: "Clean Code", author: "Robert C Martin" }
];

// GET
app.get('/books', (req, res) => {
    res.json(books);
});

// POST
app.post('/books', (req, res) => {
    books.push(req.body);
    res.json({ message: "Book added" });
});

// PUT
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    books = books.map(b => b.id === id ? req.body : b);
    res.json({ message: "Updated" });
});

// DELETE
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    books = books.filter(b => b.id !== id);
    res.json({ message: "Deleted" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
