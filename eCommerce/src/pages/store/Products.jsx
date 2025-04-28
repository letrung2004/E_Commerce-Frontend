import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useAuth } from "../../context/AuthProvider";
import { authAPIs, endpoints } from "../../configs/APIs";
import ModalDialog from "../../components/store/ModalDialog";

const Products = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const storeId = user.storeId;
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [productDel, setProductDel] = useState(null);
    const [page, setPage] = useState(1);
    const [kw, setKw] = useState("");

    const loadProduct = async () => {
        if (!storeId || page <= 0) return;

        try {
            setLoading(true);
            const qParam = searchParams.get("q") || "";
            let url = `${endpoints.getProducts(storeId)}?page=${page}`;
            if (qParam) {
                url += `&q=${encodeURIComponent(qParam)}`;
            }

            const res = await authAPIs().get(url);

            if (res.data.length === 0) {
                setPage(0);
            } else {
                if (page === 1) {
                    setProducts(res.data);
                } else {
                    setProducts(prev => [...prev, ...res.data]);
                }
            }
        } catch (err) {
            console.error("Lỗi load sản phẩm:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        setProducts([]);
        setSearchParams({ q: kw });
    };

    const handleLoadMore = () => {
        if (!loading && page > 0) {
            setPage(prev => prev + 1);
        }
    };

    const confirmDelete = (product) => {
        setProductDel(product);
        setShowConfirmModal(true);
    };

    const handleDelete = async () => {
        try {
            await authAPIs().delete(endpoints.updateProduct(storeId, productDel.id));
            setSuccessMessage("Xóa thành công!");
            setPage(1);
            setProducts([]);
            loadProduct();
        } catch (err) {
            console.error("Lỗi xóa sản phẩm:", err);
        } finally {
            setShowConfirmModal(false);
            setProductDel(null);
        }
    };

    useEffect(() => {
        if (storeId && page > 0) {
            loadProduct();
        }
    }, [storeId, page, searchParams]);

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
                        <form onSubmit={handleSearch} className="flex space-x-2">
                            <input
                                type="text"
                                placeholder="Tên sản phẩm..."
                                className="w-full rounded px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={kw}
                                onChange={(e) => setKw(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Tìm
                            </button>
                        </form>
                        <Link to="/seller/products/add">
                            <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                <FaPlus className="mr-2" /> Thêm sản phẩm
                            </button>
                        </Link>
                    </div>
                </div>

                {loading && page === 1 ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="text-blue-600 font-medium text-lg animate-pulse">Đang tải sản phẩm...</div>
                    </div>
                ) : (
                    <>
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-blue-200 text-gray-700">
                                        <th className="p-3 text-left">Hình ảnh</th>
                                        <th className="p-3 text-left">Tên sản phẩm</th>
                                        <th className="p-3 text-left">Giá</th>
                                        <th className="p-3 text-center">Nhà sản xuất</th>
                                        <th className="p-3 text-center">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id} className="even:bg-gray-100 hover:bg-gray-200 transition">
                                            <td className="p-3">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-20 h-20 rounded-2xl shadow-lg object-cover"
                                                />
                                            </td>
                                            <td className="p-3">{product.name}</td>
                                            <td className="p-3 text-green-600 font-semibold">
                                                ₫{product.price.toLocaleString()}
                                            </td>
                                            <td className="p-3 text-center">{product.manufacturer}</td>
                                            <td className="p-3 mt-6 flex justify-center items-center space-x-2">
                                                <button
                                                    onClick={() => navigate(`/seller/products/update/${product.id}`)}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                                                >
                                                    Cập nhật
                                                </button>
                                                <button
                                                    onClick={() => confirmDelete(product)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                                                >
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {page > 0 && (
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={handleLoadMore}
                                    className="px-6 py-3 bg-gray-200 rounded-full hover:bg-gray-300"
                                >
                                    Xem thêm
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {showConfirmModal && productDel && (
                <ModalDialog
                    title="Xác nhận xóa"
                    message={`Bạn có chắc chắn muốn xóa sản phẩm "${productDel.name}"?`}
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
