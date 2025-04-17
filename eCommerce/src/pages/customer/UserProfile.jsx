import React from 'react';
import { useAuth } from '../../context/AuthProvider';

const UserProfile = () => {
    const { user } = useAuth();
    if (!user) {
        return <div>Bạn chưa đăng nhập.</div>;
    }
    return (
        <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md m-8 space-y-4">
            <h2 className="text-2xl font-bold">Thông tin người dùng</h2>
            <p><strong>Tên người dùng:</strong> {user.username}</p>
            <p><strong>Tên:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
        </div>
    );
};

export default UserProfile;