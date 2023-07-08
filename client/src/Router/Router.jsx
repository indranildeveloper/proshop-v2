import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ShippingPge from "../pages/ShippingPge";
import PaymentPage from "../pages/PaymentPage";
import PlaceOrderPage from "../pages/PlaceOrderPage";
import OrderPage from "../pages/OrderPage";
import ProfilePage from "../pages/ProfilePage";
import OrdersListPage from "../pages/admin/OrdersListPage";
import ProductsListPage from "../pages/admin/ProductsListPage";
import ProductEditPage from "../pages/admin/ProductEditPage";
import UsersListPage from "../pages/admin/UsersListPage";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingPge />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/place-order" element={<PlaceOrderPage />} />
        <Route path="/order/:orderId" element={<OrderPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orders-list" element={<OrdersListPage />} />
        <Route path="/admin/products-list" element={<ProductsListPage />} />
        <Route
          path="/admin/product/:productId/edit"
          element={<ProductEditPage />}
        />
        <Route path="/admin/users-list" element={<UsersListPage />} />
      </Route>
    </Route>
  )
);

export default Router;
