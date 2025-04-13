import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import CustomerLayout from "./layout/customer/CustomerLayout";
import CustomerHome from "./pages/customer/Home";
import ProductsDetail from "./pages/customer/ProductsDetail";
import Cart from "./pages/customer/Cart";
import CustomerStoreDetail from "./pages/customer/StoreDetail";
import CategoryProducts from "./pages/customer/Products";

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

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Routes cho login voi register */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Routes cho người mua */}
          <Route path="/" element={<CustomerLayout />}>
            <Route index element={<CustomerHome />} />
            <Route path="products/:productId" element={<ProductsDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="store-detail/:storeId" element={<CustomerStoreDetail />} />
            <Route path="category-detail/:categoryId" element={<CategoryProducts />} />
          </Route>

          {/* Routes cho người bán */}
          <Route path="/seller" element={<StoreLayout />}>
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

    </>
  );
}
export default App;