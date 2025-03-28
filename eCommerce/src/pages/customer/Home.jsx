import React from "react";
import ProductCard from "../../components/customer/ProductCard";

const Home = () => {

    const products = [
        { name: "Điện thoại iPhone 15 Pro Max", price: "30,990,000", image: "https://via.placeholder.com/150" },
        { name: "Laptop Dell XPS 13", price: "25,990,000", image: "https://via.placeholder.com/150" },
        { name: "Tai nghe Bluetooth Sony WF-1000XM4", price: "4,990,000", image: "https://via.placeholder.com/150" },
        { name: "Smartwatch Apple Watch Series 9", price: "9,490,000", image: "https://via.placeholder.com/150" },
        { name: "Bàn phím cơ Keychron K6", price: "2,190,000", image: "" },
        { name: "Chuột Logitech MX Master 3", price: "2,390,000", image: null },
        { name: "Nồi chiên không dầu Lock&Lock", price: "1,990,000", image: "https://via.placeholder.com/150" },
        { name: "Máy hút bụi Xiaomi Mi Vacuum", price: "3,290,000", image: "https://via.placeholder.com/150" },
        { name: "Balo laptop chống nước", price: "590,000", image: "" },
        { name: "Ghế công thái học Sihoo M57", price: "4,890,000", image: "https://via.placeholder.com/150" },
        { name: "Sách 'Atomic Habits' (James Clear)", price: "290,000", image: "" },
        { name: "Bộ dụng cụ sửa chữa đa năng", price: "490,000", image: null },
        { name: "Kem dưỡng ẩm CeraVe", price: "320,000", image: "https://via.placeholder.com/150" },
        { name: "Bình giữ nhiệt Lock&Lock 500ml", price: "350,000", image: "" },
        { name: "Màn hình LG UltraGear 27 inch 165Hz", price: "6,990,000", image: "https://via.placeholder.com/150" },
        { name: "Ổ cứng SSD Samsung 1TB", price: "2,290,000", image: "https://via.placeholder.com/150" },
        { name: "Giày thể thao Adidas Ultraboost", price: "3,290,000", image: "" },
        { name: "Quạt mini để bàn USB", price: "199,000", image: null },
        { name: "Bộ LEGO Star Wars Millennium Falcon", price: "3,990,000", image: "https://via.placeholder.com/150" },
        { name: "Dây sạc nhanh Anker 100W USB-C", price: "690,000", image: "https://via.placeholder.com/150" },
    ];



    return (
        <div className="w-full px-6 py-8 bg-gray-100 flex flex-col items-center">
            <div className="w-full max-w-5xl">

                <div className="mb-8">
                    <div className="flex justify-center mt-6 mb-4">
                        <h1 className="text-3xl font-bold mb-4">Suggestion for you</h1>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {products.map((product, index) => (
                            <ProductCard key={index} name={product.name} price={product.price} />
                        ))}
                    </div>
                </div>

            </div>
            {/* View More - phan trang */}
            <div className="flex justify-center mt-6">
                <button className="px-6 py-3 bg-gray-200 rounded-full hover:bg-gray-300">
                    View more
                </button>
            </div>
        </div >


    );
};

export default Home;
