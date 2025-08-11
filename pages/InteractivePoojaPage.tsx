
import React, { useState } from 'react';
import { INTERACTIVE_DEITIES } from '../constants';
import { PoojaScreen } from '../components/pooja/PoojaScreen';
import { InteractiveDeityInfo } from '../types';
import { Header } from '../components/layout/Header';
import { SideNav } from '../components/layout/SideNav';
import { BottomNav } from '../components/layout/BottomNav';

const DeityCard: React.FC<{ deity: InteractiveDeityInfo, onSelect: () => void }> = ({ deity, onSelect }) => (
    <button onClick={onSelect} className="group text-center space-y-3 transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-full">
        <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden ring-4 ring-brand-card group-hover:ring-brand-primary transition-all duration-300 shadow-lg">
            <img src={deity.image} alt={deity.name} className="w-full h-full object-cover" />
        </div>
        <h3 className="font-serif text-xl font-bold text-brand-text-dark group-hover:text-brand-primary transition-colors">{deity.name}</h3>
    </button>
);

export const InteractivePoojaPage: React.FC = () => {
    const [selectedDeity, setSelectedDeity] = useState<InteractiveDeityInfo | null>(null);
    const [isNavOpen, setIsNavOpen] = useState(false);

    if (selectedDeity) {
        return <PoojaScreen deity={selectedDeity} onExit={() => setSelectedDeity(null)} />;
    }

    return (
        <div className="min-h-screen bg-brand-bg-main">
            <SideNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
             {/* The header and nav are part of the page layout here, but not in PoojaScreen */}
            <Header onMenuClick={() => setIsNavOpen(true)} />
            <main className="pt-24 pb-24 px-4 flex flex-col items-center justify-center">
                 <header className="text-center mb-10">
                    <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-text-primary mb-2">Interactive Pooja</h1>
                    <p className="text-lg text-brand-text-secondary max-w-2xl">Choose a deity to begin your virtual prayer and receive their blessings.</p>
                </header>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8">
                    {INTERACTIVE_DEITIES.map(deity => (
                        <DeityCard key={deity.name} deity={deity} onSelect={() => setSelectedDeity(deity)} />
                    ))}
                </div>
            </main>
            <BottomNav />
        </div>
    );
};
