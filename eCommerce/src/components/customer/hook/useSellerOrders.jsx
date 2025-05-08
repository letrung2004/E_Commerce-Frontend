import { useState, useEffect } from "react";
import { authAPIs, endpoints } from "../../../configs/APIs";

const useSellerOrders = (storeId, status) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const loadOrders = async () => {
        if (!storeId) return; // không gọi nếu chưa có storeId

        setLoading(true);
        try {
            let url = endpoints.getSellerOrders(storeId); 
            let params = new URLSearchParams();
            if (status && status !== "Tất cả") params.append("status", status);
            params.append("page", page);
            url += `?${params.toString()}`;

            const response = await authAPIs().get(url);
            if (response.status === 200) {
                const data = response.data;
                setOrders(prev => page === 1 ? data : [...prev, ...data]);
                setHasMore(data.length === 10); // giả định 10 là page size
            } else {
                throw new Error("Failed to load orders");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPage(1); // reset khi status thay đổi
    }, [status, storeId]);

    useEffect(() => {
        loadOrders();
    }, [status, page, storeId]);

    return { orders, loading, error, loadOrders, setPage, page, hasMore };
};

export default useSellerOrders;
