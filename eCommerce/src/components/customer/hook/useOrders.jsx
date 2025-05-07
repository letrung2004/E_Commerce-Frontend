import { useState, useEffect } from "react";
import { authAPIs, endpoints } from "../../../configs/APIs";

const useOrders = (status) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const loadOrders = async () => {
        setLoading(true);
        try {
            let url = endpoints.myOrders;
            let params = new URLSearchParams();
            if (status && status !== "Tất cả") params.append("status", status);
            params.append("page", page);
            url += `?${params.toString()}`;
    
            const response = await authAPIs().get(url);
            if (response.status === 200) {
                const data = response.data;
                setOrders(prev => page === 1 ? data : [...prev, ...data]);
                setHasMore(data.length === 10); 
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
        setPage(1); // reset về trang 1 nếu status thay đổi
    }, [status]);

    useEffect(() => {

        loadOrders();
    }, [status, page]);

    return { orders, loading, error, loadOrders, setPage, page, hasMore };
};

export default useOrders;
