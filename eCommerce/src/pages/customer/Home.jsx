import React, { useState } from "react";
import ProductCard from "../../components/customer/ProductCard";

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedPriceRange, setSelectedPriceRange] = useState("");

    const products = [
        { name: "Điện thoại iPhone 15 Pro Max", price: 30990000, image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png", category: "Điện tử" },
        { name: "Laptop Dell XPS 13", price: 25990000, image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png", category: "Điện tử" },
        { name: "Tai nghe Bluetooth Sony WF-1000XM4", price: 4990000, image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png", category: "Phụ kiện" },
        { name: "Sách 'Atomic Habits' (James Clear)", price: 290000, image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png", category: "Sách" },
        { name: "Bộ LEGO Star Wars Millennium Falcon", price: 3990000, image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png", category: "Đồ chơi" },
        { name: "Điện thoại iPhone 15 Pro Max", price: 30990000, image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png", category: "Điện tử" },
        { name: "Laptop Dell XPS 13", price: 25990000, image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png", category: "Điện tử" },
        { name: "Tai nghe Bluetooth Sony WF-1000XM4", price: 4990000, image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png", category: "Phụ kiện" },
        { name: "Sách 'Atomic Habits' (James Clear)", price: 290000, image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png", category: "Sách" },
        { name: "Bộ LEGO Star Wars Millennium Falcon", price: 3990000, image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png", category: "Đồ chơi" },
    ];


    const priceRanges = [
        { label: "Tất cả", value: "" },
        { label: "Dưới 1 triệu", value: "under-1m" },
        { label: "1 triệu - 10 triệu", value: "1m-10m" },
        { label: "Trên 10 triệu", value: "over-10m" },
    ];

    const filteredProducts = products.filter(product => {
        return (
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === "" || product.category === selectedCategory) &&
            (selectedPriceRange === "" ||
                (selectedPriceRange === "under-1m" && product.price < 1000000) ||
                (selectedPriceRange === "1m-10m" && product.price >= 1000000 && product.price <= 10000000) ||
                (selectedPriceRange === "over-10m" && product.price > 10000000))
        );
    });

    return (
        <div className="w-full px-6 py-8 bg-gray-100 flex flex-col items-center">
            <div className="w-full max-w-6xl">


                {/* Hiển thị sản phẩm */}
                <div className="mb-8">
                    <div className="flex justify-center mt-6 mb-4">
                        <h1 className="text-3xl font-bold">Sản phẩm đề xuất</h1>
                    </div>
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {filteredProducts.map((product, index) => (
                                <ProductCard
                                    key={index}
                                    name={product.name}
                                    price={product.price.toLocaleString("vi-VN")}
                                    image={product.image}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">Không tìm thấy sản phẩm phù hợp.</p>
                    )}
                </div>
            </div>

            {/* Nút xem thêm */}
            <div className="flex justify-center mt-6">
                <button className="px-6 py-3 bg-gray-200 rounded-full hover:bg-gray-300">
                    Xem thêm
                </button>
            </div>
        </div >
    );
};

export default Home;
