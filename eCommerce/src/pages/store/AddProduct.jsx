import React, { useState } from "react";

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setProduct((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Sản phẩm đã gửi:", product);
        // Gửi dữ liệu lên server ở đây
    };

    return (
        <>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Thêm sản phẩm</h1>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Tên sản phẩm */}
                        <div>
                            <label className="block text-gray-700">Tên sản phẩm</label>
                            <input
                                type="text"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                                required
                            />
                        </div>

                        {/* Giá */}
                        <div>
                            <label className="block text-gray-700">Giá</label>
                            <input
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                                required
                            />
                        </div>

                        {/* Danh mục */}
                        <div>
                            <label className="block text-gray-700">Danh mục</label>
                            <select
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                                required
                            >
                                <option value="">Chọn danh mục</option>
                                <option value="electronics">Điện tử</option>
                                <option value="fashion">Thời trang</option>
                                <option value="home">Gia đình</option>
                            </select>
                        </div>

                        {/* Mô tả */}
                        <div>
                            <label className="block text-gray-700">Mô tả</label>
                            <textarea
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                                rows="3"
                                required
                            />
                        </div>

                        {/* Ảnh sản phẩm */}
                        <div>
                            <label className="block text-gray-700">Ảnh sản phẩm</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full p-2 border rounded-lg"
                                required
                            />
                        </div>
                        {/* Nút Thêm & Hủy */}
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => navigate("/seller/products")}
                                className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                            >
                                Thêm sản phẩm
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddProduct;
