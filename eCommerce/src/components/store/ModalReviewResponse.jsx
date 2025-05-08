import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Process from './Process';
import { authAPIs, endpoints } from '../../configs/APIs';

const ModalReviewResponse = ({ isOpen, onClose, review, loadReviews }) => {
    const [reply, setReply] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen || !review) return null;

    const maxChars = 300;

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



    if (!isOpen) return null;

    const handleReplySubmit = async () => {
        if (!reply.trim()) {
            setError("Phản hồi không được để trống!");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                content: reply,
                reviewId: review.id,
            };
            console.log("payload: ", payload)
            const response = await authAPIs().post(endpoints.reviewResponse, payload);
            if (response.status === 200) {
                console.log("response 200")
                loadReviews()
                onClose();

                setReply('');
                setError(null);
            }
        } catch (err) {
            console.error(err);
            setError("Đã xảy ra lỗi khi gửi phản hồi!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            {loading && <Process />}
            <div className="bg-white w-[600px] rounded shadow-lg p-6 max-h-[90vh] overflow-y-auto relative">
                <div className="text-lg font-semibold mb-4">Phản hồi</div>

                {/* Info người đánh giá */}
                <div className="flex items-center gap-3 mb-3">
                    <img
                        src={review.userReview.avatar}
                        alt="avatar"
                        className="size-6 rounded-full object-cover"
                    />
                    <span className="font-medium text-sm text-gray-600">{review.userReview.fullName}</span>
                    <div className="flex items-center gap-1 text-yellow-400">
                        {renderStars(review.rate)}
                    </div>
                </div>

                {/* Nội dung đánh giá */}
                <p className="text-sm font-semibold text-gray-800 mb-4">
                    {review.comment.content}
                </p>

                {/* Textarea phản hồi */}
                <textarea
                    className="w-full p-3 bg-gray-100 rounded text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={4}
                    maxLength={maxChars}
                    placeholder="Nhập Phản hồi của bạn"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                />

                {/* Số ký tự */}
                <div className="text-xs text-gray-500 text-right mt-1">{reply.length}/{maxChars}</div>
                <div className="text-sm text-red-500 mt-1">{error}</div>


                {/* Nút hành động */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleReplySubmit}
                        className="bg-purple-600 text-white px-6 py-2 rounded text-sm hover:bg-purple-700"
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalReviewResponse;
