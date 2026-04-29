import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useSocket } from '../../context/SocketContext';

export default function Header() {
  const { tableId } = useParams();
  const { getItemCount } = useCart();
  const { isConnected } = useSocket();
  const navigate = useNavigate();
  const count = getItemCount();

  return (
    <header className="app-header">
      <div className="app-header-inner">
        {/* Logo & Table Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: 42, height: 42, borderRadius: 14,
            background: 'linear-gradient(135deg, #F97316, #EA580C)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(249,115,22,0.3)',
          }}>
            <span style={{ color: '#FFF', fontSize: 20, fontWeight: 800 }}>C</span>
          </div>
          <div>
            <h1 style={{ fontSize: 17, fontWeight: 800, color: '#1E293B', lineHeight: 1.2 }}>
              Canteen
            </h1>
            <p style={{ fontSize: 12, color: '#64748B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: isConnected ? '#22C55E' : '#94A3B8',
                display: 'inline-block',
              }} />
              Table {tableId}
            </p>
          </div>
        </div>

        {/* Cart Button */}
        <button
          id="header-cart-btn"
          onClick={() => navigate(`/table/${tableId}/cart`)}
          style={{
            position: 'relative', padding: 10, borderRadius: 14,
            background: '#FFF7ED', border: '1.5px solid #FED7AA',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          {count > 0 && (
            <span style={{
              position: 'absolute', top: -6, right: -6,
              width: 22, height: 22, borderRadius: '50%',
              background: '#F97316', color: '#FFF',
              fontSize: 11, fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid #FFFFFF',
              boxShadow: '0 2px 8px rgba(249,115,22,0.4)',
            }}>
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
