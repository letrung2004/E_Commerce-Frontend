import { useState, useEffect } from "react";
import { authAPIs, endpoints } from "../../../configs/APIs";

const useOrders = (status) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadOrders = async () => {
        setLoading(true);
        try {
            let url = endpoints.myOrders;
            if (status && status !== "Tất cả") {
                url += `?status=${status}`;
            }

            const response = await authAPIs().get(url);
            if (response.status === 200) {
                console.log("orders: ", response.data)
                setOrders(response.data);
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

        loadOrders();
    }, [status]);

    return { orders, loading, error };
};

export default useOrders;
