import React, {lazy,useState,startTransition } from "react";
// import SearchBar from "../search_comp/SearchBar";
// import ItemList from "../search_comp/ItemList";
// import FormComp from "../search_comp/FormComp";

const SearchBar = lazy(() => import("../search_comp/SearchBar"));
const ItemList = lazy(() => import("../search_comp/ItemList"));
const FormComp = lazy(() => import("../search_comp/FormComp"));

const DeleteBorrower = () => {
  const [borrowers, setBorrowers] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState('');
  const [selectedBorrower, setSelectedBorrower] = useState(null);
  const [showBorrowerList, setShowBorrowerList] = useState(true);



  const handleSearch = async (query) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URI}/borrowers/searchdel?query=${query}`);
      const data = await response.json();
      setBorrowers(data);
    } catch (error) {
      console.error('Error fetching borrowers:', error);
      setBorrowers([]);
    }
  };

  const handleSelectBorrower = async (borrower) => {
    startTransition(() => {
      setSelectedBorrower(borrower);
    });
  };

  const handleReset = () => {
    startTransition(() => {
      setSelectedBorrower(null);
      setBorrowers([]);
      setConfirmDelete('');
      setShowBorrowerList(true);
    });
  };

  const handleDelete = async () => {
    if (confirmDelete === 'delete' && selectedBorrower) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URI}/borrowers/${selectedBorrower._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          alert('Borrower deleted successfully');
          console.log('Borrower deleted successfully!');
          setConfirmDelete('');
          setSelectedBorrower(null);
          setShowBorrowerList(true);
          setBorrowers([]);
          handleDelete();
        }
      } catch (error) {
        console.error('Error deleting borrower:', error);
      }
    } else {
      alert('Please type "delete" in the confirmation box to delete the borrower.');
    }
  };

  return (
    <div className="flex flex-col items-center py-4 px-2">
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-center text-[#133553] mb-6 tracking-wide">
        Delete Borrower
      </h1>
      {!selectedBorrower ? (
        <div className="w-full max-w-md">
          <SearchBar onSearch={handleSearch} placeholder={"Search Borrower..."} />
          <ItemList items={borrowers} onSelectItem={handleSelectBorrower} isVisible={showBorrowerList} itemType="borrower" />
        </div>
      ) : (
        <div className="w-full max-w-md">
          <FormComp setConfirm={setConfirmDelete} selectedItem={selectedBorrower} type="deleteborrower" />
          <div className="mt-4 space-y-3">
            <button
              type="button"
              className="bg-[#DE6F3E] hover:bg-[#BA5327] text-white border border-[#BA5327] py-3.5 w-full rounded-xl font-semibold shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#EF8557] transition-all"
              onClick={handleDelete}
            >
              Delete Borrower Permanently
            </button>
            <button
              type="button"
              className="bg-[#EAE6DE] text-[#133553] border border-[#DDD7CA] hover:bg-[#DDD7CA]/50 py-3.5 w-full rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#226192] transition-all"
              onClick={handleReset}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBorrower;
