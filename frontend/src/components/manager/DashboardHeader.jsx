import { useNavigate } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';

export default function DashboardHeader() {
  const { orders } = useOrders();
  const navigate = useNavigate();

  const pendingCount = orders.filter((o) => o.status === 'Pending').length;
  const preparingCount = orders.filter((o) => o.status === 'Preparing').length;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
            <span className="text-white text-lg font-bold">C</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">
              CTI Manager
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              Kitchen Dashboard
            </p>
          </div>
        </div>

        {/* Stats & Logout */}
        <div className="flex items-center gap-4">
          {pendingCount > 0 && (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              {pendingCount} pending
            </span>
          )}
          {preparingCount > 0 && (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              {preparingCount} preparing
            </span>
          )}
          <button
            id="logout-btn"
            onClick={() => navigate('/manager')}
            className="text-sm font-medium text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-xl transition-all duration-200 border border-gray-200"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
