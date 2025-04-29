import axios from "axios"
import cookie from "react-cookies"

export const BASE_URL = 'http://localhost:8080/webapp_war_exploded/api/'

export const endpoints = {
    // APIs for auth
    'register': '/auth/register',
    'login': '/auth/login',
    'google-login': '/oauth2/authorization/google',
    'current-user': 'auth/me',


    // APIs for customer
    'products': '/products',
    'createAddress': '/secure/address/create',
    'myAddress': '/secure/address/my',
    'removeAddress': addressId => `/secure/address/remove/${addressId}`,
    'productDetail': productId => `/products/${productId}`,


    // APIs for seller
    'createStore': '/secure/store-activation',

    'getCategories': (storeId) => `/secure/store/${storeId}/categories`,
    'createCategory': (storeId) => `/secure/store/${storeId}/categories`,
    'updateCategory': (storeId, categoryId) => `/secure/store/${storeId}/categories/${categoryId}`,
    'getProducts': (storeId) => `/secure/store/${storeId}/products`,
    'createProduct': (storeId) => `/secure/store/${storeId}/products`,
    'updateProduct': (storeId, productId) => `/secure/store/${storeId}/products/${productId}`,



}


export const authAPIs = () => {
    const token = cookie.load("jwtToken");
    console.log("token from APIs: ", token)
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}



export default axios.create({
    baseURL: BASE_URL
});