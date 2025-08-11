

import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { MusicPlayerProvider } from './contexts/MusicPlayerContext';
import { useMusicPlayer } from './hooks/useMusicPlayer';
import { CartProvider } from './contexts/CartContext';

import { HomePage } from './pages/HomePage';
import { BhajansPage } from './pages/BhajansPage';
import { MusicPlayerPage } from './pages/MusicPlayerPage';
import { StorePage } from './pages/StorePage';
import { ProfilePage } from './pages/ProfilePage';
import { AstrologyToolsPage } from './pages/AstrologyToolsPage';
import { KundliPage } from './pages/KundliPage';
import { MatchmakingPage } from './pages/MatchmakingPage';
import { LoveCalculatorPage } from './pages/LoveCalculatorPage';
import { MoneyCalculatorPage } from './pages/MoneyCalculatorPage';
import { AstrologersPage } from './pages/AstrologersPage';
import { AstrologerDetailPage } from './pages/AstrologerDetailPage';
import { ChatPage } from './pages/ChatPage';
import { CallPage } from './pages/CallPage';
import { PoojasPage } from './pages/PoojasPage';
import { PoojaDetailPage } from './pages/PoojaDetailPage';
import { PoojaBookingPage } from './pages/PoojaBookingPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SpellsPage } from './pages/SpellsPage';
import { SpellDetailPage } from './pages/SpellDetailPage';
import { SpellBookingPage } from './pages/SpellBookingPage';
import { LaalKitabPage } from './pages/LaalKitabPage';
import { LifePathCalculatorPage } from './pages/LifePathCalculatorPage';
import { DailyHoroscopePage } from './pages/DailyHoroscopePage';
import { WalletPage } from './pages/WalletPage';
import { OrderHistoryPage } from './pages/OrderHistoryPage';
import { SettingsPage } from './pages/SettingsPage';
import { CustomerSupportPage } from './pages/CustomerSupportPage';
import { SignupAstrologerPage } from './pages/SignupAstrologerPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AiPanditPage } from './pages/AiPanditPage';
import { GemstoneConsultationPage } from './pages/GemstoneConsultationPage';
import { NumerologyCalculatorPage } from './pages/NumerologyCalculatorPage';
import { SunSignCalculatorPage } from './pages/SunSignCalculatorPage';
import { RisingSignCalculatorPage } from './pages/RisingSignCalculatorPage';
import { RashiCalculatorPage } from './pages/RashiCalculatorPage';
import { NakshatraCalculatorPage } from './pages/NakshatraCalculatorPage';
import { MangalDoshaCalculatorPage } from './pages/MangalDoshaCalculatorPage';
import { DashaCalculatorPage } from './pages/DashaCalculatorPage';
import { AtmakarakaCalculatorPage } from './pages/AtmakarakaCalculatorPage';
import { MuhuratTellerPage } from './pages/MuhuratTellerPage';
import { PalmReaderPage } from './pages/PalmReaderPage';
import { FaceReaderPage } from './pages/FaceReaderPage';
import { TarotReadingPage } from './pages/TarotReadingPage';
import { InteractivePoojaPage } from './pages/InteractivePoojaPage';


import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { MiniPlayer } from './components/music/MiniPlayer';
import { SideNav } from './components/layout/SideNav';

const AppContent: React.FC = () => {
    const location = useLocation();
    const { currentTrack } = useMusicPlayer();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const isMusicPlayerPage = location.pathname === '/music-player';
    
    const isChatInterface = location.pathname.startsWith('/chat/') || 
                            location.pathname === '/ai-pandit' ||
                            location.pathname === '/customer-support' ||
                            location.pathname === '/gemstone-consultation';
    
    const isImmersiveInterface = location.pathname.startsWith('/call/') || location.pathname.startsWith('/interactive-pooja');

    const showHeader = !isMusicPlayerPage && !isImmersiveInterface;
    const showBottomNav = !isMusicPlayerPage && !isChatInterface && !isImmersiveInterface;
    
    const toggleNav = () => setIsNavOpen(prev => !prev);

    const mainContentPadding = () => {
        let pt = showHeader ? '4rem' : '0';
        let pb = '4rem'; // Base padding for bottom nav
        if (currentTrack) {
            pb = '8.5rem'; // For bottom nav + mini player
        }
        if(isMusicPlayerPage || isImmersiveInterface) pb = '0';

        return { paddingTop: pt, paddingBottom: pb };
    };
    
    if (isImmersiveInterface) {
        return (
             <Routes>
                <Route path="/call/:id" element={<CallPage />} />
                <Route path="/interactive-pooja" element={<InteractivePoojaPage />} />
             </Routes>
        );
    }

    if (isChatInterface) {
        const ChatLayout: React.FC<{children: React.ReactNode}> = ({children}) => (
             <div className="h-screen bg-brand-background flex flex-col">
                 <SideNav isOpen={isNavOpen} onClose={toggleNav} />
                 <Header onMenuClick={toggleNav} />
                 <div className="flex-1 overflow-hidden" style={{paddingTop: '4rem'}}>
                    {children}
                 </div>
             </div>
        );
        
        return (
             <Routes>
                <Route path="/chat/:id" element={<ChatLayout><ChatPage /></ChatLayout>} />
                <Route path="/ai-pandit" element={<ChatLayout><AiPanditPage /></ChatLayout>} />
                <Route path="/customer-support" element={<ChatLayout><CustomerSupportPage /></ChatLayout>} />
                <Route path="/gemstone-consultation" element={<ChatLayout><GemstoneConsultationPage /></ChatLayout>} />
             </Routes>
        )
    }

    return (
        <div className="min-h-screen bg-brand-background">
            <SideNav isOpen={isNavOpen} onClose={toggleNav} />
            {showHeader && <Header onMenuClick={toggleNav} />}
            
            <main
                className="mx-auto w-full max-w-screen-lg px-4 sm:px-6"
                style={mainContentPadding()}
            >
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/astrology" element={<AstrologyToolsPage />} />
                    <Route path="/kundli" element={<KundliPage />} />
                    <Route path="/matchmaking" element={<MatchmakingPage />} />
                    <Route path="/love-calculator" element={<LoveCalculatorPage />} />
                    <Route path="/money-calculator" element={<MoneyCalculatorPage />} />
                    <Route path="/laalkitab" element={<LaalKitabPage />} />
                    <Route path="/lifepath-calculator" element={<LifePathCalculatorPage />} />
                    <Route path="/numerology-calculator" element={<NumerologyCalculatorPage />} />
                    <Route path="/sun-sign-calculator" element={<SunSignCalculatorPage />} />
                    <Route path="/rising-sign-calculator" element={<RisingSignCalculatorPage />} />
                    <Route path="/rashi-calculator" element={<RashiCalculatorPage />} />
                    <Route path="/nakshatra-calculator" element={<NakshatraCalculatorPage />} />
                    <Route path="/mangal-dosha-calculator" element={<MangalDoshaCalculatorPage />} />
                    <Route path="/dasha-calculator" element={<DashaCalculatorPage />} />
                    <Route path="/atmakaraka-calculator" element={<AtmakarakaCalculatorPage />} />
                    <Route path="/muhurat-teller" element={<MuhuratTellerPage />} />
                    <Route path="/palm-reader" element={<PalmReaderPage />} />
                    <Route path="/face-reader" element={<FaceReaderPage />} />
                    <Route path="/tarot-reading" element={<TarotReadingPage />} />
                    <Route path="/astrologers" element={<AstrologersPage />} />
                    <Route path="/astrologers/:id" element={<AstrologerDetailPage />} />
                    {/* Chat, AI Pandit, Call and other immersive interfaces are handled in other layouts */}
                    <Route path="/bhajans" element={<BhajansPage />} />
                    <Route path="/poojas" element={<PoojasPage />} />
                    <Route path="/poojas/:id" element={<PoojaDetailPage />} />
                    <Route path="/poojas/:id/book" element={<PoojaBookingPage />} />
                    <Route path="/spells" element={<SpellsPage />} />
                    <Route path="/spells/:id" element={<SpellDetailPage />} />
                    <Route path="/spells/:id/book" element={<SpellBookingPage />} />
                    <Route path="/store" element={<StorePage />} />
                    <Route path="/products/:id" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/music-player" element={<MusicPlayerPage />} />
                    <Route path="/daily-horoscope" element={<DailyHoroscopePage />} />
                    <Route path="/wallet" element={<WalletPage />} />
                    <Route path="/order-history" element={<OrderHistoryPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/signup-astrologer" element={<SignupAstrologerPage />} />
                </Routes>
            </main>

            {showBottomNav && (
                <>
                    <MiniPlayer />
                    <BottomNav />
                </>
            )}
        </div>
    );
}

const App: React.FC = () => {
    return (
        <MusicPlayerProvider>
            <CartProvider>
                <HashRouter>
                    <AppContent />
                </HashRouter>
            </CartProvider>
        </MusicPlayerProvider>
    );
};

export default App;