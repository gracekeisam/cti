import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { useSocket } from '../../context/SocketContext';
import OrderStatus from '../../components/customer/OrderStatus';
import { fetchOrderById } from '../../services/api';

export default function OrderConfirmation() {
  const { tableId, orderId } = useParams();
  const { orders } = useOrders();
  const { isConnected } = useSocket();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const contextOrder = orders.find((o) => o.id === orderId);
    if (contextOrder) { setOrder(contextOrder); setLoading(false); return; }
    async function load() {
      try { const data = await fetchOrderById(orderId); setOrder(data); } catch { setOrder(null); }
      setLoading(false);
    }
    load();
  }, [orderId, orders]);

  if (loading) {
    return (
      <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="animate-spin" style={{ margin: '0 auto 12px' }}>
            <circle cx="12" cy="12" r="10" stroke="#F97316" strokeWidth="4" opacity="0.25" />
            <path fill="#F97316" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" opacity="0.75" />
          </svg>
          <p style={{ fontSize: 13, color: '#94A3B8' }}>Loading order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="app-container">
        <div className="empty-state" style={{ paddingTop: 120 }}>
          <div className="empty-state-emoji">📋</div>
          <h3 className="empty-state-title" style={{ fontSize: 18, marginBottom: 8 }}>No order found</h3>
          <p className="empty-state-text" style={{ marginBottom: 24 }}>There doesn't seem to be an active order.</p>
          <button onClick={() => navigate(`/table/${tableId}`)} className="btn-primary-lg" style={{ maxWidth: 200, margin: '0 auto' }}>
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="app-header-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
            <button onClick={() => navigate(`/table/${tableId}`)} style={{ padding: 8, borderRadius: 12, background: 'none', border: 'none', cursor: 'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: 17, fontWeight: 800, color: '#1E293B' }}>Order Confirmed</h1>
              <p style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500, marginTop: 1 }}>{order.id} · Table {tableId}</p>
            </div>
          </div>
          <span className={`connection-badge ${isConnected ? 'online' : 'offline'}`}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: isConnected ? '#22C55E' : '#EF4444', animation: isConnected ? 'pulse 2s ease-in-out infinite' : 'none' }} />
            {isConnected ? 'Live' : 'Offline'}
          </span>
        </div>
      </header>

      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Success Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #F0FDF4, #ECFDF5)',
          border: '1.5px solid #BBF7D0', borderRadius: 18,
          padding: '24px 20px', textAlign: 'center',
          animation: 'fadeInUp 0.4s ease-out',
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: '#DCFCE7', margin: '0 auto 12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#166534', marginBottom: 4 }}>Order Placed Successfully!</h2>
          <p style={{ fontSize: 13, color: '#22C55E' }}>Your order has been sent to the kitchen</p>
        </div>

        <OrderStatus order={order} />

        {/* Order Summary */}
        <div className="bill-card">
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Order Summary
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {order.items.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0' }}>
                <span style={{ color: '#64748B' }}>
                  <span style={{ color: '#94A3B8', fontFamily: 'monospace', fontSize: 11, marginRight: 4 }}>{item.quantity}×</span>
                  {item.name}
                </span>
                <span style={{ color: '#1E293B', fontWeight: 600 }}>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '2px dashed #F1F5F9', marginTop: 16, paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, color: '#1E293B' }}>Total Paid</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#F97316' }}>₹{order.totalPrice}</span>
          </div>
        </div>

        <button id="order-again-btn" onClick={() => navigate(`/table/${tableId}`)} style={{
          width: '100%', padding: 14, borderRadius: 16,
          background: '#FFFFFF', border: '1.5px solid #E2E8F0',
          fontSize: 14, fontWeight: 700, color: '#475569',
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 8, transition: 'all 0.2s',
          fontFamily: 'inherit',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Order More Items
        </button>
      </div>
    </div>
  );
}
