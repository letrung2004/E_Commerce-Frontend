import React, { useEffect, useState } from "react";
import ProductCard from "../../components/customer/ProductCard";
import { Link } from "react-router-dom";
import APIs, { endpoints } from "../../configs/APIs";
import { FaSearch, FaStar, FaMapMarkerAlt, FaMoneyBillWave, FaFilter, FaSortAmountDown } from "react-icons/fa";

const Products = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);

    // Thêm state cho các bộ lọc
    const [priceRange, setPriceRange] = useState("");
    const [location, setLocation] = useState("");
    const [rating, setRating] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const khoangGia = [
        { label: "Dưới 10 triệu", range: [0, 10000000], value: "under10m" },
        { label: "10 - 20 triệu", range: [10000000, 20000000], value: "10-20m" },
        { label: "20 - 30 triệu", range: [20000000, 30000000], value: "20-30m" },
        { label: "Trên 30 triệu", range: [30000000, Infinity], value: "over30m" },
    ];

    const danhGia = [
        { label: "5 sao", value: 5 },
        { label: "4 sao trở lên", value: 4 },
        { label: "3 sao trở lên", value: 3 },
    ];

    const diaDiem = [
        "Hà Nội",
        "TP. Hồ Chí Minh",
        "Đà Nẵng",
        "Cần Thơ",
        "Hải Phòng",
        "Khác"
    ];

    const applyFilters = () => {
        // Ở đây bạn sẽ gọi API với các tham số lọc
        console.log("Áp dụng bộ lọc:", { priceRange, location, rating });
        // Sau này thay bằng API call với tham số lọc
        loadProducts();
    };

    const resetFilters = () => {
        setPriceRange("");
        setLocation("");
        setRating("");
    };

    const loadProducts = async () => {
        try {
            setLoading(true);
            const res = await APIs.get(endpoints.products);
            setProducts(res.data);
        } catch (err) {
            console.error("Lỗi load sản phẩm:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    // Hàm để hiển thị số sao
    const renderStars = (count) => {
        const stars = [];
        for (let i = 0; i < count; i++) {
            stars.push(<FaStar key={i} className="text-yellow-400" />);
        }
        return stars;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-4">
                <Link to="/" className="hover:underline">Trang chủ</Link> &gt;
                <span className="ml-1"><strong>Sản phẩm</strong></span>
            </div>

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Tất cả sản phẩm</h1>

                {/* Nút hiển thị/ẩn bộ lọc trên mobile */}
                <button
                    className="md:hidden flex items-center space-x-1 bg-purple-600 text-white px-3 py-2 rounded-lg"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <FaFilter />
                    <span>Bộ lọc</span>
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar filter */}
                <div className={`${showFilters ? 'block' : 'hidden'} md:block md:w-72 w-full bg-white p-5 rounded-lg shadow-md mb-4 md:mb-0`}>
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

                    {/* Khoảng giá */}
                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">

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


                    {/* Đánh giá */}
                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">

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

                    {/* Nút áp dụng */}
                    <button
                        onClick={applyFilters}
                        className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center"
                    >
                        <FaSearch className="mr-2" />
                        Áp Dụng
                    </button>
                </div>

                {/* Sản phẩm và sắp xếp */}
                <div className="flex-1">
                    {/* Thanh sắp xếp */}
                    <div className="bg-white p-3 rounded-lg shadow-sm mb-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <FaSortAmountDown className="text-purple-600 mr-2" />
                            <span className="font-medium">Sắp xếp theo:</span>
                            <select className="ml-2 p-1 border-none focus:outline-none text-purple-600 font-medium bg-transparent">
                                <option value="newest">Mới nhất</option>
                                <option value="price-asc">Giá tăng dần</option>
                                <option value="price-desc">Giá giảm dần</option>
                                <option value="popular">Phổ biến nhất</option>
                            </select>
                        </div>
                        <div className="text-sm text-gray-500">
                            {products.length} sản phẩm
                        </div>
                    </div>

                    {/* Product grid */}
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        name={product.name}
                                        price={product.price.toLocaleString('vi-VN')}
                                        image={product.image}
                                    />
                                ))}
                            </div>

                            {products.length > 0 && (
                                <div className="flex justify-center mt-8">
                                    <button className="px-6 py-3 bg-purple-100 text-purple-700 font-medium rounded-full hover:bg-purple-200 transition duration-200">
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