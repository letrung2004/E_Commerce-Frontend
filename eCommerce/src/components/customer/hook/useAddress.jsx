import { useState, useEffect } from "react";
import { authAPIs, endpoints } from "../../../configs/APIs";

const useAddress = (defaultAddress) => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadAddresses = async () => {
        setLoading(true);
        try {
            let url = endpoints.myAddress;
            if (defaultAddress) {
                url += `?defaultAddress=${defaultAddress}`;
            }   

            const response = await authAPIs().get(url);
            if (response.status === 200) {
                setAddresses(response.data);
            } else {
                throw new Error("Failed to load addresses");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        loadAddresses();
    }, [defaultAddress]);

    return { addresses, loading, setLoading, error };
};

export default useAddress;
