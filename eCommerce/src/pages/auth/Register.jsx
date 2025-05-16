import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import APIs, { endpoints } from "../../configs/APIs";

const Register = () => {

    const info = [
        {
            label: "Họ và tên",
            type: "text",
            field: "fullName"
        },
        {
            label: "Điện thoại",
            type: "tel",
            field: "phoneNumber"
        }
        , {
            label: "Email",
            type: "email",
            field: "email"
        },
        {
            label: "Tên đăng nhập",
            type: "text",
            field: "username"
        }, {
            label: "Mật khẩu",
            type: "password",
            field: "password"
        },
        {
            label: "Xác nhận mật khẩu",
            type: "password",
            field: "confirm"
        }

    ];

    const [user, setUser] = useState({});
    const [msg, setMsg] = useState("")
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);
    const setState = (value, field) => {
        setUser({ ...user, [field]: value });
    }
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        for (let item of info) {
            if (!user[item.field]) {
                newErrors[item.field] = `Vui lòng nhập ${item.label.toLowerCase()}.`;
            }
        }

        if (user.password !== user.confirm) {
            newErrors.confirm = "Mật khẩu xác nhận không khớp.";
        }

        if (user.phoneNumber && !/^\d{10}$/.test(user.phoneNumber)) {
            newErrors.phoneNumber = "Số điện thoại phải gồm đúng 10 chữ số.";
        }

        return newErrors;
    };



    const register = async (e) => {
        e.preventDefault();
        // setMsg("");

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }


        setLoading(true);
        try {
            let form = new FormData();
            for (let f of info) {
                if (f.field !== 'confirm') {
                    form.append(f.field, user[f.field]);
                }
            }

            let res = await APIs.post(endpoints['register'], form);
            if (res.status === 201) {
                nav("/login");
            }
            setErrors({});
        } catch (err) {
            setMsg("Đăng ký thất bại. Vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleRegister = () => {
        // Redirect người dùng đến endpoint OAuth2 của Spring
        window.location.href = 'http://localhost:8080/webapp_war_exploded/oauth2/authorization/google';
    };

    const handleChange = (value, field) => {
        setUser((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-5">Đăng ký</h2>

                <form onSubmit={register}>
                    {info.map(f => (
                        <div key={f.field} className="mb-4">
                            {/* <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label> */}
                            <input
                                type={f.type}
                                placeholder={f.label}
                                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 ${errors[f.field] ? 'border-red-400' : 'border-gray-300'
                                    }`}
                                value={user[f.field] || ""}
                                onChange={(e) => handleChange(e.target.value, f.field)}
                            />
                            {errors[f.field] && (
                                <p className="text-red-500 text-xs italic mt-1">{errors[f.field]}</p>
                            )}
                        </div>
                    ))}

                    {msg && <h3 class="text-red-500  italic mb-4">* {msg}</h3>}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full text-white py-3 rounded-lg font-semibold transition ${loading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
                            }`}
                    >
                        {loading ? "Đang đăng ký..." : "Đăng ký"}
                    </button>
                </form>

                <div className="flex items-center my-4">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="mx-2 text-gray-500">Hoặc</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>


                <div className="flex justify-center">
                    <button onClick={handleGoogleRegister} className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 w-full rounded-md hover:bg-gray-200 transition">
                        <FaGoogle className="text-red-600" />Tiếp tục với Google
                    </button>
                </div>

                <div className="text-center mt-4 text-sm">
                    Đã có tài khoản?{" "}
                    <Link to="/login" className="text-gray-800 hover:underline">
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
