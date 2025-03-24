import React from "react";

const StoreFooter = () => {
    return (
        <footer className="store-footer">
            <div className="footer-content">
                <p>Seller Center &copy; {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
};

export default StoreFooter;