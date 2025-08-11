import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { PlusIcon, MinusIcon, XIcon, ShoppingCartIcon } from '../components/Icons';
import { CartItem } from '../types';

const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
    const { removeItem, updateQuantity } = useCart();

    return (
        <div className="flex items-center gap-4 py-4 border-b border-brand-surface">
            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
            <div className="flex-1">
                <h3 className="font-bold text-brand-text-primary">{item.name}</h3>
                {item.type === 'spell' && (
                    <p className="text-xs text-brand-text-secondary mt-1">For: {item.bookingDetails.name}</p>
                )}
                <p className="text-sm text-brand-text-secondary">
                    Price: ₹{item.price.toLocaleString('en-IN')}
                </p>
            </div>
            <div className="flex flex-col items-end gap-2">
                {item.type === 'product' ? (
                    <div className="flex items-center border border-brand-card rounded-lg">
                        <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="p-2 text-brand-text-secondary hover:text-brand-primary"><MinusIcon className="w-4 h-4" /></button>
                        <span className="px-3 font-bold text-md">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="p-2 text-brand-text-secondary hover:text-brand-primary"><PlusIcon className="w-4 h-4" /></button>
                    </div>
                ) : (
                    <div className="h-9"></div> // Placeholder for alignment
                )}
                 <button onClick={() => removeItem(item.id)} className="text-xs text-brand-red hover:underline">
                    Remove
                </button>
            </div>
            <div className="w-20 text-right font-bold text-brand-text-primary">
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
            </div>
        </div>
    );
};

export const CartPage: React.FC = () => {
    const { items, cartTotal } = useCart();

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center min-h-[70vh]">
                <ShoppingCartIcon className="w-16 h-16 text-brand-primary mb-4" />
                <h1 className="font-serif text-4xl font-bold text-brand-text-primary">Your Cart is Empty</h1>
                <p className="mt-4 text-lg text-brand-text-secondary max-w-md mx-auto">
                    Looks like you haven't added any spiritual items yet. Explore our store to find products that resonate with you.
                </p>
                <Link to="/store" className="mt-6 py-2 px-6 bg-brand-primary text-black font-bold rounded-lg hover:bg-brand-accent transition-colors">
                    Go to Store
                </Link>
            </div>
        );
    }

    return (
        <div>
            <header className="mb-8">
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-text-primary mb-2">Shopping Cart</h1>
                <p className="text-lg text-brand-text-secondary">Review your items and proceed to checkout.</p>
            </header>

            <div className="bg-brand-card rounded-xl shadow-md p-4 sm:p-6">
                {items.map(item => <CartItemRow key={item.id} item={item} />)}
            </div>

            <div className="mt-6 flex justify-end">
                <div className="w-full sm:w-1/2 md:w-1/3 space-y-4">
                    <div className="flex justify-between text-lg">
                        <span className="text-brand-text-secondary">Subtotal</span>
                        <span className="font-bold text-brand-text-primary">₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                     <div className="flex justify-between text-lg">
                        <span className="text-brand-text-secondary">Taxes & Shipping</span>
                        <span className="font-bold text-brand-text-primary">Calculated at checkout</span>
                    </div>
                     <div className="flex justify-between text-2xl font-bold border-t border-brand-surface pt-4">
                        <span className="text-brand-text-primary">Total</span>
                        <span className="text-brand-primary">₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <Link to="/checkout" className="block w-full text-center py-3 px-4 bg-brand-primary text-black font-bold rounded-lg hover:bg-brand-accent transition-colors shadow-lg">
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
};