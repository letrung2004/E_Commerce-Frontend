import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import { useAuth } from "../../context/AuthProvider";

const StoreHeader = () => {
    const { user, logout } = useAuth();
    const nav = useNavigate();
    const [show, setShow] = useState(false);

    const handleLogout = () => {
        logout();
        nav("/login");
    }

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 shadow-md bg-white">
            {/* Logo */}
            <div>
                <div className="text-3xl cursor-pointer font-bold text-purple-600">
                    <Link to="/seller">
                        E-Commerce <span className="font-normal text-black text-lg">for Seller</span>
                    </Link>
                </div>
            </div>

            {user ? (
                <div className="inline-block text-left">
                    <div
                        className="h-10 flex items-center space-x-2 px-4 border border-gray-300 rounded-full text-black hover:bg-gray-200 transition"
                        onClick={() => setShow(!show)}
                    >
                        <FaUserCircle className="text-xl text-gray-600" />
                        <span className="whitespace-nowrap">{user.username}</span>
                    </div>

                    {show && (
                        <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg z-50">
                            <Link
                                to="/me"
                                className="block px-4 py-2 hover:bg-gray-100"
                                onClick={() => setShow(false)}
                            >
                                Tài khoản của tôi
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <Link
                    to="/login"
                    className="h-10 flex items-center px-4 border border-gray-300 rounded-full text-black hover:bg-gray-200 transition"
                >
                    Sign in
                </Link>
            )}



        </header>
    );
};

export default StoreHeader;
