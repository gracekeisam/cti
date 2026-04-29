const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  },
});

// ── Middleware ──────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── In-Memory Data Store ───────────────────────────────
let orderCounter = 0;

const menuItems = [
  {
    id: 1,
    name: 'Crispy Samosa',
    description: 'Golden fried pastry stuffed with spiced potatoes & peas',
    price: 25,
    category: 'snacks',
    image: '/images/samosa.png',
    isPopular: true,
  },
  {
    id: 2,
    name: 'Veg Sandwich',
    description: 'Fresh veggies with mint chutney on toasted bread',
    price: 60,
    category: 'snacks',
    image: '/images/veg_sandwich.png',
    isPopular: false,
  },
  {
    id: 3,
    name: 'French Fries',
    description: 'Crispy golden fries seasoned with herbs & salt',
    price: 80,
    category: 'snacks',
    image: '/images/french_fries.png',
    isPopular: true,
  },
  {
    id: 4,
    name: 'Steamed Momos',
    description: 'Soft dumplings with spicy red chili dipping sauce',
    price: 70,
    category: 'snacks',
    image: '/images/momos.png',
    isPopular: true,
  },
  {
    id: 5,
    name: 'Masala Chai',
    description: 'Hot spiced Indian tea with aromatic flavors',
    price: 20,
    category: 'drinks',
    image: '/images/masala_chai.png',
    isPopular: true,
  },
  {
    id: 6,
    name: 'Cold Coffee',
    description: 'Chilled coffee blended with ice cream & cream',
    price: 90,
    category: 'drinks',
    image: '/images/cold_coffee.png',
    isPopular: false,
  },
  {
    id: 7,
    name: 'Mango Lassi',
    description: 'Creamy yogurt smoothie with fresh mango pulp',
    price: 70,
    category: 'drinks',
    image: '/images/mango_lassi.png',
    isPopular: true,
  },
  {
    id: 8,
    name: 'Fresh Lime Soda',
    description: 'Refreshing lime soda with mint & ice',
    price: 40,
    category: 'drinks',
    image: '/images/lime_soda.png',
    isPopular: false,
  },
  {
    id: 9,
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice layered with tender chicken',
    price: 180,
    category: 'meals',
    image: '/images/chicken_biryani.png',
    isPopular: true,
  },
  {
    id: 10,
    name: 'Paneer Butter Masala',
    description: 'Cottage cheese in rich, creamy tomato gravy with naan',
    price: 150,
    category: 'meals',
    image: '/images/paneer_butter.png',
    isPopular: true,
  },
  {
    id: 11,
    name: 'Masala Dosa',
    description: 'Crispy rice crepe with spiced potato filling & chutney',
    price: 90,
    category: 'meals',
    image: '/images/masala_dosa.png',
    isPopular: false,
  },
  {
    id: 12,
    name: 'Gulab Jamun',
    description: 'Soft milk dumplings soaked in rose-flavored sugar syrup',
    price: 50,
    category: 'desserts',
    image: '/images/gulab_jamun.png',
    isPopular: true,
  },
];

const orders = [];

// ── REST API Routes ────────────────────────────────────

// GET /menu — Return all menu items
app.get('/menu', (req, res) => {
  res.json({
    success: true,
    data: menuItems,
  });
});

// POST /order — Create a new order
app.post('/order', (req, res) => {
  const { table, items } = req.body;

  if (!table || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid order. Provide table number and items.',
    });
  }

  orderCounter++;
  const orderId = `ORD-${String(orderCounter).padStart(3, '0')}`;

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const newOrder = {
    id: orderId,
    tableNumber: Number(table),
    items: items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
    totalPrice,
    status: 'Pending',
    timestamp: new Date().toISOString(),
    isNew: true,
  };

  orders.unshift(newOrder);

  // Emit to all connected clients
  io.emit('new_order', newOrder);

  console.log(`📦 New order ${orderId} from Table ${table} — ₹${totalPrice}`);

  res.status(201).json({
    success: true,
    data: newOrder,
  });
});

// GET /orders — Return all orders
app.get('/orders', (req, res) => {
  res.json({
    success: true,
    data: orders,
  });
});

// GET /order/:id — Return single order
app.get('/order/:id', (req, res) => {
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found',
    });
  }
  res.json({
    success: true,
    data: order,
  });
});

// PATCH /order/:id — Update order status
app.patch('/order/:id', (req, res) => {
  const { status } = req.body;
  const validStatuses = ['Pending', 'Preparing', 'Ready', 'Completed'];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
    });
  }

  const orderIndex = orders.findIndex((o) => o.id === req.params.id);
  if (orderIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Order not found',
    });
  }

  orders[orderIndex] = {
    ...orders[orderIndex],
    status,
    isNew: false,
  };

  const updatedOrder = orders[orderIndex];

  // Emit to all connected clients
  io.emit('update_order', updatedOrder);

  console.log(`🔄 Order ${updatedOrder.id} → ${status}`);

  res.json({
    success: true,
    data: updatedOrder,
  });
});

// ── Socket.IO ──────────────────────────────────────────
io.on('connection', (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// ── Start Server ───────────────────────────────────────
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log('');
  console.log('  ┌──────────────────────────────────────┐');
  console.log(`  │  🍛 Canteen Backend Server            │`);
  console.log(`  │  📡 Running on http://localhost:${PORT}  │`);
  console.log('  │  🔌 Socket.IO enabled                │');
  console.log('  └──────────────────────────────────────┘');
  console.log('');
});
