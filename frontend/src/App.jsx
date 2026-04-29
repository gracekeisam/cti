import { BrowserRouter, Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import MenuPage from './pages/customer/MenuPage';
import CartPage from './pages/customer/CartPage';
import OrderConfirmation from './pages/customer/OrderConfirmation';
import LoginPage from './pages/manager/LoginPage';
import DashboardPage from './pages/manager/DashboardPage';
import KitchenPage from './pages/kitchen/KitchenPage';

// Redirect component for ?table=N query param
function TableRedirect() {
  const [searchParams] = useSearchParams();
  const table = searchParams.get('table');
  if (table) {
    return <Navigate to={`/table/${table}`} replace />;
  }
  return <Navigate to="/table/1" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <OrderProvider>
          <CartProvider>
            <Routes>
              {/* Customer Routes */}
              <Route path="/table/:tableId" element={<MenuPage />} />
              <Route path="/table/:tableId/cart" element={<CartPage />} />
              <Route path="/table/:tableId/order/:orderId" element={<OrderConfirmation />} />

              {/* Kitchen Route (direct, no login) */}
              <Route path="/kitchen" element={<KitchenPage />} />

              {/* Manager Routes */}
              <Route path="/manager" element={<LoginPage />} />
              <Route path="/manager/dashboard" element={<DashboardPage />} />

              {/* Root — handle ?table=N or default to table 1 */}
              <Route path="/" element={<TableRedirect />} />
              <Route path="*" element={<Navigate to="/table/1" replace />} />
            </Routes>
          </CartProvider>
        </OrderProvider>
      </SocketProvider>
    </BrowserRouter>
  );
}
