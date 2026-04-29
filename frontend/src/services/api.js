// ── API Service Layer ──────────────────────────────────
// Central module for all backend HTTP calls.
// Uses Vite proxy in development (/api → http://localhost:3001).

const API_BASE = '/api';

async function request(url, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${url}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || `Request failed (${res.status})`);
    }

    return data;
  } catch (err) {
    if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
      throw new Error('Unable to connect to server. Please check your connection.');
    }
    throw err;
  }
}

/** Fetch all menu items */
export async function fetchMenu() {
  const { data } = await request('/menu');
  return data;
}

/** Place a new order */
export async function placeOrder({ table, items }) {
  const { data } = await request('/order', {
    method: 'POST',
    body: JSON.stringify({ table, items }),
  });
  return data;
}

/** Fetch all orders */
export async function fetchOrders() {
  const { data } = await request('/orders');
  return data;
}

/** Fetch a single order by ID */
export async function fetchOrderById(id) {
  const { data } = await request(`/order/${id}`);
  return data;
}

/** Update order status */
export async function updateOrderStatus(id, status) {
  const { data } = await request(`/order/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
  return data;
}
