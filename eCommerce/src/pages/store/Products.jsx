import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";

const Products = () => {
    const products = [
        { id: 1, name: "Bánh Mì", price: 15000, quantity: 50, image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png" },
        { id: 2, name: "Cà Phê Sữa", price: 25000, quantity: 30, image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png" },
        { id: 3, name: "Trà Sữa Trân Châu", price: 35000, quantity: 40, image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png" },
        { id: 3, name: "Trà Sữa Trân Châu", price: 35000, quantity: 40, image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png" },
        { id: 3, name: "Trà Sữa Trân Châu", price: 35000, quantity: 40, image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png" },
        { id: 3, name: "Trà Sữa Trân Châu", price: 35000, quantity: 40, image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png" },
    ];

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Quản lý sản phẩm</h1>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            className="w-full rounded px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {/* <FaSearch className="absolute left-2 top-3 text-gray-500" /> */}
                    </div>
                    <Link to="/seller/products/add">
                        <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                            <FaPlus className="mr-2" /> Thêm sản phẩm mới
                        </button>
                    </Link>
                </div>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="bg-white shadow-md rounded-lg p-4">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-200 text-gray-700 rounded-lg">
                            <th className="p-3 text-left rounded-tl-lg">Hình ảnh</th>
                            <th className="p-3 text-left">Tên sản phẩm</th>
                            <th className="p-3 text-left">Giá</th>
                            <th className="p-3 text-left">Số lượng</th>
                            <th className="p-3 text-center rounded-tr-lg">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id} className={`even:bg-gray-100 hover:bg-gray-200 transition`}>
                                <td className="p-3">
                                    <img src={product.image} alt={product.name} className="w-18 h-16 rounded-md shadow-md" />
                                </td>
                                <td className="p-3">{product.name}</td>
                                <td className="p-3 text-green-600 font-semibold">₫{product.price.toLocaleString()}</td>
                                <td className="p-3">{product.quantity}</td>
                                <td className="p-5 flex justify-center items-center space-x-4">
                                    <button className="text-blue-500 hover:text-blue-700 text-xl p-2">
                                        <FaEdit />
                                    </button>
                                    <button className="text-red-500 hover:text-red-700 text-xl p-2">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Products;
