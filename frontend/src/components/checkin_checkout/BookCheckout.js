import React, {lazy,startTransition, useState } from 'react';
// import CheckoutReceipt from './CheckoutReceipt';
// import SearchBar from '../search_comp/SearchBar';
// import ItemList from '../search_comp/ItemList';

const CheckoutReceipt = lazy(() => import('./CheckoutReceipt'));
const SearchBar = lazy(() => import('../search_comp/SearchBar'));
const ItemList = lazy(() => import('../search_comp/ItemList'));

const BookCheckout = () => {
  const [books, setBooks] = useState([]);
  const [borrowers, setBorrowers] = useState([]);
  const [searchedBook, setSearchedBook] = useState(null);
  const [searchedBorrower, setSearchedBorrower] = useState(null);
  const [confirmCheckout, setConfirmCheckout] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBorrower, setSelectedBorrower] = useState(null);
  const [showBookList, setShowBookList] = useState(true);
  const [showBorrowerList, setShowBorrowerList] = useState(true);
  const [showSelectedItems, setShowSelectedItems] = useState(false);

  const handleBookSearch = async (query) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URI}/books/searchout?query=${query}`);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
    }
  };

  const handleBorrowerSearch = async (query) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URI}/borrowers/search?query=${query}`);
      const data = await response.json();
      setBorrowers(data);
    } catch (error) {
      console.error('Error fetching borrowers:', error);
      setBorrowers([]);
    }
  };

  const handleItemSelect = (item, itemType) => {
    startTransition(() => {
    if (itemType === 'book') {
      setSearchedBook(item);
      setSelectedBook(item);
      setShowBookList(false);
      
    } else if (itemType === 'borrower') {
      setSearchedBorrower(item);
      setSelectedBorrower(item);
      setShowBorrowerList(false);
    }
  });
  };

  const handleContinue = () => {
    startTransition(() => {
    if (searchedBook && searchedBorrower) {
      setShowSelectedItems(true);
    } else {
      alert('Please select both a book and a borrower.');
    }
  });
  }

  const handleReset = () => {
    startTransition(() => {
      setBooks([]);
      setBorrowers([]);
      setSearchedBook(null);
      setSearchedBorrower(null);
      setConfirmCheckout('');
      setSelectedBook(null);
      setSelectedBorrower(null);
      setShowSelectedItems(false);
      setShowBookList(true);
      setShowBorrowerList(true);
    });
  };
  

  const handleCheckout = () => {
    if (confirmCheckout === 'checkout' && searchedBook && searchedBorrower) {
      const bookId = searchedBook._id;
      const borrowerId = searchedBorrower._id;

      fetch(`${process.env.REACT_APP_API_URI}/books/checkout`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId,borrowerId }),
      })
        .then((response) => {
          if (response.ok) {
            alert('Book checked out successfully!');
            // Reset state and form data
            setSearchedBook(null);
            setSearchedBorrower(null);
            setConfirmCheckout('');
            setSelectedBook(null);
            setSelectedBorrower(null);
            setShowSelectedItems(false); // Hide selected items
          } else {
            throw new Error('Failed to checkout book');
          }
        })
        .catch((error) => {
          console.error('Error checking out book:', error);
          alert('Error checking out book. Please try again.');
        });
    } else {
      alert('Please type "checkout" in the confirmation box and select both a book and a borrower.');
    }
  };

  return (
    <div className="flex flex-col items-center py-4 px-2">
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-center text-[#133553] mb-6 tracking-wide">
        Book Checkout
      </h1>
      <div className="w-full max-w-md">
        {!showSelectedItems && (
          <>
            <SearchBar
              placeholder="Search Book..."
              onSearch={handleBookSearch}
              selectedItem={selectedBook}
            /> 
            <ItemList
              items={books}
              onSelectItem={(item) => handleItemSelect(item, 'book')}
              itemType="book"
              isVisible={showBookList}
            />
            <SearchBar
              placeholder="Search Borrower..."
              onSearch={handleBorrowerSearch}
              selectedItem={selectedBorrower}
            />
            <ItemList
              items={borrowers}
              onSelectItem={(item) => handleItemSelect(item, 'borrower')}
              itemType="borrower"
              isVisible={showBorrowerList}
            />
            <div className="mt-4 space-y-3">
              <button
                type="button"
                className="bg-[#EF8557] hover:bg-[#DE6F3E] text-white py-3.5 w-full rounded-xl font-bold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#EF8557]/50 transition-all"
                onClick={handleContinue}
              >
                Continue to Checkout
              </button>
              <button
                type="button"
                className="bg-[#EAE6DE] text-[#133553] border border-[#DDD7CA] hover:bg-[#DDD7CA]/50 py-3.5 w-full rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#226192] transition-all"
                onClick={handleReset}
              >
                Clear Selection
              </button>
            </div>
          </>
        )}
       
        {showSelectedItems && (
          <>
            <CheckoutReceipt selectedBook={selectedBook} selectedBorrower={selectedBorrower} />
            <form onSubmit={(e) => e.preventDefault()} className="w-full">
              <div className="bg-[#EAE6DE]/70 border border-[#DDD7CA] rounded-2xl p-5 mt-4 shadow-sm">
                <div className="mb-2">
                  <label htmlFor="confirmation" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-1">
                    Confirmation (Type 'checkout')
                  </label>
                  <input
                    type="text"
                    id="confirmation"
                    placeholder="Type 'checkout' to confirm"
                    className="border border-[#226192]/40 bg-white text-[#133553] placeholder-[#226192]/40 rounded-xl p-3 w-full text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#226192] shadow-sm"
                    value={confirmCheckout}
                    onChange={(e) => setConfirmCheckout(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <button
                  type="button"
                  className="bg-[#EF8557] hover:bg-[#DE6F3E] text-white py-3.5 w-full rounded-xl font-bold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#EF8557]/50 transition-all"
                  onClick={handleCheckout}
                >
                  Confirm Checkout
                </button>
                <button
                  type="button"
                  className="bg-[#EAE6DE] text-[#133553] border border-[#DDD7CA] hover:bg-[#DDD7CA]/50 py-3.5 w-full rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#226192] transition-all"
                  onClick={handleReset}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookCheckout;
