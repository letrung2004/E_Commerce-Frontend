import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const AfterRegistration = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/'); // hoặc navigate('/home') tùy route bạn muốn quay về
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <FaCheckCircle className="text-green-500 text-8xl mb-6" />
      <h2 className="text-3xl font-semibold mb-2">Đã gửi yêu cầu đăng ký cửa hàng!</h2>
      <p className="text-gray-600 mb-6">
        Vui lòng chờ email xác nhận từ quản trị viên để bắt đầu kinh doanh cùng Shopii.
      </p>
      <button
        onClick={handleGoBack}
        className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-medium"
      >
        Quay về trang chủ
      </button>
    </div>
  );
};

export default AfterRegistration;
