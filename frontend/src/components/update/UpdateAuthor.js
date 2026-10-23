import React, { useState, useEffect } from 'react';
import SearchBar from '../search_comp/SearchBar';
import ItemList from '../search_comp/ItemList';

const UpdateAuthor = () => {
  const [showAuthorList, setShowAuthorList] = useState(true);
  const [formData, setFormData] = useState({
    authorName: '',
    authorEmail: '',
    authorPhone: ''
  });

  const [authors, setAuthors] = useState([]);

  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const handleSearch = async (query) => {
    try {
        // console.log('Query:', query);
        const response = await fetch(`${process.env.REACT_APP_API_URI}/authors/search?query=${query}`);
        const data = await response.json();
        setAuthors(data);
    } 
    catch (error) {
        console.error('Error fetching authors:', error);
        setAuthors([]);
    }
  };

  const handleSelectAuthor = async (author) => {
    setSelectedAuthor(author);
    try {
      setFormData({
        authorName: author.authorName,
        authorEmail: author.authorEmail,
        authorPhone: author.authorPhone
      });
    } catch (error) {
      setFormData({
        authorName: author.authorName,
        authorEmail: '',
        authorPhone: ''
      });
    }
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
      const response = await fetch(`${process.env.REACT_APP_API_URI}/authors/${selectedAuthor._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Author updated successfully');
        console.log('Author updated successfully!');
        setFormData({
            authorName: '',
            authorEmail: ''
        });
        setAuthors([]);
        setSelectedAuthor(null);
      }
    } catch (error) {
      console.error('Error updating author:', error);
    }
  };

  const handleReset = () => {
    setFormData({
      authotName: '',
      authorEmail: '',
      authorPhone: ''
    });
    setSelectedAuthor(null);
    setAuthors([]);
    setShowAuthorList(true);
  };

  useEffect(() => {
    if (selectedAuthor) {
      setFormData({
        authorName: selectedAuthor.authorName,
        authorEmail: selectedAuthor.authorEmailEmail,
        authorPhone: selectedAuthor.authorPhone
      });
    }
  }, [selectedAuthor]);

  return (
    <div className="flex flex-col items-center py-4 px-2">
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-center text-[#133553] mb-6 tracking-wide">
        Update Author
      </h1>
      
      {!selectedAuthor ? (
        <div className="w-full max-w-md">
          <SearchBar onSearch={handleSearch} placeholder="Search Authors..." />
          <ItemList items={authors} onSelectItem={handleSelectAuthor} isVisible={showAuthorList} itemType="author" /> 
        </div>
      ) : (
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit}>
            <div className="bg-[#EAE6DE]/70 border border-[#DDD7CA] rounded-2xl p-6 mb-4 shadow-sm">
              <div className="mb-4">
                <label htmlFor="author_name" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-2">
                  Author Name
                </label>
                <input
                  type="text"
                  name="authorName"
                  id="author_name"
                  placeholder="Author's Name"
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
                  placeholder="Author's Email"
                  className="border border-[#DDD7CA] bg-white text-[#133553] placeholder-[#226192]/40 rounded-xl p-3 w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#226192] shadow-sm transition-all"
                  value={formData.authorEmail}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="author_phone" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="authorPhone"
                  id="author_phone"
                  placeholder="Author's Phone Number"
                  className="border border-[#DDD7CA] bg-white text-[#133553] placeholder-[#226192]/40 rounded-xl p-3 w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#226192] shadow-sm transition-all"
                  value={formData.authorPhone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#226192] hover:bg-[#1A4B72] text-[#FAF9F6] border border-[#1A4B72] py-3.5 w-full rounded-xl font-semibold shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#EF8557] transition-all mb-3"
            >
              Update Author
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

export default UpdateAuthor;
