import { useState } from 'react';
import { useCart } from '../../context/CartContext';

export default function MenuCard({ item }) {
  const { addItem, getItemQuantity, updateQuantity } = useCart();
  const [imgLoaded, setImgLoaded] = useState(false);
  const qty = getItemQuantity(item.id);

  return (
    <div className="menu-card">
      {/* Image */}
      <div className="menu-card-image">
        {!imgLoaded && <div className="shimmer-bg" style={{ position: 'absolute', inset: 0 }} />}
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
        />
        {item.isPopular && (
          <span className="popular-badge">🔥 Popular</span>
        )}
      </div>

      {/* Body */}
      <div className="menu-card-body">
        <h3 className="menu-card-name">{item.name}</h3>
        <p className="menu-card-desc">{item.description}</p>

        <div className="menu-card-footer">
          <span className="menu-card-price">₹{item.price}</span>

          {qty === 0 ? (
            <button
              id={`add-btn-${item.id}`}
              onClick={() => addItem(item)}
              className="btn-add"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              ADD
            </button>
          ) : (
            <div className="qty-control">
              <button
                id={`dec-btn-${item.id}`}
                onClick={() => updateQuantity(item.id, qty - 1)}
                className="qty-btn qty-btn-minus"
              >
                −
              </button>
              <span className="qty-value">{qty}</span>
              <button
                id={`inc-btn-${item.id}`}
                onClick={() => updateQuantity(item.id, qty + 1)}
                className="qty-btn qty-btn-plus"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
