import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
    const { removeProductCart, cart, updateQuantity } = useCart();
    const navigate = useNavigate();
    const [listProductIds, setListProductIds] = useState([]);


    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelectItem = (productId) => {
        setSelectedItems((prevSelected) => {
            if (prevSelected.includes(productId)) {
                return prevSelected.filter(id => id !== productId);
            } else {
                return [...prevSelected, productId];
            }
        });
    };

    const handleSelectStore = (subCartId) => {
        const listStoreProductIds = cart.subCarts.find(sc => sc.subCartId === subCartId)?.items.map(item => item.product.id) || [];
        const allSelected = listStoreProductIds.every(id => selectedItems.includes(id));
        if (allSelected) {
            setSelectedItems(prev => prev.filter(id => !listStoreProductIds.includes(id)));
        } else {
            const newSelectedItems = [...selectedItems];
            listStoreProductIds.forEach(id => {
                if (!newSelectedItems.includes(id)) {
                    newSelectedItems.push(id);
                }
            });
            setSelectedItems(newSelectedItems);
        }
    }

    const handleSelectAll = () => {
        if (!cart?.subCarts) return;
        const allProductIds = cart.subCarts.flatMap(subCart =>
            subCart.items.map(item => item.product.id)
        );
        const allSelected = allProductIds.length > 0 &&
            allProductIds.every(id => selectedItems.includes(id));

        if (allSelected) {
            setSelectedItems([]);
        } else {
            setSelectedItems(allProductIds);
        }
    };

    const isStoreSelected = (subCartId) => {
        const storeProductIds = cart.subCarts
            .find(sc => sc.subCartId === subCartId)
            ?.items.map(item => item.product.id) || [];

        return storeProductIds.length > 0 &&
            storeProductIds.every(id => selectedItems.includes(id));
    };


    const isAllSelected = () => {
        if (!cart?.subCarts || cart.subCarts.length === 0) return false;

        const allProductIds = cart.subCarts.flatMap(subCart =>
            subCart.items.map(item => item.product.id)
        );

        return allProductIds.length > 0 &&
            allProductIds.every(id => selectedItems.includes(id));
    };


    const calculateSubtotal = () => {
        if (!cart?.subCarts) return 0;

        return cart.subCarts.reduce((total, subCart) => {
            const subCartTotal = subCart.items.reduce((subTotal, item) => {
                if (selectedItems.includes(item.product.id)) {
                    return subTotal + (item.unitPrice * item.quantity);
                }
                return subTotal;
            }, 0);
            return total + subCartTotal;
        }, 0);
    };

    const calculateShipping = () => {
        if (!cart?.subCarts) return 0;
        const storesWithSelectedItems = cart.subCarts.filter(subCart =>
            subCart.items.some(item => selectedItems.includes(item.product.id))
        ).length;
        return storesWithSelectedItems * 30000;
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateShipping();
    };


    const handleCheckout = () => {
        if (selectedItems.length === 0) return;

        const subOrderItems = [];

        cart.subCarts.forEach(subCart => {
            const selectedItemsInStore = subCart.items.filter(item =>
                selectedItems.includes(item.product.id)
            );

            if (selectedItemsInStore.length > 0) {
                const subCartItemIds = selectedItemsInStore.map(item => ({
                    productId: item.product.id,
                    productAvatar: item.product.image,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice
                }));
                const storeShippingCost = 30000;

                const itemsTotal = subCartItemIds.reduce((sum, item) => {
                    return sum + item.quantity * item.unitPrice;
                }, 0);

                const total = itemsTotal + storeShippingCost;
                subOrderItems.push({
                    storeId: subCart.storeId,
                    storeName: subCart.storeName,
                    storeLogo: subCart.storeAvatar,
                    shippingCost: storeShippingCost,
                    subCartItemIds: subCartItemIds,
                    total: total
                });
            }
        });


        const checkoutData = {
            subOrderItems: subOrderItems
        };
        navigate('/products', {
            state: {
                checkoutData
            }
        });
        console.log('Checkout data:', checkoutData);
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
            <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>

            {!cart?.subCarts || cart.subCarts.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-5xl mb-4">🛒</div>
                    <h2 className="text-xl font-semibold mb-2">Giỏ hàng của bạn đang trống</h2>
                    <p className="text-gray-500 mb-6">Hãy khám phá và tìm kiếm sản phẩm bạn yêu thích</p>
                    <Link to='/products'>
                        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                            Tiếp tục mua sắm
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-2/3 space-y-4">
                        <div className="bg-white shadow-sm rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 mr-3 accent-blue-500"
                                    checked={isAllSelected()}
                                    onChange={handleSelectAll}
                                />
                                <span className="font-medium">Chọn tất cả</span>
                            </div>
                            <div className="text-sm text-gray-500">
                                {cart.itemsNumber} sản phẩm
                            </div>
                        </div>

                        {cart.subCarts.map((subCart) => (
                            <div key={subCart.subCartId} className="bg-white shadow-sm rounded-lg overflow-hidden">
                                <div className="p-4 flex items-center bg-blue-50">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 mr-3 accent-blue-500"
                                        checked={isStoreSelected(subCart.subCartId)}
                                        onChange={() => handleSelectStore(subCart.subCartId)}
                                    />
                                    <img src={subCart.storeAvatar} alt={subCart.storeName} className="w-8 h-8 rounded-full object-cover mr-3" />
                                    <h2 className="font-semibold">{subCart.storeName}</h2>
                                </div>

                                <div>
                                    {subCart.items.map((item, index) => (
                                        <div
                                            key={item.product.id}
                                            className={`p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 ${index < subCart.items.length - 1 ? "border-b border-gray-100" : ""
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="w-5 h-5 mr-3 accent-blue-500"
                                                    checked={selectedItems.includes(item.product.id)}
                                                    onChange={() => handleSelectItem(item.product.id)}
                                                />
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    className="w-20 h-20 object-cover rounded-md shadow-sm"
                                                />
                                            </div>

                                            <div className="flex-grow">
                                                <h3 className="font-medium text-gray-800">{item.product.name}</h3>
                                                <p className="text-sm text-gray-500 mb-2">{item.product.manufacturer}</p>
                                                <div className="flex flex-wrap items-center gap-4">
                                                    <div className="flex items-center border border-gray-200 rounded-md">
                                                        <button
                                                            className="px-3 py-1 text-gray-600 hover:bg-gray-50"
                                                            disabled={item.quantity <= 1}
                                                            onClick={() => updateQuantity(subCart.subCartId, item.product.id, -1)}
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            max="10"
                                                            readOnly
                                                            value={item.quantity}
                                                            className="w-12 text-center border-x border-gray-200 py-1"
                                                        />
                                                        <button
                                                            className="px-3 py-1 text-gray-600 hover:bg-gray-50"
                                                            disabled={item.quantity >= 10}
                                                            onClick={() => updateQuantity(subCart.subCartId, item.product.id, 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        className="text-sm text-red-500 hover:text-red-600"
                                                        onClick={() => removeProductCart(item.product.id)}
                                                    >
                                                        Xóa
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="font-bold text-lg">
                                                {formatCurrency(item.unitPrice * item.quantity)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className="lg:w-1/3">
                        <div className="bg-white shadow-sm rounded-lg p-5 sticky top-4">
                            <h2 className="text-xl font-semibold mb-4">Thông tin đơn hàng</h2>

                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tạm tính:</span>
                                    <span className="font-medium">{formatCurrency(calculateSubtotal())}</span>

                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Phí vận chuyển:</span>
                                    <span className="font-medium">{formatCurrency(calculateShipping())}</span>
                                </div>
                                <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between font-bold">
                                    <span>Tổng thanh toán:</span>
                                    <span className="text-blue-600">{formatCurrency(calculateTotal())}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={handleCheckout}
                                    className="w-full py-3 rounded-lg transition-colors font-medium bg-blue-500 text-white hover:bg-blue-600"
                                >
                                    Thanh toán
                                </button>
                                <Link to='/products'>
                                    <button className="w-full border border-blue-500 text-blue-500 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                                        Tiếp tục mua sắm
                                    </button>
                                </Link>
                            </div>

                            <div className="mt-6 space-y-2">
                                <p className="flex items-center gap-2 text-sm text-gray-500">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Thanh toán bảo mật
                                </p>
                                <p className="flex items-center gap-2 text-sm text-gray-500">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    Đảm bảo hoàn tiền
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;