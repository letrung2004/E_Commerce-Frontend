import React, { useState } from "react";

const ProductsDetail = () => {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row items-start">
                {/* Product Image */}
                <div className="w-full md:w-1/2 flex flex-col items-center">
                    <img
                        src="https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png"
                        alt="Ultimate Leggings - Midnight Blue"
                        className="w-full rounded-lg shadow-md"
                    />
                </div>

                {/* Product Information */}
                <div className="w-full md:w-1/2 md:pl-10 mt-6 md:mt-0">
                    {/* Shop Header */}
                    <div className="flex items-center justify-between bg-lightGray p-4 rounded-lg shadow-md bg-purple-100 ">
                        <div className="flex items-center space-x-4">
                            <img
                                src="https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png"
                                alt="Adanola Logo"
                                className="w-12 h-12 rounded-full shadow-md"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Store name</h3>
                                <p className="text-sm text-gray-500">Official Store</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">
                            Follow
                        </button>
                    </div>

                    {/* Product Name & Price */}
                    <h2 className="text-2xl font-bold mt-4 text-gray-900">Product name</h2>
                    <h4 className="text-gray-600">Category name</h4>
                    <p className="text-lg font-semibold mt-2 text-primary">£39.99</p>

                    {/* Quantity Selection */}
                    <div className="mt-4 flex items-center">
                        <label className="block font-semibold mr-2">Quantity</label>
                        <button
                            className="px-3 py-1 border rounded-l-lg bg-gray-200 hover:bg-gray-300"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                            -
                        </button>
                        <span className="px-4 py-1 border-t border-b">{quantity}</span>
                        <button
                            className="px-3 py-1 border rounded-r-lg bg-gray-200 hover:bg-gray-300"
                            onClick={() => setQuantity(quantity + 1)}
                        >
                            +
                        </button>
                    </div>

                    {/* Description */}
                    <div className="mt-6 bg-lightGray p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">Description</h3>
                        <p className="text-gray-700 mt-2">
                            The Ultimate Leggings are designed using a light, four-way stretch fabric.
                            These leggings are designed without a front seam, meaning no camel toe,

                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex space-x-4 w-full">
                        <button className="w-1/2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
                            Add to cart
                        </button>
                        <button className="w-1/2 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800">
                            Buy now
                        </button>
                    </div>
                </div>
            </div>

            {/* Ratings and Reviews */}
            <div className="mt-8 p-6 bg-lightGray rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-900">Ratings and Reviews</h2>
                <p className="text-2xl font-bold mt-2 text-yellow-500">4.8 ★</p>
                <p className="text-gray-600">619 ratings</p>

                {/* Review List */}
                <div className="mt-4 space-y-4">
                    {[
                        { name: "Leah", date: "8 days ago", rating: "★★★★★", comment: "Lovely quality fit really well" },
                        { name: "Jayne", date: "February 5, 2025", rating: "★★★★★", comment: "These leggings are gorgeous and feel lovely. Very pleased with them." },
                        { name: "Hayley", date: "October 9, 2024", rating: "★★★★★", comment: "My daughter loves the fit. They wash well and don't sag with wearing." }
                    ].map((review, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
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
    );
};

export default ProductsDetail;
