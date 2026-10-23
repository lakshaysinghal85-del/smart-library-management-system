import React, { useState } from 'react';

const SearchBar = ({ placeholder, onSearch, selectedItem }) => {
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearch = () => {
      onSearch(searchQuery);
    };
  
    return (
      <div className="flex justify-center items-center mb-6">
        {selectedItem ? (
          <div className="border border-[#226192]/30 text-[#133553] bg-[#EAE6DE] rounded-xl px-4 py-2.5 w-72 mr-2 text-sm font-semibold shadow-sm truncate">
            {selectedItem.title ? `Book: ${selectedItem.title}` : `Borrower: ${selectedItem.borrowerName}`}
          </div>
        ) : (
          <input
            type="text"
            placeholder={placeholder}
            className="border border-[#DDD7CA] bg-white text-[#133553] placeholder-[#226192]/50 rounded-xl px-4 py-2.5 w-72 mr-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#226192] shadow-sm transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        )}
        <button
          type="button"
          className="bg-[#226192] hover:bg-[#1A4B72] text-[#FAF9F6] border border-[#1A4B72] py-2.5 px-5 rounded-xl text-sm font-semibold shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#EF8557] transition-all"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    );
  };

export default SearchBar;