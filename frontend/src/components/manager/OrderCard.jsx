import StatusDropdown from './StatusDropdown';
import { useOrders } from '../../context/OrderContext';

export default function OrderCard({ order }) {
  const { updateOrderStatus } = useOrders();

  const timeAgo = (timestamp) => {
    const seconds = Math.floor((Date.now() - new Date(timestamp)) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden animate-fade-in-up ${
        order.isNew ? 'new-order-pulse' : ''
      }`}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center border border-orange-200">
            <span className="text-lg font-bold text-orange-600">
              {order.tableNumber}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              Table {order.tableNumber}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {timeAgo(order.timestamp)}
            </p>
          </div>
        </div>

        {order.isNew && (
          <span className="text-xs font-semibold text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full animate-bounce-subtle">
            NEW
          </span>
        )}
      </div>

      {/* Items */}
      <div className="px-5 pb-3">
        <div className="bg-gray-50 rounded-xl p-3 space-y-2">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs font-mono">
                  {item.quantity}×
                </span>
                <span className="text-gray-700 font-medium">{item.name}</span>
              </div>
              <span className="text-gray-500 text-xs">
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 font-medium">Total</p>
          <p className="text-lg font-bold text-gray-900">₹{order.totalPrice}</p>
        </div>

        <StatusDropdown
          currentStatus={order.status}
          onChange={(newStatus) => updateOrderStatus(order.id, newStatus)}
        />
      </div>
    </div>
  );
}
