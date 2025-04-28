import React from 'react';
import { useAuth } from '../../../context/AuthProvider';

const ProfileInfo = () => {
    const { user } = useAuth();
    if (!user) {
        return <div>Bạn chưa đăng nhập.</div>;
    }

    return (
        <div className='bg-white w-full m-3 p-3 rounded-sm shadow'>
            <h2 className="text-2xl font-bold mb-4">Hồ Sơ Người Dùng</h2>
            <p><strong>Tên người dùng:</strong> {user.username}</p>
            <p><strong>Tên:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
        </div>
    );
};

export default ProfileInfo;
