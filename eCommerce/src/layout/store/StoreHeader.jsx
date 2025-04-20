import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import { useAuth } from "../../context/AuthProvider";

const StoreHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 shadow-md bg-white">
            {/* Logo */}
            <div>
                <div className="text-3xl cursor-pointer font-bold text-red-500 ">
                    <Link to="/seller" className="flex"> Shopii &nbsp;
                        {user.storeActive ?
                            <span className="font-normal text-black text-lg flex items-end ">Kênh người bán</span>
                            :
                            <span className="font-normal text-black text-lg flex items-end ">Đăng ký để trở thành người bán Shopii</span>
                        }

                    </Link>
                </div>
            </div>

            {/* User Dropdown */}
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full text-black hover:bg-gray-200 transition"
                >
                    <FaUserCircle className="text-xl" />
                    <span>Username</span>
                    <FaChevronDown className={`text-sm transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                        <Link to="/seller/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Cài đặt</Link>
                        <Link to="/seller/logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Đăng xuất</Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default StoreHeader;