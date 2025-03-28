import React from "react";
import { FaDollarSign, FaShoppingCart, FaBox, FaStar, FaClipboardList, FaTruck, FaCheckCircle, FaUndo, FaChartLine, FaEnvelope } from "react-icons/fa";

const Home = () => {
    return (
        <div className="p-6">
            {/* Thống kê tổng quan */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="p-4 bg-white shadow-md rounded-lg flex items-center space-x-4">
                    <FaDollarSign className="text-green-500 text-3xl" />
                    <div>
                        <p className="text-gray-600">Tổng Doanh Thu</p>
                        <h2 className="text-xl font-semibold">$15,230</h2>
                    </div>
                </div>

                <div className="p-4 bg-white shadow-md rounded-lg flex items-center space-x-4">
                    <FaShoppingCart className="text-blue-500 text-3xl" />
                    <div>
                        <p className="text-gray-600">Tổng Đơn Hàng</p>
                        <h2 className="text-xl font-semibold">320</h2>
                    </div>
                </div>

                <div className="p-4 bg-white shadow-md rounded-lg flex items-center space-x-4">
                    <FaBox className="text-purple-500 text-3xl" />
                    <div>
                        <p className="text-gray-600">Sản Phẩm Đang Bán</p>
                        <h2 className="text-xl font-semibold">85</h2>
                    </div>
                </div>

                <div className="p-4 bg-white shadow-md rounded-lg flex items-center space-x-4">
                    <FaStar className="text-yellow-500 text-3xl" />
                    <div>
                        <p className="text-gray-600">Đánh Giá Trung Bình</p>
                        <h2 className="text-xl font-semibold">4.7/5</h2>
                    </div>
                </div>
            </div>


            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">Danh sách cần làm</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg flex flex-col items-center">
                        <FaClipboardList className="text-gray-500 text-2xl" />
                        <p className="text-gray-600 mt-2">Chờ Lấy Hàng</p>
                        <h2 className="text-lg font-semibold">0</h2>
                    </div>

                    <div className="p-3 bg-gray-100 rounded-lg flex flex-col items-center">
                        <FaTruck className="text-blue-500 text-2xl" />
                        <p className="text-gray-600 mt-2">Đang Giao</p>
                        <h2 className="text-lg font-semibold">0</h2>
                    </div>

                    <div className="p-3 bg-gray-100 rounded-lg flex flex-col items-center">
                        <FaCheckCircle className="text-green-500 text-2xl" />
                        <p className="text-gray-600 mt-2">Đã Xử Lý</p>
                        <h2 className="text-lg font-semibold">0</h2>
                    </div>

                    <div className="p-3 bg-gray-100 rounded-lg flex flex-col items-center">
                        <FaUndo className="text-red-500 text-2xl" />
                        <p className="text-gray-600 mt-2">Trả hàng/Hoàn tiền/Huỷ</p>
                        <h2 className="text-lg font-semibold">0</h2>
                    </div>
                </div>
            </div>

            {/* Phân Tích Bán Hàng */}
            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">Phân Tích Bán Hàng</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-100 rounded-lg flex items-center space-x-4">
                        <FaChartLine className="text-blue-500 text-3xl" />
                        <div>
                            <p className="text-gray-600">Doanh Số</p>
                            <h2 className="text-lg font-semibold">₫0</h2>
                        </div>
                    </div>

                    <div className="p-4 bg-gray-100 rounded-lg flex items-center space-x-4">
                        <FaShoppingCart className="text-green-500 text-3xl" />
                        <div>
                            <p className="text-gray-600">Đơn Hàng</p>
                            <h2 className="text-lg font-semibold">0</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">Thông Báo</h2>
                <div className="space-y-3">
                    <div className="flex items-center space-x-4 p-3 bg-gray-100 rounded-lg">
                        <FaEnvelope className="text-blue-500 text-2xl" />
                        <div>
                            <p className="text-gray-600">Bạn có <span className="font-semibold">2</span> tin nhắn mới</p>
                            <span className="text-sm text-gray-500">1 phút trước</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 p-3 bg-gray-100 rounded-lg">
                        <FaStar className="text-yellow-500 text-2xl" />
                        <div>
                            <p className="text-gray-600">Bạn có <span className="font-semibold">1</span> đánh giá mới</p>
                            <span className="text-sm text-gray-500">5 phút trước</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
