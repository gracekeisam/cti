import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function CartIcon() {
  const { tableId } = useParams();
  const { getItemCount, getTotal } = useCart();
  const navigate = useNavigate();
  const count = getItemCount();

  if (count === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in-up">
      <div className="max-w-lg mx-auto">
        <button
          id="floating-cart-btn"
          onClick={() => navigate(`/table/${tableId}/cart`)}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl px-6 py-4 flex items-center justify-between shadow-xl shadow-orange-200/50 transition-all duration-300 active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-orange-600 text-xs font-bold rounded-full flex items-center justify-center">
                {count}
              </span>
            </div>
            <span className="font-semibold text-base">
              {count} {count === 1 ? 'item' : 'items'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">₹{getTotal()}</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
