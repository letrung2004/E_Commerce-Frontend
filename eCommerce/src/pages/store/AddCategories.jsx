import React, { useState } from "react";

const AddCategory = () => {
    const [category, setCategory] = useState({
        name: "",
        description: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Danh mục đã gửi:", category);
        // Gửi dữ liệu lên server ở đây
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Thêm danh mục</h1>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Tên danh mục */}
                    <div>
                        <label className="block text-gray-700">Tên danh mục</label>
                        <input
                            type="text"
                            name="name"
                            value={category.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                    </div>

                    {/* Mô tả */}
                    <div>
                        <label className="block text-gray-700">Mô tả</label>
                        <textarea
                            name="description"
                            value={category.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            rows="3"
                        />
                    </div>

                    {/* Nút Thêm & Hủy */}
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => navigate("/seller/categories")}
                            className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                        >
                            Thêm danh mục
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;
