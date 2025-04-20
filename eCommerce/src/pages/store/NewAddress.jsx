// components/NewAddress.jsx
import React, { useContext, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { authAPIs, endpoints } from "../../configs/APIs";

const NewAddress = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const { user } = useAuth();

    const [formData, setFormData] = useState({
        receiver: "",
        phoneNumber: "",
        address: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
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
        if (!formData.receiver.trim()) newErrors.receiver = "Họ & Tên là bắt buộc"; 

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Số điện thoại là bắt buộc";
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Số điện thoại phải gồm đúng 10 chữ số và không chứa ký tự khác";
        }

        if (!formData.address.trim()) newErrors.address = "Địa chỉ chi tiết là bắt buộc";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const finalForm = {
            ...formData,
            username: user.username,
        };

        // Submit form here (gửi về API hoặc xử lý tiếp)
        console.log("Form đã hợp lệ:", finalForm);
        
        try {
            let response = await authAPIs().post(endpoints.createAddress, finalForm);
            if (response.status === 201) {
                console.log("CREATED");
                onClose(); // Chỉ đóng modal khi thành công
            } else {
                console.log("FAILED");
            }
        } catch (err) {
            console.error("Lỗi khi gọi API:", err);
        }
        

        onClose(); // đóng modal nếu cần
    };
    

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white opacity-100 w-[600px] rounded shadow-lg p-6 max-h-[90vh] overflow-y-auto relative">
                <h2 className="text-lg font-semibold mb-4">Thêm Địa Chỉ Mới</h2>

                {/* Họ & Tên */}
                <div className="mb-3">
                    <label className="block mb-1 font-medium">Họ & Tên</label>
                    <input
                        type="text"
                        name="receiver"
                        placeholder="Nhập vào"
                        value={formData.receiver}
                        onChange={handleChange}
                        className={`w-full border ${
                            errors.receiver ? "border-red-500" : "border-gray-300"
                        } rounded p-2`}
                    />
                    {errors.receiver && (
                        <span className="text-red-500 text-sm mt-1 block">{errors.receiver}</span>
                    )}
                </div>

                {/* Số điện thoại */}
                <div className="mb-3">
                    <label className="block mb-1 font-medium">Số điện thoại</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Nhập vào"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className={`w-full border ${
                            errors.phoneNumber ? "border-red-500" : "border-gray-300"
                        } rounded p-2`}
                    />
                    {errors.phoneNumber && (
                        <span className="text-red-500 text-sm mt-1 block">{errors.phoneNumber}</span>
                    )}
                </div>

                {/* Tỉnh/TP - Quận/Huyện - Phường/Xã */}
                <div className="mb-3">
                    <label className="block mb-1 font-medium">
                        Tỉnh/Thành phố/Quận/Huyện/Phường/Xã
                    </label>
                    <select className="w-full border border-gray-300 rounded p-2">
                        <option>Chọn</option>
                    </select>
                </div>

                {/* Địa chỉ chi tiết */}
                <div className="mb-3">
                    <label className="block mb-1 font-medium">Địa chỉ chi tiết</label>
                    <textarea
                        rows={3}
                        name="address"
                        placeholder="Số nhà, tên đường, v.v..."
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full border ${
                            errors.address ? "border-red-500" : "border-gray-300"
                        } rounded p-2`}
                    ></textarea>
                    {errors.address && (
                        <span className="text-red-500 text-sm mt-1 block">{errors.address}</span>
                    )}
                </div>

            

                {/* Footer */}
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                        Hủy
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded"
                        type="button"
                        onClick={handleSubmit}
                    >
                        Lưu
                    </button>
                </div>

                {/* Nút đóng (x) */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-2xl font-medium text-gray-600"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default NewAddress;
