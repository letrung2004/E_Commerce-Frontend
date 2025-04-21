import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaSearch, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthProvider";

const CustomerHeader = () => {
    const { user, logout } = useAuth();
    const nav = useNavigate();
    const [show, setShow] = useState(false);

    const handleLogout = () => {
        logout();
        nav("/");
    };

    return (
        <header className="flex-wrap sticky top-0 z-50 flex items-center justify-between px-10 py-3 shadow-md bg-purple-600">
            {/* Logo và link kênh người bán */}
            <div className="grid gap-2">
                <Link to="/seller" className="text-sm text-white hover:text-gray-200 mt-1 self-start">
                    Kênh người bán
                </Link>
                <Link to="/">
                    <div className="text-3xl cursor-pointer font-bold text-white">E-Commerce</div>
                </Link>
            </div>

            {/* Thanh tìm kiếm và icon */}
            <div className="flex items-center space-x-6 relative">
                <div className="flex items-center bg-gray-200 px-4 py-2 rounded-full w-80">
                    <FaSearch className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="bg-transparent outline-none text-gray-700 w-full"
                    />
                </div>

                {/* Icon giỏ hàng */}
                <Link to="/cart">
                    <FaShoppingCart className="text-white text-xl cursor-pointer hover:text-gray-300 transition" />
                </Link>

                {/* Người dùng */}
                {user ? (
                    <div className="inline-block text-left relative">
                        {/* Nút người dùng */}
                        <div
                            className="h-10 flex items-center space-x-2 px-4 border border-white rounded-full text-white hover:bg-purple-500 transition cursor-pointer"
                            onClick={() => setShow(!show)}
                        >
                            <FaUserCircle className="text-xl text-white" />
                            <span className="whitespace-nowrap">{user.username}</span>
                        </div>

                        {/* Dropdown */}
                        {show && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl ring-1 ring-gray-200 z-50 text-sm">
                                <Link
                                    to="/me"
                                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition-colors rounded-t-xl"
                                    onClick={() => setShow(false)}
                                >
                                    <span className="ml-2">Tài khoản của tôi</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition-colors rounded-b-xl"
                                >
                                    <span className="ml-2">Đăng xuất</span>
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="h-10 flex items-center px-4 border border-white rounded-full text-white hover:bg-purple-500 transition"
                    >
                        Sign in
                    </Link>
                )}
            </div>
        </header>
    );
};

export default CustomerHeader;
