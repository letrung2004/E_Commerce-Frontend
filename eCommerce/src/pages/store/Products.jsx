import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useAuth } from "../../context/AuthProvider";
import { authAPIs, endpoints } from "../../configs/APIs";
import ModalDialog from "../../components/store/ModalDialog";

const Products = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const storeId = user.storeId;
    const location = useLocation();

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [productDel, setProductDel] = useState(null);

    const loadProduct = async () => {
        setLoading(true);
        try {
            const resPro = await authAPIs().get(endpoints.getProducts(storeId));
            console.log(resPro.data);
            setProducts(resPro.data);
        } catch (err) {
            console.error("Lỗi load sản phẩm:", err);
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = (product) => {
        setProductDel(product);
        setShowConfirmModal(true);
    };

    const handleDelete = async () => {
        try {
            await authAPIs().delete(endpoints.updateProduct(storeId, productDel.id));
            await loadProduct();
            setSuccessMessage("Xóa thành công!");

        }
        catch (err) {
            console.error("Lỗi khi xóa sản phẩm:", err);
        } finally {
            setShowConfirmModal(false);
            setProductDel(null);
        }
    }
    useEffect(() => {
        if (storeId) {
            loadProduct();
        }
    }, [storeId]);

    useEffect(() => {
        if (location.state?.successMessage) {
            setSuccessMessage(location.state.successMessage);
            const timer = setTimeout(() => setSuccessMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [location.state]);

    return (
        <>
            <div className="p-6">
                {successMessage && (
                    <div className="mb-4 bg-green-100 text-green-700 px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-out">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{successMessage}</span>
                    </div>
                )}

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Quản lý sản phẩm</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                className="w-full rounded px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <Link to="/seller/products/add">
                            <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                <FaPlus className="mr-2" /> Thêm sản phẩm mới
                            </button>
                        </Link>
                    </div>
                </div>



                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="text-blue-600 font-medium text-lg animate-pulse">Đang tải sản phẩm...</div>
                    </div>


                ) : (
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-blue-200 text-gray-700 rounded-lg">
                                    <th className="p-3 text-left rounded-tl-lg">Hình ảnh</th>
                                    <th className="p-3 text-left">Tên sản phẩm</th>
                                    <th className="p-3 text-left">Giá</th>
                                    <th className="p-3 text-left">Nhà sản xuất</th>
                                    <th className="p-3 text-center rounded-tr-lg">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="even:bg-gray-100 hover:bg-gray-200 transition">
                                        <td className="p-3">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-20 h-20 rounded-2xl shadow-lg object-cover transform hover:scale-105 transition duration-300"
                                            />
                                        </td>
                                        <td className="p-3">{product.name}</td>
                                        <td className="p-3 text-green-600 font-semibold">
                                            ₫{product.price.toLocaleString()}
                                        </td>
                                        <td className="p-3">{product.manufacturer}</td>
                                        <td className="mt-8 flex justify-center items-center space-x-4">
                                            <button
                                                onClick={() => navigate(`/seller/products/update/${product.id}`)}
                                                className="text-blue-500 hover:text-blue-700 text-xl p-2">
                                                <FaEdit />
                                            </button>
                                            <button onClick={() => confirmDelete(product)} className="text-red-500 hover:text-red-700 text-xl p-2">
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {showConfirmModal && productDel && (
                <ModalDialog
                    title="Xác nhận xóa"
                    message={`Bạn có chắc chắn muốn sản phẩm "${productDel.name}"?`}
                    onConfirm={handleDelete}
                    onCancel={() => {
                        setShowConfirmModal(false);
                        setProductDel(null);
                    }}
                />
            )}
        </>
    );
};

export default Products;
