import React, { useState } from 'react';
import { authAPIs, endpoints } from '../../configs/APIs';
import Process from './Process';

const ModalCancelOrder = ({ isOpen, onClose, order, reloadOrders  }) => {
    if (!isOpen) return null;

    const [loading, setLoading] = useState(false);
    console.log("Order selected: ", order)

    const handleUpdate = async () => {
        const data = {
            "id": order.id,
            "status": "Hủy đơn" 
        }

        try {
            setLoading(true)
            const response = await authAPIs().patch(endpoints.updateOrderStatus, data)
            if (response.status === 204) {
                console.log("Cập nhật trạng thái thành công 204");
                reloadOrders()
            } else {
                console.log("Cập nhật trạng thái không thành công");
            }
        } catch (error) {
            console.log("ERR: ", error);
            
        } finally {
            setLoading(false)   
        }
        console.log("Cập nhật trạng thái thành:", data);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            {loading && <Process/>}
            <div className="bg-white w-[600px] rounded shadow-lg p-6 max-h-[90vh] overflow-y-auto relative">
                <h2 className="text-lg font-semibold mb-4">Hủy đơn hàng</h2>

                {/* Thông tin đơn hàng */}
                <div className="mb-4 text-sm text-gray-700">
                    <div className="mb-2 flex flex-col gap-2">
                        <span className="font-medium">Mã đơn hàng: #{order.id}</span>
                        <div className='flex gap-2'>
                            <span className="font-medium">Trạng thái hiện tại:</span>
                            <span className="text-purple-600 font-medium">{order.deliveryStatus}</span>
                        </div>

                    </div>

                    {order.orderDetails?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 mb-4 p-2 border border-gray-100">
                            <img
                                src={item.product.image || '/placeholder.png'}
                                alt={item.product.name}
                                className="w-16 h-16 object-cover rounded"
                            />
                            <div className='flex justify-between px-2 w-full'>
                                <div className="flex flex-col text-sm">
                                    <span className="font-medium">{item.product.name}</span>
                                    <span>Số lượng: {item.quantity}</span>
                                </div>
                                <span className='text-purple-600 font-medium'>Thành tiền: {item.subTotal.toLocaleString()}₫</span>
                            </div>
                        </div>
                    ))}
                </div>



                


                {/* Hành động */}
                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose} className="px-6 py-2 text-sm text-gray-600 hover:bg-gray-300 rounded">Hủy</button>
                    <button
                        onClick={handleUpdate}
                        className="bg-purple-600 text-white px-6 py-2 rounded text-sm hover:bg-purple-700"
                    >
                        Xác nhận hủy đơn
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalCancelOrder;
