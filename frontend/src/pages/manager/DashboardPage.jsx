import { useState, useMemo } from 'react';
import DashboardHeader from '../../components/manager/DashboardHeader';
import OrderCard from '../../components/manager/OrderCard';
import { useOrders } from '../../context/OrderContext';
import { ORDER_STATUSES } from '../../data/ordersData';

const filterTabs = ['All', ...ORDER_STATUSES];

export default function DashboardPage() {
  const { orders } = useOrders();
  const [activeFilter, setActiveFilter] = useState('All');

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
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {ORDER_STATUSES.map((status) => {
            const emojiMap = { Pending: '⏳', Preparing: '👨‍🍳', Ready: '✅', Completed: '🏁' };
            const colorMap = {
              Pending: 'from-amber-50 to-amber-100 border-amber-200',
              Preparing: 'from-blue-50 to-blue-100 border-blue-200',
              Ready: 'from-green-50 to-green-100 border-green-200',
              Completed: 'from-gray-50 to-gray-100 border-gray-200',
            };
            return (
              <div
                key={status}
                className={`bg-gradient-to-br ${colorMap[status]} border rounded-2xl p-4 text-center transition-all duration-200 hover:shadow-md`}
              >
                <div className="text-2xl mb-1">{emojiMap[status]}</div>
                <div className="text-2xl font-bold text-gray-900">
                  {counts[status] || 0}
                </div>
                <div className="text-xs font-medium text-gray-500 mt-0.5">
                  {status}
                </div>
              </div>
            );
          })}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              id={`filter-tab-${tab.toLowerCase()}`}
              onClick={() => setActiveFilter(tab)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                transition-all duration-200 border
                ${
                  activeFilter === tab
                    ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              {tab}
              <span className={`ml-1.5 text-xs ${activeFilter === tab ? 'text-gray-300' : 'text-gray-400'}`}>
                {counts[tab] || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Orders Grid */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="text-5xl mb-3">📋</div>
            <h3 className="font-semibold text-gray-700 mb-1">
              No orders found
            </h3>
            <p className="text-sm text-gray-400">
              {activeFilter === 'All'
                ? 'Orders will appear here when customers place them'
                : `No orders with status "${activeFilter}"`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
