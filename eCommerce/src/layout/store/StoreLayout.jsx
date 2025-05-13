import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import StoreHeader from "./StoreHeader";
import StoreSidebar from "./StoreSidebar";
import { useAuth } from "../../context/AuthProvider";
import { WebSocketProvider } from "../../context/WebSocketContext";
import { Toaster } from 'react-hot-toast';

const StoreLayout = () => {
    const { user } = useAuth();
    const location = useLocation();

    // Danh sách các đường dẫn được phép truy cập khi store chưa được kích hoạt
    const allowedPaths = ["/seller/welcome", "/seller/register", "/seller/success-registration"];

    // Nếu user chưa active store và đường dẫn hiện tại không nằm trong danh sách cho phép, điều hướng đến /seller/welcome
    if (user && !user.storeActive && !allowedPaths.includes(location.pathname)) {
        return <Navigate to="/seller/welcome" replace />;
    }

    return (
        <WebSocketProvider currentUser={user}>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex flex-col h-screen bg-gray-100">
                <StoreHeader />
                <div className="flex flex-grow overflow-hidden">
                    {user.storeActive && <StoreSidebar />}

                    <main className="flex-grow p-4 overflow-auto">
                        <Outlet />
                    </main>
                </div>
            </div>
        </WebSocketProvider>
    );
};

export default StoreLayout;
