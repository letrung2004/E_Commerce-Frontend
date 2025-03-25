import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const CustomerFooter = () => {
    return (
        <footer className="bg-gray-100 text-black py-8">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

                <div>
                    <h2 className="text-3xl font-bold text-purple-600">E-Commerce</h2>
                    <p className="mt-2 text-gray-600">
                        The best place to shop for quality products at affordable prices.
                    </p>
                </div>


                <div>
                    <h3 className="font-semibold mb-2">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="/" className="text-gray-600 hover:text-purple-600">Home</a></li>
                        <li><a href="/products" className="text-gray-600 hover:text-purple-600">Products</a></li>
                    </ul>
                </div>


                <div>
                    <h3 className="font-semibold mb-2">Follow Us</h3>
                    <div className="flex space-x-4">
                        <FaFacebook className="text-2xl text-gray-600 hover:text-blue-600 cursor-pointer" />
                        <FaInstagram className="text-2xl text-gray-600 hover:text-pink-600 cursor-pointer" />
                        <FaTwitter className="text-2xl text-gray-600 hover:text-blue-400 cursor-pointer" />
                    </div>
                </div>
            </div>


            <div className="text-center text-gray-500 mt-8 border-t pt-4">
                © 2025 Shop Online. All rights reserved.
            </div>
        </footer>
    );
};

export default CustomerFooter;