import React from "react";
import { Outlet } from "react-router-dom";
import StoreHeader from "./StoreHeader";
import StoreSidebar from "./StoreSidebar";

const StoreLayout = () => {
    return (
        <div className="flex flex-col h-screen">
            <StoreHeader />
            <div className="flex flex-grow overflow-hidden">
                <StoreSidebar />
                <main className="flex-grow p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default StoreLayout;
