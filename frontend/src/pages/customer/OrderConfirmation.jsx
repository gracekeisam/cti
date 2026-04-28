import { useParams, useNavigate } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import OrderStatus from '../../components/customer/OrderStatus';

export default function OrderConfirmation() {
  const { tableId } = useParams();
  const { orders } = useOrders();
  const navigate = useNavigate();

  // Get the most recent order for this table
  const order = orders.find((o) => o.tableNumber === Number(tableId));

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center animate-fade-in">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            No order found
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            There doesn't seem to be an active order for this table.
          </p>
          <button
            onClick={() => navigate(`/table/${tableId}`)}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-200"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-gray-200/60">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(`/table/${tableId}`)}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">
              Order Confirmed
            </h1>
            <p className="text-xs text-gray-500">
              {order.id} · Table {tableId}
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Success Banner */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 text-center animate-fade-in-up">
          <div className="w-16 h-16 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-green-800 mb-1">
            Order Placed Successfully!
          </h2>
          <p className="text-sm text-green-600">
            Your order has been sent to the kitchen
          </p>
        </div>

        {/* Status Tracker */}
        <OrderStatus order={order} />

        {/* Order Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm animate-fade-in-up">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Order Summary
          </h3>

          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm py-1">
                <span className="text-gray-600">
                  <span className="text-gray-400 font-mono text-xs mr-1">{item.quantity}×</span>
                  {item.name}
                </span>
                <span className="text-gray-800 font-medium">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-dashed border-gray-200 mt-4 pt-4 flex justify-between items-center">
            <span className="font-semibold text-gray-900">Total Paid</span>
            <span className="text-xl font-bold text-orange-600">
              ₹{order.totalPrice}
            </span>
          </div>
        </div>

        {/* Order Again */}
        <button
          id="order-again-btn"
          onClick={() => navigate(`/table/${tableId}`)}
          className="w-full bg-white border border-gray-200 hover:border-orange-300 hover:bg-orange-50 text-gray-700 hover:text-orange-600 font-semibold py-3.5 rounded-2xl transition-all duration-200 text-sm flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Order More Items
        </button>
      </div>
    </div>
  );
}
