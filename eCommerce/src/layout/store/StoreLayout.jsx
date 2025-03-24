import React from "react";
import { Outlet } from "react-router-dom";
import StoreHeader from "./StoreHeader";
import StoreFooter from "./StoreFooter";

const StoreLayout = () => {
    return (
        <div className="store-layout">
            <StoreHeader />
            <main className="content">
                <Outlet /> {/* Hiển thị component con tương ứng với route */}
            </main>
            <StoreFooter />
        </div>
    );
};

export default StoreLayout;