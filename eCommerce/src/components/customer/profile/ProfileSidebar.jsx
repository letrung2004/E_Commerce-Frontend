import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBox, FaChartBar, FaEnvelope, FaShoppingCart } from "react-icons/fa";
import { Bell, ClipboardList, User } from "lucide-react";

const ProfileSidebar = () => {
    const [openSections, setOpenSections] = useState({
        notifications: true,
        myProfile: true,
        orders: true,
    });

    const toggleSection = (section) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <aside className="w-60 py-6 bg-transparent flex flex-col h-screen">
            <nav className="space-y-4 flex-grow">
                {/* Thông báo */}
                <div>
                    <button onClick={() => toggleSection("notifications")} className="flex items-center w-full text-left text-black hover:text-purple-600">
                        <Bell size={16} /> <span className="ml-2">Thông báo</span>
                    </button>
                    {openSections.notifications && (
                        <div className="ml-6 mt-2 space-y-2">
                            {/* Các thông báo
                            ... */}
                        </div>
                    )}
                </div>

                {/* Hồ sơ cá nhân */}
                <div>
                    <button onClick={() => toggleSection("myProfile")} className="flex items-center w-full text-left text-black hover:text-purple-600">
                        <User size={16} /> <span className="ml-2">Tài khoản của tôi</span>

                    </button>
                    {openSections.myProfile && (
                        <div className="flex flex-col ml-6 mt-2 space-y-2">
                            <NavLink to="/me/profile" className={({ isActive }) =>
                                `flex items-center gap-2 px-3 py-2 rounded ${isActive ? 'bg-purple-100 text-purple-600 font-semibold' : 'hover:bg-gray-200'
                                }`
                            }>
                                Hồ sơ
                            </NavLink>
                            <NavLink to="/me/address" className={({ isActive }) =>
                                `flex items-center gap-2 px-3 py-2 rounded ${isActive ? 'bg-purple-100 text-purple-600 font-semibold' : 'hover:bg-gray-200'
                                }`
                            }>
                                Địa chỉ
                            </NavLink>
                        </div>
                    )}
                </div>

                {/* Đơn hàng */}
                <div>
                    <button onClick={() => toggleSection("orders")} className="flex items-center w-full text-left text-black hover:text-purple-600">
                        <ClipboardList size={16} /> <span className="ml-2">Đơn hàng</span>
                    </button>
                    {openSections.orders && (
                        <div className="ml-6 mt-2 space-y-2">
                            {/* Đơn hàng
                            ... */}
                        </div>
                    )}
                </div>


            </nav>


        </aside>
    );
};

export default ProfileSidebar;
