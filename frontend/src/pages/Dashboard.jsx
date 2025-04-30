import { BookForm } from '../components/BookForm'

export const Dashboard = ({ users, selectedUserId, onBookCreated, setActiveTab }) => {
  const currentUser = users.find(user => user.id === selectedUserId)

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <button
          onClick={() => setActiveTab('books')}
          className="flex items-center gap-1 cursor-pointer text-book-primary hover:text-blue-700 mb-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Voltar para lista de livros
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Cadastrar livro para {currentUser?.name}</h1>
      </div>

      <BookForm
        selectedUserId={selectedUserId}
        onSubmit={onBookCreated}
      />
    </div>
  )
}