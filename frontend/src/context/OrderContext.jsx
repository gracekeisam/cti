import { createContext, useContext, useReducer, useCallback } from 'react';
import { initialOrders } from '../data/ordersData';

const OrderContext = createContext(null);

let orderCounter = initialOrders.length + 1;

const orderReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ORDER': {
      const id = `ORD-${String(orderCounter++).padStart(3, '0')}`;
      const newOrder = {
        id,
        tableNumber: action.payload.tableNumber,
        items: action.payload.items,
        totalPrice: action.payload.totalPrice,
        status: 'Pending',
        timestamp: new Date().toISOString(),
        isNew: true,
      };
      return { ...state, orders: [newOrder, ...state.orders] };
    }
    case 'UPDATE_STATUS':
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.payload.id
            ? { ...o, status: action.payload.status, isNew: false }
            : o
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
    orders: initialOrders,
  });

  const addOrder = useCallback(
    (order) => dispatch({ type: 'ADD_ORDER', payload: order }),
    []
  );

  const updateOrderStatus = useCallback(
    (id, status) =>
      dispatch({ type: 'UPDATE_STATUS', payload: { id, status } }),
    []
  );

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
