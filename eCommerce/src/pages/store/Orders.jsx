import { useCallback, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useOrders from '../../components/customer/hook/useOrders';
import Process from '../../components/store/Process';
import ModalUpdateOrder from '../../components/store/ModalUpdateOrder';
import ModalCancelOrder from '../../components/store/ModalCancelOrder';

const Orders = () => {
    const location = useLocation();
    const tabs = [
        'Tất cả',
        'Chờ xác nhận',
        'Chờ lấy hàng',
        'Đang giao',
        'Đã giao',
        'Hủy đơn',
        'Trả hàng/Hoàn tiền'
    ];
    const tabAssign = location.state?.tabAssign || 'Tất cả';
    const [activeTab, setActiveTab] = useState(tabAssign);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalCancelOpen, setIsModalCancelOpen] = useState(false)
    const { orders, loading, error, loadOrders, setPage, page, hasMore } = useOrders(activeTab)
    const [selectedOrder, setSelectedOrder] = useState(false)

    const observer = useRef();
    const lastOrderRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, hasMore]);


    return (
        <div className="p-6  bg-white rounded-md shadow-sm">
            <ModalUpdateOrder isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                order={selectedOrder}
                reloadOrders={loadOrders}
            />
            <ModalCancelOrder isOpen={isModalCancelOpen}
                onClose={() => setIsModalCancelOpen(false)}
                order={selectedOrder}
                reloadOrders={loadOrders}
            />


            {/* Tabs */}
            <div className="flex space-x-4 border-b-2 border-gray-200 ">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={` px-4 py-3 font-semibold transition
                             ${activeTab === tab ? 'border-b-3 border-purple-600 text-purple-600' : 'text-gray-600 hover:text-purple-700'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Filters */}
            <div className="mt-4 flex flex-wrap items-center gap-4">

                <input
                    type="text"
                    placeholder="Mã đơn hàng"
                    className="border border-gray-300 rounded px-3 py-2 text-sm w-48"
                />
                <select className="border border-gray-300 rounded px-3 py-2 text-sm">
                    <option>Tất cả ĐVVC</option>
                </select>

                <button className="bg-purple-500 text-white px-4 py-2 rounded text-sm">Áp dụng</button>
                <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-300 rounded bg-gray-200">Đặt lại</button>
            </div>

            {/* Sort and bulk action */}
            <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-500">
                    Sắp xếp theo: <span className="font-medium text-black">Hạn gửi hàng (Xa - Gần nhất)</span>
                </div>
                <button className="bg-purple-500 text-white px-4 py-2 rounded text-sm">Giao Hàng Loạt</button>
            </div>

            {/* Table header */}
            <div className="mt-6">
                <div className="font-semibold mb-2 text-lg">{orders.length} Đơn hàng</div>
                <div className="grid grid-cols-7 bg-gray-100 text-gray-600 text-sm font-medium px-4 py-3 rounded">
                    <div className="col-span-2">Sản phẩm</div>
                    <div className='flex justify-center'>Tổng Đơn hàng</div>
                    <div className='flex justify-center'>Trạng thái</div>
                    <div className='flex justify-center'>Thời gian đặt hàng</div>
                    <div className='flex justify-center'>Đơn vị vận chuyển</div>
                    <div className='flex justify-center'>Thao tác</div>

                </div>
            </div>

            {error &&
                <div className="text-center py-8 text-red-500">
                    <p className="font-medium">{error}</p>
                </div>
            }
            {/* orders */}
            {orders.length > 0 ? (
                orders.map((order, index) => {
                    const isLast = index === orders.length - 1;
                    return (
                        <div key={index}
                            ref={isLast ? lastOrderRef : null}
                            className="grid grid-cols-7 text-sm px-4 py-4 mt-2 bg-gray-50 shadow items-center gap-2">


                            <div className='flex flex-col col-span-2 border-r border-gray-200  gap-y-3'>
                                {order.orderDetails.map((item, idx) => (
                                    <div className="flex items-start space-x-3 p-1">
                                        <img
                                            src={item.product.image} alt={item.product.name}
                                            className="w-13 h-13 rounded border border-gray-200"
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-800">{item.product.name}</span>
                                            <span className="text-gray-500 text-xs">× {item.quantity}</span>
                                            <span className="text-gray-400 text-xs truncate">ID: {item.id}</span>
                                        </div>
                                    </div>


                                ))}
                            </div>
                            {/* Giá và phương thức thanh toán */}
                            <div className=' border-r border-gray-200 h-full flex flex-col items-center justify-center'>
                                <div className="font-medium text-gray-800">₫{order.total.toLocaleString()}</div>
                                <div className="text-xs pt-2 text-gray-400">{order.paymentMethod}</div>
                            </div>

                            {/* Trạng thái */}
                            <div className={`h-full  border-r font-medium border-gray-200 flex items-center justify-center
                            ${order.deliveryStatus === "Đã giao" ? 'text-green-600' : 'text-red-600'}`}
                            >{order.deliveryStatus}
                            </div>

                            {/* Đơn vị vận chuyển */}
                            <div className="h-full text-gray-700 border-r border-gray-200 flex items-center justify-center">{order.dateCreated}</div>

                            {/* Ngày đặt */}
                            <div className="h-full text-gray-700 border-r border-gray-200 flex items-center justify-center">VNPost</div>



                            {/* Thao tác */}
                            <div className='flex flex-col h-full gap-3 justify-center '>

                                <button
                                    className={`text-sm cursor-pointer ${order.deliveryStatus === "Đã giao"
                                        ? "text-gray-400 cursor-not-allowed"
                                        : "text-blue-600 hover:underline"
                                        }`}
                                    disabled={order.deliveryStatus === "Đã giao"}
                                    onClick={() => {
                                        if (order.deliveryStatus !== "Đã giao") {
                                            setIsModalOpen(true);
                                            setSelectedOrder(order);
                                        }
                                    }}
                                >
                                    Cập nhật
                                </button>

                                {order.deliveryStatus !== "Hủy đơn" && order.deliveryStatus !== "Đã giao" &&

                                    <button className="text-blue-600 hover:underline text-sm cursor-pointer"
                                        onClick={() => { setIsModalCancelOpen(true); setSelectedOrder(order) }}
                                    >Hủy đơn</button>
                                }
                            </div>
                        </div>
                    );
                })

            ) : (
                <>
                    {!loading && error == null && (
                        <div className="text-center py-8 text-gray-500">
                            <p className="font-medium">Không có đơn hàng nào</p>
                        </div>
                    )}

                </>
            )}
            {loading && (
                <div className="text-center py-4 text-gray-500">Đang tải thêm đơn hàng...</div>
            )}


        </div>
    );
};

export default Orders;
