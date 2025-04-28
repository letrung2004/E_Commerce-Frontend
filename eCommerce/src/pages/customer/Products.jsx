import React, { useEffect, useState } from "react";
import ProductCard from "../../components/customer/ProductCard";
import { Link, useSearchParams } from "react-router-dom";
import APIs, { endpoints } from "../../configs/APIs";
import { FaSearch, FaStar, FaFilter, FaSortAmountDown } from "react-icons/fa";

const Products = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [param] = useSearchParams();


    const [priceRange, setPriceRange] = useState("");
    const [rating, setRating] = useState("");

    const khoangGia = [
        { label: "Dưới 200.000₫", range: [0, 200000], value: "under200k" },
        { label: "200.000₫ - 500.000₫", range: [200000, 500000], value: "200k-500k" },
        { label: "500.000₫ - 1.000.000₫", range: [500000, 1000000], value: "500k-1m" },
        { label: "1.000.000₫ - 2.000.000₫", range: [1000000, 2000000], value: "1m-2m" },
        { label: "Trên 2.000.000₫", range: [10000000, Infinity], value: "over2m" },
    ];

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

    const applyFilters = () => {
        console.log("Áp dụng bộ lọc:", { priceRange, location, rating });
        loadProducts();
    };

    const resetFilters = () => {
        setPriceRange("");
        setRating("");
    };

    const loadProducts = async () => {
        if (page > 0) {
            try {
                setLoading(true);
                let url = `${endpoints.products}?page=${page}`;

                let q = param.get('q');
                if (q) {
                    url = `${url}&q=${q}`;
                }
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


    useEffect(() => {
        loadProducts();
    }, [page, param]);

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">

            <div className="text-sm text-gray-500 mb-4">
                <Link to="/" className="hover:underline">Trang chủ</Link> &gt;
                <span className="ml-1"><strong>Sản phẩm</strong></span>
            </div>

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
                        <div className="space-y-2 ml-1">
                            {khoangGia.map((filter, idx) => (
                                <label key={idx} className="flex items-center cursor-pointer hover:text-purple-600">
                                    <input
                                        type="radio"
                                        name="price"
                                        className="mr-2 accent-purple-600"
                                        value={filter.value}
                                        checked={priceRange === filter.value}
                                        onChange={() => setPriceRange(filter.value)}
                                    />
                                    <span>{filter.label}</span>
                                </label>
                            ))}
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
                            <select className="ml-2 p-1 focus:outline-none text-purple-600 font-medium bg-transparent">
                                <option value="newest">Mới nhất</option>
                                <option value="price-asc">Giá tăng dần</option>
                                <option value="price-desc">Giá giảm dần</option>
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
                                    <ProductCard
                                        key={product.id}
                                        name={product.name}
                                        price={product.price.toLocaleString('vi-VN')}
                                        image={product.image}
                                    />
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