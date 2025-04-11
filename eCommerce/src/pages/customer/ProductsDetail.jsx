import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductsDetail = () => {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-4">
                <Link to="/" className="hover:underline">Home</Link> &gt;
                <Link to="/category" className="hover:underline ml-1">Fashion</Link> &gt;
                <span className="ml-1">Men's Accessories</span>
            </div>
            {/* Top Section: Image + Info */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* Product Image */}
                <div className="w-full md:w-1/2">
                    <img
                        src="https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png"
                        alt="Ultimate Leggings - Midnight Blue"
                        className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                </div>

                {/* Product Information */}
                <div className="w-full md:w-1/2 flex flex-col justify-between">
                    {/* Shop Header */}
                    <div className="flex items-center justify-between bg-purple-100 p-4 rounded-lg shadow-md">
                        <Link to="/store-detail/1">
                            <div className="flex items-center gap-4">
                                <img
                                    src="https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png"
                                    alt="Store Logo"
                                    className="w-12 h-12 rounded-full shadow"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">Store name</h3>
                                    <p className="text-sm text-gray-500">Official Store</p>
                                </div>
                            </div>
                        </Link>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">
                            Follow
                        </button>
                    </div>

                    {/* Product Title & Price */}
                    <div className="mt-4">
                        <h2 className="text-2xl font-bold text-gray-900">Product name</h2>
                        <h4 className="text-gray-600">Category name</h4>
                        <p className="text-yellow-500 text-lg mb-1">★ 4.8 • 619 đánh giá</p>
                        <p className="text-lg font-semibold mt-2 text-blue-600"> $ 339.99</p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="mt-4 flex items-center">
                        <label className="font-semibold mr-2">Quantity</label>
                        <div className="flex items-center border rounded-lg overflow-hidden">
                            <button
                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                -
                            </button>
                            <span className="px-4 py-1">{quantity}</span>
                            <button
                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex gap-4">
                        <button className="w-1/2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
                            Add to cart
                        </button>
                        <button className="w-1/2 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800">
                            Buy now
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Description, Reviews */}
            <div className="mt-10 space-y-8">
                {/* Description */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Product Description</h2>
                    <p className="text-gray-700">
                        The Ultimate Leggings are designed using a light, four-way stretch fabric.
                        These leggings are designed without a front seam, meaning no camel toe.
                    </p>
                </div>

                {/* Ratings and Reviews */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-900">Ratings and Reviews</h2>
                    <p className="text-2xl font-bold mt-2 text-yellow-500">4.8 </p>
                    <p className="text-gray-600">619 ratings</p>

                    {/* Review List */}
                    <div className="mt-4 space-y-4">
                        {[{
                            name: "Leah",
                            date: "8 days ago",
                            rating: "\u2605\u2605\u2605\u2605\u2605",
                            comment: "Lovely quality fit really well"
                        }, {
                            name: "Jayne",
                            date: "February 5, 2025",
                            rating: "\u2605\u2605\u2605\u2605\u2605",
                            comment: "These leggings are gorgeous and feel lovely. Very pleased with them."
                        }, {
                            name: "Hayley",
                            date: "October 9, 2024",
                            rating: "\u2605\u2605\u2605\u2605\u2605",
                            comment: "My daughter loves the fit. They wash well and don't sag with wearing."
                        }].map((review, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                <p className="font-semibold">{review.name} • {review.date}</p>
                                <p className="text-yellow-500">{review.rating}</p>
                                <p className="mt-1 text-gray-800">{review.comment}</p>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-6 py-3 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300">
                        Read more reviews
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductsDetail;
