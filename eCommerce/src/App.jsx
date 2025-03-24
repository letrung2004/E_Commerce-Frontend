import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import CustomerLayout from "./layout/customer/CustomerLayout";
import CustomerHome from "./pages/customer/Home";
import CustomerProducts from "./pages/customer/Products";

import StoreLayout from "./layout/store/StoreLayout";
import StoreHome from "./pages/store/Home";
import StoreProducts from "./pages/store/Products";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Routes cho người mua */}
          <Route path="/" element={<CustomerLayout />}>
            <Route index element={<CustomerHome />} />
            <Route path="products" element={<CustomerProducts />} />
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