import React, { lazy, startTransition, useState } from "react";
// import SearchBar from "../search_comp/SearchBar";
// import ItemList from "../search_comp/ItemList";
// import FormComp from "../search_comp/FormComp";

const SearchBar = lazy(() => import("../search_comp/SearchBar"));
const ItemList = lazy(() => import("../search_comp/ItemList"));
const FormComp = lazy(() => import("../search_comp/FormComp"));

const DeleteBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState("");
  const [showBookList, setShowBookList] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    authorName: "",
    category: "",
    price: "",
  });

  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/books/searchout?query=${query}`
      );
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    }
  };

  const handleSelectBook = async (book) => {
    startTransition(() => {
      setSelectedBook(book);
      setShowBookList(false);
      setFormData({
        title: book.title,
        authorName: book?.author.authorName || "",
        category: book.category || "",
        price: book.price ? book.price.toString() : "",
      });
    });
  };

  const handleReset = () => {
    startTransition(() => {
      setFormData({
        title: "",
        authorName: "",
        category: "",
        price: "",
      });
      setBooks([]);
      setSelectedBook(null);
      setShowBookList(true);
      setConfirmDelete("");
    });
  };

  const handleDelete = async () => {
    if (confirmDelete === "delete" && selectedBook) {
      const { _id: bookId, author } = selectedBook;

      const requestBody = {
        bookId,
        authorId: author._id,
      };

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URI}/books`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
        if (response.ok) {
          alert("Book deleted successfully");
          console.log("Book deleted successfully!");
          setConfirmDelete("");
          setSelectedBook(null);
          setBooks([]);
          handleReset();
        }
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    } else {
      alert('Please type "delete" in the confirmation box to delete the book.');
    }
  };

  return (
    <div className="flex flex-col items-center py-4 px-2">
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-center text-[#133553] mb-6 tracking-wide">
        Delete Book
      </h1>
      {!selectedBook ? (
        <div className="w-full max-w-md">
          <SearchBar
            onSearch={handleSearch}
            selectedItem={selectedBook}
            placeholder="Search Books..."
          />
          <ItemList
            items={books}
            onSelectItem={handleSelectBook}
            itemType="book"
            isVisible={showBookList}
          />
        </div>
      ) : (
        <div className="w-full max-w-md">
          <FormComp 
            form_data={formData}
            setConfirm={setConfirmDelete}
            type="deletebook"
          />
          <div className="mt-4 space-y-3">
            <button
              onClick={handleDelete}
              className="bg-[#DE6F3E] hover:bg-[#BA5327] text-white border border-[#BA5327] py-3.5 w-full rounded-xl font-semibold shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#EF8557] transition-all"
            >
              Delete Book Permanently
            </button>
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

export default DeleteBook;
