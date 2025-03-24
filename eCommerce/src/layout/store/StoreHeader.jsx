import React from "react";
import { Link } from "react-router-dom";

const StoreHeader = () => {
    return (
        <header className="store-header">
            <div className="logo">
                <Link to="/seller">Seller Dashboard</Link>
            </div>
            <nav>
                <ul>
                    <li><Link to="/seller">Dashboard</Link></li>
                    <li><Link to="/seller/products">Sản phẩm</Link></li>
                    <li><Link to="/seller/orders">Đơn hàng</Link></li>
                    <li><Link to="/seller/profile">Hồ sơ</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default StoreHeader;