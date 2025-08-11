import React from 'react';
import { PlusIcon, ArrowDownCircleIcon, ArrowUpCircleIcon } from '../components/Icons';

const transactions = [
    { type: 'credit', description: 'Added to wallet', date: 'Oct 25, 2023', amount: 500 },
    { type: 'debit', description: 'Chat with Tenzin Choedon', date: 'Oct 24, 2023', amount: -250 },
    { type: 'debit', description: 'Pooja Booking: Griha Shanti', date: 'Oct 22, 2023', amount: -750 },
    { type: 'credit', description: 'Added to wallet', date: 'Oct 21, 2023', amount: 1000 },
    { type: 'debit', description: 'Product Purchase: Rudraksha Mala', date: 'Oct 20, 2023', amount: -150 },
];

export const WalletPage: React.FC = () => {
    const balance = 5250.75;

    return (
        <div>
            <header className="mb-8">
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-text-primary mb-2">My Wallet</h1>
                <p className="text-lg text-brand-text-secondary">Manage your balance and view transactions.</p>
            </header>

            <div className="bg-gradient-to-br from-brand-gold to-brand-primary text-white rounded-xl shadow-lg p-8 mb-8 flex flex-col items-center justify-center text-center">
                <p className="text-lg font-medium opacity-80">Current Balance</p>
                <p className="text-5xl font-bold mt-2">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <button className="mt-6 flex items-center gap-2 py-3 px-6 bg-white text-brand-gold font-bold rounded-full hover:bg-yellow-50 transition-colors shadow-md">
                    <PlusIcon className="w-5 h-5" />
                    Add Money
                </button>
            </div>

            <div className="bg-brand-pink-light border border-brand-red/20 rounded-xl p-4 mb-8 text-center">
                <p className="font-bold text-brand-red">Special Offer!</p>
                <p className="text-sm text-brand-red/80">Get 10% extra on wallet recharge above ₹2000.</p>
            </div>
            
            <div className="bg-brand-card rounded-xl shadow-md p-4 sm:p-6">
                 <h3 className="font-serif text-xl font-bold text-brand-text-primary mb-4">Recent Transactions</h3>
                 <div className="space-y-4">
                     {transactions.map((tx, index) => (
                         <div key={index} className="flex items-center gap-4">
                            {tx.type === 'credit' ? <ArrowDownCircleIcon className="w-8 h-8 text-green-500 flex-shrink-0" /> : <ArrowUpCircleIcon className="w-8 h-8 text-red-500 flex-shrink-0" />}
                            <div className="flex-1">
                                <p className="font-semibold text-brand-text-primary">{tx.description}</p>
                                <p className="text-sm text-brand-text-secondary">{tx.date}</p>
                            </div>
                            <p className={`font-bold text-lg ${tx.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                                ₹{Math.abs(tx.amount).toLocaleString('en-IN')}
                            </p>
                         </div>
                     ))}
                 </div>
            </div>
        </div>
    );
};
