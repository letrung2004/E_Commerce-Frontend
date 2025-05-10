import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../../components/customer/ProductCard';
import APIs, { endpoints } from '../../configs/APIs';

const StoreDetail = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('newest');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [isFollowing, setIsFollowing] = useState(false);

    const { storeId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [store, setStore] = useState({});
    const [categories, setCategories] = useState([]);

    const loadStoreInfo = async () => {
        try {
            setLoading(true);
            const res = await APIs.get(endpoints.storeDetail(storeId));
            console.log("store data: ", res.data);
            setStore(res.data);

        } catch (err) {
            console.error("Lỗi load store:", err);
        } finally {
            setLoading(false);
        }

    }

    const loadCate = async () => {
        try {
            setLoading(true);
            const res = await APIs.get(endpoints.getCategories(storeId));
            setCategories(res.data);

        } catch (err) {
            console.error("Lỗi load cate:", err);
        } finally {
            setLoading(false);
        }
    }

    const loadProducts = async () => {
        try {
            setLoading(true);
            const res = await APIs.get(endpoints.getProducts(storeId));
            console.log("pro data: ", res.data);
            setProducts(res.data);

        } catch (err) {
            console.error("Lỗi load product:", err);
        } finally {
            setLoading(false);
        }
    }





    const handleApplyFilters = () => {
        // Đã xử lý trong useEffect
    };

    const handleFollowStore = () => {
        setIsFollowing(!isFollowing);
    };

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN') + ' ₫';
    };

    useEffect(() => {
        loadStoreInfo();
        loadCate();
        loadProducts();
        window.scrollTo(0, 0);
    }, [storeId]);




    return (
        <div className="w-full bg-gray-50 min-h-screen pb-10">
            {/* Header cửa hàng */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-200 text-white py-6">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div className="group">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <img
                                        src={store.logo}
                                        alt="Fashion Nova"
                                        className="md:w-22 md:h-22 rounded-full border-4 border-white shadow-lg"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-xl md:text-2xl font-bold ">{store.name}</h1>
                                    <div className="flex items-center text-xs md:text-sm mt-1">
                                        <span className="bg-yellow-500 text-yellow-900 px-2 py-0.5 rounded-full font-medium mr-2">Official</span>
                                        <span>{store.addressLine}</span>
                                    </div>
                                    <div className="flex items-center mt-1 text-xs md:text-sm text-gray-200">
                                        <span>1.2K Followers</span>
                                        <span className="mx-2">•</span>
                                        <Link  to={`/store-detail/${storeId}/reviews`} className='flex gap-2'>
                                            <span>Đánh giá:</span>
                                            <span className='text-white'>4.9 (5 Đánh giá)</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center space-x-2">
                            <button
                                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${isFollowing
                                    ? 'bg-white text-purple-700 hover:bg-gray-100'
                                    : 'bg-purple-500 text-white hover:bg-purple-600 border border-purple-400'
                                    }`}
                                onClick={handleFollowStore}
                            >
                                {isFollowing ? (
                                    <>
                                        <svg className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Đang theo dõi
                                    </>
                                ) : (
                                    <>
                                        <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Theo dõi
                                    </>
                                )}
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pt-6 space-y-6">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="border-t border-gray-200 overflow-x-auto">
                        <div className="flex p-1 min-w-max">
                            <button
                                className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors rounded-lg mx-1 ${selectedCategory === 'All'
                                    ? 'bg-purple-100 text-purple-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                onClick={() => setSelectedCategory('All')}
                            >
                                Tất cả
                            </button>
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors rounded-lg mx-1 ${selectedCategory === category.name
                                        ? 'bg-purple-100 text-purple-700'
                                        : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                    onClick={() => setSelectedCategory(category.name)}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bộ lọc nâng cao */}
                <div className="bg-white rounded-xl shadow-md p-4">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex-grow md:flex-grow-0">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Giá</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    placeholder="Từ"
                                    className="p-2 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                />
                                <span className="text-gray-500">-</span>
                                <input
                                    type="number"
                                    placeholder="Đến"
                                    className="p-2 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-auto">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sắp xếp theo</label>
                            <select
                                className="p-2 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <option value="newest">Mới nhất</option>
                                <option value="priceAsc">Giá tăng dần</option>
                                <option value="priceDesc">Giá giảm dần</option>
                            </select>
                        </div>
                        <button
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors mt-auto w-full md:w-auto"
                            onClick={handleApplyFilters}
                        >
                            Áp dụng
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Sản phẩm</h2>
                        <p className="text-sm text-gray-500">{products.length} sản phẩm</p>
                    </div>
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                                {products.map((product, index) => (
                                    <Link key={index} to={`/products/${product.id}`} state={{ storeId: storeId }}>
                                        <ProductCard key={product.id} product={product} />
                                    </Link>
                                ))}
                            </div>  </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoreDetail;