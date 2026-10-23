import React, { lazy, useState, startTransition, Suspense } from "react";

const Home = lazy(() => import("./components/Home"));
const Header = lazy(() => import("./components/Header"));

const AddBook = lazy(() => import("./components/new/AddBook"));
const AddAuthor = lazy(() => import("./components/new/AddAuthor"));
const AddBorrower = lazy(() => import("./components/new/AddBorrower"));

const BookCheckin = lazy(() =>
  import("./components/checkin_checkout/BookCheckin")
);
const BookCheckout = lazy(() =>
  import("./components/checkin_checkout/BookCheckout")
);

const UpdateBorrower = lazy(() =>
  import("./components/update/UpdateBorrower")
);
const UpdateAuthor = lazy(() =>
  import("./components/update/UpdateAuthor")
);
const UpdateBook = lazy(() =>
  import("./components/update/UpdateBook")
);

const DeleteBorrower = lazy(() =>
  import("./components/delete/DeleteBorrower")
);
const DeleteBook = lazy(() =>
  import("./components/delete/DeleteBook")
);

const ShowBorrowers = lazy(() =>
  import("./components/show/ShowBorrowers")
);
const ShowBooks = lazy(() => import("./components/show/ShowBooks"));
const ShowAuthors = lazy(() =>
  import("./components/show/ShowAuthors")
);

function App() {
  const [activeForm, setActiveForm] = useState("goToHome");

  const handleButtonClick = (formName) => {
    startTransition(() => setActiveForm(formName));
  };

  return (
    <div className="min-h-screen text-[#133553]">
      <Suspense
        fallback={
          <div className="flex flex-col justify-center items-center h-screen text-xl text-editorial font-serif">
            <div className="w-12 h-12 border-4 border-editorial/20 border-t-editorial rounded-full animate-spin mb-4"></div>
            <p className="tracking-widest uppercase text-sm font-semibold text-editorial">Loading Library...</p>
          </div>
        }
      >
        <Header
          onAddBookClick={() => handleButtonClick("addBook")}
          onAddBorrowerClick={() => handleButtonClick("addBorrower")}
          onAddAuthorClick={() => handleButtonClick("addAuthor")}
          onUpdateBookClick={() => handleButtonClick("updateBook")}
          onUpdateBorrowerClick={() => handleButtonClick("updateBorrower")}
          onUpdateAuthorClick={() => handleButtonClick("updateAuthor")}
          onDeleteBookClick={() => handleButtonClick("deleteBook")}
          onDeleteBorrowerClick={() => handleButtonClick("deleteBorrower")}
          onCheckinClick={() => handleButtonClick("checkinBook")}
          onCheckoutClick={() => handleButtonClick("checkoutBook")}
          goHome={() => handleButtonClick("goToHome")}
        />

        <main className="flex justify-center px-4 py-8 md:py-10">
          <div className="bg-[#FAF9F6] rounded-2xl shadow-[0_12px_40px_rgba(34,97,146,0.08)] border border-[#DDD7CA] p-6 md:p-8 w-full max-w-4xl transition-all">
            {activeForm === "addBook" && <AddBook />}
            {activeForm === "addBorrower" && <AddBorrower />}
            {activeForm === "addAuthor" && <AddAuthor />}

            {activeForm === "updateBook" && <UpdateBook />}
            {activeForm === "updateAuthor" && <UpdateAuthor />}
            {activeForm === "updateBorrower" && <UpdateBorrower />}

            {activeForm === "deleteBorrower" && <DeleteBorrower />}
            {activeForm === "deleteBook" && <DeleteBook />}

            {activeForm === "checkinBook" && <BookCheckin />}
            {activeForm === "checkoutBook" && <BookCheckout />}

            {activeForm === "goToHome" && (
              <Home
                showBooks={() => handleButtonClick("totalBooks")}
                showAuthors={() => handleButtonClick("totalAuthors")}
                showBorrowers={() => handleButtonClick("totalBorrowers")}
                showBorrowersWithoutBook={() =>
                  handleButtonClick("borrowersWithoutBook")
                }
                showCheckoutBooks={() =>
                  handleButtonClick("checkoutBooks")
                }
                showRemainingBooks={() =>
                  handleButtonClick("remainingBooks")
                }
              />
            )}

            {activeForm === "totalBorrowers" && (
              <ShowBorrowers type="all" />
            )}
            {activeForm === "borrowersWithoutBook" && (
              <ShowBorrowers type="withoutbooks" />
            )}
            {activeForm === "totalBooks" && <ShowBooks type="all" />}
            {activeForm === "checkoutBooks" && (
              <ShowBooks type="borrowed" />
            )}
            {activeForm === "remainingBooks" && (
              <ShowBooks type="available" />
            )}
            {activeForm === "totalAuthors" && <ShowAuthors />}
          </div>
        </main>
      </Suspense>
    </div>
  );
}

export default App;
