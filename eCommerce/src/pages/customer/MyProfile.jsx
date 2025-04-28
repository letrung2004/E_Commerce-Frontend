import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import ProfileSidebar from '../../components/customer/profile/ProfileSidebar';

const MyProfile = () => {
    return (
        <div className="flex min-h-screen px-42 bg-gray-50 w-full">
            <ProfileSidebar/>
            <div className="flex-grow flex mx-4">
                <Outlet /> {/* Hiển thị nội dung theo từng route con */}
            </div>
        </div>
    );
};

export default MyProfile;
