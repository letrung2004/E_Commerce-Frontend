import React from "react";
import { Link, useLocation } from "react-router-dom";

// const order = {
//     id: "1012OD",
//     date: "April 12, 2025",
//     status: "Delivered",
//     deliveryDate: "April 15, 2025",
//     paymentMethod: "Credit Card",
//     shippingAddress: {
//         name: "Nguyen Van A",
//         phone: "0901234567",
//         address: "123 Lê Lợi, Quận 1, TP.HCM",
//     },
//     items: [
//         {
//             id: 1,
//             name: "Men Slim Mid Rise Black Jeans",
//             price: 1099000,
//             quantity: 1,
//             image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png",
//         },
//         {
//             id: 2,
//             name: "Women Bodycon Yellow Dress",
//             price: 499000,
//             quantity: 2,
//             image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png",
//         },
//     ],
// };

const OrderDetail = () => {
    // const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const location = useLocation();
    const { order } = location.state || {}
    console.log("detail: ", order)
    return (
        <div className="w-full max-w-5xl mx-auto px-6 py-8 space-y-8">

            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-4">
                <Link to="/" className="hover:underline">Trang chủ</Link> &gt;
                <Link to="/me/my-orders" className="hover:underline">Đơn hàng</Link> &gt;
                <span className="ml-1"><strong>Chi tiết</strong></span>
            </div>
            {/* Order Info */}
            <div className="bg-white p-5 rounded shadow space-y-3">
                <h1 className="text-2xl font-bold">Mã đơn hàng: #{order.id}</h1>
                <div className="bg-white px-4 py-6 rounded shadow flex justify-between relative">
                    {/* Step 1 - Placed */}
                    <div className="flex flex-col items-center z-10 w-1/5">
                        <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">✓</div>
                        <p className="text-sm mt-2">Placed</p>
                    </div>

                    {/* Step 2 - Confirmed */}
                    <div className="flex flex-col items-center z-10 w-1/5">
                        <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">2</div>
                        <p className="text-sm mt-2 text-center">Order Confirmed</p>
                    </div>

                    {/* Step 3 - Shipped */}
                    <div className="flex flex-col items-center z-10 w-1/5">
                        <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center text-sm font-bold">3</div>
                        <p className="text-sm mt-2">Shipped</p>
                    </div>

                    {/* Step 4 - Out for Delivery */}
                    <div className="flex flex-col items-center z-10 w-1/5">
                        <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center text-sm font-bold">4</div>
                        <p className="text-sm mt-2 text-center">Out For Delivery</p>
                    </div>

                    {/* Step 5 - Delivered */}
                    <div className="flex flex-col items-center z-10 w-1/5">
                        <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center text-sm font-bold">5</div>
                        <p className="text-sm mt-2">Delivered</p>
                    </div>
                </div>
                <p><strong>Order Date:</strong> {order.dateCreated}</p>
                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            </div>

            {/* Shipping Info */}
            {/* <div className="bg-white p-5 rounded shadow">
                <h2 ><strong>Shipping Address</strong></h2>
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.phone}</p>
                <p>{order.shippingAddress.address}</p>
            </div> */}

            {/* Items List */}
            <div className="bg-white p-5 rounded shadow space-y-4">
                <h2 ><strong>Products</strong></h2>
                {order.orderDetails.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded" />
                            <div>
                                <p className="font-medium">{item.product.name}</p>
                                <p className="text-sm text-gray-500">x {item.quantity}</p>
                            </div>
                        </div>
                        <p className="font-semibold">{item.subTotal.toLocaleString()}₫</p>
                    </div>
                ))}
                <div className="flex justify-between border-t border-gray-200 pt-4">
                    <span className="text-gray-600">Tổng tiền hàng</span>
                    <span>{order.orderDetails.reduce((sum, item) => sum + item.subTotal, 0).toLocaleString()}₫</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span>{order.shippingFee?.toLocaleString() || '0'}₫</span>
                </div>
                {/* Giảm giá phí vận chuyển (nếu có) */}
                {order.shippingDiscount && order.shippingDiscount > 0 && (
                    <div className="flex justify-between">
                        <span className="text-gray-600">Giảm giá phí vận chuyển</span>
                        <span className="text-purple-500">-{order.shippingDiscount.toLocaleString()}₫</span>
                    </div>
                )}
                {/* Voucher từ hệ thống (nếu có) */}
                {order.voucherDiscount && order.voucherDiscount > 0 && (
                    <div className="flex justify-between">
                        <span className="text-gray-600">Voucher từ hệ thống</span>
                        <span className="text-purple-500">-{order.voucherDiscount.toLocaleString()}₫</span>
                    </div>
                )}
                <div className="flex justify-between border-t border-gray-200 pt-4">
                    <span className="text-lg font-bold">Thành tiền</span>
                    <span className="text-lg text-purple-600 font-bold">{order.total.toLocaleString()}₫</span>
                </div>

            </div>

            {/* Back Link */}
            <div className="text-center">
                <Link to="/me/my-orders" className="text-blue-600 hover:underline">
                    Quay lại
                </Link>
            </div>
        </div>
    );
};

export default OrderDetail;
