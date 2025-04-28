import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaSearch, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthProvider";

const CustomerHeader = () => {
    const { user, logout } = useAuth();
    const nav = useNavigate();
    const [show, setShow] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        logout();
        nav("/");
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShow(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-700 to-purple-500 shadow-lg">

            {/* Main header */}
            <div className="flex items-center justify-between px-10 py-3">

                <Link to="/" className="group">
                    <div className="text-3xl font-bold text-white flex items-center">
                        <span className="transition-colors">E-Commerce</span>
                    </div>
                </Link>

                {/* Navigation */}
                <div className="flex items-center space-x-6">
                    {/* Main nav links */}
                    <div className="flex space-x-5 mr-6">
                        <Link to="/" className="text-lg font-medium text-white  transition-colors">
                            Trang chủ
                        </Link>
                        <Link to="/products" className="text-lg font-medium text-white transition-colors">
                            Sản phẩm
                        </Link>
                        <Link to="/categories" className="text-lg font-medium text-white transition-colors">
                            Danh mục
                        </Link>
                    </div>

                    <div className="flex items-center bg-gray-200 px-4 py-2 rounded-full w-80">
                        <FaSearch className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="bg-transparent outline-none text-gray-700 w-full"
                        />
                    </div>

                    {/* Icon giỏ hàng */}
                    <Link to="/cart" className="relative group">
                        <div className="bg-white p-2 rounded-full  transition-colors">
                            <FaShoppingCart className="text-purple-700 text-xl" />
                        </div>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                    </Link>

                    {user ? (
                        <div className="inline-block text-left relative" ref={dropdownRef}>
                            <div
                                className="flex items-center space-x-2 px-4 py-2 bg-purple-700 hover:bg-purple-800 rounded-full text-white cursor-pointer transition-colors"
                                onClick={() => setShow(!show)}
                            >
                                <FaUserCircle className="text-xl" />
                                <span className="whitespace-nowrap font-medium">{user.username}</span>
                            </div>

                            {show && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl ring-1 ring-gray-200 z-50 overflow-hidden transition-all">
                                    <div className="px-4 py-3 bg-purple-50 text-purple-800 font-medium border-b border-gray-200">
                                        <p className="truncate">{user.email}</p>
                                    </div>
                                    <Link
                                        to="/me"
                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                                        onClick={() => setShow(false)}
                                    >
                                        <span>Tài khoản của tôi</span>
                                    </Link>
                                    <Link
                                        to="/orders"
                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                                        onClick={() => setShow(false)}
                                    >
                                        <span>Đơn hàng</span>
                                    </Link>
                                    <Link
                                        to="/wishlist"
                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                                        onClick={() => setShow(false)}
                                    >
                                        <span>Danh sách yêu thích</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors border-t border-gray-200"
                                    >
                                        <span>Đăng xuất</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex space-x-3">
                            <Link
                                to="/login"
                                className="flex items-center px-5 py-2 bg-white text-purple-700 font-medium rounded-full transition-colors"
                            >
                                Đăng nhập
                            </Link>

                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default CustomerHeader;