import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Kiểm tra xem người dùng đã đăng nhập chưa khi tải trang
        const loadUser = async () => {
            const token = localStorage.getItem('jwtToken');

            if (token) {
                try {

                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                    // Lấy thông tin người dùng từ JWT
                    const response = await axios.get('http://localhost:8080/webapp_war_exploded/api/auth/me');
                    setUser(response.data);
                } catch (error) {
                    console.error('Error loading user:', error);
                    localStorage.removeItem('jwtToken');
                    delete axios.defaults.headers.common['Authorization'];
                }
            }

            setLoading(false);
        };

        loadUser();
    }, []);

    // Đăng xuất
    const logout = () => {
        localStorage.removeItem('jwtToken');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    // Cập nhật header cho tất cả các request
    axios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };