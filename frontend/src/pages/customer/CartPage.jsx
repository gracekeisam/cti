import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import CartItem from '../../components/customer/CartItem';

export default function CartPage() {
  const { tableId } = useParams();
  const { items, getTotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (items.length === 0) return;

    const order = {
      tableNumber: Number(tableId),
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      totalPrice: getTotal(),
    };

    addOrder(order);
    const orderId = `ORD-${String(Date.now()).slice(-3)}`;
    clearCart();
    navigate(`/table/${tableId}/order/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-gray-200/60">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <button
            id="cart-back-btn"
            onClick={() => navigate(`/table/${tableId}`)}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Your Cart</h1>
            <p className="text-xs text-gray-500">
              Table {tableId} · {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 py-6">
        {items.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="font-semibold text-gray-700 text-lg mb-2">
              Your cart is empty
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Browse the menu to add delicious items
            </p>
            <button
              onClick={() => navigate(`/table/${tableId}`)}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-md shadow-orange-200"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-6 stagger-children">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Bill Summary */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm animate-fade-in-up mb-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                </svg>
                Bill Summary
              </h3>

              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-gray-800 font-medium">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-gray-200 mt-4 pt-4 flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-orange-600">
                  ₹{getTotal()}
                </span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              id="place-order-btn"
              onClick={handlePlaceOrder}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 rounded-2xl transition-all duration-200 active:scale-[0.98] shadow-xl shadow-orange-200/50 text-base flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Place Order · ₹{getTotal()}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
