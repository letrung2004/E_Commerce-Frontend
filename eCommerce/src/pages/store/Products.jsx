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
        setProducts([]);
        setNoResults(false);

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
            setProducts([]);
            setPage(1);

            setShowConfirmModal(false);
            setProductDel(null);
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
                                className="rounded px-3 py-2 bg-gray-100 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={kw}
                                onChange={(e) => setKw(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-purple-500 text-white rounded  hover:bg-purple-600"
                                disabled={loading}
                            >
                                {loading ? "Đang tìm..." : "Tìm"}
                            </button>
                        </form>
                        <Link to="/seller/products/add">
                            <button className="flex items-center bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                                <FaPlus className="mr-2" /> Thêm sản phẩm
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="font-semibold mb-2 text-lg">{products.length} Sản phẩm</div>
                    <div className="grid grid-cols-7 bg-gray-100 text-gray-600 text-sm font-medium px-4 py-3 rounded">
                        <div className="col-span-2">Sản phẩm</div>
                        <div className="flex justify-center">Giá</div>
                        <div className="flex justify-center">Nhà sản xuất</div>
                        <div className="flex justify-center">Ngày tạo</div>
                        <div className="flex justify-center">Trạng thái</div>
                        <div className="flex justify-center">Thao tác</div>
                    </div>
                </div>

                <>
                    {noResults ? (
                        <div className="text-center py-8 text-gray-500">
                            <p className="font-medium">Không tìm thấy sản phẩm phù hợp</p>
                        </div>
                    ) : (
                        <>
                            {products.length === 0 && !loading ? (
                                <div className="text-center py-8 text-gray-500">
                                    <p className="font-medium">Không tìm thấy sản phẩm nào</p>
                                </div>
                            ) : (
                                products.map(product => (
                                    <div key={product.id} className="grid grid-cols-7 text-sm px-4 py-4 mt-2 bg-gray-50 shadow items-center gap-2">
                                        {/* Product info */}
                                        <div className="flex flex-col col-span-2 border-r border-gray-200 p-1">
                                            <div className="flex items-start space-x-3">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-16 h-16 rounded border border-gray-200 object-cover"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-800">{product.name}</span>
                                                    <span className="text-gray-400 text-xs truncate">ID: {product.id}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="border-r border-gray-200 h-full flex items-center justify-center text-green-600 font-semibold">
                                            ₫{product.price.toLocaleString()}
                                        </div>

                                        {/* Manufacturer */}
                                        <div className="border-r border-gray-200 h-full flex items-center justify-center text-gray-700">
                                            {product.manufacturer}
                                        </div>

                                        {/* Date */}
                                        <div className="border-r border-gray-200 h-full flex items-center justify-center text-gray-700">
                                            {formatDate(product.dateCreated)}
                                        </div>

                                        {/* Status */}
                                        <div className="border-r border-gray-200 h-full flex items-center justify-center">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                                                ${product.active === 0 ? "bg-gray-100 text-gray-800" : "bg-green-100 text-green-800"}`}>
                                                {product.active === 0 ? (
                                                    <><FaEyeSlash className="mr-1" /> Ẩn </>
                                                ) : (
                                                    <><FaEye className="mr-1" /> Hiện</>
                                                )}
                                            </span>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col h-full gap-3 justify-center">
                                            <button
                                                type="button"
                                                onClick={() => handleToggleVisibility(product.id)}
                                                className="text-blue-600 hover:underline text-sm cursor-pointer"
                                            >
                                                {product.active === 0 ? "Hiện sản phẩm" : "Ẩn sản phẩm"}
                                            </button>
                                            <button
                                                onClick={() => navigate(`/seller/products/update/${product.id}`)}
                                                className="text-blue-600 hover:underline text-sm cursor-pointer"
                                            >
                                                Cập nhật
                                            </button>
                                            <button
                                                onClick={() => confirmDelete(product)}
                                                className="text-blue-600 hover:underline text-sm cursor-pointer"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
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