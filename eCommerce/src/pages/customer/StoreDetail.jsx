import React, { useState } from 'react';
import ProductCard from '../../components/customer/ProductCard';
import { Link } from 'react-router-dom';

const StoreDetail = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');
    const [sortOrder, setSortOrder] = useState('asc');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const products = [
        { name: "Điện thoại iPhone 15 Pro Max", price: 30990000, image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png", category: "Điện tử" },
        { name: "Laptop Dell XPS 13", price: 25990000, image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png", category: "Điện tử" },
        { name: "Tai nghe Bluetooth Sony WF-1000XM4", price: 4990000, image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png", category: "Phụ kiện" },
        { name: "Sách 'Atomic Habits' (James Clear)", price: 290000, image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png", category: "Sách" },
        { name: "Bộ LEGO Star Wars Millennium Falcon", price: 3990000, image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png", category: "Đồ chơi" },
    ];

    const categories = ["Tất cả", "Điện tử", "Phụ kiện", "Sách", "Đồ chơi"];

    const filteredProducts = products.filter(product =>
        (selectedCategory === "Tất cả" || product.category === selectedCategory) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!minPrice || product.price >= parseInt(minPrice)) &&
        (!maxPrice || product.price <= parseInt(maxPrice))
    ).sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);

    return (
        <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
            {/* Shop Header */}
            <div className="flex items-center justify-between bg-purple-100 p-4 rounded-lg shadow-md">
                <Link to="/store-detail/1">
                    <div className="flex items-center space-x-4">
                        <img src="https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png" alt="Shop Logo" className="w-20 h-20 rounded-full shadow-md" />
                        <div>
                            <h1 className="text-2xl font-bold">Fashion Nova</h1>
                            <p className="text-sm text-gray-500">Official Store - Ho Chi Minh, Viet Nam</p>
                        </div>
                    </div>
                </Link>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">Follow</button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-4 rounded-lg shadow-md">
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="p-2 rounded-lg w-full md:w-1/2 focus:outline-none bg-gray-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex gap-2 flex-wrap">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`px-4 py-2 rounded-lg transition ${selectedCategory === category ? 'bg-purple-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Filters */}
            <div className="bg-white p-4 rounded-lg shadow-md flex flex-row gap-4 items-center">
                <input type="number" placeholder="Giá tối thiểu" className="p-2 rounded-lg w-1/4 bg-gray-200" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                <input type="number" placeholder="Giá tối đa" className="p-2 rounded-lg w-1/4 bg-gray-200" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                <select className="p-2 rounded-lg w-1/4 focus:outline-none bg-gray-200" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">Giá thấp đến cao</option>
                    <option value="desc">Giá cao đến thấp</option>
                </select>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">Filter</button>
            </div>

            {/* Product Section */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Products</h2>
                <div className="mb-8">
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredProducts.map((product, index) => (
                                <ProductCard key={index} name={product.name} price={product.price.toLocaleString("vi-VN")} image={product.image} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">Không tìm thấy sản phẩm phù hợp.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoreDetail;
