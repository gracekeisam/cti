import { useNavigate } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import { useSocket } from '../../context/SocketContext';

export default function DashboardHeader() {
  const { orders } = useOrders();
  const { isConnected } = useSocket();
  const navigate = useNavigate();

  const pendingCount = orders.filter((o) => o.status === 'Pending').length;
  const preparingCount = orders.filter((o) => o.status === 'Preparing').length;

  return (
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
            <span style={{ color: '#FFF', fontSize: 20, fontWeight: 800 }}>C</span>
          </div>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 800, color: '#1E293B', lineHeight: 1.2 }}>
              Canteen Manager
            </h1>
            <p style={{ fontSize: 12, color: '#64748B', fontWeight: 600, marginTop: 2 }}>
              Kitchen Dashboard
            </p>
          </div>
        </div>

        {/* Stats & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Connection Status */}
          <div className={`connection-badge ${isConnected ? 'online' : 'offline'}`} style={{ display: 'none', padding: '6px 14px' }} className="sm-flex">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: isConnected ? '#22C55E' : '#EF4444', animation: isConnected ? 'pulse 2s ease-in-out infinite' : 'none' }} />
            {isConnected ? 'Live' : 'Offline'}
          </div>

          {pendingCount > 0 && (
            <span style={{
              display: 'none', alignItems: 'center', gap: 6,
              fontSize: 13, fontWeight: 700, color: '#DC2626',
              background: '#FEF2F2', border: '1.5px solid #FECACA',
              padding: '6px 14px', borderRadius: 100,
            }} className="sm-flex">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444', animation: 'pulse 2s infinite' }} />
              {pendingCount} pending
            </span>
          )}
          
          {preparingCount > 0 && (
            <span style={{
              display: 'none', alignItems: 'center', gap: 6,
              fontSize: 13, fontWeight: 700, color: '#D97706',
              background: '#FFFBEB', border: '1.5px solid #FDE68A',
              padding: '6px 14px', borderRadius: 100,
            }} className="sm-flex">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F59E0B', animation: 'pulse 2s infinite' }} />
              {preparingCount} preparing
            </span>
          )}
          
          <button
            id="logout-btn"
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
            Logout
          </button>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 640px) {
          .sm-flex { display: flex !important; }
        }
      `}} />
    </header>
  );
}
