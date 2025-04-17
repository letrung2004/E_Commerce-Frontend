import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuth2CallbackHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Lấy token từ URL
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            localStorage.setItem('authToken', token);
            fetchUserInfo(token);
            navigate('/');
        } else {
            navigate('/login', { state: { error: 'Đăng nhập không thành công' } });
        }
    }, [location, navigate]);

    const fetchUserInfo = async (token) => {
        try {
            const response = await fetch('http://localhost:8080/webapp_war_exploded/api/auth/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const userData = await response.json();
                console.log("User info:", userData);
                console.log("Token:", token);
                localStorage.setItem('user', JSON.stringify(userData));
            }
        } catch (error) {
            console.error('Lỗi khi lấy thông tin người dùng:', error);
        }
    };

    return (
        <div className="oauth-callback">
            <h2>Đang xử lý đăng nhập...</h2>
        </div>
    );
};

export default OAuth2CallbackHandler;