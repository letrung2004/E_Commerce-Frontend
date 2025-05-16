import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authAPIs, endpoints } from "../../configs/APIs";
import { useAuth } from "../../context/AuthProvider";
import { FaArrowLeft } from "react-icons/fa";

const SaveProduct = () => {
    const { user } = useAuth();
    const storeId = user.storeId;
    const navigate = useNavigate();
    const { productId } = useParams();
    const [isEditMode, setIsEditMode] = useState(false);

    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({});
    const [message, setMessage] = useState({ text: "", type: "" });
    const [errors, setErrors] = useState({});


    const handleChange = (value, field) => {
        setProduct((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProduct((prev) => ({ ...prev, file: file }));
            setPreviewImage(URL.createObjectURL(file));
            setErrors((prev) => ({ ...prev, file: "" }));
        }
    };

    const info = [
        { label: "Tên sản phẩm", type: "text", field: "name" },
        { label: "Giá", type: "number", field: "price" },
        { label: "Nhà sản xuất", type: "text", field: "manufacturer" },
        { label: "Mô tả", type: "textarea", field: "description" },
        { label: "Danh mục", type: "select", field: "categoryId" },
        { label: "Ảnh sản phẩm", type: "file", field: "file" },
    ];

    const loadCategories = async () => {
        setLoading(true);
        try {
            const res = await authAPIs().get(endpoints.getCategories(storeId));
            setCategories(res.data);
        } catch (err) {
            console.error("Lỗi load danh mục:", err);
        } finally {
            setLoading(false);
        }
    };

    const loadProduct = async () => {
        if (productId) {
            setLoading(true);
            setIsEditMode(true);
            try {
                const res = await authAPIs().get(endpoints.updateProduct(productId));
                console.log(res.data)
                const productData = res.data;
                setProduct({
                    name: productData.name,
                    price: productData.price,
                    manufacturer: productData.manufacturer,
                    description: productData.description,
                    categoryId: productData.categoryId,
                    file: productData.image || null
                });
                if (productData.image) {
                    setPreviewImage(productData.image);
                }

            } catch (err) {
                console.error("Lỗi load sản phẩm:", err);
            } finally {
                setLoading(false);
            }
        }
    }

    const validateForm = () => {
        const newErrors = {};
        for (let item of info) {
            if (item.field === "file" && !product.file && !isEditMode) {
                newErrors[item.field] = "Vui lòng chọn ảnh sản phẩm.";
            } else if (!product[item.field] && item.field !== "file") {
                newErrors[item.field] = `Vui lòng nhập ${item.label.toLowerCase()}.`;
            }
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            for (let item of info) {
                if (item.field === "file") {
                    if (product.file instanceof File) {
                        formData.append(item.field, product.file);
                    }
                } else if (product[item.field]) {
                    formData.append(item.field, product[item.field]);
                }
            }
            let res;
            if (isEditMode) {
                res = await authAPIs().put(
                    endpoints.updateProduct(productId),
                    formData
                );
                navigate("/seller/products", { state: { successMessage: "Cập nhật sản phẩm thành công!" } });
                // setMessage({ text: "Cập nhật thành công", type: "success" });
            } else {
                res = await authAPIs().post(
                    endpoints.createProduct,
                    formData
                );
                navigate("/seller/products", { state: { successMessage: "Thêm sản phẩm thành công!" } });
                // setMessage({ text: "Thêm sản phẩm thành công", type: "success" });
            }

            setProduct({});
            setPreviewImage(null);
            setErrors({});


        } catch (err) {
            if (err.response && err.response.status === 400) {
                const backendErrors = err.response.data;
                setErrors(backendErrors);
            } else {
                console.error("Lỗi:", err);
                setMessage({ text: "Thất bại. Vui lòng thử lại!", type: "error" });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (storeId) {
            loadCategories();
            if (productId) {
                loadProduct();
            }
        }
    }, [storeId, productId]);

    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => {
                setMessage({ text: "", type: "" });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="p-6">
            {message.text && (
                <div className={`fixed bottom-6 right-6 bg-white border-l-4 ${message.type === "success" ? "border-green-600" : "border-red-600"} text-gray-700 px-5 py-3 rounded-lg shadow-xl z-50 flex items-center space-x-3 animate-slide-in-right`}>
                    <div className={`p-2 rounded-full ${message.type === "success" ? "bg-green-100" : "bg-red-100"}`}>
                        {message.type === "success" ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10A8 8 0 11.001 10a8 8 0 0117.998 0zM9 5a1 1 0 012 0v4a1 1 0 01-2 0V5zm0 6a1 1 0 102 0 1 1 0 00-2 0z" clipRule="evenodd" />
                            </svg>
                        )}
                    </div>
                    <div>
                        <p className="font-medium">{message.type === "success" ? "Thao tác thành công" : "Đã xảy ra lỗi"}</p>
                        <p className="text-sm text-gray-600">{message.text}</p>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate("/seller/products")}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-full"
                    >
                        <FaArrowLeft />
                    </button>
                    <h1 className="text-2xl font-semibold">
                        {isEditMode ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
                    </h1>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {info.map((item) => (
                            <div key={item.field}>
                                <label className="block text-gray-700 text-sm font-medium mb-1">
                                    {item.label}
                                </label>

                                {item.type === "textarea" ? (
                                    <textarea
                                        value={product[item.field] || ""}
                                        onChange={(e) => handleChange(e.target.value, item.field)}
                                        className={`w-full px-4 py-2 rounded-lg border ${errors[item.field] ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                        disabled={loading}
                                        placeholder={`Nhập ${item.label.toLowerCase()}`}
                                    />
                                ) : item.type === "select" ? (
                                    <select
                                        value={product[item.field] || ""}
                                        onChange={(e) => handleChange(e.target.value, item.field)}
                                        className={`w-full px-4 py-2 rounded-lg border ${errors[item.field] ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                        disabled={loading}
                                    >
                                        <option value="">Chọn danh mục</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : item.type === "file" ? (
                                    <>
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            className={`w-full px-4 py-2 rounded-lg border file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500 file:text-white hover:file:bg-purple-600 transition ${errors[item.field] ? "border-red-500" : "border-gray-300"
                                                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                            disabled={loading}
                                        />
                                        {previewImage && (
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                className="mt-2 h-24 object-contain rounded-md border"
                                            />
                                        )}
                                    </>
                                ) : (
                                    <input
                                        type={item.type}
                                        value={product[item.field] || ""}
                                        onChange={(e) => handleChange(e.target.value, item.field)}
                                        className={`w-full px-4 py-2 rounded-lg border ${errors[item.field] ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                        disabled={loading}
                                        placeholder={`Nhập ${item.label.toLowerCase()}`}
                                    />
                                )}

                                {errors[item.field] && (
                                    <p className="text-red-500 text-xs mt-1">{errors[item.field]}</p>
                                )}
                            </div>
                        ))}

                    </div>

                    <div className="pt-4 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => navigate("/seller/products")}
                            className="bg-gray-400 text-white py-2 px-5 rounded-lg hover:bg-gray-500 transition"
                            disabled={loading}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="bg-purple-500 text-white py-2 px-5 rounded-lg hover:bg-purple-600 transition flex items-center justify-center min-w-32"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {isEditMode ? "Đang cập nhật..." : "Đang thêm..."}
                                </>
                            ) : (
                                isEditMode ? "Cập nhật sản phẩm" : "Thêm sản phẩm"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SaveProduct;