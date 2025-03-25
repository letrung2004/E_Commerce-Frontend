import React from "react";

const Home = () => {
    return (
        <div className="w-full px-6 py-8 bg-gray-100 flex flex-col items-center">
            {/* Danh mục sản phẩm */}
            <div className="w-full max-w-5xl">
                {/* Thương hiệu 1 */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Javvy Coffee</h2>
                        <span className="text-gray-500">4.3 ⭐ (45.8K)</span>
                    </div>
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-md w-48 flex-shrink-0">
                                <div className="h-40 bg-gray-300 flex items-center justify-center rounded-md">
                                    <span className="text-gray-500">Hình ảnh</span>
                                </div>
                                <h3 className="mt-2 text-sm font-semibold">Sản phẩm {index + 1}</h3>
                                <p className="text-gray-600 text-sm mt-1">$24.99</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Thương hiệu 2 */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Fashion Nova</h2>
                        <span className="text-gray-500">4.3 ⭐ (346.3K)</span>
                    </div>
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-md w-48 flex-shrink-0">
                                <div className="h-40 bg-gray-300 flex items-center justify-center rounded-md">
                                    <span className="text-gray-500">Hình ảnh</span>
                                </div>
                                <h3 className="mt-2 text-sm font-semibold">Sản phẩm {index + 1}</h3>
                                <p className="text-gray-600 text-sm mt-1">$29.99</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* View More Button */}
            <div className="flex justify-center mt-6">
                <button className="px-6 py-3 bg-gray-200 rounded-full hover:bg-gray-300">
                    View more
                </button>
            </div>
        </div>


    );
};

export default Home;
