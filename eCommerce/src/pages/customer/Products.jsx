import React, { useState } from "react";

const Products = () => {
    // Accordion component nhỏ gọn trong Products
    const FilterSection = ({ title }) => {
        const [open, setOpen] = useState(false);

        return (
            <div className="border-b py-3">
                <button
                    onClick={() => setOpen(!open)}
                    className="flex justify-between items-center w-full text-left font-medium"
                >
                    <span>{title}</span>
                    <span className="text-xl">{open ? "−" : "+"}</span>
                </button>
                {open && (
                    <div className="mt-2 text-sm text-gray-600">
                        <p>Filter options for {title}</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6">
            {/* Sidebar Filters */}
            <div className="w-full md:w-64 p-4 border rounded shadow-sm bg-white">
                <h2 className="text-xl font-bold mb-4">Filters</h2>
                <FilterSection title="Color" />
                <FilterSection title="Size" />
                <FilterSection title="Price" />
                <FilterSection title="Discount Range" />
                <FilterSection title="Availability" />
            </div>

            {/* Main content area */}
            <div className="flex-1">
                <h1 className="text-3xl font-bold mb-4">Product</h1>
                <p>hello</p>
            </div>
        </div>
    );
};

export default Products;
