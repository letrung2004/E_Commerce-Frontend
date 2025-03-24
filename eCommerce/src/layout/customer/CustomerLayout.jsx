import React from "react";
import { Outlet } from "react-router-dom";
import CustomerHeader from "./CustomerHeader";
import CustomerFooter from "./CustomerFooter";

const CustomerLayout = () => {
    return (
        <div className="customer-layout">
            <CustomerHeader />
            <main className="content">
                <Outlet /> {/* Hiển thị component con tương ứng với route */}
            </main>
            <CustomerFooter />
        </div>
    );
};

export default CustomerLayout;