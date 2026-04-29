import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import CartItem from '../../components/customer/CartItem';

export default function CartPage() {
  const { tableId } = useParams();
  const { items, getTotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handlePlaceOrder = async () => {
    if (items.length === 0) return;
    setSubmitting(true);
    setError(null);
    try {
      const newOrder = await addOrder({
        tableNumber: Number(tableId),
        items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
      });
      clearCart();
      navigate(`/table/${tableId}/order/${newOrder.id}`);
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="app-header-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              id="cart-back-btn"
              onClick={() => navigate(`/table/${tableId}`)}
              style={{ padding: 8, borderRadius: 12, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 style={{ fontSize: 17, fontWeight: 800, color: '#1E293B' }}>Your Cart</h1>
              <p style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500, marginTop: 1 }}>
                Table {tableId} · {items.length} {items.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div style={{ padding: 20 }}>
        {items.length === 0 ? (
          <div className="empty-state" style={{ paddingTop: 80 }}>
            <div className="empty-state-emoji">🛒</div>
            <h3 className="empty-state-title" style={{ fontSize: 18, marginBottom: 8 }}>Your cart is empty</h3>
            <p className="empty-state-text" style={{ marginBottom: 24 }}>Browse the menu to add delicious items</p>
            <button onClick={() => navigate(`/table/${tableId}`)} className="btn-primary-lg" style={{ maxWidth: 200, margin: '0 auto' }}>
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Bill Summary */}
            <div className="bill-card" style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                </svg>
                Bill Summary
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {items.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: '#64748B' }}>{item.name} × {item.quantity}</span>
                    <span style={{ color: '#1E293B', fontWeight: 600 }}>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '2px dashed #F1F5F9', marginTop: 16, paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, color: '#1E293B', fontSize: 15 }}>Total</span>
                <span style={{ fontSize: 22, fontWeight: 800, color: '#F97316' }}>₹{getTotal()}</span>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                marginBottom: 16, background: '#FEF2F2', border: '1.5px solid #FECACA',
                borderRadius: 14, padding: '12px 16px', fontSize: 13, color: '#DC2626',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span>⚠️</span> {error}
              </div>
            )}

            {/* Place Order */}
            <button id="place-order-btn" onClick={handlePlaceOrder} disabled={submitting} className="btn-primary-lg">
              {submitting ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="animate-spin">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" opacity="0.75" />
                  </svg>
                  Placing Order...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Place Order · ₹{getTotal()}
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
