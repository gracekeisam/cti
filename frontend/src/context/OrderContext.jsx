import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import * as api from '../services/api';
import { socket } from '../services/socket';

const OrderContext = createContext(null);

const orderReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ORDERS':
      return { ...state, orders: action.payload, loading: false, error: null };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'ADD_ORDER': {
      // Avoid duplicates
      const exists = state.orders.find((o) => o.id === action.payload.id);
      if (exists) return state;
      return { ...state, orders: [action.payload, ...state.orders] };
    }
    case 'UPDATE_ORDER':
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.payload.id ? { ...action.payload, isNew: false } : o
        ),
      };
    case 'MARK_SEEN':
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.payload ? { ...o, isNew: false } : o
        ),
      };
    default:
      return state;
  }
};

export function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(orderReducer, {
    orders: [],
    loading: false,
    error: null,
  });

  // Listen for Socket.IO events
  useEffect(() => {
    function onNewOrder(order) {
      dispatch({ type: 'ADD_ORDER', payload: order });
    }

    function onUpdateOrder(order) {
      dispatch({ type: 'UPDATE_ORDER', payload: order });
    }

    socket.on('new_order', onNewOrder);
    socket.on('update_order', onUpdateOrder);

    return () => {
      socket.off('new_order', onNewOrder);
      socket.off('update_order', onUpdateOrder);
    };
  }, []);

  const loadOrders = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const orders = await api.fetchOrders();
      dispatch({ type: 'SET_ORDERS', payload: orders });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  }, []);

  const addOrder = useCallback(async (orderData) => {
    // POST to backend — backend will emit socket event
    const newOrder = await api.placeOrder({
      table: orderData.tableNumber,
      items: orderData.items,
    });
    return newOrder;
  }, []);

  const updateOrderStatus = useCallback(async (id, status) => {
    const updated = await api.updateOrderStatus(id, status);
    // Backend emits socket event — will update via listener
    return updated;
  }, []);

  const markOrderSeen = useCallback(
    (id) => dispatch({ type: 'MARK_SEEN', payload: id }),
    []
  );

  const getOrderById = useCallback(
    (id) => state.orders.find((o) => o.id === id),
    [state.orders]
  );

  const getOrdersByTable = useCallback(
    (tableNumber) =>
      state.orders.filter((o) => o.tableNumber === Number(tableNumber)),
    [state.orders]
  );

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        loading: state.loading,
        error: state.error,
        loadOrders,
        addOrder,
        updateOrderStatus,
        markOrderSeen,
        getOrderById,
        getOrdersByTable,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used within an OrderProvider');
  return ctx;
}
