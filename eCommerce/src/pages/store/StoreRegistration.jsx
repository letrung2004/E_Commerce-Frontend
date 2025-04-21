import React, { useEffect, useState } from 'react';
import NewAddress from './NewAddress';
import { useAuth } from '../../context/AuthProvider';
import { authAPIs, endpoints } from '../../configs/APIs';
import { useNavigate } from 'react-router-dom';
import Process from './Process';

const StoreRegistration = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const { user } = useAuth()
    const navigate = useNavigate()
    const [StoreForm, setStoreForm] = useState({
        name: "",
        phoneNumber: "",
        addressId: "",
        description: "",
        username: "",
    });

    useEffect(() => {
        setStoreForm({
            name: "",
            phoneNumber: "",
            addressId: "",
            description: "",
            username: "",
        });
    }, []);

    const [errors, setErrors] = useState({});

    const handleCancel = () => {
        navigate("/seller/welcome"); // hoặc navigate("/seller/register")
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStoreForm((prev) => ({
            ...prev,
            [name]: value
        }));

        // Xóa lỗi ngay khi người dùng bắt đầu nhập lại
        setErrors((prev) => ({
            ...prev,
            [name]: ""
        }));
    };


    const handleSubmit = async () => {
        let newErrors = {};
        if (!StoreForm.name.trim()) newErrors.name = "Tên shop là bắt buộc";

        if (!StoreForm.phoneNumber.trim()) {
            newErrors.phoneNumber = "Số điện thoại là bắt buộc";
        } else if (!/^\d{10}$/.test(StoreForm.phoneNumber)) {
            newErrors.phoneNumber = "Số điện thoại phải gồm đúng 10 chữ số và không chứa ký tự khác";
        }

        if (!StoreForm.addressId) newErrors.addressId = "Địa chỉ chi tiết là bắt buộc";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }


        const finalForm = {
            ...StoreForm,
            username: user.username
        }


        // Submit form here (gửi về API hoặc xử lý tiếp)
        console.log("Form đã hợp lệ:", finalForm);



        try {
            setIsProcessing(true)

            let response = await authAPIs().post(endpoints.createStore, finalForm)
            if (response.status === 201) {
                console.log("CREATED: ", response.data);
                navigate("/seller/success-registration")

            } else {
                console.log("FAILED");
            }
        } catch (err) {
            console.error("Lỗi khi gọi API:", err);

        } finally {
            setIsProcessing(false)
        }




    };

    const handleAddressCreated = (address) => {
        console.log("new Address:", address)
        setSelectedAddress(address)
        setStoreForm((prev) => ({
            ...prev,
            addressId: address.id  // <-- cập nhật addressId vào form
        }));
        setIsModalOpen(false)
    }

    return (
        <div className="p-8 max-w-4xl mx-auto text-sm">
            <form className="space-y-6" onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                {/* Shop Name */}
                <div className='flex items-center gap-3 w-full '>
                    <label className="block font-medium mb-1 text-black w-[20%] text-right">
                        * Tên Shop
                    </label>
                    <div className='flex flex-col w-[60%]'>
                        <div className={`flex items-center border ${errors.name ? "border-red-500" : "border-gray-300"} rounded`}>
                            <input
                                type="text"
                                placeholder="Nhập vào"
                                name="name"
                                value={StoreForm.name}
                                onChange={handleChange}
                                className="flex-grow p-2 outline-none"
                            />
                            <span className="text-xs pr-2 text-gray-500">0/30</span>
                        </div>
                        {errors.name && (
                            <span className="text-red-500 text-sm mt-1 block">{errors.name}</span>
                        )}
                    </div>
                </div>
                <div className='flex items-center gap-3 w-full '>
                    <label className="block font-medium mb-1 text-black w-[20%] text-right">
                        Mô tả
                    </label>
                    <div className='flex flex-col w-[60%]'>
                        <div className="flex items-center border border-gray-300 rounded">
                            <input
                                type="text"
                                placeholder="Nhập mô tả cho cửa hàng"
                                className="flex-grow p-2 outline-none"
                                name="description"
                                value={StoreForm.description}
                                onChange={handleChange}
                            />
                            <span className="text-xs pr-2 text-gray-500">0/100</span>
                        </div>

                    </div>
                </div>

                {/* Address */}
                <div className='flex items-center gap-3 w-full'>
                    <label className="block font-medium mb-1 w-[20%] text-black text-right">
                        * Địa chỉ lấy hàng
                    </label>

                    {!selectedAddress ?
                        <div className='flex flex-col w-[10%]'>

                            <button onClick={() => setIsModalOpen(true)}
                                className={`px-4 py-2 border ${errors.addressId ? "border-red-500" : "border-gray-300"} rounded text-sm`}
                                type="button"
                            >
                                + Thêm
                            </button>
                            {errors.addressId && (
                                <span className="text-red-500 text-sm mt-1 block">{errors.addressId}</span>
                            )}
                        </div> :
                        <>
                            <div className="whitespace-pre-line leading-5">
                                {selectedAddress.receiver} | {selectedAddress.phoneNumber}
                                <br />{selectedAddress.address}

                            </div>
                            <button onClick={() => setIsModalOpen(true)}
                                type="button"
                                className="text-blue-500 text-sm mt-1 hover:underline"
                            >
                                Chỉnh sửa
                            </button>
                        </>
                    }
                    {/* Modal */}
                    <NewAddress currentAddress={selectedAddress} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreateSuccess={handleAddressCreated} />
                </div>

                {/* Email */}
                <div className='flex items-center gap-3 w-full'>
                    <label className="block font-medium mb-1 text-black w-[20%] text-right">* Email</label>
                    <input
                        type="email"
                        disabled
                        value="dat.nt334@gmail.com"
                        className="p-2 border border-gray-300 rounded w-[60%] bg-gray-100 text-gray-500"
                    />

                </div>

                {/* Phone number */}
                <div className='flex items-center gap-3 w-full '>
                    <label className="block font-medium mb-1 text-black w-[20%] text-right">
                        * Số điện thoại
                    </label>
                    <div className='w-[60%]'>
                        <div className={`w-full flex border ${errors.phoneNumber ? "border-red-500" : "border-gray-300"} rounded overflow-hidden`}>
                            <span className="p-2 bg-gray-100 border-r border-gray-300">+84</span>
                            <input
                                type="text"
                                placeholder="Nhập vào"
                                className="flex-grow p-2 outline-none"
                                name="phoneNumber"
                                value={StoreForm.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.phoneNumber && (
                            <span className="text-red-500 text-sm mt-1 block">{errors.phoneNumber}</span>
                        )}
                    </div>
                </div>



                {/* Buttons */}
                <div className="flex justify-end space-x-2 pt-6">
                    <button className="px-4 py-2 border rounded text-sm" onClick={handleCancel}>Hủy</button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-red-500 text-white rounded text-sm">
                        Lưu & gửi yêu cầu
                    </button>
                </div>
            </form>
            {isProcessing && <Process />}
        </div>

    );
};

export default StoreRegistration;
