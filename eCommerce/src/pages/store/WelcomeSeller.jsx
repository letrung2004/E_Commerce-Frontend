import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomeSeller = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    console.log("start")
    navigate("/seller/register");
    console.log("nav")

  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white text-center px-4">
      {/* <img
        src="https://cdn-icons-png.flaticon.com/512/7475/7475970.png" // ảnh minh họa đại diện
        alt="Welcome Illustration"
        className="w-40 h-40 mb-6"
      /> */}
      <h1 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-800">
        Chào mừng đến với E-Commerce!
      </h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Vui lòng cung cấp thông tin để thành lập tài khoản người bán trên E-Commerce.
      </p>
      <button
        onClick={handleStart}
        className="bg-purple-400 hover:bg-purple-600 text-white px-6 py-2 rounded-md text-sm font-medium transition"
      >
        Bắt đầu đăng ký
      </button>
    </div>
  );
};

export default WelcomeSeller;
