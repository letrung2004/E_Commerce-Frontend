import React, { useContext, useState } from 'react';
import { FaCommentDots, FaMapMarkerAlt } from 'react-icons/fa';
import { AddressContext, AddressDispatchContext } from '../../context/AppContext';
import useAddress from '../../components/customer/hook/useAddress';
import Process from '../../components/store/Process';
import vnPayIcon from '../../assets/Icon-VNPAY-QR.webp'
import { authAPIs, endpoints } from '../../configs/APIs';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const PlaceOrder = () => {
    const location = useLocation()
    const { checkoutData } = location.state || {};

    const navigate = useNavigate();

    const { loadCart } = useCart();
    const { addresses, loading, setLoading, error } = useAddress(1)
    const address = useContext(AddressContext)
    const setCurrentAddress = useContext(AddressDispatchContext)

    const [activeMethod, setActiveMethod] = useState('Ví điện tử')
    const [paymentMethod, setPaymentMethod] = useState("COD")

    const paymentOptions = ['Ví điện tử', 'Thẻ tín dụng/Ghi nợ', 'Google Pay', 'Thẻ nội địa Napas', 'Thanh toán khi nhận hàng']


    console.log("data from cart: ", checkoutData)

    const handlePlaceOrder = async () => {
        const data = {
            addressId: addresses[0].id,
            total: checkoutData.subOrderItems.reduce((sum, o) => sum + o.total, 0),
            subOrderItems: checkoutData.subOrderItems.map(item => ({
                storeId: item.storeId,
                shippingCost: item.shippingCost,
                subCartItemIds: item.subCartItem.map(i => i.id)
            })),
            paymentMethod: paymentMethod
        };

        console.log("data: ", data);

        try {
            setLoading(true)
            const response = await authAPIs().post(endpoints.placeOrder, data);
            console.log("Status: ", response.status)



            if (response.data.paymentUrl) {
                window.location.href = response.data.paymentUrl; // Redirect sang VNPay
            } else if (response.status === 201) {
                console.log("Đặt hàng COD thành công", response.data);

                loadCart()

                navigate("/me/my-orders", { state: { tabAssign: "Chờ xác nhận" } })

            } else {
                throw new Error("Failed to load addresses");
            }



        } catch (err) {
            // setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const EWallet = () => {
        return (
            <div className="space-y-3 p-4 ">
                <label className="flex items-center gap-3 w-[10%] ">
                    <input type="radio" name="vnPay" className="accent-purple-500"
                        checked={paymentMethod === 'VNPay'}
                        onChange={() => setPaymentMethod('VNPay')}
                    />
                    <img src={vnPayIcon} alt="VNPay" className="w-10 h-7" />
                    <div>
                        <p className="text-sm font-medium">VNPay</p>
                    </div>
                </label>

            </div>
        )
    }

    return (
        <div className='w-full bg-gray-100'>

            {loading && <Process />}

            <div className="w-[70%] mx-auto p-6 space-y-4 bg-transparent">
                <div className='bg-purple-500 text-white font-bold text-lg px-5'>
                    <h3>Thanh toán</h3>
                </div>
                {/* Địa chỉ nhận hàng */}
                {addresses[0] &&
                    <div className="bg-white p-4 rounded shadow ">
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="flex items-center text-purple-500 font-semibold mb-1">
                            <FaMapMarkerAlt className="mr-2" />
                            Địa Chỉ Nhận Hàng
                        </div>
                        <div className="mt-1 text-gray-800 flex gap-8">
                            <p className="font-medium">
                                {addresses[0].receiver} | (+84) {addresses[0].phoneNumber}
                            </p>
                            <p className="text-gray-700">
                                {addresses[0].address}
                                <span className="ml-2 text-blue-500 cursor-pointer">Thay Đổi</span>
                            </p>
                        </div>
                    </div>
                }

                {/* Sản phẩm */}
                <div className="bg-transparent rounded ">
                    <div className='flex p-5 bg-white'>
                        <div className='w-[50%]'>
                            <h3 className="font-semibold text-lg">Sản phẩm</h3>
                        </div>
                        <div className='w-[50%] flex text-gray-500'>
                            <div className="flex-1 text-end">Đơn giá</div>
                            <div className="flex-1 text-end">Số lượng</div>
                            <div className="flex-1 text-end">Thành tiền</div>
                        </div>
                    </div>
                    {checkoutData.subOrderItems.map((subOrder, index) =>
                        <div key={index} className='mb-3 bg-amber-300 shadow'>
                            <div className="pt-3 px-5 flex items-center gap-2 bg-white">
                                <span className="bg-purple-600 text-white text-xs px-1 rounded">Mall</span>
                                <span className="font-semibold">{subOrder.storeName}</span>
                                <span className="text-gray-500"> | </span>
                                <div className='flex mx-2 text-purple-600 items-center px-2 hover:bg-purple-50 rounded'>
                                    <FaCommentDots size={16} />
                                    <button className="text-purple-600 cursor-pointer text-sm px-1 rounded ">
                                        Chat ngay</button>
                                </div>
                            </div>

                            {checkoutData.subOrderItems[index].subCartItem.map((item, idx) =>


                                <div key={idx} className="flex gap-4 items-center p-5 bg-white">

                                    <div className='w-[50%] gap-3 flex items-center'>
                                        <img
                                            src={item.productAvatar}
                                            alt="product"
                                            className="w-15 h-15 rounded bg-gray-100 object-cover"
                                        />
                                        <div className="flex-1 space-y-1">
                                            <p className="font-medium text-gray-800">
                                                {item.productName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='w-[50%] flex font-medium text-gray-800'>
                                        <div className="flex-1 text-end"><p className="text-sm ">₫{item.unitPrice.toLocaleString()}</p></div>
                                        <div className="flex-1 text-end"><p className="text-sm ">{item.quantity}</p></div>
                                        <div className="flex-1 text-end">₫{(item.unitPrice * item.quantity).toLocaleString()}</div>
                                    </div>
                                </div>

                            )}


                            {/* Voucher + Shipping */}
                            <div className="p-5 border-t border-gray-300 border-dotted bg-gray-100">
                                <div className="flex justify-between ">
                                    <span>Phương thức vận chuyển: <strong className="text-gray-700">Nhanh</strong></span>
                                    <span className="text-gray-800">₫{subOrder.shippingCost.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Tổng phụ */}
                            <div className="text-right flex justify-end gap-3  px-5 py-7 border-t bg-gray-100 border-gray-300 border-dotted">
                                <p className='text-gray-500'>Tổng số tiền ({subOrder.subCartItem.length}) sản phẩm:</p>
                                <p className='text-red-500 font-semibold'>₫{subOrder.total.toLocaleString()}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Shopee Voucher + Xu */}
                <div className="bg-white p-4 rounded shadow space-y-2">
                    <div className="flex justify-between">
                        <span>e-Commerce Voucher</span>
                        <span className="text-blue-500 cursor-pointer">Chọn Voucher</span>
                    </div>
                    <div className="flex justify-between">
                        <span>e-Commerce Xu</span>
                        <span>Dùng 100 e-Commerce Xu</span>
                    </div>
                </div>

                {/* Phương thức thanh toán */}
                <div className=''>
                    <div className="bg-white p-4 border-b border-gray-300 border-dotted space-y-3">
                        <h3 className="font-semibold">Phương thức thanh toán</h3>
                        <div className="flex flex-wrap gap-2">
                            {paymentOptions.map((opt, i) => (
                                <button key={i}
                                    onClick={() => { setActiveMethod(opt); setPaymentMethod("COD") }}
                                    className={`border rounded px-4 py-2 text-sm ${activeMethod === opt ? 'border-purple-500 text-purple-500 font-bold' : 'text-gray-700'}`}>
                                    {opt}
                                </button>
                            ))}
                        </div>
                        {activeMethod === 'Ví điện tử' && (
                            <EWallet />
                        )}

                    </div>

                    {/* Tổng thanh toán + nút */}
                    <div className="bg-purple-50 shadow ">
                        <div className="space-y-3 text-sm text-gray-700 border-b border-gray-300 border-dashed w-full flex flex-col items-end p-4">
                            <div className='w-[30%] flex justify-between '>
                                <p>Tổng tiền hàng:</p>
                                <p>₫285.000</p>
                            </div>
                            <div className='w-[30%] flex justify-between'>
                                <p>Tổng tiền phí vận chuyển:</p>
                                <p> ₫37.300</p>
                            </div>
                            <div className='w-[30%] flex justify-between'>
                                <p className="">Tổng thanh toán: </p>
                                <p className='text-2xl font-medium text-purple-600'>₫322.300</p>
                            </div>
                        </div>
                        <div className='w-full flex  justify-between  p-6'>
                            <p className="text-xs text-gray-500 mt-2">
                                Khi nhấn "Đặt hàng", bạn xác nhận đồng ý với <span className="text-blue-500">Điều khoản e-Commerce</span>
                            </p>
                            <button className="bg-purple-600 text-white px-20 py-2 rounded hover:bg-purple-700"
                                onClick={handlePlaceOrder}
                            >
                                Đặt hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;
