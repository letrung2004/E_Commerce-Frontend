import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
    const [selectedProducts, setSelectedProducts] = useState({}); // Lưu sản phẩm đã chọn

    const shops = [
        {
            id: 1,
            name: "Adanola",
            avatar: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png",
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
            avatar: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png",
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

    // Xử lý chọn / bỏ chọn sản phẩm
    const toggleSelectProduct = (shopId, productId) => {
        setSelectedProducts((prevSelected) => ({
            ...prevSelected,
            [productId]: !prevSelected[productId] // Đảo trạng thái checkbox
        }));
    };

    // Tính tổng tiền dựa trên sản phẩm đã chọn
    const totalPrice = shops.reduce((sum, shop) => {
        return sum + shop.products.reduce((subtotal, product) => {
            if (selectedProducts[product.id]) {
                return subtotal + product.price * product.quantity;
            }
            return subtotal;
        }, 0);
    }, 0);

    return (
        <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
            {shops.map((shop) => (
                <div key={shop.id} className="bg-white shadow-md rounded-lg">
                    {/* Header Shop */}
                    <div className="p-4 flex items-center space-x-4 bg-purple-100">
                        <img src={shop.avatar} alt={shop.name} className="w-10 h-10 rounded-full object-cover" />
                        <h2 className="text-lg font-semibold">{shop.name}</h2>
                    </div>

                    {/* Danh sách sản phẩm của shop */}
                    {shop.products.map((product) => (
                        <div key={product.id} className="flex items-center space-x-4 p-4">
                            {/* Checkbox chọn sản phẩm */}
                            <input
                                type="checkbox"
                                checked={selectedProducts[product.id] || false}
                                onChange={() => toggleSelectProduct(shop.id, product.id)}
                                className="w-5 h-5 text-purple-600"
                            />

                            {/* Ảnh sản phẩm */}
                            <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />

                            {/* Thông tin sản phẩm */}
                            <div className="flex-grow">
                                <h3 className="text-base font-semibold">{product.name}</h3>
                                <p className="text-gray-500 text-sm">{product.variant}</p>
                                <p className="text-base font-bold">£{product.price}</p>
                            </div>

                            {/* Chỉnh số lượng */}
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center border rounded-lg">
                                    <button className="px-2 py-1 text-gray-600">-</button>
                                    <span className="px-3">{product.quantity}</span>
                                    <button className="px-2 py-1 text-gray-600">+</button>
                                </div>

                                {/* Nút xoá */}
                                <button className="text-black hover:text-red-500">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ))}

            {/* Checkout */}
            <div className="p-4 bg-white shadow-md rounded-lg">
                <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Total</span>
                    <span className="font-bold">£{totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">Taxes & shipping calculated at checkout</p>
                <button
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
                    disabled={totalPrice === 0} // Vô hiệu hoá nếu chưa chọn sản phẩm nào
                >
                    Continue to checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
