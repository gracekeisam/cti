import { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderCard from '../../components/manager/OrderCard';
import { useOrders } from '../../context/OrderContext';
import { useSocket } from '../../context/SocketContext';
import { useNotificationSound } from '../../hooks/useNotificationSound';
import { ORDER_STATUSES } from '../../data/ordersData';

const filterTabs = ['All', ...ORDER_STATUSES];

export default function KitchenPage() {
  const { orders, loadOrders, loading, error } = useOrders();
  const { isConnected } = useSocket();
  const navigate = useNavigate();
  const playSound = useNotificationSound();
  const [activeFilter, setActiveFilter] = useState('All');
  const prevOrderCountRef = useRef(orders.length);
  const ordersTopRef = useRef(null);

  // Load orders on mount
  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // Play sound + auto-scroll on new order
  useEffect(() => {
    if (orders.length > prevOrderCountRef.current) {
      playSound();
      if (ordersTopRef.current) {
        ordersTopRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
    prevOrderCountRef.current = orders.length;
  }, [orders.length, playSound]);

  const filteredOrders = useMemo(() => {
    if (activeFilter === 'All') return orders;
    return orders.filter((o) => o.status === activeFilter);
  }, [orders, activeFilter]);

  const counts = useMemo(() => {
    const c = { All: orders.length };
    ORDER_STATUSES.forEach((s) => {
      c[s] = orders.filter((o) => o.status === s).length;
    });
    return c;
  }, [orders]);

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Kitchen Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: '#FFFFFF', borderBottom: '1.5px solid #F1F5F9',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 14,
              background: 'linear-gradient(135deg, #F97316, #EA580C)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(249,115,22,0.3)',
            }}>
              <span style={{ fontSize: 22 }}>👨‍🍳</span>
            </div>
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 800, color: '#1E293B', lineHeight: 1.2 }}>
                Kitchen Display
              </h1>
              <p style={{ fontSize: 12, color: '#64748B', fontWeight: 600, marginTop: 2 }}>
                Canteen · Real-time Orders
              </p>
            </div>
          </div>

          {/* Status + Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Connection Status */}
            <div className={`connection-badge ${isConnected ? 'online' : 'offline'}`} style={{ display: 'flex', padding: '6px 14px' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: isConnected ? '#22C55E' : '#EF4444', animation: isConnected ? 'pulse 2s ease-in-out infinite' : 'none' }} />
              {isConnected ? 'Connected' : 'Disconnected'}
            </div>

            {counts.Pending > 0 && (
              <span style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 13, fontWeight: 700, color: '#DC2626',
                background: '#FEF2F2', border: '1.5px solid #FECACA',
                padding: '6px 14px', borderRadius: 100,
                animation: 'pulse 2s infinite'
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444' }} />
                {counts.Pending} pending
              </span>
            )}

            <button
              onClick={() => navigate('/manager')}
              style={{
                fontSize: 13, fontWeight: 700, color: '#475569',
                background: '#FFFFFF', border: '1.5px solid #E2E8F0',
                padding: '6px 16px', borderRadius: 12, cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.background = '#F8FAFC'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#FFFFFF'; }}
            >
              Manager
            </button>
          </div>
        </div>
      </header>

      <div className="kitchen-container">
        {/* Stats Row */}
        <div className="stats-grid">
          {ORDER_STATUSES.map((status) => {
            const configMap = {
              Pending: { emoji: '🔴', bg: '#FEF2F2', border: '#FECACA', color: '#DC2626' },
              Preparing: { emoji: '🟡', bg: '#FFFBEB', border: '#FDE68A', color: '#D97706' },
              Ready: { emoji: '🟢', bg: '#F0FDF4', border: '#BBF7D0', color: '#16A34A' },
              Completed: { emoji: '✅', bg: '#F8FAFC', border: '#E2E8F0', color: '#64748B' },
            };
            const cfg = configMap[status];
            const isSelected = activeFilter === status;
            
            return (
              <div
                key={status}
                onClick={() => setActiveFilter(status)}
                className="stat-card"
                style={{
                  background: cfg.bg, borderColor: isSelected ? '#F97316' : cfg.border,
                  boxShadow: isSelected ? '0 4px 16px rgba(249,115,22,0.15)' : 'none',
                }}
              >
                <div className="stat-emoji">{cfg.emoji}</div>
                <div className="stat-value" style={{ color: cfg.color }}>
                  {counts[status] || 0}
                </div>
                <div className="stat-label">
                  {status}
                </div>
              </div>
            );
          })}
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              id={`kitchen-filter-${tab.toLowerCase()}`}
              onClick={() => setActiveFilter(tab)}
              className={`filter-tab ${activeFilter === tab ? 'active' : ''}`}
            >
              {tab}
              <span className="count">
                {counts[tab] || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Orders */}
        <div ref={ordersTopRef} />

        {loading && orders.length === 0 ? (
          <div className="empty-state" style={{ paddingTop: 80 }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="animate-spin" style={{ margin: '0 auto 16px' }}>
              <circle cx="12" cy="12" r="10" stroke="#F97316" strokeWidth="4" opacity="0.25" />
              <path fill="#F97316" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" opacity="0.75" />
            </svg>
            <p className="empty-state-text">Loading orders...</p>
          </div>
        ) : error ? (
          <div className="empty-state" style={{ paddingTop: 80 }}>
            <div className="empty-state-emoji">⚠️</div>
            <h3 className="empty-state-title">Failed to load orders</h3>
            <p className="empty-state-text" style={{ marginBottom: 20 }}>{error}</p>
            <button onClick={loadOrders} className="btn-primary-lg" style={{ maxWidth: 200, margin: '0 auto' }}>
              Retry
            </button>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="empty-state" style={{ paddingTop: 80 }}>
            <div className="empty-state-emoji">📋</div>
            <h3 className="empty-state-title">No orders found</h3>
            <p className="empty-state-text">
              {activeFilter === 'All'
                ? 'Orders will appear here when customers place them'
                : `No orders with status "${activeFilter}"`}
            </p>
          </div>
        ) : (
          <div className="orders-grid stagger-children">
            {filteredOrders.map((order, i) => (
              <div key={order.id} style={{ animationDelay: `${i * 60}ms` }}>
                <OrderCard order={order} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
