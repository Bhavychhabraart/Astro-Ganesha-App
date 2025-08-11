import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AstrologyIcon, BellIcon, ShoppingCartIcon, MenuIcon, ChevronLeftIcon } from '../Icons';
import { useCart } from '../../hooks/useCart';
import { OmChantAnimation } from '../OmChantAnimation';

interface HeaderProps {
    onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const { totalItems } = useCart();
    const [showChant, setShowChant] = useState(false);
    const prevLocationRef = React.useRef(location.pathname);

    useEffect(() => {
        if (prevLocationRef.current !== location.pathname) {
            setShowChant(true);
        }
        prevLocationRef.current = location.pathname;
    }, [location.pathname]);


    return (
        <header className="fixed top-0 z-30 w-full bg-brand-bg-white/80 backdrop-blur-md border-b border-brand-surface">
            <div className="relative max-w-screen-lg mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
                <div className="flex items-center space-x-2 w-1/3">
                    {isHomePage ? (
                        <button onClick={onMenuClick} className="p-2 text-brand-text-secondary hover:text-brand-text-primary rounded-full hover:bg-brand-surface">
                            <MenuIcon className="w-6 h-6" />
                        </button>
                    ) : (
                         <Link to={-1 as any} className="p-2 text-brand-text-secondary hover:text-brand-text-primary rounded-full hover:bg-brand-surface">
                            <ChevronLeftIcon className="w-6 h-6" />
                        </Link>
                    )}
                </div>
                
                <div className="flex items-center justify-center w-1/3">
                    <Link to="/" className="flex items-center space-x-2">
                        <AstrologyIcon className="w-8 h-8 text-brand-gold" />
                        <span className="font-serif font-bold text-2xl text-brand-text-dark hidden sm:inline">Astro Ganesha</span>
                    </Link>
                </div>

                <div className="flex items-center justify-end space-x-1 sm:space-x-2 w-1/3">
                    <button className="p-2 text-brand-text-secondary hover:text-brand-text-primary rounded-full hover:bg-brand-surface">
                        <BellIcon className="w-6 h-6" />
                    </button>
                    <Link to="/cart" className="relative p-2 text-brand-text-secondary hover:text-brand-text-primary rounded-full hover:bg-brand-surface">
                        <ShoppingCartIcon className="w-6 h-6" />
                        {totalItems > 0 && (
                            <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-brand-red text-white text-[10px] text-center font-bold">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
                 {showChant && <OmChantAnimation onAnimationComplete={() => setShowChant(false)} />}
            </div>
        </header>
    );
};