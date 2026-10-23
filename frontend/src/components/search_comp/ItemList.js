import React from 'react';


const ItemList = ({ items, onSelectItem, itemType, isVisible }) => {
  return (
    <div className={`mb-4 ${isVisible ? 'block' : 'hidden'} max-w-md mx-auto`}>
      {items.map((item) => (
        <div
          key={item._id}
          className="bg-white hover:bg-[#FAF9F6] border border-[#DDD7CA] hover:border-[#226192]/50 p-3 rounded-xl mb-2.5 cursor-pointer text-[#133553] transition-all duration-150 shadow-sm hover:shadow-md text-sm"
          onClick={() => onSelectItem(item)}
        >
          {itemType === 'book' ? (
            <div className="flex justify-between items-center">
              <div>
                <span className="font-semibold text-[#133553]">{item.title}</span>
                <span className="text-[#226192]/70 text-xs block">{item.author?.authorName || 'Unknown Author'} · {item.category}</span>
              </div>
              <span className="text-xs bg-[#EF8557]/10 border border-[#EF8557]/30 px-2.5 py-0.5 rounded-full text-[#DE6F3E] font-bold font-mono">
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
          ) : itemType === 'bookcheckin' ? (
            <div className="flex justify-between items-center">
              <div>
                <span className="font-semibold text-[#133553]">{item.title}</span>
                <span className="text-[#226192]/70 text-xs block">Borrowed by: {item.borrower?.borrowerName || 'Unknown'}</span>
              </div>
              <span className="text-xs bg-[#226192]/10 border border-[#226192]/20 px-2.5 py-0.5 rounded-full text-[#226192] font-semibold">
                {item.category}
              </span>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};
export default ItemList;