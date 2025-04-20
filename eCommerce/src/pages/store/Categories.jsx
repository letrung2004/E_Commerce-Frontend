import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { useAuth } from "../../context/AuthProvider";
import APIs, { authAPIs, endpoints } from "../../configs/APIs";

const Categories = () => {
    const { user } = useAuth();
    const storeId = user.storeId;
    const [loading, setLoading] = useState(false);

    const [categories, setCategories] = useState([]);

    const loadCategories = async () => {
        setLoading(true);
        try {
            const res = await authAPIs().get(endpoints.getCategories(storeId));
            setCategories(res.data);
            console.info(res.data);

        } catch (err) {
            console.error("Lỗi load danh mục:", err);
        }
        finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        loadCategories();
    }, [storeId]);


    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Quản lý danh mục</h1>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm danh mục..."
                            className="w-full rounded px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        // onClick={handleAddClick}
                        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        <FaPlus className="mr-2" /> Thêm danh mục mới
                    </button>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-200 text-gray-700 rounded-lg">
                            <th className="p-3 text-left rounded-tl-lg">Tên danh mục</th>
                            <th className="p-3 text-left">Số lượng sản phẩm</th>
                            <th className="p-3 text-center rounded-tr-lg">Hành động</th>
                        </tr>
                    </thead>
                    {/* <tbody>
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

                        {showAddRow && (
                            <tr >
                                <td className="p-3">
                                    <input
                                        type="text"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        placeholder="Nhập tên danh mục mới..."
                                        className="w-full rounded px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </td>
                                <td className="p-3">--</td>
                                <td className="p-3 flex justify-center items-center space-x-2">
                                    <button
                                        onClick={handleSave}
                                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                                    >
                                        Lưu
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
                                    >
                                        Hủy
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody> */}
                </table>
            </div>
        </div>
    );
};

export default Categories;
