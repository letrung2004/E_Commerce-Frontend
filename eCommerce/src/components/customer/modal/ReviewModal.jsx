import { useState, useEffect } from "react";
import StarRating from "../StarRating";
import { authAPIs, endpoints } from "../../../configs/APIs";

const ReviewModal = ({ isOpen, onClose, orderDetails, fetchOrders }) => {
    const [productRatings, setProductRatings] = useState([]);
    const [orderDetailIds, setOrderDetailIds] = useState([]);
    const [comments, setComments] = useState([]);
    const [sellerRating, setSellerRating] = useState(5);
    const [shippingRating, setShippingRating] = useState(5);

    console.log("orderDetails review: ", orderDetails)

    useEffect(() => {
        if (orderDetails && orderDetails.length > 0) {
            setProductRatings(orderDetails.map(() => 5)); // mặc định 5 sao mỗi sản phẩm
            setOrderDetailIds(orderDetails.map(detail => detail.id));
        }

    }, [orderDetails]);

    const ratingLabels = {
        1: 'Tệ',
        2: 'Không hài lòng',
        3: 'Bình thường',
        4: 'Hài lòng',
        5: 'Tuyệt vời'
    };

    const handleRatingChange = (index, value) => {
        const updated = [...productRatings];
        updated[index] = value;
        setProductRatings(updated);
    }

    const handleCommentChange = (index, value) => {
        const updatedComments = [...comments];
        updatedComments[index] = value;
        setComments(updatedComments);
    }


    const handleAddReview = async () => {
        console.log("product ratings: ", productRatings)
        console.log("orderDetailIds: ", orderDetailIds)
        console.log("comments: ", comments)

        const data = {
            "orderDetailIds": orderDetailIds,
            "comments": comments,
            "rates": productRatings
        }

        try {
            let response = await authAPIs().post(endpoints.addReviews, data)
            if (response.status === 200) {
                console.log("OK 200");

                onClose()
                if (fetchOrders) {
                    await fetchOrders(); // ✅ cập nhật lại đơn hàng → nút đánh giá biến mất
                }

            } else {
                console.log("FAILED");
            }

        } catch (error) {
            console.error(error)
        } finally {

        }
    }

    const handleCloseModal = () => {
        setComments([])
        onClose()
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white w-[700px] max-h-[90vh] rounded shadow-lg overflow-y-auto hide-scrollbar p-6">
                <h2 className="text-xl font-semibold mb-4">Đánh Giá Sản Phẩm</h2>

                {orderDetails && orderDetails.length > 0 ? (
                    orderDetails.map((detail, index) => (
                        <div key={index} className=' mb-10'>
                            {/* Sản phẩm */}
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-20 h-20 bg-gray-100 flex items-center justify-center text-gray-400">
                                    <img src={detail.product.image} alt={detail.product.name} className="w-full h-full object-cover rounded" />
                                </div>
                                <div>
                                    <p className="font-semibold">{detail.product.name}</p>
                                    <p className="text-sm text-gray-600">Phân loại hàng: B5 BASIC 5%</p>
                                </div>
                            </div>

                            {/* Đánh giá sao sản phẩm */}
                            <div className="mb-4 flex gap-8 items-center">
                                <p className="">Chất lượng sản phẩm</p>
                                <div className="flex items-center gap-2">
                                    <StarRating
                                        rating={productRatings[index] || 5}
                                        onChange={(value) => handleRatingChange(index, value)}
                                    />
                                    <span className="text-sm ml-2 text-gray-700">
                                        {ratingLabels[productRatings[index] || 5]}
                                    </span>
                                </div>
                            </div>

                            {/* Đánh giá văn bản */}
                            <div className="mb-4 space-y-4">
                                <textarea
                                    className="w-full border border-gray-300 rounded p-2"
                                    rows={3}
                                    placeholder="Viết đánh giá..."
                                    value={comments[index] || ""}
                                    onChange={(e) => handleCommentChange(index, e.target.value)}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Không có đơn hàng nào.</p>
                )}

                {/* Nút hành động */}
                <div className="flex justify-end gap-3">
                    <button onClick={handleCloseModal} className="px-6 py-2 border border-gray-400 rounded hover:bg-gray-50">
                        TRỞ LẠI
                    </button>
                    <button className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                        onClick={handleAddReview}
                    >
                        HOÀN THÀNH
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
