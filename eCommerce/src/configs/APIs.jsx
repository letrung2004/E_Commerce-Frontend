import axios from "axios"
import cookie from "react-cookies"

// SERVER TRUNG
export const BASE_URL = 'http://localhost:8080/webapp_war_exploded/api/'


// SERVER DAT 
// const BASE_URL = '..........'

export const endpoints = {
    // APIs for auth
    'register': '/auth/register',
    'login': '/auth/login',
    'google-login': '/oauth2/authorization/google',
    'current-user': 'auth/me',


    // APIs for customer
    'getCategories': (storeId) => `/secure/store/${storeId}/categories`,
    'createCategory': (storeId) => `/secure/store/${storeId}/categories`,
    'products': '/products',
    'createAddress':'/secure/address/create',


    // APIs for seller
    'createStore' : '/secure/store-activation',

}

export const authAPIs = () => {
   
    const token = localStorage.getItem('jwtToken');
    console.info("Token được sử dụng:", token);

    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
}



export default axios.create({
    baseURL: BASE_URL
});