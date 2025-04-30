import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getBooks = () => api.get('/books');
export const getUsers = () => api.get('/users');
export const createBook = (bookData) => api.post('/books', bookData);
export const deleteBook = (bookId) => api.delete(`/books/${bookId}`);