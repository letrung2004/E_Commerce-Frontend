import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authAPIs, endpoints } from '../configs/APIs';
import { useAuth } from './AuthProvider';

const CartContext = createContext();
const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState(null);
    const [totalItems, setTotalItems] = useState(0);

    const loadCart = async () => {
        try {
            const res = await authAPIs().get(endpoints.getCart);
            setCart(res.data);
            const itemTypeCount = res.data?.itemsNumber || 0;
            setTotalItems(itemTypeCount);
            console.log(res.data);
        } catch (err) {
            console.error("Lỗi lấy giỏ hàng:", err);
        }
    };

    const addToCart = async (productId, quantity) => {
        try {
            const res = await authAPIs().post(`${endpoints.addToCart(productId)}?quantity=${quantity}`);
            setCart(res.data);
            await loadCart();
        } catch (err) {
            console.error("Lỗi thêm giỏ hàng:", err);
        }
    }

    const removeProductCart = async (productId) => {
        try {
            const res = await authAPIs().delete(`${endpoints.removeProductCart(productId)}`);
            setCart((prevCart) => {
                const updatedSubCarts = prevCart.subCarts.map((subCart) => {
                    const filteredItems = subCart.items.filter(
                        (item) => item.product.id !== productId
                    );
                    return { ...subCart, items: filteredItems };
                }).filter(subCart => subCart.items.length > 0);

                const newTotalItems = updatedSubCarts.flatMap(subCart => subCart.items).length;
                setTotalItems(newTotalItems);

                return { ...prevCart, subCarts: updatedSubCarts };
            });


        } catch (err) {
            console.error("Lỗi xóa giỏ hàng:", err);
        }
    }

    const updateQuantity = async (subCartId, productId, quantityChange) => {
        try {
            const res = await authAPIs().post(
                `${endpoints.updateCartItem}?subCartId=${subCartId}&productId=${productId}&quantityChange=${quantityChange}`
            );
            setCart((prevCart) => {
                const updatedSubCarts = prevCart.subCarts.map((subCart) => {
                    if (subCart.subCartId === subCartId) {
                        return {
                            ...subCart,
                            items: subCart.items.map((item) => {
                                if (item.product.id === productId) {
                                    return {
                                        ...item,
                                        quantity: item.quantity + quantityChange,
                                    };
                                }
                                return item;
                            }),
                        };
                    }
                    return subCart;
                });

                return { ...prevCart, subCarts: updatedSubCarts };
            });
        } catch (err) {
            console.error("Lỗi cập nhật:", err);
        }
    }   



    useEffect(() => {
        if (user) {
            loadCart();
        } else {
            setCart(null);
            setTotalItems(0);
        }
    }, [user]);

    return (
        <CartContext.Provider value={{ cart, totalItems, addToCart, loadCart, updateQuantity, removeProductCart }}>
            {children}
        </CartContext.Provider>
    );
}
const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
