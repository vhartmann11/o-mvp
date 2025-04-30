import { useState } from 'react';
import { BookSearch } from './BookSearch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RatingInput = ({ value, onChange }) => {
  const handleClick = (newValue) => {
    if (newValue === value) {
      onChange(0);
    } else {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          className="focus:outline-none"
        >
          <svg
            className={`w-7 h-7 ${
              star <= value ? 'text-yellow-400' : 'text-gray-300'
            } transition-colors duration-150`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

export const BookForm = ({ selectedUserId, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    pageCount: '',
    thumbnail: '',
    startDate: '',
    endDate: '',
    rating: 0,
    review: '',
    userId: selectedUserId,
  });

  const handleSelectBook = (book) => {
    setFormData({
      ...formData,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors?.join(', '),
      pageCount: book.volumeInfo.pageCount,
      thumbnail: book.volumeInfo.imageLinks?.thumbnail || 'https://placehold.co/150x200',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error('Título do livro é obrigatório');
      return;
    }

    try {
      await onSubmit({
        title: formData.title,
        authors: formData.authors || 'Autor desconhecido',
        pageCount: Number(formData.pageCount) || 0,
        thumbnail: formData.thumbnail || 'https://placehold.co/150x200',
        startDate: formData.startDate,
        endDate: formData.endDate,
        rating: Number(formData.rating),
        review: formData.review,
        userId: selectedUserId,
      });

      toast.success('Livro cadastrado com sucesso!');

      setFormData((prev) => ({
        title: '',
        authors: '',
        pageCount: '',
        thumbnail: '',
        startDate: '',
        endDate: '',
        rating: 0,
        review: '',
        userId: prev.userId,
      }));
    } catch (error) {
      toast.error('Erro ao cadastrar livro, preencha os campos com * corretamente!');
      console.error('Erro detalhado:', error);
    }
  };

  return (
    <div className="relative max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-8 border border-gray-100">
      <ToastContainer position="top-center" autoClose={3000} />
      <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Cadastrar nova leitura</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <BookSearch onSelectBook={handleSelectBook} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-600">Título*</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-600">Autor(es)*</label>
            <input
              type="text"
              value={formData.authors}
              onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
              className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-600">Páginas*</label>
            <input
              type="number"
              value={formData.pageCount}
              onChange={(e) => setFormData({ ...formData, pageCount: e.target.value })}
              className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
            />
          </div>

          <div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">Capa do Livro</label>
  <div className="flex items-center gap-4">
    <div className="w-20 h-28 border rounded-md overflow-hidden bg-gray-50 shadow-sm flex items-center justify-center">
      <img
        src={formData.thumbnail || 'https://placehold.co/150x200'}
        alt="Capa do livro"
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.src = 'https://placehold.co/150x200';
        }}
      />
    </div>
    <div className="flex-1 space-y-1">
      <input
        type="text"
        value={formData.thumbnail}
        onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
        placeholder="URL da imagem"
      />
      <p className="text-xs text-gray-500">** ou insira a URL da sua capa favorita aqui ↑</p>
    </div>
  </div>
</div>

          <div>
            <label className="block mb-2 font-medium text-gray-600">Início da leitura*</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-600">Término da leitura</label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-600">
            {formData.rating > 0
              ? `Avaliação: ${formData.rating} estrela${formData.rating > 1 ? 's' : ''}`
              : 'Avaliação (0-5)'}
          </label>
          <RatingInput
            value={formData.rating}
            onChange={(newRating) => setFormData({ ...formData, rating: newRating })}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-600">Opinião</label>
          <textarea
            value={formData.review}
            onChange={(e) => setFormData({ ...formData, review: e.target.value })}
            className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-300 focus:border-green-400 transition h-28"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-semibold px-4 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-md hover:shadow-lg"
        >
          Cadastrar Livro
        </button>
      </form>
    </div>
  );
};
