// Pre-seeded mock orders for the manager dashboard
export const initialOrders = [
  {
    id: 'ORD-001',
    tableNumber: 3,
    items: [
      { id: 9, name: 'Chicken Biryani', price: 180, quantity: 2 },
      { id: 7, name: 'Mango Lassi', price: 70, quantity: 2 },
    ],
    totalPrice: 500,
    status: 'Pending',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 min ago
    isNew: true,
  },
  {
    id: 'ORD-002',
    tableNumber: 7,
    items: [
      { id: 10, name: 'Paneer Butter Masala', price: 150, quantity: 1 },
      { id: 5, name: 'Masala Chai', price: 20, quantity: 3 },
      { id: 1, name: 'Crispy Samosa', price: 25, quantity: 4 },
    ],
    totalPrice: 310,
    status: 'Preparing',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 min ago
    isNew: false,
  },
  {
    id: 'ORD-003',
    tableNumber: 12,
    items: [
      { id: 4, name: 'Steamed Momos', price: 70, quantity: 2 },
      { id: 8, name: 'Fresh Lime Soda', price: 40, quantity: 2 },
    ],
    totalPrice: 220,
    status: 'Ready',
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(), // 25 min ago
    isNew: false,
  },
  {
    id: 'ORD-004',
    tableNumber: 1,
    items: [
      { id: 11, name: 'Masala Dosa', price: 90, quantity: 2 },
      { id: 12, name: 'Gulab Jamun', price: 50, quantity: 2 },
      { id: 6, name: 'Cold Coffee', price: 90, quantity: 1 },
    ],
    totalPrice: 370,
    status: 'Completed',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 min ago
    isNew: false,
  },
];

export const ORDER_STATUSES = ['Pending', 'Preparing', 'Ready', 'Completed'];

export const statusConfig = {
  Pending: {
    color: 'bg-amber-100 text-amber-800 border-amber-200',
    dot: 'bg-amber-500',
    icon: '⏳',
  },
  Preparing: {
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    dot: 'bg-blue-500',
    icon: '👨‍🍳',
  },
  Ready: {
    color: 'bg-green-100 text-green-800 border-green-200',
    dot: 'bg-green-500',
    icon: '✅',
  },
  Completed: {
    color: 'bg-gray-100 text-gray-600 border-gray-200',
    dot: 'bg-gray-400',
    icon: '🏁',
  },
};
