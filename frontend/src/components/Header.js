import React, { useState, useRef, useEffect } from 'react';
import Logo from '../app_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faBook, faUser, faEdit, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

const Header = ({ onAddBookClick, onAddBorrowerClick, onAddAuthorClick, onUpdateBookClick, onUpdateBorrowerClick, onDeleteBookClick, onDeleteBorrowerClick, onUpdateAuthorClick, onCheckinClick, onCheckoutClick, goHome }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUpdateDropdownOpen, setIsUpdateDropdownOpen] = useState(false);
  const [isDeleteDropdownOpen, setIsDeleteDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const updateDropdownRef = useRef(null);
  const deleteDropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
    if (updateDropdownRef.current && !updateDropdownRef.current.contains(event.target)) {
      setIsUpdateDropdownOpen(false);
    }
    if (deleteDropdownRef.current && !deleteDropdownRef.current.contains(event.target)) {
      setIsDeleteDropdownOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleUpdateDropdown = () => {
    setIsUpdateDropdownOpen(!isUpdateDropdownOpen);
  };

  const toggleDeleteDropdown = () => {
    setIsDeleteDropdownOpen(!isDeleteDropdownOpen);
  };

  return (
    <div className="bg-[#226192] p-4 rounded-t-xl border-b border-[#1A4B72] shadow-lg">
      <div className="container mx-auto flex items-center justify-between flex-wrap gap-4">
        <h1 onClick={goHome} className="flex items-center text-[#FAF9F6] hover:text-[#EF8557] text-2xl lg:text-3xl font-serif font-bold tracking-wide cursor-pointer transition-colors">
          <img src={Logo} alt="Logo" className="mr-3 w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-white/20 shadow-sm" />
          <span className="hidden sm:inline">Library Manager</span>
        </h1>
        <div className="flex flex-wrap items-center space-x-2 ml-auto justify-end">
          <div className="relative inline-block" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="bg-[#1A4B72] hover:bg-[#133553] text-[#FAF9F6] border border-[#5E9EC9]/40 px-3.5 py-2 rounded-lg font-semibold text-sm shadow-sm focus:ring-2 focus:ring-[#EF8557] transition-all">
              <FontAwesomeIcon icon={isDropdownOpen ? faAngleUp : faAngleDown} className="mr-2 text-[#EF8557]" /> New
            </button>
            <div className={`absolute z-20 mt-2 w-52 bg-[#FAF9F6] border border-[#DDD7CA] shadow-2xl rounded-xl ${isDropdownOpen ? 'block' : 'hidden'} transition duration-200 transform-gpu origin-top`}>
              <div className="py-1">
                <button onClick={onAddBookClick} className="block w-full text-left px-4 py-2 text-[#133553] hover:bg-[#EAE6DE] hover:text-[#226192] text-sm font-medium transition-colors">
                  <FontAwesomeIcon icon={faBook} className="mr-2 text-[#226192]" /> Add New Book
                </button>
                <button onClick={onAddAuthorClick} className="block w-full text-left px-4 py-2 text-[#133553] hover:bg-[#EAE6DE] hover:text-[#226192] text-sm font-medium transition-colors">
                  <FontAwesomeIcon icon={faUser} className="mr-2 text-[#226192]" /> Add New Author
                </button>
                <button onClick={onAddBorrowerClick} className="block w-full text-left px-4 py-2 text-[#133553] hover:bg-[#EAE6DE] hover:text-[#226192] text-sm font-medium transition-colors">
                  <FontAwesomeIcon icon={faUser} className="mr-2 text-[#226192]" /> Add New Borrower
                </button>
              </div>
            </div>
          </div>

          <div className="relative inline-block text-left" ref={updateDropdownRef}>
            <button onClick={toggleUpdateDropdown} className="bg-[#1A4B72] hover:bg-[#133553] text-[#FAF9F6] border border-[#5E9EC9]/40 px-3.5 py-2 rounded-lg font-semibold text-sm shadow-sm focus:ring-2 focus:ring-[#EF8557] transition-all">
              <FontAwesomeIcon icon={isUpdateDropdownOpen ? faAngleUp : faAngleDown} className="mr-2 text-[#EF8557]" /> Update
            </button>
            <div className={`absolute z-20 mt-2 w-56 bg-[#FAF9F6] border border-[#DDD7CA] shadow-2xl rounded-xl ${isUpdateDropdownOpen ? 'block' : 'hidden'} transition duration-200 transform-gpu origin-top`}>
              <div className="py-1 text-left">
                <button onClick={onUpdateBookClick} className="block w-full text-left px-4 py-2 text-[#133553] hover:bg-[#EAE6DE] hover:text-[#226192] text-sm font-medium transition-colors">
                  <FontAwesomeIcon icon={faEdit} className="mr-2 text-[#226192]" /> Update Book Details
                </button>
                <button onClick={onUpdateAuthorClick} className="block w-full text-left px-4 py-2 text-[#133553] hover:bg-[#EAE6DE] hover:text-[#226192] text-sm font-medium transition-colors">
                  <FontAwesomeIcon icon={faEdit} className="mr-2 text-[#226192]" /> Update Author Details
                </button>
                <button onClick={onUpdateBorrowerClick} className="block w-full text-left px-4 py-2 text-[#133553] hover:bg-[#EAE6DE] hover:text-[#226192] text-sm font-medium transition-colors">
                  <FontAwesomeIcon icon={faEdit} className="mr-2 text-[#226192]" /> Update Borrower Details
                </button>
              </div>
            </div>
          </div>

          <div className="relative inline-block text-left" ref={deleteDropdownRef}>
            <button onClick={toggleDeleteDropdown} className="bg-[#1A4B72] hover:bg-[#133553] text-[#FAF9F6] border border-[#5E9EC9]/40 px-3.5 py-2 rounded-lg font-semibold text-sm shadow-sm focus:ring-2 focus:ring-[#EF8557] transition-all">
              <FontAwesomeIcon icon={isDeleteDropdownOpen ? faAngleUp : faAngleDown} className="mr-2 text-[#EF8557]" /> Delete
            </button>
            <div className={`absolute z-20 mt-2 w-52 bg-[#FAF9F6] border border-[#DDD7CA] shadow-2xl rounded-xl ${isDeleteDropdownOpen ? 'block' : 'hidden'} transition duration-200 transform-gpu origin-top`}>
              <div className="py-1 text-left">
                <button onClick={onDeleteBookClick} className="block w-full text-left px-4 py-2 text-[#DE6F3E] hover:bg-[#FCE8DF] text-sm font-medium transition-colors">
                  <FontAwesomeIcon icon={faTrash} className="mr-2 text-[#EF8557]" /> Delete Book
                </button>
                <button onClick={onDeleteBorrowerClick} className="block w-full text-left px-4 py-2 text-[#DE6F3E] hover:bg-[#FCE8DF] text-sm font-medium transition-colors">
                  <FontAwesomeIcon icon={faTrash} className="mr-2 text-[#EF8557]" /> Delete Borrower
                </button>
              </div>
            </div>
          </div>

          <button onClick={onCheckinClick} className="bg-[#1A4B72] hover:bg-[#133553] text-[#FAF9F6] border border-[#5E9EC9]/40 px-3.5 py-2 rounded-lg font-semibold text-sm shadow-sm focus:ring-2 focus:ring-[#EF8557] transition-all">
            <FontAwesomeIcon icon={faCheck} className="mr-1.5 text-[#EF8557]" /> Checkin
          </button>

          <button onClick={onCheckoutClick} className="bg-[#EF8557] hover:bg-[#DE6F3E] text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md hover:shadow-lg focus:ring-2 focus:ring-[#EF8557]/50 transition-all">
            <FontAwesomeIcon icon={faCheck} className="mr-1.5 text-white" /> Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
