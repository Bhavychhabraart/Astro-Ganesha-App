import React from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUpIcon } from '../components/Icons';

export const OrderConfirmationPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center min-h-[70vh]">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                 <ThumbsUpIcon className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="font-serif text-4xl font-bold text-brand-text-primary">Thank You!</h1>
            <p className="mt-4 text-lg text-brand-text-secondary max-w-md mx-auto">
                Your order has been successfully placed. You will receive a confirmation email shortly. (This is a mock confirmation).
            </p>
            <Link to="/" className="mt-8 py-3 px-8 bg-brand-primary text-black font-bold rounded-lg hover:bg-brand-accent transition-colors shadow-lg">
                Continue Shopping
            </Link>
        </div>
    );
};