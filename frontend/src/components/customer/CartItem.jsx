import { useCart } from '../../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm animate-fade-in-up">
      {/* Image */}
      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">
            {item.name}
          </h3>
          <button
            onClick={() => removeItem(item.id)}
            className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-0.5"
            title="Remove item"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-0.5">₹{item.price} each</p>

        <div className="flex items-center justify-between mt-2">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-1 py-0.5">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-gray-600 font-bold text-sm hover:bg-gray-100 transition-colors duration-150 shadow-sm"
            >
              −
            </button>
            <span className="text-sm font-bold text-gray-800 w-5 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition-colors duration-150 shadow-sm"
            >
              +
            </button>
          </div>

          {/* Subtotal */}
          <span className="text-sm font-bold text-gray-900">
            ₹{item.price * item.quantity}
          </span>
        </div>
      </div>
    </div>
  );
}
