import React, { useState } from 'react';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    authorName: '',
    category: '',
    price: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URI}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
      ,console.log('Form submitted:', JSON.stringify(formData)));

      if (response.ok) {
        alert('Book added successfully!');
        console.log('Book added successfully!');
        setFormData({
          title: '',
          authorName: '',
          category: '',
          price: '',
        });
      } else {
        console.error('Failed to add book:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className='flex flex-col items-center py-4 px-2'>
      <h1 className='font-serif text-2xl md:text-3xl font-bold text-center text-[#133553] mb-6 tracking-wide'>
        Add New Book Record
      </h1>
      <form onSubmit={handleAddBook} className='w-full max-w-md'>
        <div className='bg-[#EAE6DE]/70 border border-[#DDD7CA] rounded-2xl p-6 mb-4 shadow-sm'> 
          <div className='mb-4'>
            <label htmlFor='title' className='block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-2'>
              Book Title
            </label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder='Enter book title...'
              required
              className='border border-[#DDD7CA] bg-white text-[#133553] placeholder-[#226192]/40 rounded-xl p-3 w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#226192] shadow-sm transition-all'
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='authorName' className='block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-2'>
              Author Name
            </label>
            <input
              type='text'
              name='authorName'
              id='authorName'
              placeholder='Enter author name...'
              required
              className='border border-[#DDD7CA] bg-white text-[#133553] placeholder-[#226192]/40 rounded-xl p-3 w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#226192] shadow-sm transition-all'
              value={formData.authorName}
              onChange={handleChange}
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='category' className='block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-2'>
              Category
            </label>
            <input
              type='text'
              name='category'
              id='category'
              placeholder='e.g., Fiction, Science, History...'
              className='border border-[#DDD7CA] bg-white text-[#133553] placeholder-[#226192]/40 rounded-xl p-3 w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#226192] shadow-sm transition-all'
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='price' className='block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-2'>
              Price ($)
            </label>
            <input
              type='number'
              name='price'
              id='price'
              placeholder='Price in USD'
              className='border border-[#DDD7CA] bg-white text-[#133553] placeholder-[#226192]/40 rounded-xl p-3 w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#226192] shadow-sm transition-all'
              value={formData.price}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          type='submit'
          className="bg-[#226192] hover:bg-[#1A4B72] text-[#FAF9F6] border border-[#1A4B72] py-3.5 w-full rounded-xl font-semibold shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#EF8557] transition-all"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
