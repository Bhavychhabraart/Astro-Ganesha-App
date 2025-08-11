import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, MusicIcon, StoreIcon, UserIcon, AstrologyIcon } from '../Icons';
import { useCart } from '../../hooks/useCart';

const navItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/astrology', label: 'Readings', icon: AstrologyIcon },
    { path: '/bhajans', label: 'Bhajans', icon: MusicIcon },
    { path: '/store', label: 'Store', icon: StoreIcon },
    { path: '/profile', label: 'Profile', icon: UserIcon },
];

export const BottomNav: React.FC = () => {
    const { totalItems } = useCart();
    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-brand-surface/90 backdrop-blur-lg border-t border-brand-card/60 z-40">
            <div className="flex justify-around max-w-screen-md mx-auto h-full">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/'}
                        className={({ isActive }) =>
                            `relative flex flex-col items-center justify-center w-full text-xs font-medium transition-colors duration-200 ${
                                isActive ? 'text-brand-primary' : 'text-brand-text-secondary hover:text-brand-text-primary'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && <div className="absolute top-1 h-1 w-1 rounded-full bg-brand-primary"></div>}
                                <div className="relative">
                                    <item.icon className="w-6 h-6 mb-0.5" />
                                    {item.path === '/store' && totalItems > 0 && (
                                        <span className="absolute -top-1 -right-2 block h-4 w-4 rounded-full bg-brand-red text-white text-[10px] text-center font-bold">
                                            {totalItems}
                                        </span>
                                    )}
                                </div>
                                <span>{item.label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};