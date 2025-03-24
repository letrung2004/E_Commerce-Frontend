import React from "react";

const Products = () => {
    return (
        <div className="store-products">
            <h1>Quản lý sản phẩm</h1>
            <button className="add-product-btn">Thêm sản phẩm mới</button>
            <div className="product-list">
                {/* Danh sách sản phẩm của người bán */}
            </div>
        </div>
    );
};

export default Products;