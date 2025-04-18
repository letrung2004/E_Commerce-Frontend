import React, { useState } from "react";
import ProductCard from "../../components/customer/ProductCard";
import { Link } from "react-router-dom"; // để dùng với breadcrumb

const sampleProducts = [
    { id: 1, name: "Điện thoại iPhone 15 Pro Max", price: 30990000, image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png" },
    { id: 2, name: "Samsung Galaxy S24 Ultra", price: 25990000, image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png" },
    { id: 3, name: "Xiaomi 13 Pro", price: 18990000, image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png" },
    { id: 4, name: "Oppo Find X5", price: 15990000, image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png" },
];

const priceFilters = [
    { label: "Under 10 million", range: [0, 10000000] },
    { label: "10 - 20 million", range: [10000000, 20000000] },
    { label: "20 - 30 million", range: [20000000, 30000000] },
    { label: "Over 30 million", range: [30000000, Infinity] },
];

const Products = () => {
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);

    const handleFilterChange = (range) => {
        setSelectedPriceRange(range);
    };

    const filteredProducts = selectedPriceRange
        ? sampleProducts.filter(p => p.price >= selectedPriceRange[0] && p.price <= selectedPriceRange[1])
        : sampleProducts;

    return (
        <div className="max-w-7xl mx-auto px-6 py-4">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-4">
                <Link to="/" className="hover:underline">Home</Link> &gt;
                <Link to="/category" className="hover:underline ml-1">Fashion</Link> &gt;
                <span className="ml-1"><strong>All Products</strong></span>
            </div>
            {/* <h1 className="text-4xl font-bold mb-6 text-gray-800">Tất cả sản phẩm</h1> */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar filter */}
                <div className="md:w-64 w-full bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-bold mb-4">Filter</h2>
                    <div className="space-y-3">
                        {priceFilters.map((filter, idx) => (
                            <label key={idx} className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="price"
                                    className="mr-2"
                                    checked={selectedPriceRange === filter.range}
                                    onChange={() => handleFilterChange(filter.range)}
                                />
                                <span>{filter.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Product grid */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            name={product.name}
                            price={product.price.toLocaleString('vi-VN')}
                            image={product.image}
                        />
                    ))}
                </div>
            </div>

            <div className="flex justify-center mt-8">
                <button className="px-6 py-3 bg-gray-200 rounded-full hover:bg-gray-300">
                    View more
                </button>
            </div>
        </div>
    );
};

export default Products;
