import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import React, { useState } from "react";
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
import SaveProduct from "./pages/store/SaveProduct";
import StoreCategories from "./pages/store/Categories";
import Revenue from "./pages/store/Revenue";
import Messages from "./pages/store/Messages";
import StoreOrders from "./pages/store/Orders";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import OAuth2CallbackHandler from "./pages/auth/OAuth2CallbackHandler";
import WelcomeSeller from "./pages/store/WelcomeSeller";
import StoreRegistration from "./pages/store/StoreRegistration";
import AfterRegistration from "./pages/store/AfterRegistration";
import Address from "./components/customer/profile/Address";
import MyProfile from "./pages/customer/MyProfile";
import ProfileInfo from "./components/customer/profile/ProfileInfo";
import { AddressContext, AddressDispatchContext } from "./context/AppContext";
import Orders from "./pages/customer/Orders";
import PlaceOrder from "./pages/customer/PlaceOrder";
import { CartProvider } from "./context/CartContext";


const App = () => {

  const [currentAddress, setCurrentAddress] = useState(null)

  // Component route kiểm tra đăng nhập
  const PrivateRoute = ({ element }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    return user ? element : <Navigate to="/login" />;
  };
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <AddressContext.Provider value={currentAddress}>
            <AddressDispatchContext.Provider value={setCurrentAddress}>
              <BrowserRouter>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/oauth2/callback" element={<OAuth2CallbackHandler />} />

                  <Route path="/" element={<CustomerLayout />}>
                    <Route index element={<CustomerHome />} />
                    <Route path="products/:productId" element={<ProductsDetail />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="store-detail/:storeId" element={<CustomerStoreDetail />} />
                    <Route path="products" element={<CategoryProducts />} />
                    <Route path="orders" element={<PrivateRoute element={<CustomerOrder />} />} />
                    <Route path="place-order" element={<PrivateRoute element={<PlaceOrder />} />} />
                    <Route path="orders/:orderId" element={<PrivateRoute element={<CustomerOrderDetail />} />} />
                    
                    {/* <Route path="me" element={<UserProfile />} /> */}
                    <Route path="me" element={<PrivateRoute element={<MyProfile />} />}>
                      <Route path="profile" index element={<ProfileInfo />} />
                      <Route path="address" element={<Address />} />
                      <Route path="my-orders" element={<Orders />} />
                    </Route>

                  </Route>

                  <Route path="/seller" element={<PrivateRoute element={<StoreLayout />} />}>
                    <Route index element={<StoreHome />} />
                    <Route path="welcome" element={<WelcomeSeller />} />
                    <Route path="register" element={<StoreRegistration />} />
                    <Route path="success-registration" element={<AfterRegistration />} />
                    <Route path="products" element={<StoreProducts />} />
                    <Route path="products/add" element={<SaveProduct />} />
                    <Route path="categories" element={<StoreCategories />} />
                    <Route path="revenue" element={<Revenue />} />
                    <Route path="messages" element={<Messages />} />
                    <Route path="orders" element={<StoreOrders />} />
                    <Route path="products/update/:productId" element={<SaveProduct />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </AddressDispatchContext.Provider>
          </AddressContext.Provider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}
export default App;