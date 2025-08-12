import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { XIcon } from '../components/Icons';
import { MANTRAS } from '../constants';
import { Mantra } from '../types';

// Utility to get/set count from localStorage
const getStoredCount = (mantraId: string): number => {
    try {
        const counts = JSON.parse(localStorage.getItem('mantraCounts') || '{}');
        return counts[mantraId] || 0;
    } catch (e) {
        return 0;
    }
};

const storeCount = (mantraId: string, count: number) => {
    try {
        const counts = JSON.parse(localStorage.getItem('mantraCounts') || '{}');
        counts[mantraId] = count;
        localStorage.setItem('mantraCounts', JSON.stringify(counts));
    } catch (e) {
        console.error("Could not save to localStorage", e);
    }
};

export const QuietMeditationPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedMantra, setSelectedMantra] = useState<Mantra>(MANTRAS[0]);
    const [chantCount, setChantCount] = useState<number>(() => getStoredCount(MANTRAS[0].id));
    const [isAnimating, setIsAnimating] = useState(false);
    
    const audioRef = useRef<HTMLAudioElement>(null);
    const mainButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        // Preload audio when mantra changes
        if (audioRef.current) {
            audioRef.current.src = selectedMantra.audioSrc;
            audioRef.current.load();
        }
        // Update count from storage
        setChantCount(getStoredCount(selectedMantra.id));
    }, [selectedMantra]);

    const handleChant = () => {
        const newCount = chantCount + 1;
        setChantCount(newCount);
        storeCount(selectedMantra.id, newCount);

        // Play sound
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(e => console.error("Audio play error:", e));
        }

        // Trigger animation
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500); // Corresponds to animation duration
    };

    const handleSelectMantra = (mantra: Mantra) => {
        setSelectedMantra(mantra);
    };

    const handleReset = () => {
        setChantCount(0);
        storeCount(selectedMantra.id, 0);
    };

    return (
        <div className="fixed inset-0 bg-brand-yellow-light flex flex-col items-center justify-center p-4 text-brand-text-dark font-sans overflow-hidden animated-gradient">
            
            {/* Controls */}
            <div className="absolute top-4 left-4 z-10">
                <button 
                    onClick={handleReset} 
                    className="py-2 px-4 bg-white/50 text-brand-text-dark font-semibold rounded-full hover:bg-white/80 transition-colors text-sm"
                >
                    Reset Count
                </button>
            </div>
            <button 
                onClick={() => navigate(-1)} 
                className="absolute top-4 right-4 p-3 bg-white/50 rounded-full hover:bg-white/80 transition-colors z-10"
                aria-label="Close"
            >
                <XIcon className="w-6 h-6 text-brand-text-dark" />
            </button>

            {/* Main Content */}
            <main className="flex flex-col items-center justify-center text-center flex-1">
                <div className="mb-8 animate-fade-in" key={selectedMantra.id}>
                    <h1 className="text-4xl md:text-6xl font-serif text-brand-text-dark" style={{ fontVariantLigatures: 'common-ligatures' }}>
                        {selectedMantra.sanskrit}
                    </h1>
                    <p className="text-lg text-brand-text-dark/80 mt-2">{selectedMantra.transliteration}</p>
                </div>

                <div className="relative flex flex-col items-center">
                    <button 
                        ref={mainButtonRef}
                        onClick={handleChant}
                        className={`relative w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-brand-yellow to-brand-gold rounded-full flex items-center justify-center text-black/70 shadow-2xl transition-transform duration-200 active:scale-95 ${isAnimating ? 'chant-tap-effect' : ''}`}
                    >
                        <span className="text-7xl md:text-9xl font-serif">ॐ</span>
                    </button>
                    <p className="text-7xl md:text-8xl font-bold text-white/80 mt-8" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
                        {chantCount}
                    </p>
                    <p className="text-brand-text-dark/70 font-semibold tracking-widest">JAPA COUNT</p>
                </div>

                <div className="mt-8 max-w-xl animate-fade-in" key={`${selectedMantra.id}-meaning`}>
                     <p className="text-base text-brand-text-dark/90 leading-relaxed italic">"{selectedMantra.meaning}"</p>
                </div>
            </main>

            {/* Mantra Selection */}
            <footer className="w-full max-w-2xl p-2 bg-white/40 backdrop-blur-sm rounded-full shadow-md mb-4">
                <div className="flex justify-center items-center gap-2">
                    {MANTRAS.map(mantra => (
                        <button
                            key={mantra.id}
                            onClick={() => handleSelectMantra(mantra)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                                selectedMantra.id === mantra.id
                                    ? 'bg-brand-gold text-white shadow-md'
                                    : 'text-brand-text-dark hover:bg-white/50'
                            }`}
                        >
                            {mantra.name}
                        </button>
                    ))}
                </div>
            </footer>
            
            <audio ref={audioRef} preload="auto" />
        </div>
    );
};
