import React from "react";
import { Link } from "react-router-dom";

const CustomerHeader = () => {
    return (
        <header className="customer-header">
            <div className="logo">
                <Link to="/">Shop Online</Link>
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Trang chủ</Link></li>
                    <li><Link to="/products">Sản phẩm</Link></li>
                    <li><Link to="/cart">Giỏ hàng</Link></li>
                    <li><Link to="/account">Tài khoản</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default CustomerHeader;