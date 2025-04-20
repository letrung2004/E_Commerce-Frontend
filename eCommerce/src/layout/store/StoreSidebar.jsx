import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBox, FaChartBar, FaEnvelope, FaShoppingCart } from "react-icons/fa";

const StoreSidebar = () => {
    const [openSections, setOpenSections] = useState({
        orders: true,
        products: true,
        finance: true,
    });

    const toggleSection = (section) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <aside className="w-60 p-6 bg-white shadow-md rounded-lg flex flex-col h-screen">
            <nav className="space-y-4 flex-grow">
                {/* Quản lý đơn hàng */}
                <div>
                    <button onClick={() => toggleSection("orders")} className="flex items-center w-full text-left text-black hover:text-purple-600">
                        <FaShoppingCart /> <span className="ml-2">Quản lý đơn hàng</span>
                    </button>
                    {openSections.orders && (
                        <div className="ml-6 mt-2 space-y-2">
                            <Link to="/seller/orders" className="block text-gray-700 hover:text-purple-600">Tất cả</Link>
                            <Link to="/seller/orders" className="block text-gray-700 hover:text-purple-600">Đơn hàng</Link>
                            <Link to="/seller/shipping" className="block text-gray-700 hover:text-purple-600">Giao hàng</Link>
                        </div>
                    )}
                </div>

                {/* Quản lý sản phẩm */}
                <div>
                    <button onClick={() => toggleSection("products")} className="flex items-center w-full text-left text-black hover:text-purple-600">
                        <FaBox /> <span className="ml-2">Quản lý sản phẩm</span>
                    </button>
                    {openSections.products && (
                        <div className="ml-6 mt-2 space-y-2">
                            <Link to="/seller/products" className="block text-gray-700 hover:text-purple-600">Sản phẩm</Link>
                            <Link to="/seller/products/add" className="block text-gray-700 hover:text-purple-600">Thêm sản phẩm</Link>
                            <Link to="/seller/categories" className="block text-gray-700 hover:text-purple-600">Danh mục</Link>
                            {/* <Link to="/seller/categories/add" className="block text-gray-700 hover:text-purple-600">Thêm danh mục</Link> */}
                        </div>
                    )}
                </div>

                {/* Tài chính */}
                <div>
                    <button onClick={() => toggleSection("finance")} className="flex items-center w-full text-left text-black hover:text-purple-600">
                        <FaChartBar /> <span className="ml-2">Tài chính</span>
                    </button>
                    {openSections.finance && (
                        <div className="ml-6 mt-2 space-y-2">
                            <Link to="/seller/revenue" className="block text-gray-700 hover:text-purple-600">Doanh thu</Link>
                        </div>
                    )}
                </div>

                {/* Tin nhắn */}
                <Link to="/seller/messages" className="flex items-center space-x-2 text-black hover:text-purple-600">
                    <FaEnvelope /> <span>Tin nhắn</span>
                </Link>
            </nav>

            {/* Phần bản quyền - Luôn ở dưới cùng */}
            <div className="text-center text-gray-500 text-sm pt-4 mb-15">
                © {new Date().getFullYear()} Store Management.
                <br /> All Rights Reserved.
            </div>
        </aside>
    );
};

export default StoreSidebar;
