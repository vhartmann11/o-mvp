const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

let books = [

];

const users = [
  { id: 1, name: 'Ana Silva', email: 'ana@exemplo.com' },
  { id: 2, name: 'João Santos', email: 'joao@exemplo.com' },
  { id: 3, name: 'Maria Oliveira', email: 'maria@exemplo.com' }
];

app.get('/api', (req, res) => {
  res.json({ message: 'Backend conectado com sucesso via proxy!' });
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/books', (req, res) => {
  res.json(books);
});

app.post('/api/books', (req, res) => {
  const { title, authors, pageCount, thumbnail, userId } = req.body;

  if (!title || !authors || !pageCount || !thumbnail || !userId) {
    return res.status(400).json({
      error: 'Dados incompletos',
      required: ['title', 'authors', 'pageCount', 'thumbnail', 'userId'],
      received: Object.keys(req.body)
    });
  }

  const newBook = {
    id: books.length + 1,
    ...req.body
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

app.delete('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const initialLength = books.length;

  books = books.filter(book => book.id !== bookId);

  if (books.length === initialLength) {
    return res.status(404).json({ error: 'Livro não encontrado' });
  }

  res.status(200).json({ message: 'Livro deletado com sucesso' });
});

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});