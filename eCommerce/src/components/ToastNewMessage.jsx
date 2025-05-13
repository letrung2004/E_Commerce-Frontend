import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const ToastNewMessage = ({ payload }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        toast.dismiss();
        navigate("/seller/messages");
    };

    return (
        <div className="bg-white shadow-lg border border-gray-200 p-4 rounded-lg flex items-center space-x-4">
            <div className="text-xl text-blue-500">
                <MessageCircle size={24} />
            </div>
            <div className="flex-1">
                <p className="font-semibold">Bạn có tin nhắn mới</p>
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

export default ToastNewMessage;
