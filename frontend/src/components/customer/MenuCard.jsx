import { useState } from 'react';
import { useCart } from '../../context/CartContext';

export default function MenuCard({ item }) {
  const { addItem, getItemQuantity, updateQuantity } = useCart();
  const [imgLoaded, setImgLoaded] = useState(false);
  const qty = getItemQuantity(item.id);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in-up group">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {!imgLoaded && <div className="absolute inset-0 shimmer-bg" />}
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {item.isPopular && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md">
            🔥 Popular
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3.5">
        <h3 className="font-semibold text-gray-900 text-base leading-tight">
          {item.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-gray-900">
            ₹{item.price}
          </span>

          {qty === 0 ? (
            <button
              id={`add-btn-${item.id}`}
              onClick={() => addItem(item)}
              className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 active:scale-95 shadow-sm shadow-orange-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              ADD
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-1 py-0.5">
              <button
                id={`dec-btn-${item.id}`}
                onClick={() => updateQuantity(item.id, qty - 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-orange-600 font-bold text-lg hover:bg-orange-100 transition-colors duration-150 shadow-sm"
              >
                −
              </button>
              <span className="text-sm font-bold text-orange-700 w-5 text-center">
                {qty}
              </span>
              <button
                id={`inc-btn-${item.id}`}
                onClick={() => updateQuantity(item.id, qty + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 transition-colors duration-150 shadow-sm"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
