// Order statuses and their visual configurations
export const ORDER_STATUSES = ['Pending', 'Preparing', 'Ready', 'Completed'];

export const statusConfig = {
  Pending: {
    color: 'bg-red-100 text-red-800 border-red-200',
    dot: 'bg-red-500',
    icon: '🔴',
  },
  Preparing: {
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    dot: 'bg-yellow-500',
    icon: '🟡',
  },
  Ready: {
    color: 'bg-green-100 text-green-800 border-green-200',
    dot: 'bg-green-500',
    icon: '🟢',
  },
  Completed: {
    color: 'bg-gray-100 text-gray-600 border-gray-200',
    dot: 'bg-gray-400',
    icon: '✅',
  },
};
