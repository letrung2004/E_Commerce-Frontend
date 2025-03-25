import React from "react";
import { Outlet } from "react-router-dom";
import CustomerHeader from "./CustomerHeader";
import CustomerFooter from "./CustomerFooter";

const CustomerLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <CustomerHeader />

            {/* Phần nội dung có thể co giãn */}
            <main className="flex-grow flex">
                <Outlet />
            </main>

            <CustomerFooter />
        </div>
    );
};

export default CustomerLayout;
