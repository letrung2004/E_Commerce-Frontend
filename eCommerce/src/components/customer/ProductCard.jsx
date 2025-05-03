import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    const { id, name, price, image } = product || {};
    const renderStars = (rate) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rate) {
                stars.push(<span key={i}>★</span>);
            } else {
                stars.push(<span key={i} className="text-gray-300">★</span>);
            }
        }
        return stars;
    };

    return (

        <div className="bg-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-56 flex-shrink-0 border border-gray-200">
            <div className="h-45 flex items-center justify-center rounded-lg overflow-hidden">
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

            <div className="mt-3 px-2">
                <h3 className="text-gray-800 font-semibold text-sm line-clamp-2">{name}</h3>

                <div className="flex items-center gap-1 text-yellow-500 text-xs mt-1">
                    {renderStars(product.starRate || 0)}
                </div>

                <p className="text-gray-600 text-sm mt-1 font-medium">
                    {price.toLocaleString("vi-VN")}đ
                </p>
            </div>
        </div>

    );
};

export default ProductCard;
