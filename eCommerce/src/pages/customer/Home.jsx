import React from "react";
import ProductCard from "../../components/customer/ProductCard";
import { Link } from "react-router-dom";

const Home = () => {
    const categories = [
        { name: 'Clothes', image: 'https://cdn-icons-png.flaticon.com/512/892/892458.png' },
        { name: 'Beauty', image: 'https://cdn-icons-png.flaticon.com/128/682/682616.png' },
        { name: 'Food & drinks', image: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png' },
        { name: 'Home', image: 'https://cdn-icons-png.flaticon.com/128/2163/2163350.png' },
        { name: 'Fitness', image: 'https://cdn-icons-png.flaticon.com/128/2382/2382679.png' },
        { name: 'Accessories', image: 'https://cdn-icons-png.flaticon.com/128/3674/3674333.png' },
        { name: 'Pet supplies', image: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
        { name: 'Toys & games', image: 'https://cdn-icons-png.flaticon.com/128/4287/4287470.png' },
        { name: 'Electronics', image: 'https://cdn-icons-png.flaticon.com/128/2278/2278984.png' },
        { name: 'Fashions', image: 'https://cdn-icons-png.flaticon.com/128/12516/12516451.png' },
        { name: 'Sports', image: 'https://cdn-icons-png.flaticon.com/128/3311/3311579.png' },
    ];

    const products = [
        { name: "Điện thoại iPhone 15 Pro Max", price: "30,990,000", image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png" },
        { name: "Điện thoại iPhone 15 Pro Max", price: "30,990,000", image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png" },
        { name: "Điện thoại iPhone 15 Pro Max", price: "30,990,000", image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png" },
        { name: "Điện thoại iPhone 15 Pro Max", price: "30,990,000", image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png" },
        { name: "Điện thoại iPhone 15 Pro Max", price: "30,990,000", image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png" },
        { name: "Điện thoại iPhone 15 Pro Max", price: "30,990,000", image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png" },
        { name: "Điện thoại iPhone 15 Pro Max", price: "30,990,000", image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png" },
        { name: "Điện thoại iPhone 15 Pro Max", price: "30,990,000", image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png" },
        { name: "Điện thoại iPhone 15 Pro Max", price: "30,990,000", image: "https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png" },

    ];

    return (
        <>
            <div className="w-full px-6 py-8 bg-gray-100 flex flex-col items-center ">
                <h1 className="text-4xl font-bold mb-6 text-gray-800">Categories</h1>
                <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl">
                    {categories.map((category) => (
                        <div
                            key={category.name}
                            className="w-37 h-25 flex flex-col items-center justify-center bg-white rounded-lg shadow hover:shadow-md transition"
                        >
                            <img src={category.image} alt={category.name} className="w-12 h-12 mb-2 object-contain" />
                            <span className="text-sm font-semibold text-gray-700 text-center">{category.name}</span>
                        </div>
                    ))}
                </div>


                <div className="flex justify-center mt-6 mb-4">
                    <h1 className="text-3xl font-bold mb-4">Suggestion for you</h1>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {products.map((product, index) => (
                        <Link to="/products/1">
                            <ProductCard key={index} name={product.name} price={product.price} image={product.image} />
                        </Link>

                    ))}
                </div>

                {/* Nút xem thêm */}
                <div className="flex justify-center mt-6">
                    <button className="px-6 py-3 bg-gray-200 rounded-full hover:bg-gray-300">
                        Xem thêm
                    </button>
                </div>

            </div>
        </>
    );
};

export default Home;
