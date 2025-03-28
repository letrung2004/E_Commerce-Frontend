import React from "react";


const ProductCard = ({ name, price, image }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-48 flex-shrink-0">
            <div className="h-40 bg-gray-300 flex items-center justify-center rounded-md">
                {image ? (
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                ) : (
                    <span className="text-gray-500">Hình ảnh</span>
                )}

            </div>
            <h3 className="mt-2 text-sm font-semibold">{name}</h3>
            <p className="text-gray-600 text-sm mt-1">${price}</p>
        </div>
    );
};

export default ProductCard;
