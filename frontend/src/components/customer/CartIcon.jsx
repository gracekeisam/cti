import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function CartIcon() {
  const { tableId } = useParams();
  const { getItemCount, getTotal } = useCart();
  const navigate = useNavigate();
  const count = getItemCount();

  if (count === 0) return null;

  return (
    <div className="floating-cart">
      <div className="floating-cart-inner">
        <button
          id="floating-cart-btn"
          onClick={() => navigate(`/table/${tableId}/cart`)}
          className="floating-cart-btn"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ position: 'relative' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              <span style={{
                position: 'absolute', top: -8, right: -8,
                width: 20, height: 20, borderRadius: '50%',
                background: '#FFFFFF', color: '#F97316',
                fontSize: 11, fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {count}
              </span>
            </div>
            <span style={{ fontWeight: 700, fontSize: 15 }}>
              {count} {count === 1 ? 'item' : 'items'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 800 }}>₹{getTotal()}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
