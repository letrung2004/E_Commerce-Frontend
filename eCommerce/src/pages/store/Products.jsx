import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaPlus, FaEye, FaEyeSlash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useAuth } from "../../context/AuthProvider";
import { authAPIs, endpoints } from "../../configs/APIs";
import ModalDialog from "../../components/store/ModalDialog";

const Products = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const storeId = user.storeId;
    const [searchParams, setSearchParams] = useSearchParams();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [productDel, setProductDel] = useState(null);
    const [page, setPage] = useState(1);
    const [kw, setKw] = useState(searchParams.get("q") || "");


    const loadProduct = async () => {
        if (!storeId || page <= 0) return;

        try {
            setLoading(true);
            setNoResults(false);

            const qParam = searchParams.get("q") || "";
            let url = `${endpoints.getProducts(storeId)}?page=${page}`;
            if (qParam) {
                url += `&q=${encodeURIComponent(qParam)}`;
            }

            const res = await authAPIs().get(url);

            if (res.data.length === 0) {
                if (page === 1) {
                    setProducts([]);
                    setNoResults(true);
                } else {
                    setPage(0); // No more pages to load
                }
            } else {
                if (page === 1) {
                    setProducts(res.data);
                    setNoResults(false);
                } else {
                    setProducts(prev => [...prev, ...res.data]);
                }
            }
        } catch (err) {
            console.error("Lỗi load sản phẩm:", err);
            if (page === 1) {
                setProducts([]);
                setNoResults(true);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Reset state for new search
        setProducts([]);
        setNoResults(false);

        // Update search params and reset to page 1
        setSearchParams({ q: kw });
        setPage(1);
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
            await authAPIs().delete(endpoints.updateProduct(productDel.id));
            setSuccessMessage("Xóa thành công!");

            // Reset and reload products
            setProducts([]);
            setPage(1);

            // Close modal first
            setShowConfirmModal(false);
            setProductDel(null);

            // Then reload products
            loadProduct();
        } catch (err) {
            console.error("Lỗi xóa sản phẩm:", err);
            setShowConfirmModal(false);
            setProductDel(null);
        }
    };


    const handleToggleVisibility = async (productId) => {
        try {
            await authAPIs().post(endpoints.changeStatus(productId));
            setSuccessMessage("Cập nhật trạng thái sản phẩm thành công!");

            // Update product status in the current list without reloading
            setProducts(prev => prev.map(p =>
                p.id === productId ? { ...p, active: p.active === 0 ? 1 : 0 } : p
            ));
        } catch (err) {
            console.error("Lỗi khi đổi trạng thái hiển thị:", err);
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return "N/A";
        const date = new Date(timestamp);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    useEffect(() => {
        if (storeId && page > 0) {
            loadProduct();
        }
    }, [storeId, page, searchParams.get("q")]);


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
                                disabled={loading}
                            >
                                {loading ? "Đang tìm..." : "Tìm"}
                            </button>
                        </form>
                        <Link to="/seller/products/add">
                            <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                <FaPlus className="mr-2" /> Thêm sản phẩm
                            </button>
                        </Link>
                    </div>
                </div>

                <>
                    {noResults ? (
                        <div className="text-center py-20 bg-gray-50 rounded-lg shadow-md">
                            <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm phù hợp</p>
                        </div>
                    ) : (
                        <>
                            <div className="bg-white shadow-md rounded-lg p-4 overflow-hidden">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-blue-200 text-gray-700">
                                            <th className="p-3 text-left">Hình ảnh</th>
                                            <th className="p-3 text-left">Tên sản phẩm</th>
                                            <th className="p-3 text-left">Giá</th>
                                            <th className="p-3 text-center">Nhà sản xuất</th>
                                            <th className="p-3 text-center">Ngày tạo</th>
                                            <th className="p-3 text-center">Trạng thái</th>
                                            <th className="p-3 text-center">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.length === 0 && !loading && !noResults ? (
                                            <tr>
                                                <td colSpan="7" className="p-4 text-center text-gray-500">
                                                    Không tìm thấy sản phẩm nào
                                                </td>
                                            </tr>
                                        ) : (
                                            products.map(product => (
                                                <tr key={product.id} className="even:bg-gray-50 hover:bg-gray-100 transition">
                                                    <td className="p-3">
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-20 h-20 rounded-lg shadow object-cover"
                                                        />
                                                    </td>
                                                    <td className="p-3">{product.name}</td>
                                                    <td className="p-3 text-green-600 font-semibold">
                                                        ₫{product.price.toLocaleString()}
                                                    </td>
                                                    <td className="p-3 text-center">{product.manufacturer}</td>
                                                    <td className="p-3 text-center text-gray-600">
                                                        {formatDate(product.dateCreated)}
                                                    </td>
                                                    <td className="p-3 text-center">
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${product.active === 0 ? "bg-gray-100 text-gray-800" : "bg-green-100 text-green-800"
                                                            }`}>
                                                            {product.active === 0 ? (
                                                                <><FaEyeSlash className="mr-1" /> Ẩn </>
                                                            ) : (
                                                                <><FaEye className="mr-1" /> Hiện</>
                                                            )}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 mt-5 flex justify-center items-center space-x-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleToggleVisibility(product.id)}
                                                            className={`${product.active === 0 ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"
                                                                } w-24 justify-center text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center`}
                                                        >
                                                            {product.active === 0 ? (
                                                                <><FaEye className="mr-1" /> Hiện</>
                                                            ) : (
                                                                <><FaEyeSlash className="mr-1" /> Ẩn</>
                                                            )}
                                                        </button>

                                                        <button
                                                            onClick={() => navigate(`/seller/products/update/${product.id}`)}
                                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                                                        >
                                                            Cập nhật
                                                        </button>
                                                        <button
                                                            onClick={() => confirmDelete(product)}
                                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                                                        >
                                                            Xóa
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>



                        </>
                    )}
                    {loading && (
                        <div className="flex justify-center py-6">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-600"></div>
                        </div>
                    )}
                    {page > 0 && products.length > 0 && (
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleLoadMore}
                                disabled={loading}
                                className={`px-6 py-3 rounded-full flex items-center ${loading
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-blue-500 hover:bg-blue-600 text-white"
                                    }`}
                            >
                                {loading && (
                                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                )}
                                Xem thêm
                            </button>
                        </div>
                    )}

                </>

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