import { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { useOrderTimer } from '../../hooks/useOrderTimer';
import Badge from '../shared/Badge';

export default function OrderCard({ order }) {
  const { updateOrderStatus } = useOrders();
  const elapsed = useOrderTimer(order.timestamp);
  const [actionLoading, setActionLoading] = useState(null);

  const handleStatusChange = async (newStatus) => {
    setActionLoading(newStatus);
    try { await updateOrderStatus(order.id, newStatus); } catch (err) { console.error(err); }
    setActionLoading(null);
  };

  const statusClass = `status-${order.status.toLowerCase()}`;

  return (
    <div className={`order-card ${statusClass} ${order.isNew ? 'is-new' : ''}`}>
      {/* Header */}
      <div style={{ padding: '20px 20px 12px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: 'linear-gradient(135deg, #FFF7ED, #FFEDD5)',
            border: '1.5px solid #FED7AA',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#EA580C' }}>{order.tableNumber}</span>
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1E293B' }}>Table {order.tableNumber}</h3>
            <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {elapsed}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          <Badge status={order.status} />
          {order.isNew && (
            <span style={{
              fontSize: 10, fontWeight: 700, color: '#EA580C',
              background: '#FFF7ED', border: '1.5px solid #FED7AA',
              padding: '2px 10px', borderRadius: 100,
            }}>NEW</span>
          )}
        </div>
      </div>

      {/* Order ID */}
      <div style={{ padding: '0 20px 8px' }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#94A3B8' }}>{order.id}</span>
      </div>

      {/* Items */}
      <div style={{ padding: '0 20px 12px' }}>
        <div style={{ background: '#F8FAFC', borderRadius: 14, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {order.items.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#94A3B8', fontSize: 11, fontFamily: 'monospace' }}>{item.quantity}×</span>
                <span style={{ color: '#475569', fontWeight: 600 }}>{item.name}</span>
              </div>
              <span style={{ color: '#94A3B8', fontSize: 12 }}>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '16px 20px', background: '#FAFBFC', borderTop: '1.5px solid #F1F5F9' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Total</p>
            <p style={{ fontSize: 20, fontWeight: 800, color: '#1E293B' }}>₹{order.totalPrice}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Timer</p>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#475569', fontFamily: 'monospace' }}>{elapsed}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {order.status === 'Pending' && (
            <button className="btn-action btn-preparing" onClick={() => handleStatusChange('Preparing')} disabled={actionLoading !== null}>
              {actionLoading === 'Preparing' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-spin">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                  <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" opacity="0.75" />
                </svg>
              ) : '👨‍🍳'} Start Preparing
            </button>
          )}
          {order.status === 'Preparing' && (
            <button className="btn-action btn-ready" onClick={() => handleStatusChange('Ready')} disabled={actionLoading !== null}>
              {actionLoading === 'Ready' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-spin">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                  <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" opacity="0.75" />
                </svg>
              ) : '✅'} Mark Ready
            </button>
          )}
          {order.status === 'Ready' && (
            <button className="btn-action btn-completed" onClick={() => handleStatusChange('Completed')} disabled={actionLoading !== null}>
              {actionLoading === 'Completed' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-spin">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                  <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" opacity="0.75" />
                </svg>
              ) : '🏁'} Mark Completed
            </button>
          )}
          {order.status === 'Completed' && (
            <div className="btn-done-badge">✅ Completed</div>
          )}
        </div>
      </div>
    </div>
  );
}
