import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

const OAuth2CallbackHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    useEffect(() => {
        const token = new URLSearchParams(location.search).get('token');

        const fetchUserInfo = async () => {
            try {
                const res = await fetch('http://localhost:8080/webapp_war_exploded/api/auth/me', {
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