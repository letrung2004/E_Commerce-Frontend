import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import React from "react";
import CustomerLayout from "./layout/customer/CustomerLayout";
import CustomerHome from "./pages/customer/Home";
import ProductsDetail from "./pages/customer/ProductsDetail";
import Cart from "./pages/customer/Cart";
import CustomerStoreDetail from "./pages/customer/StoreDetail";
import CategoryProducts from "./pages/customer/Products";
import CustomerOrder from "./pages/customer/CustomerOrder";
import CustomerOrderDetail from "./pages/customer/OrderDetail";
import UserProfile from "./pages/customer/UserProfile";

import StoreLayout from "./layout/store/StoreLayout";
import StoreHome from "./pages/store/Home";
import StoreProducts from "./pages/store/Products";
import AddProduct from "./pages/store/AddProduct";
import StoreCategories from "./pages/store/Categories";
import AddCategory from "./pages/store/AddCategories";
import Revenue from "./pages/store/Revenue";
import Messages from "./pages/store/Messages";
import StoreOrders from "./pages/store/Orders";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import OAuth2CallbackHandler from "./pages/auth/OAuth2CallbackHandler";

const App = () => {

  // Component route kiểm tra đăng nhập
  const PrivateRoute = ({ element }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    return user ? element : <Navigate to="/login" />;
  };
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Routes cho login voi register */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/oauth2/callback" element={<OAuth2CallbackHandler />} />


            {/* Người mua - có thể private tuỳ */}
            <Route path="/" element={<CustomerLayout />}>
              <Route index element={<CustomerHome />} />
              <Route path="products/:productId" element={<ProductsDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="store-detail/:storeId" element={<CustomerStoreDetail />} />
              <Route path="category-detail/:categoryId" element={<CategoryProducts />} />
              <Route path="orders" element={<PrivateRoute element={<CustomerOrder />} />} />
              <Route path="orders/:orderId" element={<PrivateRoute element={<CustomerOrderDetail />} />} />
              <Route path="me" element={<UserProfile />} />
            </Route>

            {/* Người bán - cần đăng nhập */}
            <Route path="/seller" element={<PrivateRoute element={<StoreLayout />} />}>
              <Route index element={<StoreHome />} />
              <Route path="products" element={<StoreProducts />} />
              <Route path="products/add" element={<AddProduct />} />
              <Route path="categories" element={<StoreCategories />} />
              <Route path="categories/add" element={<AddCategory />} />
              <Route path="revenue" element={<Revenue />} />
              <Route path="messages" element={<Messages />} />
              <Route path="orders" element={<StoreOrders />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>


    </>
  );
}
export default App;