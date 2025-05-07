import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import APIs, { endpoints } from "../../configs/APIs";
import { useAuth } from "../../context/AuthProvider";
import { useCart } from "../../context/CartContext";
import useReview from "../../components/customer/hook/useReview";

const ProductsDetail = () => {
    const location = useLocation();
    const initialStoreId = location.state?.storeId || null;
    const [storeId, setStoreId] = useState(initialStoreId);
    const { productId } = useParams();
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [store, setStore] = useState({});
    const { user } = useAuth();
    const { addToCart } = useCart();
    const [showSuccess, setShowSuccess] = useState(false);
    const { reviews, reviewLoading, error, loadMore, hasMore } = useReview(storeId, productId);
    console.log("store: ", storeId)
    console.log("product: ", productId)
    console.log("reviews: ", reviews)

    const loadProductDetail = async () => {
        try {
            setLoading(true);
            const res = await APIs.get(endpoints.productDetail(productId));
            console.log(res.data);
            setProduct(res.data);
        } catch (err) {
            console.error("Lỗi load sản phẩm:", err);
        } finally {
            setLoading(false);
        }
    }

    const loadStoreDetail = async () => {
        try {
            if (product) {
                const res = await APIs.get(endpoints.storeDetail(product.storeId));
                console.log("store data: ", res.data);
                setStore(res.data);
            }
        } catch (err) {
            console.error("Lỗi load store:", err);
        }
    }

    const handelAddProductToCart = async () => {
        if (user) {
            addToCart(product.id, quantity);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } else {
            nav("/login");
        }
    }

    useEffect(() => {
        if (productId) {
            loadProductDetail();
            window.scrollTo(0, 0);
        }
    }, [productId]);

    useEffect(() => {
        if (product && product.storeId) {
            loadStoreDetail();
        }
    }, [product.storeId]);



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
        <div className="w-full max-w-6xl mx-auto p-4 space-y-8">
            <nav className="flex items-center text-sm text-gray-500 mb-4 bg-gray-50 p-3 rounded-lg">
                <Link to="/" className="hover:text-purple-600 transition">Trang chủ</Link>
                <span className="mx-2">•</span>
                <Link to="/products" className="hover:text-purple-600 transition">Sản phẩm</Link>
                <span className="mx-2">•</span>
                <span className="text-purple-700 font-medium truncate">{product.name || "Chi tiết sản phẩm"}</span>
            </nav>

            {showSuccess && (
                <div className="fixed bottom-6 right-6 bg-white border-l-4 border-purple-600 text-gray-700 px-5 py-3 rounded-lg shadow-xl z-50 flex items-center space-x-3 animate-slide-in-right">
                    <div className="bg-purple-100 p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <p className="font-medium">Đã thêm vào giỏ hàng</p>
                        <p className="text-sm text-gray-600">Sản phẩm đã được thêm thành công</p>
                    </div>
                </div>
            )}


            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="rounded-2xl overflow-hidden shadow-lg bg-white h-auto transition-all hover:shadow-xl flex items-center justify-center">
                            {product.image ? (
                                <img src={product.image} alt={product.name} className="object-contain max-h-full" />
                            ) : (
                                <span className="text-gray-400">Không có hình ảnh</span>
                            )}
                        </div>


                        <div className="flex flex-col justify-between space-y-6">

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-1 leading-tight">{product.name || "Tên sản phẩm"}</h2>
                                    </div>
                                    <p className="text-sm text-gray-500 flex items-center">
                                        <span className="inline-block mr-2">{product.manufacturer || "Nhà sản xuất"}</span>
                                        <span className="inline-block w-1 h-1 bg-gray-400 rounded-full"></span>
                                        <span className="inline-block ml-2">ID: {productId}</span>
                                    </p>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        {product.starRate ? renderStars(product.starRate) : renderStars(4)}
                                        <span className="ml-2 font-semibold">{product.starRate || "4.0"}</span>
                                    </div>
                                    <span className="text-gray-400">|</span>
                                    <div className="text-blue-600 text-sm">0 đánh giá</div>
                                    <span className="text-gray-400">|</span>
                                    <div className="text-green-600 text-sm">0 đã bán</div>
                                </div>

                                {/* Price with styling */}
                                <div className="bg-blue-50 p-4 rounded-xl">
                                    <div className="flex items-end">
                                        <p className="text-3xl text-blue-700 font-bold">{product?.price?.toLocaleString("vi-VN")}₫
                                        </p>
                                    </div>
                                    <div className="mt-2 flex items-center">
                                        <div className="text-sm bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md font-medium">
                                            Giảm thêm 5% cho thành viên
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-2">
                                    <label className="font-medium text-gray-700 block">Số lượng</label>
                                    <div className="flex items-center">
                                        <button
                                            className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-l-lg border border-gray-300 text-lg font-medium transition-colors"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                            </svg>
                                        </button>
                                        <input
                                            min="1"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                            className="w-16 h-10 border-t border-b border-gray-300 bg-white text-center text-gray-700 outline-none"
                                        />
                                        <button
                                            className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-r-lg border border-gray-300 text-lg font-medium transition-colors"
                                            onClick={() => setQuantity(quantity + 1)}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                            </svg>
                                        </button>

                                    </div>
                                </div>
                            </div>


                            <div className="flex gap-4 pt-4">
                                <button onClick={handelAddProductToCart} className="w-1/2 bg-white border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all flex items-center justify-center shadow-sm">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                    </svg>
                                    Thêm vào giỏ
                                </button>
                                <button className="w-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center shadow-md">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                    </svg>
                                    Mua ngay
                                </button>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <div className="flex items-center mb-3">
                                    <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="text-gray-700 font-medium">Miễn phí vận chuyển</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                    </svg>
                                    <span className="text-gray-700 font-medium">Đảm bảo hoàn tiền 100%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl shadow-sm border border-purple-100 transition hover:shadow-md">
                        <Link to={`/store-detail/${product.storeId}`} className="flex items-center gap-4 group">
                            <div className="relative">
                                <img
                                    src={store.logo}
                                    alt="Store"
                                    className="w-14 h-14 rounded-full object-cover border-2 border-purple-300 group-hover:border-purple-500 transition-all"
                                />

                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-700 transition">
                                        {store.name || "Tên cửa hàng"}
                                    </h3>
                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-medium">
                                        Official Store
                                    </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600 gap-1">
                                    <span>{store.addressLine || "Địa chỉ chưa cập nhật"}</span>
                                </div>
                            </div>

                        </Link>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-all transform hover:scale-105 shadow-sm hover:shadow">
                            Follow
                        </button>
                    </div>

                    <div className="mt-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">Mô tả sản phẩm</h2>
                        <div className="prose max-w-none text-gray-700 leading-relaxed">
                            {product.description ? (
                                <div dangerouslySetInnerHTML={{ __html: product.description }} />
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <p className="font-medium">Chưa có mô tả cho sản phẩm này</p>
                                    <p className="text-sm mt-2">Vui lòng liên hệ cửa hàng để biết thêm chi tiết</p>
                                </div>
                            )}
                        </div>
                    </div>


                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="mb-8 grid grid-cols-1 md:grid-cols-12 gap-6">
                            <div className="md:col-span-4 bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                                <div className="text-5xl font-bold text-yellow-500">4.8</div>
                                <div className="flex items-center mt-2">
                                    {renderStars(5)}
                                </div>
                                <p className="text-sm text-gray-600 mt-2">619 đánh giá</p>

                                <div className="w-full mt-6 space-y-2">
                                    {[5, 4, 3, 2, 1].map(star => (
                                        <div key={star} className="flex items-center">
                                            <span className="text-sm text-gray-600 w-3">{star}</span>
                                            <span className="text-yellow-400 mx-1">★</span>
                                            <div className="w-full bg-gray-200 rounded-full h-2 ml-2">
                                                <div
                                                    className="bg-yellow-400 h-2 rounded-full"
                                                    style={{ width: star === 5 ? '75%' : star === 4 ? '20%' : '5%' }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-gray-500 ml-2 w-10">
                                                {star === 5 ? '75%' : star === 4 ? '20%' : '5%'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="md:col-span-8 ">
                                <h3 className="text-lg font-semibold mb-4">Bình luận từ khách hàng</h3>

                                <div className="space-y-6">
                                    {reviews.map((review, index) => (
                                        <div key={index} className="border-b border-gray-100 pb-6 last:border-0">
                                            <div className="flex items-start">
                                                <img
                                                    src={review.userReview.avatar}
                                                    alt={review.userReview.fullName}
                                                    className="w-10 h-10 rounded-full object-cover mr-4"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-center">
                                                        <h4 className="font-medium text-gray-800">{review.userReview.fullName}</h4>
                                                        <span className="text-sm text-gray-500">{review.dateCreated}</span>
                                                    </div>
                                                    <div className="flex items-center mt-1 text-yellow-400">
                                                        {renderStars(review.rate)}
                                                    </div>
                                                    {review.comment &&

                                                        <p className="mt-2 text-gray-700">{review.comment.content}</p>
                                                    }
                                                    {review.comment?.replies?.[0]?.content && (
                                                        <div className="bg-gray-100 flex flex-col gap-2 p-3 mt-2  rounded">
                                                            <p className=" text-gray-700 font-semibold text-sm">Phản hồi của người bán</p>
                                                            <p className=" text-gray-700">{review.comment.replies[0].content}</p>

                                                        </div>
                                                    )}


                                                    <div className="flex items-center mt-3">
                                                        <button className="flex items-center text-sm text-gray-500 hover:text-blue-600">
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                                                            </svg>
                                                            3
                                                        </button>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {hasMore && (
                                    <button
                                        className="w-full mt-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-xl hover:bg-gray-200 transition flex items-center justify-center"
                                        onClick={loadMore}
                                        disabled={reviewLoading}
                                    >
                                        <span>{reviewLoading ? "Đang tải thêm..." : "Xem thêm đánh giá"}</span>
                                        {!reviewLoading && (
                                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        )}
                                    </button>
                                )}

                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </div >
    );
};

export default ProductsDetail;