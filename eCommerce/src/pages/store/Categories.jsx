import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
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
    const [successMessage, setSuccessMessage] = useState("");
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
                setSuccessMessage("Cập nhật danh mục thành công!");
            } else {
                await authAPIs().post((endpoints.createCategory), {
                    name: newCategoryName
                });
                setSuccessMessage("Thêm danh mục mới thành công!");
            }
            await loadCategories();
            handleCancel();
        } catch (err) {
            console.error("Lỗi khi lưu danh mục:", err);
            setErrors({ general: "Đã có lỗi xảy ra khi lưu danh mục" });
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
            setSuccessMessage("Xóa danh mục thành công!");
        } catch (err) {
            console.error("Lỗi khi xóa danh mục:", err);
            setErrors({ general: "Đã có lỗi khi xóa danh mục" });
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
        if (successMessage !== "") {
            const timer = setTimeout(() => setSuccessMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    return (
        <>
            <div className="p-6">
                {successMessage && (
                    <div className="fixed bottom-6 right-6 bg-white border-l-4 border-purple-600 text-gray-700 px-5 py-3 rounded-lg shadow-xl z-50 flex items-center space-x-3 animate-slide-in-right">
                        <div className="bg-purple-100 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-medium">Thao tác thành công</p>
                            <p className="text-sm text-gray-600">{successMessage}</p>
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Quản lý danh mục</h1>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleAddClick}
                            className="flex items-center bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                        >
                            <FaPlus className="mr-2" /> Thêm danh mục
                        </button>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="font-semibold mb-2 text-lg">{categories.length} Danh mục</div>
                    <div className="grid grid-cols-3 bg-gray-100 text-gray-600 text-sm font-medium px-4 py-3 rounded">
                        <div className="col-span-1">ID</div>
                        <div className="col-span-1">Tên danh mục</div>
                        <div className="flex justify-center">Thao tác</div>
                    </div>
                </div>

                <>
                    {loading ? (
                        <div className="flex justify-center py-6">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-600"></div>
                        </div>
                    ) : (
                        <>
                            {categories.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <p className="font-medium">Không tìm thấy danh mục nào</p>
                                </div>
                            ) : (
                                categories.map((category) => (
                                    <div key={category.id} className="grid grid-cols-3 text-sm px-4 py-4 mt-2 bg-gray-50 shadow items-center gap-2">
                                        {/* ID */}
                                        <div className="col-span-1 border-r border-gray-200 p-1 text-gray-600">
                                            {category.id}
                                        </div>

                                        {/* Category Name */}
                                        <div className="col-span-1 border-r border-gray-200 p-1 font-medium text-gray-800">
                                            {editCategory?.id === category.id ? (
                                                <div className="py-1">
                                                    <input
                                                        type="text"
                                                        value={newCategoryName}
                                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                                        className="w-full rounded px-3 py-2 bg-gray-100 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                    />
                                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                                </div>
                                            ) : (
                                                category.name
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col h-full gap-3 justify-center">
                                            {editCategory?.id === category.id ? (
                                                <>
                                                    <button
                                                        onClick={handleSave}
                                                        disabled={loadingSave}
                                                        className="text-blue-600 hover:underline text-sm cursor-pointer"
                                                    >
                                                        {loadingSave ? "Đang lưu..." : "Lưu"}
                                                    </button>
                                                    <button
                                                        onClick={handleCancel}
                                                        className="text-blue-600 hover:underline text-sm cursor-pointer"
                                                    >
                                                        Hủy
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => handleEditClick(category)}
                                                        className="text-blue-600 hover:underline text-sm cursor-pointer"
                                                    >
                                                        Cập nhật
                                                    </button>
                                                    <button
                                                        onClick={() => confirmDelete(category)}
                                                        className="text-blue-600 hover:underline text-sm cursor-pointer"
                                                    >
                                                        Xóa
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}

                            {showAddRow && (
                                <div className="grid grid-cols-3 text-sm px-4 py-4 mt-2 bg-gray-50 shadow items-center gap-2">
                                    <div className="col-span-1 border-r border-gray-200 p-1 text-gray-600">Mới</div>
                                    <div className="col-span-1 border-r border-gray-200 p-1">
                                        <div className="py-1">
                                            <input
                                                type="text"
                                                value={newCategoryName}
                                                onChange={(e) => setNewCategoryName(e.target.value)}
                                                placeholder="Nhập tên danh mục mới..."
                                                className="w-full rounded px-3 py-2 bg-gray-100 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                        </div>
                                    </div>
                                    <div className="flex flex-col h-full gap-3 justify-center">
                                        <button
                                            onClick={handleSave}
                                            disabled={loadingSave}
                                            className="text-blue-600 hover:underline text-sm cursor-pointer"
                                        >
                                            {loadingSave ? "Đang lưu..." : "Lưu"}
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="text-blue-600 hover:underline text-sm cursor-pointer"
                                        >
                                            Hủy
                                        </button>
                                    </div>
                                </div>
                            )}

                            {errors.general && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
                                    {errors.general}
                                </div>
                            )}
                        </>
                    )}
                </>
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
        </>
    );
};

export default Categories;