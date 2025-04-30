import React, { useState } from 'react'
import useOrders from '../../components/customer/hook/useOrders';
import ReviewModal from '../../components/customer/modal/ReviewModal';

const Orders = () => {
    const tabs = ['Tất cả', 'Chờ xác nhận', 'Chờ lấy hàng', 'Chờ giao hàng', 'Hoàn thành', 'Đã hủy', 'Trả hàng/Hoàn tiền']
    const [activeTab, setActiveTab] = useState('Tất cả')
    const { orders, loading, error } = useOrders(activeTab)
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="bg-transparent w-full m-3 p-4">
            <div className="flex bg-white shadow py-1 mb-3">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(tab)}
                        className={` px-4 py-2 font-semibold transition ${activeTab === tab
                            ? 'border-b-2 border-purple-600 text-purple-600'
                            : 'text-gray-600 hover:text-purple-700'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Đơn hàng */}
            <div>
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div className='mb-4 bg-transparent shadow'>
                            {/* Tên shop */}
                            <div className='pb-5 pt-3 px-5 bg-white border-b border-gray-300 border-dotted '>
                                <div className="flex items-center justify-between border-b border-gray-200 py-2 mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-purple-600 text-white text-xs px-1 rounded">Mall</span>
                                        <span className="font-semibold">{order.store.name}</span>
                                        <button className="text-purple-600 border border-purple-600 text-xs px-2 py-1 rounded hover:bg-orange-50">Chat</button>
                                        <button className="cursor-pointer text-gray-600 border text-xs px-2 py-1 rounded hover:bg-gray-100">Xem Shop</button>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-green-500">Giao hàng thành công</span>
                                        <span className="text-purple-800">| HOÀN THÀNH</span>
                                    </div>
                                </div>

                                {/* Sản phẩm */}
                                {/* Sản phẩm trong đơn hàng */}
                                {order.orderDetails.map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="w-20 h-20 bg-gray-100 flex items-center justify-center text-gray-400">
                                            {/* Ảnh sản phẩm */}
                                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover rounded" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold">{item.product.name}</div>
                                            <div className="text-sm text-gray-500">Phân loại hàng: {item.product.categoryId}</div>
                                            <div className="text-sm">x{item.quantity}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-purple-800 font-bold">₫{item.subTotal.toLocaleString()}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='bg-purple-50 pt-3 pb-6 px-5'>
                                {/* Tổng tiền */}
                                <div className="flex justify-end mb-4">
                                    <div className="text-right">
                                        <div className="text-sm">Thành tiền:</div>
                                        <div className="text-2xl text-purple-800 font-bold">₫{order.total.toLocaleString()}</div>
                                    </div>
                                </div>

                                {/* Các nút hành động */}
                                <div className="flex justify-end gap-2">
                                    <button className="cursor-pointer border  bg-purple-600 text-white px-7 py-2 rounded hover:bg-purple-700"
                                        onClick={() => setIsModalOpen(true)}
                                    >Đánh Giá</button>
                                    <button className="cursor-pointer border bg-white border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100">Liên Hệ Người Bán</button>
                                    <button className="cursor-pointer border bg-white border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100">Mua Lại</button>
                                </div>
                                <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Không có đơn hàng nào.</p>
                )}

            </div>

        </div>
    )
}

export default Orders