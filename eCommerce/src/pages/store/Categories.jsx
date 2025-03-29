import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";

const Categories = () => {
    const categories = [
        { id: 1, name: "Bánh Mì", productCount: 10 },
        { id: 2, name: "Cà Phê", productCount: 8 },
        { id: 3, name: "Trà Sữa", productCount: 12 },
        { id: 3, name: "Trà Sữa", productCount: 12 },
        { id: 3, name: "Trà Sữa", productCount: 12 },
        { id: 3, name: "Trà Sữa", productCount: 12 },
        { id: 3, name: "Trà Sữa", productCount: 12 },
        { id: 3, name: "Trà Sữa", productCount: 12 },
    ];

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Quản lý danh mục</h1>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm danh mục..."
                            className="p-2 pl-8 border rounded-lg"
                        />
                        <FaSearch className="absolute left-2 top-3 text-gray-500" />
                    </div>
                    <Link to="/seller/categories/add">
                        <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                            <FaPlus className="mr-2" /> Thêm danh mục mới
                        </button>
                    </Link>
                </div>
            </div>

            {/* Danh sách danh mục */}
            <div className="bg-white shadow-md rounded-lg p-4">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-200 text-gray-700 rounded-lg">
                            <th className="p-3 text-left rounded-tl-lg">Tên danh mục</th>
                            <th className="p-3 text-left">Số lượng sản phẩm</th>
                            <th className="p-3 text-center rounded-tr-lg">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id} className="even:bg-gray-100 hover:bg-gray-200 transition">
                                <td className="p-3">{category.name}</td>
                                <td className="p-3">{category.productCount}</td>
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

export default Categories;
