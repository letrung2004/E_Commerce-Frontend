import React from "react";

const OrderCart = ({ order }) => {
    return (
        <div className="bg-white p-4 rounded shadow flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="flex items-center gap-4">
                <img
                    src={order.image}
                    alt={order.name}
                    className="w-20 h-20 object-cover rounded"
                />
                <div>
                    <h2 className="font-semibold text-md">{order.name}</h2>
                    <p className="text-sm text-gray-500">Size: {order.size}</p>
                </div>
            </div>
            <div className="text-right mt-4 sm:mt-0">
                <p className="text-lg font-bold">₹{order.price}</p>
                <p className="text-green-600 text-sm mt-1">Expected: {order.deliveryDate}</p>
                <p className="text-xs text-gray-500 capitalize">{order.status}</p>
                {/* <Link to={`/orders/${order.id}`} className="text-sm text-blue-600 underline mt-1 block">
                View details
            </Link> */}
            </div>
        </div>
    );
};

export default OrderCart;
