import React, { useState } from "react";
import { FaSearch, FaCheck, FaTruck, FaTimes } from "react-icons/fa";

const Orders = () => {
    const [orders, setOrders] = useState([
        { id: 1001, customer: "Nguyễn Văn A", status: "Chờ xác nhận", total: "500.000đ", address: "HCM", products: ["Bánh mì", "Cà phê"] },
        { id: 1002, customer: "Trần Thị B", status: "Đang giao", total: "250.000đ", address: "Hà Nội", products: ["Trà sữa"] },
        { id: 1003, customer: "Lê Văn C", status: "Hoàn thành", total: "1.200.000đ", address: "Đà Nẵng", products: ["Bánh kem"] },
    ]);

    const updateStatus = (id, newStatus) => {
        setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold"> --Cần thiết kế lại giao diện này--</h1>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold"> Quản lý đơn hàng</h1>

                <div className="relative">
                    <input type="text" placeholder="Tìm kiếm đơn hàng..." className="p-2 pl-8 border rounded-lg" />
                    <FaSearch className="absolute left-2 top-3 text-gray-500" />
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-200 text-gray-700">
                            <th className="p-3 text-left rounded-tl-lg">Khách hàng</th>
                            <th className="p-3 text-left">Sản phẩm</th>
                            <th className="p-3 text-left">Tổng tiền</th>
                            <th className="p-3 text-left">Trạng thái</th>
                            <th className="p-3 text-center rounded-tr-lg">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="even:bg-gray-100 hover:bg-gray-200 transition">
                                <td className="p-3">{order.customer}</td>
                                <td className="p-3">{order.products.join(", ")}</td>
                                <td className="p-3">{order.total}</td>
                                <td className="p-3 font-semibold text-blue-600">{order.status}</td>
                                <td className="p-5 flex justify-center items-center space-x-4">
                                    <button>chua thiet ke</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
