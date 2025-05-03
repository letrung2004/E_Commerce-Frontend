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
    'myOrders': '/secure/orders/all',
    'removeAddress': addressId => `/secure/address/remove/${addressId}`,
    'addReviews': 'secure/reviews/add',
    'productDetail': productId => `/products/${productId}`,
    'storeDetail': storeId => `/store/${storeId}`,
    'getCart': '/secure/cart',
    'addToCart': productId => `/secure/cart/add/${productId}`,
    'removeProductCart': productId => `/secure/cart/remove/${productId}`,
    'updateCartItem': 'secure/cart/update-quantity',


    // APIs for seller
    'createStore': '/secure/store-activation',

    'getCategories': (storeId) => `/store/${storeId}/categories`,
    'updateCategory': (categoryId) => `/secure/store/categories/${categoryId}`,
    'getProducts': (storeId) => `/store/${storeId}/products`,
    'createProduct': '/secure/store/products',
    'updateProduct': (productId) => `/secure/store/products/${productId}`,
    'createCategory': '/secure/store/categories',
    'changeStatus': (productId) => `/secure/store/update-status/${productId}`,



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