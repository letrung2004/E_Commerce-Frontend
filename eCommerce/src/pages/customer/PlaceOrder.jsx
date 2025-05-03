import React, { useContext, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AddressContext, AddressDispatchContext } from '../../context/AppContext';
import useAddress from '../../components/customer/hook/useAddress';
import Process from '../../components/store/Process';
import vnPayIcon from '../../assets/Icon-VNPAY-QR.webp'
import { authAPIs, endpoints } from '../../configs/APIs';

const PlaceOrder = () => {
    const { addresses, loading, setLoading, error } = useAddress(1)
    const setCurrentAddress = useContext(AddressDispatchContext)
    const address = useContext(AddressContext)
    const [activeMethod, setActiveMethod] = useState('Ví điện tử')
    const paymentOptions = ['Ví điện tử', 'Thẻ tín dụng/Ghi nợ', 'Google Pay', 'Thẻ nội địa Napas', 'Thanh toán khi nhận hàng']
    const [paymentMethod, setPaymentMethod] = useState("COD")

    const handlePlaceOrder = async () => {
        const data2 = {
            "username": "dt123",
            "addressId": 33,
            "shippingFree": 20000,
            "total": 20000,

            "subOrderItems": [
                {
                    "storeId": 8,
                    "shippingCost": 10000,
                    "subCartItemIds": [
                        1
                    ]
                },
                {
                    "storeId": 14,
                    "shippingCost": 21000,
                    "subCartItemIds": [
                        2
                    ]
                }
            ],
            "paymentMethod": "COD"
        }
        const data = {
            "username": "dt123",
            "addressId": addresses[0].id,
            "total": 320000,
            "subOrderItems": [
                {
                    "storeId": 8,
                    "shippingCost": 10000,
                    "subCartItemIds": [
                        1
                    ]
                },
                {
                    "storeId": 14,
                    "shippingCost": 21000,
                    "subCartItemIds": [
                        2
                    ]
                }
            ],
            "paymentMethod": paymentMethod
        }
        console.log("data: ", data)
        try {
            setLoading(true)
            const response = await authAPIs().post(endpoints.placeOrder, data);
            if (response.status === 201) {

                console.log("order created")

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
                    <img src={vnPayIcon} alt="VNPay" className="w-8 h-8" />
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

            <div className="w-[80%] mx-auto p-6 space-y-4 bg-transparent">
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
                <div className="bg-white rounded shadow">
                    <div className='flex p-5'>
                        <div className='w-[50%]'>
                            <h3 className="font-semibold text-lg">Sản phẩm</h3>
                        </div>
                        <div className='w-[50%] flex text-gray-500'>
                            <div className="flex-1 text-end">Đơn giá</div>
                            <div className="flex-1 text-end">Số lượng</div>
                            <div className="flex-1 text-end">Thành tiền</div>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center p-5 ">
                        <div className='w-[50%] gap-3 flex items-center'>
                            <img
                                src="img.jpg"
                                alt="product"
                                className="w-15 h-15 rounded bg-gray-100 object-cover"
                            />
                            <div className="flex-1 space-y-1">
                                <p className="font-medium text-gray-800">
                                    Quần kaki ống suông nam PEALO casual pant...
                                </p>
                            </div>
                        </div>
                        <div className='w-[50%] flex font-medium text-gray-800'>
                            <div className="flex-1 text-end"><p className="text-sm ">₫285.000</p></div>
                            <div className="flex-1 text-end"><p className="text-sm ">1</p></div>
                            <div className="flex-1 text-end">₫285.000</div>
                        </div>
                    </div>



                    {/* Voucher + Shipping */}
                    <div className="p-5 border-t border-gray-300 border-dotted bg-gray-50">
                        <div className="flex justify-between ">
                            <span>Phương thức vận chuyển: <strong className="text-gray-700">Nhanh</strong></span>
                            <span className="text-gray-800">₫37.300</span>
                        </div>
                    </div>

                    {/* Tổng phụ */}
                    <div className="text-right font-semibold text-red-500 px-5 py-7 border-t bg-gray-50 border-gray-300 border-dotted">
                        Tổng số tiền (1 sản phẩm): ₫322.300
                    </div>
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
