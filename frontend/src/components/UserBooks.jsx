import { useState, useRef } from 'react';

const RatingStars = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={`star-${i}`}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const DeleteButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/80 text-white hover:bg-red-500 transition-colors duration-200"
    title="Excluir livro"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  </button>
);

const BookCover = ({ thumbnail, title }) => (
  <div className="relative pt-[150%]">
    <img
      src={thumbnail || 'https://via.placeholder.com/300x450?text=Sem+Capa'}
      alt={`Capa do livro ${title}`}
      className="absolute top-0 left-0 w-full h-full object-cover"
      onError={(e) => {
        e.target.src = 'https://via.placeholder.com/300x450?text=Sem+Capa';
        e.target.className = 'absolute top-0 left-0 w-full h-full object-cover opacity-50';
      }}
    />
  </div>
);

const formatDate = (dateStr) => {
  if (!dateStr) return 'Sem data';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
};

const BookCard = ({ book, isDeleting, handleDeleteBook }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    handleDeleteBook(book.id);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all h-full flex flex-col relative 
        ${isDeleting ? 'opacity-0 scale-95 duration-300' : 'opacity-100 scale-100 duration-200'}`}
    >
      <DeleteButton onClick={handleDelete} />
      <BookCover thumbnail={book.thumbnail} title={book.title} />

      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-lg mb-1 line-clamp-2">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-1">{book.authors}</p>
        <div className="text-gray-500 text-xs mb-2 space-y-1">
          <p>Começou a ler em: {formatDate(book.startDate)}</p>
          {book.endDate && (
            <p>Terminou em: {formatDate(book.endDate)}</p>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm bg-book-primary text-white px-2 py-1 rounded">
            {book.pageCount || '?'} págs
          </span>
          <RatingStars rating={book.rating} />
        </div>

        {book.review && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-sm text-gray-600 italic line-clamp-2">"{book.review}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

const UserProfile = ({ user }) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="w-12 h-12 rounded-full bg-book-primary flex items-center justify-center text-black text-xl font-bold">
      {user?.name?.charAt(0) || 'U'}
    </div>
    <div>
      <h2 className="text-2xl font-bold">{user?.name || 'Usuário'}</h2>
      <p className="text-gray-600">{user?.email || ''}</p>
    </div>
  </div>
);

const LoadingState = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-book-primary"></div>
  </div>
);

const EmptyBookList = ({ onRegisterClick }) => (
  <div className="text-center py-12 bg-white rounded-lg shadow space-y-4">
    <h3 className="text-xl font-semibold">Nenhum livro encontrado</h3>
    <p className="text-gray-600">Clique abaixo para cadastrar um novo livro!</p>
    <button
      onClick={onRegisterClick}
      className="inline-block px-6 py-2 bg-book-primary cursor-pointer text-black font-semibold rounded-md shadow hover:bg-book-primary/80 hover:scale-105 transition-all duration-200 ease-in-out"
    >
      Cadastrar
    </button>
  </div>
);

const BookList = ({ books, deletingId, handleDeleteBook }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {books.map((book) => (
      <BookCard
        key={book.id}
        book={book}
        isDeleting={deletingId === book.id}
        handleDeleteBook={handleDeleteBook}
      />
    ))}
  </div>
);

export const UserBooks = ({
  users,
  books,
  loading,
  selectedUserId,
  setActiveTab,
  onDeleteBook,
}) => {
  const [deletingId, setDeletingId] = useState(null);
  const deleteTimeoutRef = useRef(null);

  const safeUsers = Array.isArray(users) ? users : [];
  const safeBooks = Array.isArray(books) ? books : [];

  const userBooks = safeBooks
    .filter((book) => book.userId === selectedUserId)
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  const currentUser = safeUsers.find((user) => user.id === selectedUserId);

  const handleDeleteBook = async (bookId, event) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    if (deletingId !== null) return;

    setDeletingId(bookId);

    try {
      await onDeleteBook(bookId);
    } catch (error) {
      console.error('Falha ao excluir livro:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleRegisterClick = () => setActiveTab('register');

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div>
      <UserProfile user={currentUser} />

      {userBooks.length === 0 ? (
        <EmptyBookList onRegisterClick={handleRegisterClick} />
      ) : (
        <BookList books={userBooks} deletingId={deletingId} handleDeleteBook={handleDeleteBook} />
      )}
    </div>
  );
};
