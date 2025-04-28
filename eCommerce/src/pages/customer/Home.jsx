import React, { useEffect, useState } from "react";
import ProductCard from "../../components/customer/ProductCard";
import { Link } from "react-router-dom";
import APIs, { endpoints } from "../../configs/APIs";

const Home = () => {
    const categories = [
        { name: 'Quần áo', image: 'https://cdn-icons-png.flaticon.com/512/892/892458.png' },
        { name: 'Sắc đẹp', image: 'https://cdn-icons-png.flaticon.com/128/682/682616.png' },
        { name: 'Nhà cửa', image: 'https://cdn-icons-png.flaticon.com/128/1828/1828740.png' },
        { name: 'Sức khỏe', image: 'https://cdn-icons-png.flaticon.com/128/4326/4326328.png' },
        { name: 'Điện tử', image: 'https://cdn-icons-png.flaticon.com/128/536/536255.png' },
        { name: 'Thời trang', image: 'https://cdn-icons-png.flaticon.com/128/17017/17017673.png' },
        { name: 'Giày dép', image: 'https://cdn-icons-png.flaticon.com/128/5144/5144617.png' },
    ];

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const res = await APIs.get(endpoints.products);
            setProducts(res.data);

        } catch (err) {
            console.error("Lỗi load sản phẩm:", err);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        loadProducts();
    }, []);



    return (
        <>
            <div className="w-full px-6 py-8 bg-gray-100 flex flex-col items-center ">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Danh mục</h1>
                <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl">
                    {categories.map((category) => (
                        <Link key={category.name} to="/category-detail/1">
                            <div

                                className="w-37 h-25 flex flex-col items-center justify-center bg-white rounded-lg shadow hover:shadow-md transition"
                            >
                                <img src={category.image} alt={category.name} className="w-12 h-12 mb-2 object-contain" />
                                <span className="text-sm font-semibold text-gray-700 text-center">{category.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>


                <div className="flex justify-center mt-6 mb-4">
                    <h1 className="text-3xl font-bold mb-4">Sản phẩm đề xuất</h1>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {products.map((product, index) => (
                        <Link key={index} to="/products/1">
                            <ProductCard name={product.name} price={product.price} image={product.image} />
                        </Link>

                    ))}
                </div>


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
