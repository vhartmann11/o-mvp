import { useState, useEffect } from 'react';
import { Dashboard } from './pages/Dashboard';
import { Navbar } from './components/Navbar';
import { UserBooks } from './components/UserBooks';
import { getBooks, getUsers, deleteBook, createBook } from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState('books');
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [booksResponse, usersResponse] = await Promise.all([
          getBooks(),
          getUsers()
        ]);
        setBooks(booksResponse.data);
        setUsers(usersResponse.data);
        if (usersResponse.data.length > 0) {
          setSelectedUserId(usersResponse.data[0].id);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleBookCreated = async (newBookData) => {
    try {
      const response = await createBook({
        ...newBookData,
        pageCount: Number(newBookData.pageCount) || 0
      });
      const newBook = response.data;
      setBooks(prevBooks => [...prevBooks, newBook]);
      return newBook;
    } catch (error) {
      console.error('Erro ao criar livro:', error.response?.data || error.message);
      throw error;
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await deleteBook(bookId);
      setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        users={users}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
      />

      <main className="container mx-auto p-4">
        {activeTab === 'register' ? (
          <Dashboard
            users={users}
            selectedUserId={selectedUserId}
            onBookCreated={handleBookCreated}
            setActiveTab={setActiveTab}
          />
        ) : (
          <UserBooks
            users={users}
            books={books}
            loading={loading}
            selectedUserId={selectedUserId}
            setActiveTab={setActiveTab}
            onDeleteBook={handleDeleteBook}
          />
        )}
      </main>
    </div>
  );
}

export default App;