import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { BASE_URL, endpoints } from '../../configs/APIs';
import cookie from "react-cookies"

const OAuth2CallbackHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    useEffect(() => {
        const token = new URLSearchParams(location.search).get('token');
        // cookie.save("jwtToken", res.data.token)
        const fetchUserInfo = async () => {
            try {
                const res = await fetch(`${BASE_URL}${endpoints['current-user']}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const userData = await res.json();
                login(userData, token);
                console.info("Current User: ", userData)
                navigate("/");
            } catch (err) {
                navigate("/login", { state: { error: 'Đăng nhập thất bại' } });
            }
        };

        if (token) fetchUserInfo();
        else navigate("/login");
    }, []);

    return (
        <div className="oauth-callback">
            <h2>Đang xử lý đăng nhập...</h2>
        </div>
    );
};

export default OAuth2CallbackHandler;