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
                    <div className="flex items-center justify-between border-b pb-4 mb-6">
                        <div className="flex items-center space-x-4">
                            <img
                                src="https://res.cloudinary.com/derx1izam/image/upload/v1741688511/wds7s8z3kqtytrj4tidp.png"
                                alt="Adanola Logo"
                                className="w-12 h-12 rounded-full shadow-md"
                            />
                            <div>
                                <h3 className="text-lg font-semibold">Store name</h3>
                                <p className="text-sm text-gray-500">Official Store</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">
                            Follow
                        </button>
                    </div>
                    {/* Product Name & Price */}
                    <h2 className="text-2xl font-bold mt-2">Product name</h2>
                    <h4>Category name</h4>
                    <p className="text-lg font-semibold mt-2 text-purple-600">£39.99</p>

                    {/* Quantity Selection */}
                    <div className="mt-4 flex items-center">
                        <label className="block font-semibold mr-2">Quantity</label>
                        <button
                            className="px-3 py-1 border rounded-l-lg bg-gray-100 hover:bg-gray-200"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                            -
                        </button>
                        <span className="px-4 py-1 border-t border-b">{quantity}</span>
                        <button
                            className="px-3 py-1 border rounded-r-lg bg-gray-100 hover:bg-gray-200"
                            onClick={() => setQuantity(quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                    {/* Description */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold">Description</h3>
                        <p className="text-gray-700 mt-2">
                            The Ultimate Leggings are designed using a light, four-way stretch fabric.
                            These leggings are designed without a front seam, meaning no camel toe,
                            as well as a higher waistline for extra support and to contour the body.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex space-x-4">
                        <button className="w-1/2 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700">
                            Add to cart
                        </button>
                        <button className="w-1/2 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800">
                            Buy now
                        </button>
                    </div>


                </div>
            </div>

            {/* Ratings and Reviews */}
            <div className="mt-8 p-6 border-t">
                <h2 className="text-xl font-semibold">Ratings and Reviews</h2>
                <p className="text-2xl font-bold mt-2">4.8 ★</p>
                <p className="text-gray-600">619 ratings</p>

                {/* Review List */}
                <div className="mt-4 space-y-4">
                    <div className="border-t pt-4">
                        <p className="font-semibold">Leah • 8 days ago</p>
                        <p className="text-yellow-500">★★★★★</p>
                        <p className="mt-1">Lovely quality fit really well</p>
                    </div>

                    <div className="border-t pt-4">
                        <p className="font-semibold">Jayne • February 5, 2025</p>
                        <p className="text-yellow-500">★★★★★</p>
                        <p className="mt-1">These leggings are gorgeous and feel lovely. Very pleased with them.</p>
                    </div>

                    <div className="border-t pt-4">
                        <p className="font-semibold">Hayley • October 9, 2024</p>
                        <p className="text-yellow-500">★★★★★</p>
                        <p className="mt-1">My daughter loves the fit. They wash well and don't sag with wearing.</p>
                    </div>
                </div>
                <button className="w-full mt-6 py-3 bg-gray-100 text-black font-semibold rounded-lg hover:bg-gray-200">
                    Read more reviews
                </button>
            </div>
        </div>
    );
};

export default ProductsDetail;
