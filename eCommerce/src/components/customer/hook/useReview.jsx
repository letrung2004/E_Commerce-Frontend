import { useState, useEffect } from "react";
import APIs, { authAPIs, endpoints } from "../../../configs/APIs";

const useReview = (storeId, productId) => {
    
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const loadReviews = async () => {
        if (!storeId) return;

        setLoading(true);
        try {
            let url = `${endpoints.getReviews(storeId)}`;
            let params = new URLSearchParams();
            params.append("page", page);
            if (productId) params.append("productId", productId);
            url += `?${params.toString()}`;

            const response = await APIs.get(url);
            if (response.status === 200) {
                const data = response.data;
                setReviews(prev =>
                    page === 1 ? data : [...prev, ...data]
                );
                setHasMore(data.length >= 2);
            } else {
                throw new Error("Failed to load reviews");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPage(1);
        setReviews([]);
        setHasMore(true);
    }, [storeId, productId]);

    useEffect(() => {
        loadReviews();
    }, [page, storeId, productId]);

    return { reviews, loading, error, loadMore: () => setPage(prev => prev + 1), page, hasMore };
};

export default useReview;
