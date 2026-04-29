import { useState, useMemo, useEffect, useRef } from 'react';
import DashboardHeader from '../../components/manager/DashboardHeader';
import OrderCard from '../../components/manager/OrderCard';
import { useOrders } from '../../context/OrderContext';
import { useNotificationSound } from '../../hooks/useNotificationSound';
import { ORDER_STATUSES } from '../../data/ordersData';

const filterTabs = ['All', ...ORDER_STATUSES];

export default function DashboardPage() {
  const { orders, loadOrders, loading, error } = useOrders();
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
      <DashboardHeader />

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
              id={`filter-tab-${tab.toLowerCase()}`}
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

        {/* Orders Grid */}
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
