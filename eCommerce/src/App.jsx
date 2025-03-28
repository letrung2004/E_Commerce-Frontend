import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import CustomerLayout from "./layout/customer/CustomerLayout";
import CustomerHome from "./pages/customer/Home";
import ProductsDetail from "./pages/customer/ProductsDetail";
import Categories from "./pages/customer/Categories";
import Cart from "./pages/customer/Cart";

import StoreLayout from "./layout/store/StoreLayout";
import StoreHome from "./pages/store/Home";
import StoreProducts from "./pages/store/Products";

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
            <Route path="categories" element={<Categories />} />
            <Route path="cart" element={<Cart />} />
          </Route>

          {/* Routes cho người bán */}
          <Route path="/seller" element={<StoreLayout />}>
            <Route index element={<StoreHome />} />
            <Route path="products" element={<StoreProducts />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  );
}
export default App;