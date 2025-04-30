export const BookList = ({ books, loading, setActiveTab }) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-book-primary"></div>
            </div>
        )
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Meus Livros</h2>

            {books.length === 0 ? (
                <div className="text-center space-y-4">
                    <button
                        onClick={() => setActiveTab('register')}
                        className="px-4 py-2 bg-book-primary text-white rounded-md hover:bg-book-primary/90 transition"
                    >
                        Cadastrar Livro
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map(book => (
                        <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <img
                                src={book.thumbnail || 'https://via.placeholder.com/150x200?text=Sem+Capa'}
                                alt={book.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-1">{book.title}</h3>
                                <p className="text-gray-600 text-sm mb-2">{book.authors}</p>

                                <div className="flex items-center justify-between mt-3">
                                    <span className="text-sm bg-book-primary text-white px-2 py-1 rounded">
                                        {book.pageCount} páginas
                                    </span>
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-4 h-4 ${i < book.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}