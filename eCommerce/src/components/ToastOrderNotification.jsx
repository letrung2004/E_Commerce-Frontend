import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ToastOrderNotification = ({ payload }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        toast.dismiss();
        navigate("/seller/orders");
    };

    return (
        <div className="bg-white shadow-lg border border-gray-200 p-4 rounded-lg flex items-center space-x-4">
            <div className="text-xl">📦</div>
            <div className="flex-1">
                <p className="font-semibold">Bạn có 1 đơn hàng mới</p>
                <p className="">Mã đơn hàng: {payload.orderId}</p>
            </div>
            <button
                className="text-blue-600 font-medium hover:underline"
                onClick={handleClick}
            >
                Xem
            </button>
        </div>
    );
};

export default ToastOrderNotification;
