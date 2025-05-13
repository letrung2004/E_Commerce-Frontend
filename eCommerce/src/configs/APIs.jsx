import axios from "axios"
import cookie from "react-cookies"

export const BASE_URL = 'http://localhost:8080/webapp_war_exploded/api/'

export const endpoints = {
    // APIs for auth
    'register': '/auth/register',
    'login': '/auth/login',
    'google-login': '/oauth2/authorization/google',
    'current-user': 'auth/me',
    'update-user': '/secure/update-profile',


    // APIs for customer
    'products': '/products',
    'createAddress': '/secure/address/create',
    'myAddress': '/secure/address/my',
    'myOrders': '/secure/orders/all',
    'addReviews': 'secure/reviews/add',
    'placeOrder': '/secure/orders/place-order',
    'removeAddress': addressId => `/secure/address/remove/${addressId}`,
    'setDefaultAddress': addressId => `/secure/address/set-default/${addressId}`,
    'productDetail': productId => `/products/${productId}`,
    'storeDetail': storeId => `/store/${storeId}`,
    'getCart': '/secure/cart',
    'addToCart': productId => `/secure/cart/add/${productId}`,
    'removeProductCart': productId => `/secure/cart/remove/${productId}`,
    'updateCartItem': 'secure/cart/update-quantity',
    'stores': '/stores',
    'getReviews':  storeId => `/reviews/${storeId}`,
    



    // APIs for VNPay
    'vnPayReturn': '/v1/payment/vnpay-return',


    // APIs for seller
    'createStore': '/secure/store-activation',

    'getSellerOrders': storeId => `/secure/store/${storeId}/orders/all`,
    'getCategories': (storeId) => `/store/${storeId}/categories`,
    'updateCategory': (categoryId) => `/secure/store/categories/${categoryId}`,
    'getProducts': (storeId) => `/store/${storeId}/products`,
    'createProduct': '/secure/store/products',
    'updateProduct': (productId) => `/secure/store/products/${productId}`,
    'createCategory': '/secure/store/categories',
    'changeStatus': (productId) => `/secure/store/update-status/${productId}`,
    'updateOrderStatus': '/secure/orders/update',
    'reviewResponse': '/secure/comment/create',
    'registerFcmToken':'/secure/notifications/register-token',
    'unRegisterFcmToken':'/secure/notifications/unregister-token',
    'getUserTokens':'/secure/notifications/tokens'  
   


}


export const authAPIs = () => {
    const token = cookie.load("jwtToken");
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