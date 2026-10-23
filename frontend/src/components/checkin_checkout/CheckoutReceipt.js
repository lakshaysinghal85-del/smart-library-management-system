import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CheckoutReceipt = ({ selectedBook, selectedBorrower }) => {
  const handleSaveAsPDF = () => {
    const pdfDoc = new jsPDF();
    
    pdfDoc.setFont('helvetica');
    pdfDoc.setFontSize(16);
  
    const { width } = pdfDoc.internal.pageSize;
    const textWidth = pdfDoc.getStringUnitWidth('Checkout Book Receipt') * 6;

    const centerX = (width - textWidth) / 2;

    pdfDoc.text('Checkout Book Receipt', centerX+3, 10);
    pdfDoc.setFontSize(12);
    pdfDoc.text('Selected Book Details', 15, 20);
    const bookData = [
      ['Title', selectedBook.title],
      ['Author', selectedBook.author.authorName],
      ['Category', selectedBook.category],
      ['Price', `${selectedBook.price.toFixed(2)}/-`],
    ];
    pdfDoc.autoTable({
      startY: 25,
      head: [],
      body: bookData,
      theme: 'grid',
      styles: { cellPadding: 1, fontSize: 11, fontStyle: 'normal' }
    });
  
    pdfDoc.text('Selected Borrower Details', 15, pdfDoc.autoTable.previous.finalY + 15);
    const borrowerData = [
      ['Name', selectedBorrower.borrowerName],
      ['Email', selectedBorrower.borrowerEmail],
      ['Address', selectedBorrower.borrowerAddress],
    ];
    pdfDoc.autoTable({
      startY: pdfDoc.autoTable.previous.finalY + 20,
      head: [],
      body: borrowerData,
      theme: 'grid',
      styles: { cellPadding: 1, fontSize: 11, fontStyle: 'normal' }
    });
  
    pdfDoc.save(`CheckoutReceipt-${selectedBook.title}.pdf`);
  };
  
    return (
      <div className="bg-[#FAF9F6] text-left border border-[#DDD7CA] rounded-2xl p-6 shadow-sm w-full mb-4 text-[#133553]">
        <div>
          <h1 className="font-serif text-xl font-bold text-center text-[#133553] mb-4 border-b border-[#DDD7CA] pb-2 tracking-wide">
            Checkout Receipt
          </h1>
          <h3 className="font-serif text-sm font-semibold text-[#226192] uppercase tracking-wider mb-2">
            Book Information
          </h3>
          <p className="text-sm py-0.5">
            <span className="text-[#226192] font-semibold">Title: </span>
            <span className="text-[#133553]">{selectedBook.title}</span>
          </p>
          <p className="text-sm py-0.5">
            <span className="text-[#226192] font-semibold">Author: </span>
            <span className="text-[#133553]">{selectedBook.author?.authorName}</span>
          </p>
          <h3 className="font-serif text-sm font-semibold text-[#226192] uppercase tracking-wider mt-4 mb-2">
            Borrower Information
          </h3>
          <p className="text-sm py-0.5">
            <span className="text-[#226192] font-semibold">Name: </span>
            <span className="text-[#133553]">{selectedBorrower.borrowerName}</span>
          </p>
          <p className="text-sm py-0.5">
            <span className="text-[#226192] font-semibold">Email: </span>
            <span className="text-[#133553]">{selectedBorrower.borrowerEmail}</span>
          </p>
          <p className="text-sm py-0.5">
            <span className="text-[#226192] font-semibold">Phone Number: </span>
            <span className="text-[#133553]">{selectedBorrower.borrowerPhone}</span>
          </p>
          <p className="text-sm py-0.5 mb-4">
            <span className="text-[#226192] font-semibold">Address: </span>
            <span className="text-[#133553]">{selectedBorrower.borrowerAddress}</span>
          </p>
          <button
            className="bg-[#226192] hover:bg-[#1A4B72] text-[#FAF9F6] border border-[#1A4B72] py-2.5 px-5 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#EF8557] transition-all"
            onClick={handleSaveAsPDF}
          >
            Save as PDF
          </button>
        </div>
      </div>
    );
};
export default CheckoutReceipt;