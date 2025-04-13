import React, { useState } from "react";
import OrderCart from "../../components/customer/OrderCard";
import { Link } from "react-router-dom";

const orderStatus = [
    { label: "On The Way", value: "on_the_way" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Returned", value: "returned" },
    { label: "Refunded", value: "refunded" },
];

const ordersData = [
    {
        id: 1,
        name: "Men Slim Mid Rise Black Jeans",
        price: 1099,
        size: "M",
        image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png",
        status: "delivered",
        deliveryDate: "Mar 03"
    },
    {
        id: 1,
        name: "Men Slim Mid Rise Black Jeans",
        price: 1099,
        size: "M",
        image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png",
        status: "delivered",
        deliveryDate: "Mar 03"
    },
    {
        id: 1,
        name: "Men Slim Mid Rise Black Jeans",
        price: 1099,
        size: "M",
        image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png",
        status: "delivered",
        deliveryDate: "Mar 03"
    },
    {
        id: 1,
        name: "Men Slim Mid Rise Black Jeans",
        price: 1099,
        size: "M",
        image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png",
        status: "delivered",
        deliveryDate: "Mar 03"
    }
];

const CustomerOrder = () => {
    const [selectedStatuses, setSelectedStatuses] = useState([]);

    const handleStatusChange = (value) => {
        setSelectedStatuses((prev) =>
            prev.includes(value)
                ? prev.filter((s) => s !== value)
                : [...prev, value]
        );
    };

    const filteredOrders = selectedStatuses.length
        ? ordersData.filter((order) =>
            selectedStatuses.includes(order.status.toLowerCase().replace(" ", "_"))
        )
        : ordersData;

    return (
        <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-4">
                <Link to="/" className="hover:underline">Home</Link> &gt;
                <span className="ml-1"><strong>Orders List</strong></span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sidebar filter */}
                <div className="bg-white p-5 rounded shadow sticky top-5 h-fit">
                    <h2 className="font-bold text-lg mb-4">Filters</h2>
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm">ORDER STATUS</h3>
                        {orderStatus.map((status) => (
                            <div key={status.value} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={status.value}
                                    checked={selectedStatuses.includes(status.value)}
                                    onChange={() => handleStatusChange(status.value)}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                />
                                <label htmlFor={status.value} className="ml-2 text-sm text-gray-700">
                                    {status.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Orders list */}
                <div className="md:col-span-3 space-y-4">
                    {filteredOrders.map((order, index) => (
                        <OrderCart key={index} order={order} />
                    ))}
                    {filteredOrders.length === 0 && (
                        <p className="text-center text-gray-500">No orders found with selected filters.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerOrder;
