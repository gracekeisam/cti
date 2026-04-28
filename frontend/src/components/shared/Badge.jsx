import { statusConfig } from '../../data/ordersData';

export default function Badge({ status, size = 'md' }) {
  const config = statusConfig[status];
  if (!config) return null;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${config.color} ${sizeClasses[size]} transition-all duration-200`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`}
      />
      <span>{config.icon}</span>
      {status}
    </span>
  );
}
