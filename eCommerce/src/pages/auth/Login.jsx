import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import APIs, { BASE_URL, endpoints } from "../../configs/APIs";
import cookie from "react-cookies"
import { useAuth } from "../../context/AuthProvider";

const Login = () => {

    const info = [
        {
            label: "Tên đăng nhập",
            type: "text",
            field: "username"
        }, {
            label: "Mật khẩu",
            type: "password",
            field: "password"
        }

    ];
    const { login } = useAuth();
    const [user, setUser] = useState({});
    const [msg, setMsg] = useState("")
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);
    const setState = (value, field) => {
        setUser({ ...user, [field]: value });
    }

    const handleGoogleLogin = () => {
        // Redirect người dùng đến endpoint OAuth2 của Spring
        window.location.href = 'http://localhost:8080/webapp_war_exploded/oauth2/authorization/google';
    };

    const loginHandler = async (e) => {
        e.preventDefault();
        setMsg("");
        if (!user.username || user.username.trim() === "" || !user.password) {
            setMsg("Vui lòng nhập đủ thông tin đăng nhập !!!");
            return;
        }
        setLoading(true);
        try {
            let res = await APIs.post(endpoints['login'], {
                ...user
            })
            const { token } = res.data;
            cookie.save("jwtToken", res.data.token)

            const userResponse = await fetch(`${BASE_URL}${endpoints['current-user']}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userData = await userResponse.json();

            login(userData, token);
            console.info(userData.storeId)

            nav("/");

        } catch (err) {
            setMsg("Đăng nhập thất bại. Vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-4xl font-bold text-center text-gray-800  mb-5">Đăng nhập</h2>
                <form onSubmit={loginHandler}>
                    {info.map(f =>
                        <input key={f.field}
                            type={f.type}
                            name={f.label}
                            //required
                            placeholder={f.label} className="w-full px-4 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={user[f.field]}
                            onChange={e => setState(e.target.value, f.field)} />
                    )}
                    {msg && <h3 className="text-red-500  italic mb-4">* {msg}</h3>}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full text-white py-3 rounded-lg font-semibold transition ${loading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
                            }`}
                    >
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>
                <div className="flex items-center my-4">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="mx-2 text-gray-500">Hoặc</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <div className="flex justify-center">
                    <button onClick={handleGoogleLogin} className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 w-full rounded-md hover:bg-gray-200 transition">
                        <FaGoogle className="text-red-600" />Tiếp tục với Google
                    </button>
                </div>
                <div className="text-center mt-4 text-sm">
                    Mới biết đến E-Commerce ?{" "}
                    <Link to="/register" className="text-gray-800 hover:underline">
                        Đăng ký
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
