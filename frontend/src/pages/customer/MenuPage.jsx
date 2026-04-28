import { useState, useMemo } from 'react';
import Header from '../../components/customer/Header';
import CategoryFilter from '../../components/customer/CategoryFilter';
import MenuCard from '../../components/customer/MenuCard';
import CartIcon from '../../components/customer/CartIcon';
import { menuItems } from '../../data/menuData';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    let items = menuItems;
    if (activeCategory !== 'all') {
      items = items.filter((i) => i.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
      );
    }
    return items;
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <Header />

      {/* Search */}
      <div className="max-w-lg mx-auto px-4 pt-4 pb-3">
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            id="menu-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for dishes..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 shadow-sm"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-lg mx-auto pb-4">
        <CategoryFilter
          active={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {/* Menu Grid */}
      <div className="max-w-lg mx-auto px-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-5xl mb-3">🍽️</div>
            <h3 className="font-semibold text-gray-700 mb-1">
              No items found
            </h3>
            <p className="text-sm text-gray-400">
              Try a different category or search term
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 stagger-children">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Floating Cart */}
      <CartIcon />
    </div>
  );
}
