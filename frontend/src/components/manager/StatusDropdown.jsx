import { ORDER_STATUSES, statusConfig } from '../../data/ordersData';

export default function StatusDropdown({ currentStatus, onChange }) {
  return (
    <div className="relative">
      <select
        id={`status-select-${currentStatus}`}
        value={currentStatus}
        onChange={(e) => onChange(e.target.value)}
        className={`
          appearance-none cursor-pointer text-sm font-medium pl-3 pr-8 py-2 rounded-xl
          border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20
          ${statusConfig[currentStatus]?.color || 'bg-gray-100 text-gray-600 border-gray-200'}
        `}
      >
        {ORDER_STATUSES.map((s) => (
          <option key={s} value={s}>
            {statusConfig[s]?.icon} {s}
          </option>
        ))}
      </select>
      {/* Dropdown arrow */}
      <svg
        className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-current opacity-50 pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
