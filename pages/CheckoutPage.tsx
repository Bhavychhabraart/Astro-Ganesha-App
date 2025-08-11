import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { CartItem } from '../types';

export const CheckoutPage: React.FC = () => {
    const { items, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: 'Ganesha Devotee',
        email: 'ganesha@example.com',
        address: '123 Kailash Parvat',
        city: 'Himalayas',
        pincode: '000001'
    });
    
    if (items.length === 0) {
        navigate('/'); // Redirect to home if cart is empty
        return null;
    }

    const shippingCost = 50;
    const taxes = cartTotal * 0.05; // 5% mock tax
    const totalAmount = cartTotal + shippingCost + taxes;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Placing order with data:", {
            orderItems: items,
            shippingDetails: formData,
            total: totalAmount
        });
        clearCart();
        navigate('/order-confirmation');
    };

    const inputStyle = "w-full p-3 bg-brand-surface border border-transparent rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition";

    return (
        <div>
            <header className="mb-8 text-center">
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-text-primary mb-2">Checkout</h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                    <div className="bg-brand-card rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-brand-primary mb-4 border-b border-brand-primary/20 pb-2">Shipping Information</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-brand-text-secondary mb-2">Full Name</label>
                                <input type="text" name="name" id="name" required className={inputStyle} value={formData.name} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-brand-text-secondary mb-2">Email Address</label>
                                <input type="email" name="email" id="email" required className={inputStyle} value={formData.email} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-brand-text-secondary mb-2">Address</label>
                                <input type="text" name="address" id="address" required className={inputStyle} value={formData.address} onChange={handleChange} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-brand-text-secondary mb-2">City</label>
                                    <input type="text" name="city" id="city" required className={inputStyle} value={formData.city} onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="pincode" className="block text-sm font-medium text-brand-text-secondary mb-2">Pincode</label>
                                    <input type="text" name="pincode" id="pincode" required className={inputStyle} value={formData.pincode} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="pt-4">
                                <button type="submit" className="w-full py-3 px-4 bg-brand-primary text-black font-bold rounded-lg hover:bg-brand-accent transition-colors shadow-lg">
                                    Place Order (Mock)
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-2">
                     <div className="bg-brand-card rounded-xl shadow-md p-6 sticky top-20">
                         <h2 className="text-xl font-bold text-brand-primary mb-4 border-b border-brand-primary/20 pb-2">Order Summary</h2>
                         <div className="space-y-2">
                            {items.map(item => (
                                <div key={item.id} className="flex justify-between items-start text-sm">
                                    <span className="flex-1 pr-2">{item.name} <span className="text-xs text-brand-text-secondary">x{item.quantity}</span></span>
                                    <span className="font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                </div>
                            ))}
                         </div>
                         <div className="mt-4 pt-4 border-t border-brand-surface space-y-2">
                             <div className="flex justify-between"><span className="text-brand-text-secondary">Subtotal</span><span>₹{cartTotal.toLocaleString('en-IN')}</span></div>
                             <div className="flex justify-between"><span className="text-brand-text-secondary">Shipping</span><span>₹{shippingCost.toLocaleString('en-IN')}</span></div>
                             <div className="flex justify-between"><span className="text-brand-text-secondary">Taxes (5%)</span><span>₹{taxes.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span></div>
                         </div>
                         <div className="mt-4 pt-4 border-t border-brand-surface flex justify-between font-bold text-xl">
                             <span>Total</span>
                             <span className="text-brand-primary">₹{totalAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};