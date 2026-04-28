import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import MenuPage from './pages/customer/MenuPage';
import CartPage from './pages/customer/CartPage';
import OrderConfirmation from './pages/customer/OrderConfirmation';
import LoginPage from './pages/manager/LoginPage';
import DashboardPage from './pages/manager/DashboardPage';

export default function App() {
  return (
    <BrowserRouter>
      <OrderProvider>
        <CartProvider>
          <Routes>
            {/* Customer Routes */}
            <Route path="/table/:tableId" element={<MenuPage />} />
            <Route path="/table/:tableId/cart" element={<CartPage />} />
            <Route path="/table/:tableId/order/:orderId" element={<OrderConfirmation />} />

            {/* Manager Routes */}
            <Route path="/manager" element={<LoginPage />} />
            <Route path="/manager/dashboard" element={<DashboardPage />} />

            {/* Default redirect to table 1 for demo */}
            <Route path="/" element={<Navigate to="/table/1" replace />} />
            <Route path="*" element={<Navigate to="/table/1" replace />} />
          </Routes>
        </CartProvider>
      </OrderProvider>
    </BrowserRouter>
  );
}
