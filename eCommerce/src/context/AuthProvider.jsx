import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authAPIs, endpoints } from '../configs/APIs';
import cookie from "react-cookies"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (userData, token) => {
        // localStorage.setItem('jwtToken', token);
        cookie.save('jwtToken', token, { path: '/' });
        console.log("Token:", token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(userData);
    };

    const logout = () => {
        // localStorage.removeItem('jwtToken');
        cookie.remove('jwtToken', { path: '/' });
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await authAPIs().get(endpoints['current-user']);
                setUser(response.data);
                console.log(token)
            } catch (error) {
                console.error('Lỗi khi load user:', error);
                logout();
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);


    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };