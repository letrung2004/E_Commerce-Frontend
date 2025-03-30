import React from "react";
import ProductCard from "../../components/customer/ProductCard";
import { Link } from "react-router-dom";

const Home = () => {
    const categories = [
        'Women', 'Men', 'Beauty', 'Food & drinks', 'Baby & toddler',
        'Home', 'Fitness', 'Accessories', 'Pet supplies',
        'Toys & games', 'Electronics', 'Arts & crafts',
        'Luggage & bags', 'Sporting goods',
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
                <div className="flex flex-wrap justify-center gap-4 w-full max-w-7xl">
                    {categories.map((category) => (
                        <div
                            key={category}
                            className="w-40 h-16 flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold rounded-xl shadow-md transition-transform transform hover:scale-105"
                        >
                            {category}
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
