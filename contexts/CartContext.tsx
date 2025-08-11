import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { CartItem, Product, Spell, SpellBookingDetails } from '../types';

interface CartContextType {
    items: CartItem[];
    addItem: (item: Product | Spell, quantityOrDetails: number | SpellBookingDetails) => void;
    removeItem: (itemId: string) => void;
    updateQuantity: (productId: string, newQuantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    totalItems: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        try {
            const localData = localStorage.getItem('cartItems');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Error parsing cart items from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(items));
    }, [items]);

    const addItem = useCallback((item: Product | Spell, quantityOrDetails: number | SpellBookingDetails) => {
        setItems(prevItems => {
            if ('remedyFor' in item) { // It's a Product
                const quantity = quantityOrDetails as number;
                const existingItemIndex = prevItems.findIndex(i => i.type === 'product' && i.productId === item.id);
                if (existingItemIndex > -1) {
                    const updatedItems = [...prevItems];
                    const existingCartItem = updatedItems[existingItemIndex] as CartItem;
                    if(existingCartItem.type === 'product'){
                       updatedItems[existingItemIndex] = { ...existingCartItem, quantity: existingCartItem.quantity + quantity };
                    }
                    return updatedItems;
                } else {
                    const newItem: CartItem = {
                        id: `product-${item.id}`,
                        type: 'product',
                        productId: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.images[0],
                        quantity: quantity,
                    };
                    return [...prevItems, newItem];
                }
            } else { // It's a Spell
                const bookingDetails = quantityOrDetails as SpellBookingDetails;
                const newItem: CartItem = {
                    id: `spell-${item.id}-${Date.now()}`, // Unique ID for each spell booking
                    type: 'spell',
                    spellId: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.images[0],
                    bookingDetails,
                    quantity: 1,
                };
                return [...prevItems, newItem];
            }
        });
    }, []);

    const removeItem = useCallback((itemId: string) => {
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    }, []);

    const updateQuantity = useCallback((productId: string, newQuantity: number) => {
        setItems(prevItems => {
            const updatedItems = prevItems.map(item => {
                if (item.id === `product-${productId}` && item.type === 'product') {
                    return { ...item, quantity: Math.max(1, newQuantity) };
                }
                return item;
            });
            return updatedItems.filter(item => item.type !== 'product' || item.quantity > 0);
        });
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, cartTotal, totalItems }}>
            {children}
        </CartContext.Provider>
    );
};