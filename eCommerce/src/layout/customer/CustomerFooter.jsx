import React from "react";

const CustomerFooter = () => {
    return (
        <footer className="customer-footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Về chúng tôi</h3>
                    <p>E-Commerce</p>
                </div>
                <div className="footer-section">
                    <h3>Liên hệ</h3>
                    <p>Email: contact@example.com</p>
                </div>
            </div>
            <div className="copyright">
                <p>&copy; {new Date().getFullYear()} Shop Online. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default CustomerFooter;