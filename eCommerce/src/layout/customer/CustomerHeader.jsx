import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";

const CustomerHeader = () => {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 shadow-md bg-white">
            {/* Logo */}
            <div className="text-3xl font-bold text-purple-600">E-Commerce</div>

            {/* Navigation */}
            <nav className="flex space-x-6 text-lg">
                <Link to="/" className="font-medium text-black hover:text-purple-600">
                    Home
                </Link>
                <Link to="/categories" className="text-gray-500 hover:text-purple-600">
                    Categories
                </Link>
            </nav>

            {/* Search Bar */}
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-80">
                <FaSearch className="text-gray-500 mr-2" />
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent outline-none text-gray-500 w-full"
                />
            </div>

            {/* Icons + Sign-in Button */}
            <div className="flex items-center space-x-6">
                <FaHeart className="text-black text-xl cursor-pointer hover:text-purple-600 transition" />
                <FaShoppingCart className="text-black text-xl cursor-pointer hover:text-purple-600 transition" />
                <button className="px-4 py-2 border border-gray-300 rounded-full text-black hover:bg-gray-200 transition">
                    Sign in
                </button>
            </div>
        </header>
    );
};

export default CustomerHeader;
