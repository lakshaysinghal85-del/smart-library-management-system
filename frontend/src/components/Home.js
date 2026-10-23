import React, { useState, useEffect } from 'react';

const Home = ({showBooks,showAuthors,showBorrowers,showBorrowersWithoutBook,showCheckoutBooks,showRemainingBooks}) => {
  const [counts, setCounts] = useState({
    books: 0,
    authors: 0,
    borrowers: 0,
    booksWithBorrower: 0,
    borrowersWithoutBook: 0,
  });
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URI}/counts`);
        if (response.ok) {
          const data = await response.json();
          const parsedData = {
            books: parseInt(data.books) || 0,
            authors: parseInt(data.authors) || 0,
            borrowers: parseInt(data.borrowers) || 0,
            booksWithBorrower: parseInt(data.booksWithBorrower) || 0,
            borrowersWithoutBook: parseInt(data.borrowersWithoutBook) || 0,
          };
          setCounts(parsedData);
        } else {
          console.error('Failed to fetch counts:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, [forceUpdate]);

  const triggerUpdate = () => {
    setForceUpdate((prev) => !prev);
  };

  const Card = ({ children, className = "" }) => {
    return (
      <div className={`bg-[#EAE6DE]/70 border border-[#DDD7CA] rounded-2xl shadow-sm p-5 md:p-6 ${className}`}>
        {children}
      </div>
    );
  };

  const StatCard = ({ title, count, onClickHandle }) => {
    return (
      <div
        className="bg-[#FAF9F6] hover:bg-white border border-[#DDD7CA] hover:border-[#226192]/40 rounded-xl px-4 py-3 mb-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#EF8557] hover:scale-[1.01] hover:shadow-[0_4px_16px_rgba(34,97,146,0.1)] transition-all duration-200 group"
        onClick={onClickHandle}
        tabIndex={0}
      >
        <p className="text-[#133553]/70 text-xs font-semibold uppercase tracking-wider group-hover:text-[#226192] transition-colors">
          {title}
        </p>
        <p className="text-[#226192] font-serif text-3xl font-bold mt-0.5 group-hover:text-[#EF8557] transition-colors">
          {count}
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center py-4 px-2">
      <Card className="w-full max-w-2xl text-center mb-6">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#133553] mb-2 tracking-wide">
          Welcome to the Library Management System
        </h1>
        <p className="text-[#226192]/80 text-sm md:text-base">
          A distinguished catalog where you can manage, checkout, and archive books, borrowers, and authors with ease.
        </p>
        <div className="mt-6 flex justify-center">
          <span className="font-serif text-[#226192] text-xs uppercase tracking-widest font-semibold border-b-2 border-[#EF8557] pb-1">
            System Overview &amp; Status
          </span>
        </div>
      </Card>

      <div className="w-full max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <div className="mb-3 border-b border-[#DDD7CA] pb-2">
              <span className="font-serif text-sm font-semibold text-[#133553]">Catalog Assets</span>
            </div>
            <StatCard title="Total Books" onClickHandle={showBooks} count={counts.books} />
            <StatCard title="Total Authors" onClickHandle={showAuthors} count={counts.authors} />
            <StatCard title="Total Borrowers" onClickHandle={showBorrowers} count={counts.borrowers} />
          </Card>
          <Card>
            <div className="mb-3 border-b border-[#DDD7CA] pb-2">
              <span className="font-serif text-sm font-semibold text-[#133553]">Circulation Activity</span>
            </div>
            <StatCard title="Checked Out Books" onClickHandle={showCheckoutBooks} count={counts.booksWithBorrower} />
            <StatCard title="Borrowers Without Books" onClickHandle={showBorrowersWithoutBook} count={counts.borrowersWithoutBook} />
            <StatCard title="Available On Shelves" onClickHandle={showRemainingBooks} count={parseInt(counts.books) - parseInt(counts.booksWithBorrower)} />
          </Card>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={triggerUpdate}
          className="bg-[#226192] hover:bg-[#1A4B72] text-[#FAF9F6] border border-[#1A4B72] text-xs font-semibold py-2 px-5 rounded-full transition-all shadow-sm hover:shadow-md focus:ring-2 focus:ring-[#EF8557]"
        >
          ↻ Refresh Live Counts
        </button>
      </div>
    </div>
  );
};

export default Home;
