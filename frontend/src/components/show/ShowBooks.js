import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "../search_comp/SearchBar";

const ShowItemList = ({ items, openItems, toggleItem, type }) => {
  return (
    <div className="mb-4 w-full">
      {items.map((item, index) => (
        <div
          key={item._id}
          className="bg-white hover:bg-[#FAF9F6] border border-[#DDD7CA] hover:border-[#226192]/50 p-3.5 rounded-xl mb-2.5 cursor-pointer text-[#133553] transition-all duration-150 shadow-sm text-sm"
          onClick={() => toggleItem(index)}
        >
          {(type === "all" || type === "available") ? (
            <>
              {openItems.includes(index) ? (
                <div className="bg-[#EAE6DE] border border-[#DDD7CA] p-4 text-left rounded-xl text-[#133553] space-y-1 shadow-sm">
                  <p className="font-semibold text-base font-serif text-[#133553] mb-1">{item.title}</p>
                  {item.author && (
                    <>
                      <p><span className="text-[#226192] font-semibold">Author:</span> {item.author.authorName}</p>
                      <p><span className="text-[#226192] font-semibold">Author Email:</span> {item.author.authorEmail}</p>
                    </>
                  )}
                  <p><span className="text-[#226192] font-semibold">Category:</span> {item.category}</p>
                  <p><span className="text-[#226192] font-semibold">Price:</span> ${item.price}</p>
                  <p className="text-xs text-[#226192]/60 mt-2 italic">Click to collapse</p>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-[#133553] block">{item.title}</span>
                    <span className="text-[#226192]/70 text-xs">{item.author ? item.author.authorName : 'Unknown'} · {item.category}</span>
                  </div>
                  <span className="text-xs bg-[#EF8557]/10 border border-[#EF8557]/30 px-2.5 py-0.5 rounded-full text-[#DE6F3E] font-bold font-mono">
                    ${item.price}
                  </span>
                </div>
              )}
            </>
          ) : type === "borrowed" ? (
            <>
              {openItems.includes(index) ? (
                <div className="bg-[#EAE6DE] border border-[#DDD7CA] p-4 text-left rounded-xl text-[#133553] space-y-1 shadow-sm">
                  <p className="font-semibold text-base font-serif text-[#133553] mb-1">{item.title}</p>
                  {item.author && (
                    <p><span className="text-[#226192] font-semibold">Author:</span> {item.author.authorName}</p>
                  )}
                  <p><span className="text-[#226192] font-semibold">Category:</span> {item.category}</p>
                  <p><span className="text-[#226192] font-semibold">Price:</span> ${item.price}</p>
                  {item.borrower && (
                    <div className="mt-2 pt-2 border-t border-[#DDD7CA]">
                      <p className="text-xs uppercase tracking-wider text-[#226192] font-semibold">Borrower Information</p>
                      <p><span className="text-[#226192] font-semibold">Name:</span> {item.borrower.borrowerName}</p>
                      <p><span className="text-[#226192] font-semibold">Email:</span> {item.borrower.borrowerEmail}</p>
                      <p><span className="text-[#226192] font-semibold">Phone:</span> {item.borrower.borrowerPhone}</p>
                    </div>
                  )}
                  <p className="text-xs text-[#226192]/60 mt-2 italic">Click to collapse</p>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-[#133553] block">{item.title}</span>
                    <span className="text-[#226192]/70 text-xs">
                      {item.author ? item.author.authorName : 'Unknown'} · Borrowed by {item.borrower ? item.borrower.borrowerName : 'Unknown'}
                    </span>
                  </div>
                  <span className="text-xs bg-[#226192]/10 border border-[#226192]/30 px-2.5 py-0.5 rounded-full text-[#226192] font-semibold">
                    Checked Out
                  </span>
                </div>
              )}
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
};


const ShowBooks = ({ type }) => {
  const initialBoooksState = [];
  const [books, setBooks] = useState(initialBoooksState);
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (index) => {
    setOpenItems((prevOpenItems) => {
      if (prevOpenItems.includes(index)) {
        return prevOpenItems.filter((itemIndex) => itemIndex !== index);
      } else {
        return [...prevOpenItems, index];
      }
    });
  };

  const handleSearch = useCallback(
    async (query) => {
      try {
        let response = null;
        if (type === "all") {
          response = await fetch(
            `${process.env.REACT_APP_API_URI}/books/search?query=${query}`
          );
        } else if (type === "borrowed") {
          response = await fetch(
            `${process.env.REACT_APP_API_URI}/books/searchin?query=${query}`
          );
        } else if (type === "available") {
          response = await fetch(
            `${process.env.REACT_APP_API_URI}/books/searchout?query=${query}`
          );
        }

        const data = await response.json();
        // console.log("Response:", data);
        setBooks(data);
      } catch (error) {
        console.error("Error fetching borrowers:", error);
        setBooks([]);
      }
    },
    [type]
  );

  const handleClearSearch = () => {
    setSearchQuery("");
    handleSearch("");
    setBooks(initialBoooksState);
    setOpenItems([]);
  };

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, handleSearch]);

  const pageTitle =
    type === "borrowed"
      ? "Checked Out Books"
      : type === "available"
      ? "Available Books"
      : "Library Book Catalog";

  return (
    <div className="flex flex-col items-center py-4 px-2">
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-center text-[#133553] mb-6 tracking-wide">
        {pageTitle}
      </h1>
      <div className="w-full max-w-md">
        <div className="flex justify-center items-center mb-4">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder={"Search Books..."}
            value={searchQuery}
          />
          <button
            onClick={handleClearSearch}
            title="Clear Search"
            className="ml-2 mb-6 px-3.5 py-2.5 rounded-xl font-bold bg-[#EAE6DE] text-[#133553] hover:bg-[#DDD7CA]/50 border border-[#DDD7CA] transition-all text-xs"
          >
            Clear
          </button>
        </div>
        <div className="w-full">
          <ShowItemList
            items={books}
            openItems={openItems}
            toggleItem={toggleItem}
            type={type}
          />
        </div>
      </div>
    </div>
  );
};

export default ShowBooks;
