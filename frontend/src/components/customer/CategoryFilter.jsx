import { categories } from '../../data/menuData';

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="category-scroll">
      {categories.map((cat) => (
        <button
          key={cat.id}
          id={`category-${cat.id}`}
          onClick={() => onChange(cat.id)}
          className={`category-pill ${active === cat.id ? 'active' : ''}`}
        >
          <span className="emoji">{cat.emoji}</span>
          {cat.name}
        </button>
      ))}
    </div>
  );
}
