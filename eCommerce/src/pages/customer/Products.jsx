import React, { useEffect, useState } from "react";
import ProductCard from "../../components/customer/ProductCard";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import APIs, { endpoints } from "../../configs/APIs";
import { FaSearch, FaStar, FaFilter, FaSortAmountDown } from "react-icons/fa";

const Products = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [param] = useSearchParams();
    const navigate = useNavigate();

    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [rating, setRating] = useState("");
    const [sort, setSort] = useState("");

    const danhGia = [
        { label: "5 sao", value: 5 },
        { label: "4 sao trở lên", value: 4 },
        { label: "3 sao trở lên", value: 3 },
    ];

    const renderStars = (count) => {
        const stars = [];
        for (let i = 0; i < count; i++) {
            stars.push(<FaStar key={i} className="text-yellow-400" />);
        }
        return stars;
    };

    const formatPriceInput = (value) => {
        const numericValue = value.replace(/\D/g, '');
        if (numericValue) {
            return parseInt(numericValue).toLocaleString('vi-VN');
        }
        return "";
    };

    const applyFilters = () => {
        const params = new URLSearchParams();

        if (minPrice) params.set('fromPrice', minPrice.replace(/\D/g, ''));
        if (maxPrice) params.set('toPrice', maxPrice.replace(/\D/g, ''));
        if (rating) params.set('minRating', rating);
        if (sort) params.set('sort', sort);

        const q = param.get('q');
        if (q) params.set('q', q);

        navigate(`/products?${params.toString()}`);
        setPage(1);
    };

    const resetFilters = () => {
        setMinPrice("");
        setMaxPrice("");
        setRating("");
        setSort("");
        navigate("/products");
        setPage(1);
    };


    const handleMinPriceChange = (e) => {
        const formattedValue = formatPriceInput(e.target.value);
        setMinPrice(formattedValue);
    };

    const handleMaxPriceChange = (e) => {
        const formattedValue = formatPriceInput(e.target.value);
        setMaxPrice(formattedValue);
    };

    const loadProducts = async () => {
        if (page > 0) {
            try {
                setLoading(true);
                let url = `${endpoints.products}?page=${page}`;

                const q = param.get('q');
                if (q) url += `&q=${q}`;

                const fromPrice = param.get('fromPrice');
                if (fromPrice) url += `&fromPrice=${fromPrice}`;

                const toPrice = param.get('toPrice');
                if (toPrice) url += `&toPrice=${toPrice}`;

                const minRating = param.get('minRating');
                if (minRating) url += `&minRating=${minRating}`;

                const sortParam = param.get('sort');
                if (sortParam) url += `&sort=${sortParam}`;

                const res = await APIs.get(url);
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
        }
    };

    const handleLoadMore = () => {
        if (!loading && page > 0) {
            const scrollPosition = window.scrollY;
            setPage(prev => prev + 1);

            setTimeout(() => {
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'instant',
                });
            }, 100);
        }
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };


    useEffect(() => {
        if (page === 1) { // chỉ update state filter khi mới load hoặc filter
            setMinPrice(param.get('fromPrice') ? parseInt(param.get('fromPrice')).toLocaleString('vi-VN') : "");
            setMaxPrice(param.get('toPrice') ? parseInt(param.get('toPrice')).toLocaleString('vi-VN') : "");
            setRating(param.get('minRating') || "");
            setSort(param.get('sort') || "newest");
        }
        loadProducts();
    }, [page, param]);

    return (
        <div className=" w-full max-w-7xl mx-auto px-4 md:px-6 py-4">
            {/* Breadcrumb with nicer styling */}
            <nav className="flex items-center text-sm text-gray-500 mb-4 bg-gray-50 p-3 rounded-lg">
                <Link to="/" className="hover:text-purple-600 transition">Trang chủ</Link>
                <span className="mx-2">•</span>
                <span className="text-purple-700 font-medium truncate">Sản phẩm</span>
            </nav>

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Tất cả sản phẩm</h1>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-72 bg-white p-5 rounded-lg shadow-md mb-4 sticky top-24 h-fit max-h-[32rem] overflow-y-auto">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-lg font-bold flex items-center">
                            <FaFilter className="mr-2 text-purple-600" />
                            Bộ Lọc Tìm Kiếm
                        </h2>
                        <button
                            className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                            onClick={resetFilters}
                        >
                            Xóa tất cả
                        </button>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-800 mb-3">
                            Khoảng Giá
                        </h3>
                        <div className="space-y-2">
                            <div className="flex flex-col">
                                <label className="text-sm text-gray-600 mb-1">Giá thấp nhất</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-600"
                                        placeholder="0₫"
                                        value={minPrice}
                                        onChange={handleMinPriceChange}
                                    />
                                    <span className="absolute right-3 top-2 text-gray-500">₫</span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm text-gray-600 mb-1">Giá cao nhất</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-600"
                                        placeholder="5.000.000₫"
                                        value={maxPrice}
                                        onChange={handleMaxPriceChange}
                                    />
                                    <span className="absolute right-3 top-2 text-gray-500">₫</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-800 mb-3">
                            Đánh Giá
                        </h3>
                        <div className="space-y-3 ml-1">
                            {danhGia.map((star, idx) => (
                                <label key={idx} className="flex items-center cursor-pointer hover:text-purple-600">
                                    <input
                                        type="radio"
                                        name="rating"
                                        className="mr-2 accent-purple-600"
                                        value={star.value}
                                        checked={rating === star.value.toString()}
                                        onChange={() => setRating(star.value.toString())}
                                    />
                                    <div className="flex items-center">
                                        <div className="flex">
                                            {renderStars(star.value)}
                                        </div>
                                        {star.value < 5 && <span className="ml-1">trở lên</span>}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={applyFilters}
                        className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center"
                    >
                        <FaSearch className="mr-2" />
                        Áp Dụng
                    </button>
                </div>

                <div className="flex-1">
                    <div className="bg-white p-3 rounded-lg shadow-sm mb-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <FaSortAmountDown className="text-purple-600 mr-2" />
                            <span className="font-medium">Sắp xếp theo:</span>
                            <select
                                className="ml-2 p-1 focus:outline-none text-purple-600 font-medium bg-transparent"
                                value={sort}
                                onChange={handleSortChange}
                            >
                                <option value="newest">Mới nhất</option>
                                <option value="priceAsc">Giá tăng dần</option>
                                <option value="priceDesc">Giá giảm dần</option>
                            </select>
                        </div>
                        <div className="text-sm text-gray-500">
                            {products.length} sản phẩm
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
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

                            {products.length === 0 && !loading && (
                                <div className="text-center py-20">
                                    <p className="text-gray-500">Không tìm thấy sản phẩm phù hợp</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;
