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
                await authAPIs().put(endpoints.updateCategory(storeId, editCategory.id), {
                    name: newCategoryName
                });
                setMessage({ text: "Cập nhật danh mục thành công!", type: "success" });
            } else {
                await authAPIs().post(endpoints.createCategory(storeId), {
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
            await authAPIs().delete(endpoints.updateCategory(storeId, categoryToDelete.id));
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
                <div className={`mb-4 px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-out
                    ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    <span>{message.text}</span>
                </div>
            )}


            <div >
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
                            onClick={handleAddClick}
                            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            <FaPlus className="mr-2" /> Thêm danh mục mới
                        </button>
                    </div>

                </div>

                <div className="bg-white shadow-md rounded-lg p-4">
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="text-blue-600 font-medium text-lg animate-pulse">Đang tải danh mục...</div>
                        </div>
                    ) : (
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-blue-200 text-gray-700 rounded-lg">
                                    <th className="p-3 text-left rounded-tl-lg">ID</th>
                                    <th className="p-3 text-center">Tên danh mục</th>
                                    <th className="p-3 text-center rounded-tr-lg">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category.id} className="even:bg-gray-100 hover:bg-gray-200 transition">
                                        <td className="p-3">{category.id}</td>
                                        <td className="p-3 text-center">
                                            {editCategory?.id === category.id ? (
                                                <div>
                                                    <input
                                                        type="text"
                                                        value={newCategoryName}
                                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                                        className="w-full text-center rounded px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                    />
                                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                                </div>
                                            ) : (
                                                category.name
                                            )}
                                        </td>
                                        <td className="p-5 flex justify-center items-center space-x-4">
                                            {editCategory?.id === category.id ? (
                                                <>
                                                    <button
                                                        onClick={handleSave}
                                                        disabled={loadingSave}
                                                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                                                    >
                                                        {loadingSave ? "Đang lưu..." : "Lưu"}
                                                    </button>
                                                    <button
                                                        onClick={handleCancel}
                                                        className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
                                                    >
                                                        Hủy
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleEditClick(category)} className="text-blue-500 hover:text-blue-700 text-xl p-2">
                                                        <FaEdit />
                                                    </button>
                                                    <button onClick={() => confirmDelete(category)} className="text-red-500 hover:text-red-700 text-xl p-2">
                                                        <FaTrash />
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {showAddRow && (
                                    <tr>
                                        <td colSpan={3} className="p-4 bg-gray-50">
                                            <div className="flex items-center space-x-4">
                                                <input
                                                    type="text"
                                                    value={newCategoryName}
                                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                                    placeholder="Nhập tên danh mục mới..."
                                                    className="flex-1 rounded px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                />
                                                <button
                                                    onClick={handleSave}
                                                    disabled={loadingSave}
                                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                                                >
                                                    {loadingSave ? "Đang lưu..." : "Lưu"}
                                                </button>
                                                <button
                                                    onClick={handleCancel}
                                                    className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
                                                >
                                                    Hủy
                                                </button>
                                            </div>
                                            {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
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
