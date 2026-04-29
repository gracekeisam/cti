import { useState, useMemo, useEffect } from 'react';
import Header from '../../components/customer/Header';
import CategoryFilter from '../../components/customer/CategoryFilter';
import MenuCard from '../../components/customer/MenuCard';
import CartIcon from '../../components/customer/CartIcon';
import { menuItems as localMenuItems } from '../../data/menuData';
import { fetchMenu } from '../../services/api';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function loadMenu() {
      setLoading(true);
      try {
        const data = await fetchMenu();
        if (!cancelled) { setMenuItems(data); setLoading(false); }
      } catch {
        if (!cancelled) { setMenuItems(localMenuItems); setLoading(false); }
      }
    }
    loadMenu();
    return () => { cancelled = true; };
  }, []);

  const filteredItems = useMemo(() => {
    let items = menuItems;
    if (activeCategory !== 'all') items = items.filter((i) => i.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
    }
    return items;
  }, [activeCategory, searchQuery, menuItems]);

  return (
    <div className="app-container">
      <Header />

      {/* Search */}
      <div className="search-wrapper">
        <div className="search-input-container">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            id="menu-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for dishes..."
            className="search-input"
          />
        </div>
      </div>

      {/* Categories */}
      <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

      {/* Menu Grid */}
      {loading ? (
        <div className="menu-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="menu-card" style={{ animationDelay: `${i * 60}ms` }}>
              <div style={{ aspectRatio: '4/3' }} className="shimmer-bg" />
              <div style={{ padding: 14 }}>
                <div style={{ height: 14, width: '75%', borderRadius: 6, marginBottom: 8 }} className="shimmer-bg" />
                <div style={{ height: 10, width: '100%', borderRadius: 4, marginBottom: 12 }} className="shimmer-bg" />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ height: 18, width: 40, borderRadius: 6 }} className="shimmer-bg" />
                  <div style={{ height: 32, width: 60, borderRadius: 10 }} className="shimmer-bg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-emoji">🍽️</div>
          <h3 className="empty-state-title">No items found</h3>
          <p className="empty-state-text">Try a different category or search term</p>
        </div>
      ) : (
        <div className="menu-grid">
          {filteredItems.map((item, i) => (
            <div key={item.id} style={{ animationDelay: `${i * 60}ms` }}>
              <MenuCard item={item} />
            </div>
          ))}
        </div>
      )}

      <CartIcon />
    </div>
  );
}
