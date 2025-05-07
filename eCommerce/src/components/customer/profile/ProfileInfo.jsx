import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../context/AuthProvider';
import { Camera, User, Edit, Save } from 'lucide-react';
import { authAPIs, endpoints } from '../../../configs/APIs';

const ProfileInfo = () => {
    const { user, loadUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [avatar, setAvatar] = useState(user?.avatar || null);
    const [previewAvatar, setPreviewAvatar] = useState(null);
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });

    const [formData, setFormData] = useState({
        username: user?.username || '',
        fullName: user?.fullName || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
    });

    const isValidEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    const isValidPhoneNumber = (phone) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(phone);
    };


    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setPreviewAvatar(null);
        setFormData({
            username: user?.username || '',
            fullName: user?.fullName || '',
            email: user?.email || '',
            phoneNumber: user?.phoneNumber || '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage({ text: "", type: "" });

        if (!isValidEmail(formData.email)) {
            setMessage({ text: "Email không hợp lệ", type: "error" });
            return;
        }

        if (!isValidPhoneNumber(formData.phoneNumber)) {
            setMessage({ text: "Số điện thoại không hợp lệ", type: "error" });
            return;
        }

        try {
            setLoading(true);
            const submitData = new FormData();
            submitData.append('id', user.id);
            Object.keys(formData).forEach(key => {
                submitData.append(key, formData[key]);
            });

            if (fileInputRef.current && fileInputRef.current.files[0]) {
                submitData.append('file', fileInputRef.current.files[0]);
            }


            const res = await authAPIs().put(endpoints['update-user'], submitData);

            if (res.status >= 200 && res.status < 300) {
                if (previewAvatar) {
                    setAvatar(previewAvatar);
                }
                loadUser();
                setMessage({ text: "Cập nhật thành công", type: "success" });
                setIsEditing(false);
                setPreviewAvatar(null);
            } else {

                const errorMessage = res.data?.message || res.data?.error || res.data?.email || "Đã xảy ra lỗi khi cập nhật";
                setMessage({ text: errorMessage, type: "error" });
            }
        } catch (err) {
            console.error("Lỗi khi cập nhật thông tin:", err);

            if (err.response) {
                const errorData = err.response.data;

                if (errorData.email) {
                    setMessage({ text: errorData.email, type: "error" });
                } else if (errorData.message) {
                    setMessage({ text: errorData.message, type: "error" });
                } else if (typeof errorData === 'string') {
                    setMessage({ text: errorData, type: "error" });
                } else {
                    setMessage({ text: `Lỗi server: ${err.response.status}`, type: "error" });
                }
            } else if (err.request) {
                setMessage({ text: "Không thể kết nối đến server", type: "error" });
            } else {
                setMessage({ text: "Đã xảy ra lỗi khi gửi yêu cầu", type: "error" });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => {
                setMessage({ text: "", type: "" });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    useEffect(() => {
        if (user) {
            setAvatar(user.avatar || null);
            setFormData({
                username: user.username || '',
                fullName: user.fullName || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
            });
        }
    }, [user]);


    const info = [
        { label: "Tên đăng nhập", type: "text", field: "username" },
        { label: "Họ và tên", type: "text", field: "fullName" },
        { label: "Email", type: "email", field: "email" },
        { label: "Số điện thoại", type: "tel", field: "phoneNumber" },
    ];

    return (
        <div className='bg-white w-full m-3 p-3 rounded-sm shadow'>
            <div className="bg-blue-600 p-6 text-white">
                <h2 className="text-2xl font-bold">Hồ Sơ Người Dùng</h2>
                <p className="opacity-80">Quản lý thông tin tài khoản của bạn</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="p-6 md:flex">
                        <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
                            <div className="relative mb-4">
                                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
                                    {previewAvatar ? (
                                        <img
                                            src={previewAvatar}
                                            alt="Avatar Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : avatar ? (
                                        <img
                                            src={avatar}
                                            alt="Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                            <User size={64} className="text-gray-400" />
                                        </div>
                                    )}
                                </div>

                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current.click()} // Kích hoạt input file khi nhấn nút
                                        className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700"
                                    >
                                        <Camera size={20} />
                                    </button>
                                )}

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                />
                            </div>

                            {!isEditing && (
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                                >
                                    <Edit size={16} />
                                    Chỉnh sửa hồ sơ
                                </button>
                            )}
                        </div>

                        <div className="md:w-2/3 md:pl-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {info.map((item) => (
                                    <div key={item.field}>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{item.label}</label>
                                        <input
                                            type={item.type}
                                            name={item.field}
                                            disabled={!isEditing || item.field === "username"}
                                            value={formData[item.field]}
                                            onChange={handleInputChange}
                                            className={`w-full p-2 border border-gray-300 rounded focus:outline-none ${item.field === "username" ? "bg-gray-100" : ""}`}
                                        />
                                    </div>
                                ))}
                            </div>

                            {isEditing && (
                                <div className="mt-6 flex justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={cancelEdit}
                                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        Hủy bỏ
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
                                    >
                                        {loading ? (
                                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        ) : (
                                            <Save size={16} />
                                        )}
                                        {loading ? "Đang lưu..." : "Lưu thay đổi"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form>

            {message.text && (
                <div className={`fixed bottom-6 right-6 bg-white border-l-4 ${message.type === "success" ? "border-green-600" : "border-red-600"} text-gray-700 px-5 py-3 rounded-lg shadow-xl z-50 flex items-center space-x-3 animate-slide-in-right`}>
                    <div className={`p-2 rounded-full ${message.type === "success" ? "bg-green-100" : "bg-red-100"}`}>
                        {message.type === "success" ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10A8 8 0 11.001 10a8 8 0 0117.998 0zM9 5a1 1 0 012 0v4a1 1 0 01-2 0V5zm0 6a1 1 0 102 0 1 1 0 00-2 0z" clipRule="evenodd" />
                            </svg>
                        )}
                    </div>
                    <div>
                        <p className="font-medium">{message.type === "success" ? "Thao tác thành công" : "Đã xảy ra lỗi"}</p>
                        <p className="text-sm text-gray-600">{message.text}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileInfo;