import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import useReview from "../../components/customer/hook/useReview";
import ModalReviewResponse from "../../components/store/ModalReviewResponse";

const Reviews = () => {
    const { user } = useAuth();
    const storeId = user.storeId;
    let productId;
    const { reviews, loadReviews, reviewLoading, error, loadMore, hasMore } = useReview(storeId, productId);
    const [selectedReview, setSelectedReview] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    console.log("reviews: ", reviews)

    const renderStars = (rate) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rate) {
                stars.push(<svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                >
                    <path d="M12 .587l3.668 7.431L24 9.748l-6 5.848L19.335 24 12 20.202 4.665 24 6 15.596 0 9.748l8.332-1.73z" />
                </svg>);
            } else {
                stars.push(<svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-gray-200"
                >
                    <path d="M12 .587l3.668 7.431L24 9.748l-6 5.848L19.335 24 12 20.202 4.665 24 6 15.596 0 9.748l8.332-1.73z" />
                </svg>);
            }
        }
        return stars;
    };

    return (
        <div className="p-6 bg-white rounded-md shadow-sm">
            <ModalReviewResponse isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                review={selectedReview} 
                loadReviews={loadReviews}
                />
            <h2 className="text-lg  mb-4">Danh sách đánh giá shop</h2>

            {/* Bộ lọc trạng thái và sao */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <span className="text-gray-500">Trạng thái</span>
                    <button className="px-3 py-1 border border-purple-600 text-purple-600 rounded-full">Tất cả (44)</button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">To Reply (40)</button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">Đã trả lời (4)</button>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-gray-500">Số sao đánh giá</span>
                    {["Tất cả", "5 Sao(33)", "4 Sao(1)", "3 Sao(0)", "2 Sao(0)", "1 Sao(10)"].map(
                        (label, index) => (
                            <label key={index} className="flex items-center gap-2 px-2">
                                <input type="checkbox" className="form-checkbox size-4" defaultChecked />
                                <span>{label}</span>
                            </label>
                        )
                    )}
                </div>
            </div>

            {/* Thanh tìm kiếm */}
            <div className="flex gap-2 my-5">
                <input
                    type="text"
                    className="border border-gray-300 px-3 py-2 rounded w-[40%]"
                    placeholder="Tên Sản Phẩm, Mã Đơn Hàng, Tên đăng nhập người mua"
                />
                <input
                    type="date"
                    className="border border-gray-300 px-3 py-2 rounded w-[20%]"
                />
                <button className="px-4 py-2 bg-purple-500 text-white rounded w-[10%]">Tìm kiếm</button>
                <button className="px-4 py-2 border border-gray-300 rounded w-[10%]">Đặt lại</button>
            </div>

            {/* Tabs header */}

            <div className="mt-6">
                <div className="grid grid-cols-7  bg-gray-100 text-gray-600 text-sm font-medium px-4 py-3 rounded">
                    <div className="col-span-2 flex justify-start items-center">Thông tin sản phẩm</div>
                    <div className="col-span-4 flex justify-center items-center">Đánh giá người mua</div>
                    <div className="col-span-1 flex justify-center items-center">Thao tác</div>

                </div>
            </div>

            {/* Review Item */}

            {reviews && reviews.map((review, index) => (
                <div className="border mt-1 border-gray-200 rounded p-4 flex flex-col gap-4">
                    {/* Avatar */}
                    <div className=" flex items-center gap-7">
                        <div className="flex items-center">
                            <img
                                src={review.useReview?.avatar}
                                alt={review.useReview?.fullName}
                                className="size-5 rounded-full object-cover mr-4 bg-gray-400"
                            />
                            <span className="text-xs mt-1">{review.useReview?.fullName}</span>
                        </div>
                        <div className="text-xs text-gray-500 mb-1">
                            ID đơn hàng <a href="#" className="text-blue-500 underline">{review.orderId}</a>
                        </div>
                    </div>

                    {/* Order + review content */}

                    <div className="grid grid-cols-7 py-2">

                        <div className="flex col-span-2 h-full border-r border-gray-200  gap-2">
                            <img
                                src={review.product.image}
                                alt={review.product.name}
                                className="size-12 rounded bg-gray-200 text-gray-400"
                            />
                            <div>
                                <div className="font-medium text-sm mb-1">
                                    {review.product.name}
                                </div>
                                <div className="text-xs text-gray-500 mb-2">
                                    {review.product.description}
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 col-span-4 border-r border-gray-200 p-3 ">

                            <div className="flex items-center gap-1 text-yellow-400 mb-2">
                                {renderStars(review.rate)}
                            </div>
                            <div className="text-sm">{review.comment.content}</div>
                            <div className="text-xs text-gray-400 mt-2">{review.comment.createdDate}</div>
                        </div>

                        <div className="flex col-span-1 items-center justify-center p-3">
                            {review.sellerComment ? (
                                <button className="border border-gray-300 px-4 py-1 rounded hover:bg-gray-100">Đã trả lời</button>
                            ) : (
                                <button
                                    onClick={() => { setIsModalOpen(true); setSelectedReview(review) }}
                                    className="border border-gray-300 px-4 py-1 rounded hover:bg-gray-100">Trả lời</button>
                            )}
                        </div>

                    </div>

                </div>
            ))}
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
    );
};

export default Reviews;
