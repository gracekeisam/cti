import { useCart } from '../../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="cart-item">
      {/* Image */}
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>

      {/* Details */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1E293B', lineHeight: 1.3 }}>
            {item.name}
          </h3>
          <button
            onClick={() => removeItem(item.id)}
            style={{
              background: 'none', border: 'none', padding: 2,
              color: '#94A3B8', cursor: 'pointer',
              flexShrink: 0, borderRadius: 6,
            }}
            title="Remove item"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p style={{ fontSize: 13, color: '#94A3B8', marginTop: 2 }}>₹{item.price} each</p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <div className="qty-control">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="qty-btn qty-btn-minus"
              style={{ width: 28, height: 28 }}
            >
              −
            </button>
            <span className="qty-value">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="qty-btn qty-btn-plus"
              style={{ width: 28, height: 28 }}
            >
              +
            </button>
          </div>
          <span style={{ fontSize: 15, fontWeight: 800, color: '#1E293B' }}>
            ₹{item.price * item.quantity}
          </span>
        </div>
      </div>
    </div>
  );
}
