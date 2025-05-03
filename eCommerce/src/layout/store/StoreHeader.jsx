import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthProvider";

const StoreHeader = () => {
    const [show, setShow] = useState(false);
    const { user, logout } = useAuth();
    const nav = useNavigate();

    const handleLogout = () => {
        logout();
        nav("/");
    };

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between px-10 py-3 shadow-md bg-purple-600">
            {/* Logo */}
            <div>
                <div className="text-3xl cursor-pointer font-bold text-white ">
                    <Link to="/seller" className="flex"> E-Commerce &nbsp;
                        {user.storeActive ?
                            <span className="font-normal text-white text-lg flex items-end ">Kênh người bán</span>
                            :
                            <span className="font-normal text-white text-lg flex items-end ">Đăng ký để trở thành người bán E-Commerce</span>
                        }

                    </Link>
                </div>
            </div>

            {/* User Dropdown */}
            {user ? (
                <div className="inline-block text-left relative">
                    <div
                        className="h-10 flex items-center space-x-2 px-4 border border-white rounded-full text-white hover:bg-purple-500 transition cursor-pointer"
                        onClick={() => setShow(!show)}
                    >
                        <FaUserCircle className="text-xl text-white" />
                        <span className="whitespace-nowrap">{user.username}</span>
                    </div>

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
        </header>
    );
};

export default StoreHeader;
