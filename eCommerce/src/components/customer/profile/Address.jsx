import React from 'react';

const Address = () => {
    return (
        <div className="bg-white w-full m-3 p-4 rounded shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Địa chỉ của tôi</h2>
                <button className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded flex items-center text-sm cursor-pointer">
                    <span className="text-2xl mr-2">+</span><span>Thêm địa chỉ mới</span>
                </button>
            </div>


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
