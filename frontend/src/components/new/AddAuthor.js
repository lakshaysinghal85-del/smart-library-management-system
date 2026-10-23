import React, { useState } from 'react';

const AddAuthor = () => {
  const [formData, setFormData] = useState({
    authorName: '',
    authorEmail: '',
    authorPhone: '',
    books: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeBooks = (e) => {
    const { value } = e.target;
    const booksArray = value.split(',');
    // Pass an empty array to the formData state
    setFormData((prevData) => ({
      ...prevData,
      books: booksArray
    }));
  
  };
  
  

  const handleAddAuthor = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URI}/authors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Author added successfully!');
        console.log('Author added successfully!');
        setFormData({
          authorName: '',
          authorEmail: '',
          authorPhone: '',
          books: []
        });
      } else {
        console.error('Failed to add Author:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding Author:', error);
    }
  };

  return (
    <div className="flex flex-col items-center py-4 px-2">
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-center text-[#133553] mb-6 tracking-wide">
        Add New Author
      </h1>
      <form onSubmit={handleAddAuthor} className="w-full max-w-md">
        <div className="bg-[#EAE6DE]/70 border border-[#DDD7CA] rounded-2xl p-6 mb-4 shadow-sm">
          <div className="mb-4">
            <label htmlFor="author_name" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-2">
              Author Name
            </label>
            <input
              type="text"
              name="authorName"
              id="author_name"
              placeholder="Enter author's full name..."
              required
              className="border border-[#DDD7CA] bg-white text-[#133553] placeholder-[#226192]/40 rounded-xl p-3 w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#226192] shadow-sm transition-all"
              value={formData.authorName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="author_email" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="authorEmail"
              id="author_email"
              placeholder="author@example.com"
              className="border border-[#DDD7CA] bg-white text-[#133553] placeholder-[#226192]/40 rounded-xl p-3 w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#226192] shadow-sm transition-all"
              value={formData.authorEmail}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="author_phone" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="authorPhone"
              id="author_phone"
              placeholder="+1 (555) 000-0000"
              className="border border-[#DDD7CA] bg-white text-[#133553] placeholder-[#226192]/40 rounded-xl p-3 w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#226192] shadow-sm transition-all"
              value={formData.authorPhone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="books" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-2">
              Books (Comma-separated)
            </label>
            <input
              type="text"
              name="books"
              id="books"
              placeholder="Book 1, Book 2..."
              className="border border-[#DDD7CA] bg-white text-[#133553] placeholder-[#226192]/40 rounded-xl p-3 w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#226192] shadow-sm transition-all"
              value={formData.books}
              onChange={handleChangeBooks}
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="bg-[#226192] hover:bg-[#1A4B72] text-[#FAF9F6] border border-[#1A4B72] py-3.5 w-full rounded-xl font-semibold shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#EF8557] transition-all"
        >
          Add Author
        </button>
      </form>
    </div>
  );
};

export default AddAuthor;
