import React from "react";
import { Trash2 } from "lucide-react";

const Cart = () => {
    const shops = [
        {
            id: 1,
            name: "Adanola",
            avatar: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png", // Avatar shop
            products: [
                {
                    id: 101,
                    name: "Ultimate Leggings - Midnight Blue",
                    variant: "XXS / Regular",
                    price: 39.99,
                    image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png",
                    quantity: 1
                },
                {
                    id: 102,
                    name: "Sport Bra - Black",
                    variant: "M / Regular",
                    price: 29.99,
                    image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png",
                    quantity: 2
                }
            ]
        },
        {
            id: 2,
            name: "Nike Store",
            avatar: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png", // Avatar shop
            products: [
                {
                    id: 201,
                    name: "Air Zoom Pegasus 39",
                    variant: "Size 42",
                    price: 119.99,
                    image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png",
                    quantity: 1
                }
            ]
        }
    ];

    return (
        <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
            {shops.map((shop) => (
                <div key={shop.id} className="bg-white shadow-md rounded-lg">
                    {/* Header Shop */}
                    <div className="p-4 border-b flex items-center space-x-3">
                        <img src={shop.avatar} alt={shop.name} className="w-10 h-10 rounded-full object-cover" />
                        <h2 className="text-lg font-semibold">{shop.name}</h2>
                    </div>

                    {/* Danh sách sản phẩm của shop */}
                    {shop.products.map((product) => (
                        <div key={product.id} className="flex items-center space-x-4 p-4 border-b">
                            <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
                            <div className="flex-grow">
                                <h3 className="text-base font-semibold">{product.name}</h3>
                                <p className="text-gray-500 text-sm">{product.variant}</p>
                                <p className="text-base font-bold">£{product.price}</p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <div className="flex items-center border rounded-lg">
                                    <button className="px-2 py-1 text-gray-600">-</button>
                                    <span className="px-3">{product.quantity}</span>
                                    <button className="px-2 py-1 text-gray-600">+</button>
                                </div>

                                <button className="text-gray-500 hover:text-red-500">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Tổng tiền của Shop */}
                    <div className="p-4 flex justify-between items-center">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-bold">£0.00</span>
                    </div>
                </div>
            ))}

            {/* Checkout */}
            <div className="p-4 bg-white shadow-md rounded-lg">
                <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Total</span>
                    <span className="font-bold">£0.00</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">Taxes & shipping calculated at checkout</p>
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors">
                    Continue to checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
