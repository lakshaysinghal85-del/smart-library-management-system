import React, { useState, useEffect } from 'react';
import SearchBar from '../search_comp/SearchBar';
import ItemList from '../search_comp/ItemList';

const UpdateBorrower = () => {
  const [showBorrowerList, setShowBorrowerList] = useState(true);
  const [formData, setFormData] = useState({
    borrowerName: '',
    borrowerEmail: '',
    borrowerPhone: '',
    borrowerAddress: '',
  });

  const [borrowers, setBorrowers] = useState([]);

  const [selectedBorrower, setSelectedBorrower] = useState(null);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URI}/borrowers/search?query=${query}`);
      const data = await response.json();
      setBorrowers(data);
    } catch (error) {
      console.error('Error fetching borrowers:', error);
      setBorrowers([]);
    }
  };

  const handleSelectBorrower = async (borrower) => {
    setSelectedBorrower(borrower);
    try {
      setFormData({
        borrowerName: borrower.borrowerName,
        borrowerEmail: borrower.borrowerEmail,
        borrowerPhone: borrower.borrowerPhone,
        borrowerAddress: borrower.borrowerAddress || ''
      });
      setShowBorrowerList(false);
    } catch (error) {
      setFormData({
        borrowerName: borrower.borrowerName,
        borrowerEmail: '',
        borrowerPhone: '',
        borrowerAddress: ''
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
      const response = await fetch(`${process.env.REACT_APP_API_URI}/borrowers/${selectedBorrower._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Borrower updated successfully');
        console.log('Borrower updated successfully!');
        setFormData({
          borrowerName: '',
          borrowerEmail: '',
          borrowerPhone: '',
          borrowerAddress: '',
        });
        setBorrowers([]);
        setSelectedBorrower(null);
        setShowBorrowerList(true);
       }
    } catch (error) {
      console.error('Error updating borrower:', error);
    }
  };

  const handleReset = () => {
    setFormData({
      borrowerName: '',
      borrowerEmail: '',
      borrowerPhone: '',
      borrowerAddress: '',
    });
    setBorrowers([]);
    setSelectedBorrower(null);
    setShowBorrowerList(true);
  };

  useEffect(() => {
    if (selectedBorrower) {
      setFormData({
        borrowerName: selectedBorrower.borrowerName,
        borrowerEmail: selectedBorrower.borrowerEmail,
        borrowerPhone: selectedBorrower.borrowerPhone,
        borrowerAddress: selectedBorrower.borrowerAddress || ''
      });
    }
  }, [selectedBorrower]);

  return (
    <div className="flex flex-col items-center py-4 px-2">
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-center text-[#133553] mb-6 tracking-wide">
        Update Borrower
      </h1>
      {!selectedBorrower ? (
        <div className="w-full max-w-md">
          <SearchBar onSearch={handleSearch} placeholder={"Search Borrower..."} />
          <ItemList items={borrowers} onSelectItem={handleSelectBorrower} isVisible={showBorrowerList} itemType="borrower" />
        </div>
      ) : (
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit}>
            <div className="bg-[#EAE6DE]/70 border border-[#DDD7CA] rounded-2xl p-6 mb-4 shadow-sm">
              <div className="mb-4">
                <label htmlFor="borrower_name" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-2">
                  Borrower Name
                </label>
                <input
                  type="text"
                  name="borrowerName"
                  id="borrower_name"
                  placeholder="Borrower's Name"
                  className="border border-[#DDD7CA] bg-white text-[#133553] placeholder-[#226192]/40 rounded-xl p-3 w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#226192] shadow-sm transition-all"
                  value={formData.borrowerName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="borrower_email" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="borrowerEmail"
                  id="borrower_email"
                  placeholder="Borrower's Email"
                  className="border border-[#DDD7CA] bg-white text-[#133553] placeholder-[#226192]/40 rounded-xl p-3 w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#226192] shadow-sm transition-all"
                  value={formData.borrowerEmail}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="borrower_phone" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="borrowerPhone"
                  id="borrower_phone"
                  placeholder="Borrower's Phone No"
                  className="border border-[#DDD7CA] bg-white text-[#133553] placeholder-[#226192]/40 rounded-xl p-3 w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#226192] shadow-sm transition-all"
                  value={formData.borrowerPhone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="borrower_address" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-2">
                  Residential Address
                </label>
                <input
                  type="text"
                  name="borrowerAddress"
                  id="borrowerAddress"
                  placeholder="Borrower's Address"
                  className="border border-[#DDD7CA] bg-white text-[#133553] placeholder-[#226192]/40 rounded-xl p-3 w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#226192] shadow-sm transition-all"
                  value={formData.borrowerAddress}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#226192] hover:bg-[#1A4B72] text-[#FAF9F6] border border-[#1A4B72] py-3.5 w-full rounded-xl font-semibold shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#EF8557] transition-all mb-3"
            >
              Update Borrower
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

export default UpdateBorrower;
