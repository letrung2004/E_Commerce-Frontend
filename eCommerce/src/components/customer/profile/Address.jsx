import React, { useContext, useEffect, useState } from 'react';
import NewAddress from '../../store/NewAddress';
import { authAPIs, endpoints } from '../../../configs/APIs';
import DeleteConfirmation from '../modal/DeleteConfirmation';
import { AddressContext, AddressDispatchContext } from '../../../context/AppContext';
import Process from '../../store/Process';

const Address = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null)
    const setCurrentAddress = useContext(AddressDispatchContext)
    const currentAddress = useContext(AddressContext)
    // console.log("Current address: ", currentAddress)
    const [loading, setLoading] = useState(false)

    const handleAddressCreated = (address) => {
        setAddresses((prev) => [...prev, address]);

        setIsModalOpen(false)
    }

    const loadAddresses = async () => {
        try {
            setLoading(true)
            let response = await authAPIs().get(endpoints.myAddress)
            if (response.status === 200) {
                setAddresses(response.data)

            } else {
                console.log("FAILED");
            }
        } catch (error) {
            console.log("error: ", error);
        } finally {
            setLoading(false)
        }
    }

    const handleAddressRemoved = (address) => {
        console.log("removed Address:", address)
        setAddresses((prevAddresses) => prevAddresses.filter(addr => addr.id !== address.id))
        setDeleteConfirmOpen(false)
    }

    const handleSetDefaultAddress = async (address) => {
        // console.log("default Address: ", address)

        try {
            setLoading(true)
            let response = await authAPIs().patch(endpoints.setDefaultAddress(address.id))
            if (response.status === 200) {
                setCurrentAddress(address)

            } else {
                console.log("FAILED");
            }

        } catch (error) {
            console.log("error: ", error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadAddresses()
    }, [currentAddress])

    return (
        <div className="bg-white w-full m-3 p-4 rounded shadow">
            {loading && <Process />}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl ">Địa chỉ của tôi</h2>
                <button className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded flex items-center text-sm cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                >
                    <span className="text-2xl mr-2">+</span><span>Thêm địa chỉ mới</span>
                </button>
                <NewAddress isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreateSuccess={handleAddressCreated} />

            </div>

            {addresses.length > 0 ? (
                addresses.map((addr, index) => (
                    <div key={index} className="bg-white p-4 border-t border-b border-gray-300 flex justify-between items-start">
                        <div>
                            <p className='text-gray-400'><strong className='text-black'>{addr.receiver}</strong> | (+84) {addr.phoneNumber}</p>
                            <p>{addr.address}</p>

                        </div>
                        <div className='flex flex-col items-end gap-y-2'>
                            <div className="space-x-3 mt-2">
                                <button className="text-blue-600 hover:underline text-sm cursor-pointer">Cập nhật</button>
                                <button className="text-blue-600 hover:underline text-sm cursor-pointer"
                                    onClick={() => { setDeleteConfirmOpen(true); setSelectedAddressId(addr.id) }}
                                >Xóa</button>
                            </div>
                            {addr.defaultAddress === false ?
                                <button className='text-gray-600 text-sm rounded-sm p-1 border border-gray-300'
                                    onClick={() => handleSetDefaultAddress(addr)}
                                >Thiết lập mặc định</button> :
                                <button className='text-white text-sm rounded-sm p-1 bg-purple-600 border border-gray-300'

                                >Địa chỉ mặc định</button>
                            }
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">Bạn chưa có địa chỉ nào.</p>
            )}

            <DeleteConfirmation isOpen={isDeleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} addressId={selectedAddressId}
                onRemovedSuccess={handleAddressRemoved}
            />

            <div className="bg-white p-4 border-t border-b border-gray-300 flex justify-between items-start">
                <div>
                    <p><strong>Tiến Đạt</strong>  (+84) 852 845 966</p>
                    <p>167/28/40, Đường Đào Sư Tích, Ấp 3</p>
                    <p>Xã Phước Kiển, Huyện Nhà Bè, TP. Hồ Chí Minh</p>
                    <span className="inline-block mt-2 text-red-500 border border-red-500 px-2 py-1 text-xs rounded cursor-pointer">Mặc định</span>
                </div>

                <div className="space-x-3 mt-2">
                    <button className="text-blue-600 hover:underline text-sm cursor-pointer">Cập nhật</button>
                    <button className="text-blue-600 hover:underline text-sm cursor-pointer">Xóa</button>
                </div>
            </div>

        </div>
    );
};

export default Address;
