import React from 'react';
import { Link } from 'react-router-dom';
import {
    ChevronRightIcon, WalletIcon, ReceiptIcon, SettingsIcon, HeadphonesIcon,
    UsersIcon, MapPinIcon, LogOutIcon, UserIcon
} from '../components/Icons';

const ProfileLink: React.FC<{to: string, icon: React.FC<any>, label: string, desc: string}> = ({to, icon: Icon, label, desc}) => (
    <Link to={to} className="flex items-center p-4 bg-brand-surface rounded-xl hover:bg-brand-card transition-colors group">
        <div className="p-3 bg-brand-yellow-light rounded-lg mr-4">
            <Icon className="w-6 h-6 text-brand-gold"/>
        </div>
        <div className="flex-1">
            <h3 className="font-bold text-brand-text-primary">{label}</h3>
            <p className="text-sm text-brand-text-secondary">{desc}</p>
        </div>
        <ChevronRightIcon className="w-5 h-5 text-brand-text-light group-hover:text-brand-text-primary"/>
    </Link>
);

export const ProfilePage: React.FC = () => {
    return (
        <div>
            <header className="flex flex-col items-center text-center py-8">
                <div className="relative">
                    <img
                        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300&auto=format&fit=crop"
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full object-cover ring-4 ring-brand-primary"
                    />
                </div>
                <h1 className="font-serif text-3xl font-bold text-brand-text-primary mt-4">Ganesha Devotee</h1>
                <p className="text-brand-text-secondary">ganesha.devotee@example.com</p>
            </header>

            <div className="space-y-3">
                <ProfileLink to="/wallet" icon={WalletIcon} label="My Wallet" desc="Manage your balance and transactions" />
                <ProfileLink to="/order-history" icon={ReceiptIcon} label="Order History" desc="View your past orders and bookings" />
                <ProfileLink to="/settings" icon={SettingsIcon} label="Settings" desc="Manage notifications and account" />
                <ProfileLink to="/customer-support" icon={HeadphonesIcon} label="Customer Support" desc="Get help with your queries" />
                <ProfileLink to="#" icon={UsersIcon} label="Refer a Friend" desc="Earn rewards by inviting friends" />
                <ProfileLink to="#" icon={MapPinIcon} label="Manage Addresses" desc="Update your shipping addresses" />
                
                <div className="pt-4">
                     <button className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-brand-surface text-brand-red font-bold rounded-xl hover:bg-red-50 transition-colors">
                        <LogOutIcon className="w-5 h-5"/>
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};
