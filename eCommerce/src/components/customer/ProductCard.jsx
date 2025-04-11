import React from "react";

const ProductCard = ({ name, price, image }) => {
    return (
        <div className="bg-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-56 flex-shrink-0 border border-gray-200">
            {/* Hình ảnh */}
            <div className="h-45  flex items-center justify-center rounded-lg overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                    />
                ) : (
                    <span className="text-gray-400 text-sm">Hình ảnh</span>
                )}
            </div>

            {/* Thông tin sản phẩm */}
            <div className="mt-3 px-2">
                <h3 className="text-gray-800 font-semibold text-sm line-clamp-2">{name}</h3>

                {/* Đánh giá (hardcode) */}
                <div className="flex items-center gap-1 text-yellow-500 text-xs mt-1">
                    ★★★★☆
                    <span className="text-gray-500 ml-1">(120)</span>
                </div>

                <p className="text-gray-600 text-sm mt-1 font-medium">{price}đ</p>
            </div>
        </div>
    );
};

export default ProductCard;
