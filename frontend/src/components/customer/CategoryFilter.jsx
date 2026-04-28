import { categories } from '../../data/menuData';

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-4">
      {categories.map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            id={`category-${cat.id}`}
            onClick={() => onChange(cat.id)}
            className={`
              flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium
              whitespace-nowrap transition-all duration-200 border
              ${
                isActive
                  ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-200'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50'
              }
            `}
          >
            <span className="text-base">{cat.emoji}</span>
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
