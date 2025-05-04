import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useAuth } from "../../context/AuthProvider";
import { authAPIs, endpoints } from "../../configs/APIs";
import ModalDialog from "../../components/store/ModalDialog";

const Categories = () => {
    const { user } = useAuth();
    const storeId = user.storeId;
    const [loading, setLoading] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);
    const [showAddRow, setShowAddRow] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [editCategory, setEditCategory] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState([]);

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

    const handleAddClick = () => {
        setShowAddRow(true);
        setNewCategoryName("");
        setErrors({});
    };

    const handleEditClick = (category) => {
        setEditCategory(category);
        setNewCategoryName(category.name);
        setErrors({});
    };

    const handleCancel = () => {
        setEditCategory(null);
        setNewCategoryName("");
        setShowAddRow(false);
        setErrors({});
    };

    const handleSave = async () => {
        if (newCategoryName.trim() === "") {
            setErrors({ name: "Tên danh mục không được để trống" });
            return;
        }

        setLoadingSave(true);
        try {
            if (editCategory) {
                await authAPIs().put(endpoints.updateCategory(editCategory.id), {
                    name: newCategoryName
                });
                setMessage({ text: "Cập nhật danh mục thành công!", type: "success" });
            } else {
                await authAPIs().post((endpoints.createCategory), {
                    name: newCategoryName
                });
                setMessage({ text: "Thêm danh mục mới thành công!", type: "success" });
            }
            await loadCategories();
            handleCancel();
        } catch (err) {
            console.error("Lỗi khi lưu danh mục:", err);
            setMessage({ text: "Đã có lỗi xảy ra!", type: "error" });
        } finally {
            setLoadingSave(false);
        }
    };

    const confirmDelete = (category) => {
        setCategoryToDelete(category);
        setShowConfirmModal(true);
    };

    const handleDelete = async () => {
        if (!categoryToDelete) return;
        try {
            await authAPIs().delete(endpoints.updateCategory(categoryToDelete.id));
            await loadCategories();
            setMessage({ text: "Xóa danh mục thành công!", type: "success" });
        } catch (err) {
            console.error("Lỗi khi xóa danh mục:", err);
            setMessage({ text: "Đã có lỗi khi xóa!", type: "error" });
        } finally {
            setShowConfirmModal(false);
            setCategoryToDelete(null);
        }
    };

    useEffect(() => {
        if (storeId) {
            loadCategories();
        }
    }, [storeId]);

    useEffect(() => {
        if (message.text !== "") {
            const timer = setTimeout(() => setMessage({ text: "", type: "" }), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="p-6">
            {message.text && (
                <div className="fixed bottom-6 right-6 bg-white border-l-4 border-purple-600 text-gray-700 px-5 py-3 rounded-lg shadow-xl z-50 flex items-center space-x-3 animate-slide-in-right">
                    <div className="bg-purple-100 p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <p className="font-medium">Thao tác thành công</p>
                        <p className="text-sm text-gray-600">{message.text}</p>
                    </div>
                </div>
            )}

            <div>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Quản lý danh mục</h1>
                    <div className="flex items-center space-x-4">

                        <button
                            onClick={handleAddClick}
                            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            <FaPlus className="mr-2" /> Thêm danh mục mới
                        </button>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
                        </div>
                    ) : (
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-blue-200 text-gray-700 rounded-lg">
                                    <th className="p-3 text-left rounded-tl-lg" style={{ width: "15%" }}>ID</th>
                                    <th className="p-3 text-center" style={{ width: "55%" }}>Tên danh mục</th>
                                    <th className="p-3 text-center rounded-tr-lg" style={{ width: "30%" }}>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category.id} className="even:bg-gray-100 hover:bg-gray-200 transition">
                                        <td className="p-3">{category.id}</td>
                                        <td className="p-3 text-center relative">
                                            {editCategory?.id === category.id ? (
                                                <div className="py-1">
                                                    <input
                                                        type="text"
                                                        value={newCategoryName}
                                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                                        className="w-full rounded px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                    />
                                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                                </div>
                                            ) : (
                                                category.name
                                            )}
                                        </td>
                                        <td className="p-3">
                                            <div className="flex justify-center items-center space-x-2" style={{ minWidth: "200px" }}>
                                                {editCategory?.id === category.id ? (
                                                    <>
                                                        <button
                                                            onClick={handleSave}
                                                            disabled={loadingSave}
                                                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 w-24"
                                                        >
                                                            {loadingSave ? "Đang lưu..." : "Lưu"}
                                                        </button>
                                                        <button
                                                            onClick={handleCancel}
                                                            className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 w-24"
                                                        >
                                                            Hủy
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => handleEditClick(category)}
                                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition w-24"
                                                        >
                                                            Cập nhật
                                                        </button>
                                                        <button
                                                            onClick={() => confirmDelete(category)}
                                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition w-24"
                                                        >
                                                            Xóa
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {showAddRow && (
                                    <tr className="bg-gray-50">
                                        <td className="p-3">Mới</td>
                                        <td className="p-3 text-center">
                                            <div className="py-1">
                                                <input
                                                    type="text"
                                                    value={newCategoryName}
                                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                                    placeholder="Nhập tên danh mục mới..."
                                                    className="w-full rounded px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                />
                                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex justify-center items-center space-x-2" style={{ minWidth: "200px" }}>
                                                <button
                                                    onClick={handleSave}
                                                    disabled={loadingSave}
                                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 w-24"
                                                >
                                                    {loadingSave ? "Đang lưu..." : "Lưu"}
                                                </button>
                                                <button
                                                    onClick={handleCancel}
                                                    className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 w-24"
                                                >
                                                    Hủy
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                {showConfirmModal && categoryToDelete && (
                    <ModalDialog
                        title="Xác nhận xóa"
                        message={`Bạn có chắc chắn muốn xóa danh mục "${categoryToDelete.name}"?`}
                        onConfirm={handleDelete}
                        onCancel={() => {
                            setShowConfirmModal(false);
                            setCategoryToDelete(null);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default Categories;