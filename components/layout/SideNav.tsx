


import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    AstrologyIcon,
    HomeIcon,
    ChatIcon,
    MusicIcon,
    StoreIcon,
    WalletIcon,
    CalendarIcon,
    KundliIcon,
    KundliMatchingIcon,
    HeartIcon,
    MoneyCalculatorIcon,
    CompassIcon,
    DiyaIcon,
    SparkleIcon,
    LaalKitabIcon,
    ReceiptIcon,
    HeadphonesIcon,
    GiftIcon,
    UserPlusIcon,
    UserIcon,
    SettingsIcon,
    XIcon,
    AiPanditIcon,
    GemstoneIcon,
    HashIcon,
    SunIcon,
    MoonStarIcon,
    StarIcon,
    ShieldAlertIcon,
    ClockIcon,
    HandIcon,
    ScanFaceIcon,
    TarotIcon,
    PoojaThaliIcon,
    JapaMalaIcon,
} from '../Icons';

interface SideNavProps {
    isOpen: boolean;
    onClose: () => void;
}

const NavItem: React.FC<{ to: string; icon: React.FC<any>; label: string; onClick: () => void }> = ({ to, icon: Icon, label, onClick }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
            `flex items-center p-3 text-base font-medium rounded-lg transition-colors duration-200 group ${
                isActive
                    ? 'bg-brand-primary/20 text-brand-primary'
                    : 'text-brand-text-secondary hover:bg-brand-surface hover:text-brand-text-primary'
            }`
        }
    >
        <Icon className="w-6 h-6 mr-4 transition-colors group-hover:text-brand-primary" />
        <span>{label}</span>
    </NavLink>
);

const NavSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="border-t border-brand-surface pt-4 mt-4">
        <h3 className="px-3 mb-2 text-xs font-semibold text-brand-text-light uppercase tracking-wider">{title}</h3>
        <div className="space-y-1">{children}</div>
    </div>
);

export const SideNav: React.FC<SideNavProps> = ({ isOpen, onClose }) => {
    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            />
            {/* Side Navigation Panel */}
            <div
                className={`fixed top-0 left-0 h-full w-72 bg-brand-bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-brand-card">
                         <div className="flex items-center space-x-2">
                            <AstrologyIcon className="w-8 h-8 text-brand-gold" />
                            <span className="font-serif font-bold text-xl text-brand-text-dark">Astro Ganesha</span>
                        </div>
                        <button onClick={onClose} className="p-2 -mr-2 text-brand-text-secondary hover:text-brand-text-primary rounded-full hover:bg-brand-surface">
                            <XIcon className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                        <div className="space-y-1">
                            <NavItem to="/" icon={HomeIcon} label="Home" onClick={onClose} />
                            <NavItem to="/astrologers" icon={ChatIcon} label="Chat with Astrologers" onClick={onClose} />
                            <NavItem to="/bhajans" icon={MusicIcon} label="Bhajans" onClick={onClose} />
                            <NavItem to="/store" icon={StoreIcon} label="Store" onClick={onClose} />
                        </div>
                        
                        <NavSection title="Astrology Tools">
                            <NavItem to="/daily-horoscope" icon={CalendarIcon} label="Daily Horoscope" onClick={onClose} />
                            <NavItem to="/tarot-reading" icon={TarotIcon} label="Interactive Tarot Reading" onClick={onClose} />
                            <NavItem to="/palm-reader" icon={HandIcon} label="AI Palm Reader" onClick={onClose} />
                            <NavItem to="/face-reader" icon={ScanFaceIcon} label="AI Face Reader" onClick={onClose} />
                            <NavItem to="/muhurat-teller" icon={ClockIcon} label="Muhurat Teller" onClick={onClose} />
                            <NavItem to="/kundli" icon={KundliIcon} label="Full Kundli" onClick={onClose} />
                            <NavItem to="/matchmaking" icon={KundliMatchingIcon} label="Kundli Matching" onClick={onClose} />
                            <NavItem to="/numerology-calculator" icon={HashIcon} label="Numerology Calculator" onClick={onClose} />
                             <NavItem to="/sun-sign-calculator" icon={SunIcon} label="Sun Sign Calculator" onClick={onClose} />
                             <NavItem to="/rising-sign-calculator" icon={KundliIcon} label="Rising Sign Calculator" onClick={onClose} />
                             <NavItem to="/rashi-calculator" icon={MoonStarIcon} label="Rashi Calculator" onClick={onClose} />
                             <NavItem to="/nakshatra-calculator" icon={StarIcon} label="Nakshatra Calculator" onClick={onClose} />
                             <NavItem to="/mangal-dosha-calculator" icon={ShieldAlertIcon} label="Mangal Dosha Calculator" onClick={onClose} />
                             <NavItem to="/dasha-calculator" icon={CalendarIcon} label="Dasha Calculator" onClick={onClose} />
                             <NavItem to="/atmakaraka-calculator" icon={UserIcon} label="Atmakaraka Calculator" onClick={onClose} />
                             <NavItem to="/lifepath-calculator" icon={CompassIcon} label="Life Path Calculator" onClick={onClose} />
                            <NavItem to="/love-calculator" icon={HeartIcon} label="Love Calculator" onClick={onClose} />
                            <NavItem to="/money-calculator" icon={MoneyCalculatorIcon} label="Money Calculator" onClick={onClose} />
                        </NavSection>

                        <NavSection title="Services">
                            <NavItem to="/ai-pandit" icon={AiPanditIcon} label="Ask AI Pandit" onClick={onClose} />
                            <NavItem to="/gemstone-consultation" icon={GemstoneIcon} label="Gemstone Guide" onClick={onClose} />
                            <NavItem to="/poojas" icon={DiyaIcon} label="Book a Pooja" onClick={onClose} />
                            <NavItem to="/interactive-pooja" icon={PoojaThaliIcon} label="Interactive Pooja" onClick={onClose} />
                            <NavItem to="/quiet-meditation" icon={JapaMalaIcon} label="Mantra Chanting" onClick={onClose} />
                            <NavItem to="/spells" icon={SparkleIcon} label="Spells" onClick={onClose} />
                            <NavItem to="/laalkitab" icon={LaalKitabIcon} label="Remedies" onClick={onClose} />
                        </NavSection>

                        <NavSection title="My Account">
                             <NavItem to="/wallet" icon={WalletIcon} label="Wallet" onClick={onClose} />
                             <NavItem to="/order-history" icon={ReceiptIcon} label="Order History" onClick={onClose} />
                             <NavItem to="/profile" icon={UserIcon} label="Profile" onClick={onClose} />
                             <NavItem to="/settings" icon={SettingsIcon} label="Settings" onClick={onClose} />
                        </NavSection>

                        <NavSection title="More">
                            <NavItem to="/customer-support" icon={HeadphonesIcon} label="Customer Support" onClick={onClose} />
                            <NavItem to="/astrology" icon={GiftIcon} label="Free Services" onClick={onClose} />
                            <NavItem to="/signup-astrologer" icon={UserPlusIcon} label="Signup as Astrologer" onClick={onClose} />
                        </NavSection>
                    </nav>
                </div>
            </div>
        </>
    );
};