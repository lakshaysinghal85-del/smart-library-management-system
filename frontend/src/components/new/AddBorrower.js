import React, { useState } from 'react';

const AddBorrower = () => {
  const [formData, setFormData] = useState({
    borrowerName: '',
    borrowerEmail: '',
    borrowerPhone: '',
    borrowerAddress: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddBorrower = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URI}/borrowers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Borrower added successfully!');
        console.log('Borrower added successfully!');
        // Clear form data after successful submission if needed
        setFormData({
          borrowerName: '',
          borrowerEmail: '',
          borrowerPhone: '',
          borrowerAddress: '',
        });
      } else {
        console.error('Failed to add borrower:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding borrower:', error);
    }
  };

  return (
    <div className="flex flex-col items-center py-4 px-2">
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-center text-[#133553] mb-6 tracking-wide">
        Add New Borrower
      </h1>
      <form onSubmit={handleAddBorrower} className="w-full max-w-md">
        <div className="bg-[#EAE6DE]/70 border border-[#DDD7CA] rounded-2xl p-6 mb-4 shadow-sm">
          <div className="mb-4">
            <label htmlFor="borrower_name" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-2">
              Borrower Name
            </label>
            <input
              type="text"
              name="borrowerName"
              id="borrower_name"
              placeholder="Enter borrower's full name..."
              required
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
              placeholder="borrower@example.com"
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
              placeholder="+1 (555) 000-0000"
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
              id="borrower_address"
              placeholder="Street address, City, ZIP"
              className="border border-[#DDD7CA] bg-white text-[#133553] placeholder-[#226192]/40 rounded-xl p-3 w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#226192] shadow-sm transition-all"
              value={formData.borrowerAddress}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#226192] hover:bg-[#1A4B72] text-[#FAF9F6] border border-[#1A4B72] py-3.5 w-full rounded-xl font-semibold shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#EF8557] transition-all"
        >
          Add Borrower
        </button>
      </form>
    </div>
  );
};

export default AddBorrower;
