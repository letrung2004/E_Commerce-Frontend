import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";

const CustomerHeader = () => {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 shadow-md bg-white">

            <div className="text-3xl cursor-pointer font-bold text-purple-600">E-Commerce</div>

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

                <Link to="/login" className="px-4 py-2 border border-gray-300 rounded-full text-black hover:bg-gray-200 transition">
                    Sign in
                </Link>
            </div>

        </header>
    );
};

export default CustomerHeader;
