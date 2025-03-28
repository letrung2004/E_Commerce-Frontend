import React from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-4xl font-bold text-center text-gray-800  mb-5">Đăng nhập</h2>

                {/* Input fields */}
                <input
                    type="text"
                    placeholder="Tên đăng nhập"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                {/* Login Button */}
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700">
                    Đăng nhập
                </button>

                {/* Forgot Password */}
                {/* <div className="text-right text-sm mt-2">
                    <Link to="#" className="text-gray-600 hover:underline">
                        Quên mật khẩu?
                    </Link>
                </div> */}

                {/* OR Divider */}
                <div className="flex items-center my-4">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="mx-2 text-gray-500">Hoặc</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* Social Login */}
                <div className="flex justify-between space-x-4">
                    <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md w-1/2 hover:bg-gray-200 transition">
                        <FaFacebook className="text-blue-600" /> Facebook
                    </button>
                    <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md w-1/2 hover:bg-gray-200 transition">
                        <FaGoogle className="text-red-600" /> Google
                    </button>
                </div>

                {/* Register Link */}
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
