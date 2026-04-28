import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Header() {
  const { tableId } = useParams();
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const count = getItemCount();

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-gray-200/60">
      <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Table Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
            <span className="text-white text-lg font-bold">C</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">
              CTI Canteen
            </h1>
            <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
              Table {tableId}
            </p>
          </div>
        </div>

        {/* Cart Button */}
        <button
          id="header-cart-btn"
          onClick={() => navigate(`/table/${tableId}/cart`)}
          className="relative p-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 transition-all duration-200 group"
        >
          <svg
            className="w-6 h-6 text-orange-600 group-hover:scale-110 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>
          {count > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce-subtle">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
