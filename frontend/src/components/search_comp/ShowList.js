import React, { useState } from 'react';

const ShowList = ({ items, onSelectItem, itemType, isVisible }) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

  const handleItemClick = (index) => {
    if (index === selectedItemIndex) {
      setSelectedItemIndex(-1); // Collapse details if clicking on the same item
    } else {
      setSelectedItemIndex(index);
    }
  };

  return (
    <div className={`mb-4 ${isVisible ? 'block' : 'hidden'} max-w-md mx-auto`}>
      {items.map((item, index) => (
        <div
          key={item._id}
          className="bg-white hover:bg-[#FAF9F6] border border-[#DDD7CA] hover:border-[#226192]/50 p-3 rounded-xl mb-2.5 cursor-pointer text-[#133553] transition-all duration-150 shadow-sm text-sm"
          onClick={() => handleItemClick(index)}
        >
          {itemType === 'book' ? (
            <div className="flex justify-between items-center">
              <div>
                <span className="font-semibold text-[#133553]">{item.title}</span>
                <span className="text-[#226192]/70 text-xs block">{item.author?.authorName} · {item.category}</span>
              </div>
              <span className="text-xs bg-[#EF8557]/10 border border-[#EF8557]/30 px-2 py-0.5 rounded-full text-[#DE6F3E] font-bold font-mono">
                ${item.price}
              </span>
            </div>
          ) : itemType === 'borrower' ? (
            <div>
              <span className="font-semibold text-[#133553]">{item.borrowerName}</span>
              <span className="text-[#226192]/70 text-xs block">{item.borrowerEmail}</span>
            </div>
          ) : itemType === 'author' ? (
            <div>
              <span className="font-semibold text-[#133553]">{item.authorName}</span>
              <span className="text-[#226192]/70 text-xs block">{item.authorEmail}</span>
            </div>
          ) : null}
        </div>
      ))}

      {selectedItemIndex !== -1 && items[selectedItemIndex] && (
        <div className="bg-[#EAE6DE] border border-[#DDD7CA] p-4 rounded-xl mb-3 text-[#133553] shadow-sm text-sm space-y-1">
          <p className="text-[#133553]"><span className="text-[#226192] font-semibold">Name:</span> {items[selectedItemIndex].borrowerName || items[selectedItemIndex].title || items[selectedItemIndex].authorName}</p>
          {items[selectedItemIndex].borrowerEmail && <p className="text-[#133553]"><span className="text-[#226192] font-semibold">Email:</span> {items[selectedItemIndex].borrowerEmail}</p>}
          {items[selectedItemIndex].borrowerPhone && <p className="text-[#133553]"><span className="text-[#226192] font-semibold">Phone:</span> {items[selectedItemIndex].borrowerPhone}</p>}
          {items[selectedItemIndex].borrowerAddress && <p className="text-[#133553]"><span className="text-[#226192] font-semibold">Address:</span> {items[selectedItemIndex].borrowerAddress}</p>}
          {items[selectedItemIndex].details && <p className="text-[#133553] mt-2">{items[selectedItemIndex].details}</p>}
        </div>
      )}
    </div>
  );
};

export default ShowList;
