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
    }

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between px-42 py-3 shadow-md bg-purple-600">
            <div className="grid gap-3">
                <Link to="/seller" className="text-white text-sm">Kênh người bán</Link>
                <Link to="/">
                    <div className="text-3xl cursor-pointer font-bold text-white">Shopii</div>
                </Link>
            </div>

            <div className="flex items-center space-x-6">
                <div className="flex items-center bg-gray-200 px-4 py-2 rounded-full w-80">
                    <FaSearch className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent outline-none text-gray-500 w-full"
                    />
                </div>

                <Link to="/cart">
                    <FaShoppingCart className="text-black text-xl cursor-pointer hover:text-gray-600 transition" />
                </Link>

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



            </div>

        </header>
    );
};

export default CustomerHeader;
