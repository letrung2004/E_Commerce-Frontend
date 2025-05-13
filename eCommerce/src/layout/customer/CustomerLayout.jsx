import React from "react";
import { Outlet } from "react-router-dom";
import CustomerHeader from "./CustomerHeader";
import CustomerFooter from "./CustomerFooter";
import { useAuth } from "../../context/AuthProvider";
import { WebSocketProvider } from "../../context/WebSocketContext";
import { Toaster } from 'react-hot-toast';

const CustomerLayout = () => {
    const { user } = useAuth();
    return (
        <WebSocketProvider currentUser={user}>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex flex-col min-h-screen">
                <CustomerHeader />

                {/* Phần nội dung có thể co giãn */}
                <main className="flex-grow flex">
                    <Outlet />
                </main>

                <CustomerFooter />
            </div>
        </WebSocketProvider>
    );
};

export default CustomerLayout;
