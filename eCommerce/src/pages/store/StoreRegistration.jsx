import React, { useState } from 'react';
import NewAddress from './NewAddress';

const StoreRegistration = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-8 max-w-4xl mx-auto text-sm">
            <form className="space-y-6">
                {/* Shop Name */}
                <div className='flex items-center gap-3 w-full '>
                    <label className="block font-medium mb-1 text-black w-[20%] text-right">
                        * Tên Shop
                    </label>
                    <div className='flex flex-col w-[60%]'>
                        <div className="flex items-center border border-gray-300 rounded">
                            <input
                                type="text"
                                placeholder="Nhập vào"
                                className="flex-grow p-2 outline-none"
                            />
                            <span className="text-xs pr-2 text-gray-500">0/30</span>
                        </div>

                    </div>
                </div>
                <div className='flex items-center gap-3 w-full '>
                    <label className="block font-medium mb-1 text-black w-[20%] text-right">
                        * Mô tả
                    </label>
                    <div className='flex flex-col w-[60%]'>
                        <div className="flex items-center border border-gray-300 rounded">
                            <input
                                type="text"
                                placeholder="Nhập mô tả cho cửa hàng"
                                className="flex-grow p-2 outline-none"
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
                    <div className='flex flex-col w-[10%]'>

                        <button onClick={() => setIsModalOpen(true)}
                            className="px-4 py-2 border border-gray-400 rounded text-sm"
                            type="button"
                        >
                            + Thêm
                        </button>

                        {/* Modal */}
                        <NewAddress isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                    </div>
                    {/* <div className="whitespace-pre-line leading-5">
                        Tiến Đạt | 84852845969
                        <br />167/28/40 Đào Sư Tích
                        <br />Xã Phước Kiển
                        <br />Huyện Nhà Bè
                        <br />TP. Hồ Chí Minh
                    </div>
                    <button
                        type="button"
                        className="text-blue-500 text-sm mt-1 hover:underline"
                    >
                        Chỉnh sửa
                    </button> */}
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
                    <div className="w-[60%] flex border border-gray-300 rounded overflow-hidden">
                        <span className="p-2 bg-gray-100 border-r border-gray-300">+84</span>
                        <input
                            type="text"
                            placeholder="Nhập vào"
                            className="flex-grow p-2 outline-none"
                        />
                    </div>
                </div>



                {/* Buttons */}
                <div className="flex justify-end space-x-2 pt-6">
                    <button className="px-4 py-2 border rounded text-sm">Hủy</button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded text-sm">
                        Lưu & gửi yêu cầu
                    </button>
                </div>
            </form>
        </div>

    );
};

export default StoreRegistration;
