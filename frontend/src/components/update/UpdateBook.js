import React, { useState, useEffect } from 'react';
import SearchBar from '../search_comp/SearchBar';
import ItemList from '../search_comp/ItemList';


const UpdateBook = () => {
  const [formData, setFormData] = useState({
    bookId: '',
    title: '',
    authorName: '',
    category: '',
    price: '',
    preAuthorID: ''
  });

  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showBookList, setShowBookList] = useState(true);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URI}/books/search?query=${query}`);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
    }
  };

  const handleSelectBook = async (book) => {
    setSelectedBook(book);
    const authorId = book.author?._id; 
    if (!authorId) {
      throw new Error('Author ID not found');
    }
    setShowBookList(false);
    setFormData({
      bookId: book._id,
      title: book.title,
      authorName: book?.author.authorName || '', 
      category: book.category || '', 
      price: book.price ? book.price.toString() : ''
    });
  };

  const handleReset = () => {
    setFormData({
      bookId: '',
      title: '',
      authorName: '',
      category: '',
      price: '',
      preAuthorID: ''
    });
    setBooks([]);
    setSelectedBook(null);
    setShowBookList(true);
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URI}/books`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Book updated successfully');
        console.log('Book updated successfully!');
        setSelectedBook(null);
        setShowBookList(true);
        setBooks([]);
        setFormData({
          bookId: '',
          title: '',
          authorName: '',
          category: '',
          price: '',
          preAuthorID: ''
        })};
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  useEffect(() => {
    if (selectedBook) {
      setFormData({
        bookId: selectedBook._id,
        title: selectedBook.title,
        authorName: selectedBook.authorName,
        category: selectedBook.category,
        price: selectedBook.price.toString()
      });
    }
  }, [selectedBook]);

  return (
    <div className="flex flex-col items-center py-4 px-2">
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-center text-[#133553] mb-6 tracking-wide">
        Update Book Details
      </h1>
      {!selectedBook ? (
        <div className="w-full max-w-md">
          <SearchBar onSearch={handleSearch} selectedItem={selectedBook} placeholder="Search Books..." />
          <ItemList items={books} onSelectItem={handleSelectBook} itemType="book" isVisible={showBookList} />
        </div>
      ) : (
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit}>
            <div className="bg-[#EAE6DE]/70 border border-[#DDD7CA] rounded-2xl p-6 mb-4 shadow-sm">
              <div className="mb-4">
                <label htmlFor="title" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-2">
                  Book Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Book Title"
                  required
                  className="border border-[#DDD7CA] bg-white text-[#133553] placeholder-[#226192]/40 rounded-xl p-3 w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#226192] shadow-sm transition-all"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="authorName" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-2">
                  Author Name
                </label>
                <input
                  type="text"
                  name="authorName"
                  id="authorName"
                  placeholder="Author Name"
                  required
                  className="border border-[#DDD7CA] bg-white text-[#133553] placeholder-[#226192]/40 rounded-xl p-3 w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#226192] shadow-sm transition-all"
                  value={formData.authorName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-2">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Category"
                  className="border border-[#DDD7CA] bg-white text-[#133553] placeholder-[#226192]/40 rounded-xl p-3 w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#226192] shadow-sm transition-all"
                  value={formData.category}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="price" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Price"
                  required
                  className="border border-[#DDD7CA] bg-white text-[#133553] placeholder-[#226192]/40 rounded-xl p-3 w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#226192] shadow-sm transition-all"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#226192] hover:bg-[#1A4B72] text-[#FAF9F6] border border-[#1A4B72] py-3.5 w-full rounded-xl font-semibold shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#EF8557] transition-all mb-3"
            >
              Update Book
            </button>
          </form>
          <div>
            <button
              onClick={handleReset}
              className="bg-[#EAE6DE] text-[#133553] border border-[#DDD7CA] hover:bg-[#DDD7CA]/50 py-3.5 w-full rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#226192] transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateBook;
