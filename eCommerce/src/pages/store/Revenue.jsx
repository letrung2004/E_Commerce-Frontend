import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Revenue = () => {
    const [search, setSearch] = useState("");

    const orders = [
        { id: 1, shipStatus: "Đang giao", status: "Chưa thanh toán", date: "2025-03-25", paymentMethod: "Chuyển khoản", amount: 50000 },
        { id: 2, shipStatus: "Đã giao", status: "Đã thanh toán", date: "2025-03-26", paymentMethod: "MOMO", amount: 150000 },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Tổng Quan</h1>

            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white shadow-md p-4 rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-600">Chưa thanh toán</h2>
                    <p className="text-2xl font-bold text-red-500">₫0</p>
                </div>

                <div className="bg-white shadow-md p-4 rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-600">Đã thanh toán - Tháng này</h2>
                    <p className="text-2xl font-bold text-green-500">₫0</p>
                </div>
            </div>

            <h2 className="text-2xl font-semibold mt-8">Chi Tiết</h2>
            <div className="relative mt-4 mb-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm đơn hàng..."
                    className="p-2 pl-8 border rounded-lg w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <FaSearch className="absolute left-2 top-3 text-gray-500" />
            </div>

            <div className="bg-white shadow-md rounded-lg p-4">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="p-3 text-left">Đơn hàng</th>
                            <th className="p-3 text-left">Ngày thanh toán dự kiến</th>
                            <th className="p-3 text-left">Trạng thái thanh toán</th>
                            <th className="p-3 text-left">Trạng thái đơn hàng</th>
                            <th className="p-3 text-left">Phương thức thanh toán</th>
                            <th className="p-3 text-left">Số tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-t hover:bg-gray-100">
                                <td className="p-3">#{order.id}</td>
                                <td className="p-3">{order.date}</td>

                                <td className="p-3 font-semibold" style={{ color: order.status === "Chưa thanh toán" ? "red" : "green" }}>
                                    {order.status}
                                </td>
                                <td className="p-3">{order.shipStatus}</td>
                                <td className="p-3">{order.paymentMethod}</td>
                                <td className="p-3 font-bold">₫{order.amount.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Revenue;