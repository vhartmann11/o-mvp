import { useState, useEffect } from 'react';

export const BookSearch = ({ onSelectBook }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const timerId = setTimeout(() => {
      searchBooks();
    }, 200);

    return () => clearTimeout(timerId);
  }, [query]);

  const searchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`
      );
      const data = await response.json();
      setResults(data.items || []);
    } catch (error) {
      console.error("Erro na busca:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Procure o seu livro aqui (Ex: Harry Potter)"
          className="w-full p-2 border rounded"
        />
      </div>

      {isLoading && <div className="text-center py-2">Carregando...</div>}

      {results.length > 0 && (
        <div className="max-h-60 overflow-y-auto border rounded">
          {results.map((book) => (
            <div
              key={book.id}
              onClick={() => {
                onSelectBook(book);
                setQuery('');
                setResults([]);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
            >
              <img
                src={book.volumeInfo.imageLinks?.thumbnail || 'https://placehold.co/50x100'}
                alt="Capa"
                className="w-10 h-14 object-cover"
              />
              <div>
                <h3 className="font-medium">{book.volumeInfo.title}</h3>
                <p className="text-sm text-gray-600">
                  {book.volumeInfo.authors?.join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};