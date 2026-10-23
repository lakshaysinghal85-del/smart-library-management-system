import React from "react";

const FormComp = ({ form_data, setConfirm, handler, type, selectedItem }) => {
  return type === "checkin" ? (
    <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-md mx-auto">
      <div className="bg-[#EAE6DE]/70 border border-[#DDD7CA] rounded-2xl p-5 mt-4 shadow-sm">
        <div className="mb-4">
          <label htmlFor="title" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-1">
            Book Title
          </label>
          <input
            type="text"
            id="title"
            className="border border-[#DDD7CA] bg-[#FAF9F6] text-[#133553] rounded-xl p-3 w-full text-sm font-medium"
            value={form_data.title}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="borrowerName" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-1">
            Borrower Name
          </label>
          <input
            type="text"
            id="borrowerName"
            className="border border-[#DDD7CA] bg-[#FAF9F6] text-[#133553] rounded-xl p-3 w-full text-sm font-medium"
            value={form_data.borrowerName}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-1">
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            className="border border-[#DDD7CA] bg-[#FAF9F6] text-[#133553] rounded-xl p-3 w-full text-sm font-medium"
            value={form_data.category}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-1">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            className="border border-[#DDD7CA] bg-[#FAF9F6] text-[#133553] rounded-xl p-3 w-full text-sm font-medium"
            value={form_data.price}
            readOnly
          />
        </div>
        <div className="mb-2">
          <label htmlFor="confirm_checkin" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-1">
            Confirm Checkin (Type 'checkin')
          </label>
          <input
            type="text"
            id="confirm_checkin"
            placeholder="Type 'checkin' to confirm"
            className="border border-[#226192]/40 bg-white text-[#133553] placeholder-[#226192]/40 rounded-xl p-3 w-full text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#226192] shadow-sm"
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          type="button"
          className="bg-[#226192] hover:bg-[#1A4B72] text-[#FAF9F6] border border-[#1A4B72] py-3.5 mb-4 w-full rounded-xl font-semibold shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#EF8557] transition-all"
          onClick={handler}
        >
          Checkin Book
        </button>
      </div>
    </form>
  ) : type === "deletebook" ? (
    <form className="w-full max-w-md mx-auto">
      <div className="bg-[#EAE6DE]/70 border border-[#DDD7CA] rounded-2xl p-5 mb-4 shadow-sm">
        <div className="mb-4">
          <label htmlFor="title" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-1">
            Book Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            readOnly
            className="border border-[#DDD7CA] bg-[#FAF9F6] text-[#133553] rounded-xl p-3 w-full text-sm font-medium"
            value={form_data.title}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="authorName" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-1">
            Author Name
          </label>
          <input
            type="text"
            name="authorName"
            id="authorName"
            readOnly
            className="border border-[#DDD7CA] bg-[#FAF9F6] text-[#133553] rounded-xl p-3 w-full text-sm font-medium"
            value={form_data.authorName}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-1">
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            readOnly
            className="border border-[#DDD7CA] bg-[#FAF9F6] text-[#133553] rounded-xl p-3 w-full text-sm font-medium"
            value={form_data.category}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-1">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            readOnly
            className="border border-[#DDD7CA] bg-[#FAF9F6] text-[#133553] rounded-xl p-3 w-full text-sm font-medium"
            value={form_data.price}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="confirm_delete" className="block text-[#DE6F3E] text-xs font-semibold uppercase tracking-wider mb-1">
            Confirm Delete (Type 'delete')
          </label>
          <input
            type="text"
            name="confirm_delete"
            id="confirm_delete"
            placeholder="Type 'delete' to confirm"
            required
            className="border border-[#EF8557]/40 bg-white text-[#133553] placeholder-[#EF8557]/50 rounded-xl p-3 w-full text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#EF8557] shadow-sm"
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
      </div>
    </form>
  ) : type === "deleteborrower" ? (
    <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-md mx-auto">
      <div className="bg-[#EAE6DE]/70 border border-[#DDD7CA] rounded-2xl p-5 mt-4 shadow-sm">
        <div className="mb-4 text-left">
          <label htmlFor="borrower_name" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-1">
            Borrower Name
          </label>
          <input
            type="text"
            name="borrowerName"
            id="borrower_name"
            className="border border-[#DDD7CA] bg-[#FAF9F6] text-[#133553] rounded-xl p-3 w-full text-sm font-medium"
            value={selectedItem.borrowerName}
            readOnly
          />
        </div>
        <div className="mb-4 text-left">
          <label htmlFor="borrower_email" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-1">
            Email
          </label>
          <input
            type="text"
            name="borrowerEmail"
            id="borrower_email"
            className="border border-[#DDD7CA] bg-[#FAF9F6] text-[#133553] rounded-xl p-3 w-full text-sm font-medium"
            value={selectedItem.borrowerEmail}
            readOnly
          />
        </div>
        <div className="mb-4 text-left">
          <label htmlFor="borrower_phone" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-1">
            Phone
          </label>
          <input
            type="text"
            name="borrowerPhone"
            id="borrower_phone"
            className="border border-[#DDD7CA] bg-[#FAF9F6] text-[#133553] rounded-xl p-3 w-full text-sm font-medium"
            value={selectedItem.borrowerPhone}
            readOnly
          />
        </div>
        <div className="mb-4 text-left">
          <label htmlFor="borrower_address" className="block text-[#226192] text-xs font-semibold uppercase tracking-wider mb-1">
            Address
          </label>
          <input
            type="text"
            name="borrowerAddress"
            id="borrower_address"
            className="border border-[#DDD7CA] bg-[#FAF9F6] text-[#133553] rounded-xl p-3 w-full text-sm font-medium"
            value={selectedItem.borrowerAddress}
            readOnly
          />
        </div>
        <div className="mb-2 text-left">
          <label htmlFor="confirm_delete" className="block text-[#DE6F3E] text-xs font-semibold uppercase tracking-wider mb-1">
            Confirm Delete (Type 'delete')
          </label>
          <input
            type="text"
            name="confirmDelete"
            id="confirm_delete"
            placeholder="Type 'delete' to confirm"
            className="border border-[#EF8557]/40 bg-white text-[#133553] placeholder-[#EF8557]/50 rounded-xl p-3 w-full text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#EF8557] shadow-sm"
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
      </div>
    </form>
  ) : (
    <p className="text-[#133553] text-center">Invalid form type</p>
  );
};
export default FormComp;
