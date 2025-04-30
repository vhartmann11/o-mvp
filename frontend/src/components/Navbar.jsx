export const Navbar = ({
  activeTab,
  setActiveTab,
  users,
  selectedUserId,
  setSelectedUserId
}) => {
  const currentUser = users.find(user => user.id === selectedUserId) || {}

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-book-primary text-white shadow-xl">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => setActiveTab('books')}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2 ${activeTab === 'books'
              ? 'bg-gradient-to-br from-white to-book-secondary text-gray-900 font-bold shadow-lg ring-2 ring-white/50'
              : 'bg-black/70 hover:bg-black/80 text-white'
              }`}
          >
            <span className="text-lg">📖</span>
            Meus Livros
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2 ${activeTab === 'register'
              ? 'bg-gradient-to-br from-white to-book-primary text-gray-900 font-bold shadow-lg ring-2 ring-white/50'
              : 'bg-black/70 hover:bg-black/80 text-white'
              }`}
          >
            Cadastrar Livro
          </button>
        </div>
        <div className="text-center bg-transparent px-6 py-3 backdrop-blur-sm">
          <img src="/o-mvp-logo.png" alt="" />
        </div>
        <div className="flex justify-center items-center gap-3">
          {activeTab !== 'register' ? (
            <select
              value={selectedUserId || ''}
              onChange={(e) => setSelectedUserId(Number(e.target.value))}
              className="bg-black/70 text-white px-4 py-2 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-book-primary focus:border-transparent transition-all cursor-pointer"
            >
              {users.map(user => (
                <option key={user.id} value={user.id} className="bg-gray-800">
                  {user.name}
                </option>
              ))}
            </select>
          ) : (
            <div className="bg-black/40 px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2 backdrop-blur-sm">
              <span className="text-sm opacity-80">Usuário:</span>
              <span className="font-medium text-white">
                {currentUser.name}
              </span>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}