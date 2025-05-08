import React from 'react'
import { useParams } from 'react-router-dom';
import useReview from '../../components/customer/hook/useReview';

const StoreReview = () => {
    const { storeId } = useParams();
    let productId;
    const { reviews, loadReviews, reviewLoading, error, loadMore, hasMore } = useReview(storeId, productId);
console.log("reviews: ", reviews)
    const reviewSummary = {
        average: 4.9,
        total: 125,
        breakdown: {
            5: 119,
            4: 4,
            3: 2,
            2: 0,
            1: 0
        }
    };

    const review = [
        {
            username: 'hoang_dieu_1903',
            avatar: 'https://example.com/avatar1.jpg',
            rating: 5,
            time: '2025-05-08 10:55',
            product: 'DRCEUTICS Sữa Rửa Mặt Sạch Sâu',
            variant: 'Gentle Foam 150ml',
            comment: ''
        },
        {
            username: '_yen.nhi1607',
            avatar: '',
            rating: 5,
            time: '2025-05-08 10:48',
            product: 'PHIÊN BẢN TỰ TÂM DRCEUTICS N...',
            variant: 'Gentle Foam 150ml',
            comment: ''
        }
    ];

    const renderStars = (rate) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rate) {
                stars.push(<svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-3 h-3"
                >
                    <path d="M12 .587l3.668 7.431L24 9.748l-6 5.848L19.335 24 12 20.202 4.665 24 6 15.596 0 9.748l8.332-1.73z" />
                </svg>);
            } else {
                stars.push(<svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-3 h-3 text-gray-200"
                >
                    <path d="M12 .587l3.668 7.431L24 9.748l-6 5.848L19.335 24 12 20.202 4.665 24 6 15.596 0 9.748l8.332-1.73z" />
                </svg>);
            }
        }
        return stars;
    };
    return (
        <div className="w-full bg-gray-100">
            <div className="w-[70%] mx-auto p-6 space-y-4 bg-white">

                <h2 className="text-xl font-semibold mb-4">Đánh giá Shop▾</h2>

                <div className="rounded-md bg-purple-50 p-4 flex items-center justify-between">
                    <div className='flex flex-col gap-2'>
                        <p className="text-3xl text-purple-500 font-bold">{reviewSummary.average} <span className="text-base font-normal text-black">trên 5</span></p>
                        <div className="flex items-center gap-1 text-purple-500 mb-2">
                            {renderStars(5)}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {['Tất Cả', '5 Sao', '4 Sao', '3 Sao', '2 Sao', '1 Sao'].map((label, i) => (
                            <button
                                key={i}
                                className={`border border-gray-200 bg-white rounded px-4 py-1 ${i === 0 ? 'border-purple-500 text-purple-500' : 'text-gray-700'}`}
                            >
                                {label} {i > 0 && `(${reviewSummary.breakdown[6 - i]})`}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="">
                    {reviews.map((review, idx) => (
                        <div key={idx} className="py-6 flex gap-2 border-b border-gray-200">
                            <div className="">
                                <img
                                    src={review.userReview?.avatar}
                                    alt={review.userReview?.fullName}
                                    className="w-8 h-8 rounded-full object-cover bg-gray-200"
                                />

                            </div>

                            <div>
                                <div className='flex flex-col gap-1'>
                                    <span className="text-[14px]">{review.userReview?.fullName}</span>
                                    <div className="flex items-center gap-1 text-purple-500">
                                        {renderStars(review.rate)}
                                    </div>
                                    <div className="text-[12px] text-gray-500">
                                        {review.dateCreated} | Phân loại hàng: {review.product.description}
                                    </div>
                                </div>

                                <div className="py-4">
                                    {review.comment.content}
                                </div>
                                <div className="flex gap-2 items-start bg-gray-100 p-2 rounded">
                                    <img
                                        src={review.product?.image}
                                        alt={review.product?.name}
                                        className="w-16 h-16 object-cover"
                                    />
                                    <div>
                                        <p className="text-sm font-medium">{review.product?.name}</p>
                                        <p className="text-sm text-gray-500">Phân loại hàng: {review.product.description}</p>
                                    </div>
                                </div>
                                <button className="mt-2 text-sm text-gray-600 flex items-center gap-1">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                                    </svg>
                                    Hữu ích?
                                </button>
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
    );
}

export default StoreReview