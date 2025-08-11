import React, { useState, useEffect, useCallback } from 'react';
import { Rashi, DailyHoroscopeData } from '../types';
import { ZODIAC_SIGNS } from '../constants';
import { generateDailyHoroscope } from '../utils/astrology';
import { HeartIcon, BriefcaseIcon, HeartbeatIcon, SparkleIcon } from '../components/Icons';

const LoadingState: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center min-h-[60vh]">
        <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-brand-yellow-light rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-brand-yellow-dark border-r-brand-yellow-dark rounded-full animate-spin"></div>
            <SparkleIcon className="w-12 h-12 text-brand-yellow-dark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-brand-text-primary mt-8">Fetching Your Cosmic Forecast...</h1>
        <p className="mt-2 text-lg text-brand-text-secondary">The stars are aligning for you.</p>
    </div>
);

const ErrorState: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center min-h-[60vh]">
        <h2 className="text-xl font-bold text-brand-red">Oops! A Cosmic Glitch</h2>
        <p className="text-brand-text-secondary mt-2 mb-4">{message}</p>
        <button
            onClick={onRetry}
            className="py-2 px-6 bg-brand-primary text-black font-bold rounded-lg hover:bg-brand-accent transition-colors"
        >
            Try Again
        </button>
    </div>
);

const PredictionCard: React.FC<{ icon: React.FC<any>, title: string, text: string, color: string }> = ({ icon: Icon, title, text, color }) => (
    <div className="bg-brand-card rounded-xl shadow-md p-5">
        <div className="flex items-center mb-3">
            <Icon className={`w-7 h-7 mr-3 ${color}`} />
            <h3 className="font-serif text-xl font-bold text-brand-text-primary">{title}</h3>
        </div>
        <p className="text-brand-text-secondary leading-relaxed">{text}</p>
    </div>
);

const LuckyItem: React.FC<{ label: string, value: string }> = ({ label, value }) => (
    <div className="text-center">
        <p className="text-sm text-brand-text-secondary">{label}</p>
        <p className="font-bold text-brand-text-primary text-lg">{value}</p>
    </div>
);

export const DailyHoroscopePage: React.FC = () => {
    const [selectedSign, setSelectedSign] = useState<Rashi | null>(null);
    const [horoscope, setHoroscope] = useState<DailyHoroscopeData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchHoroscope = useCallback(async (sign: Rashi) => {
        setLoading(true);
        setError(null);
        setHoroscope(null);
        try {
            const data = await generateDailyHoroscope(sign);
            setHoroscope(data);
        } catch (e) {
            setError(e.message || "An unknown error occurred while fetching the horoscope.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const lastSign = localStorage.getItem('selectedZodiacSign') as Rashi;
        const initialSign = lastSign || ZODIAC_SIGNS[0].name;
        setSelectedSign(initialSign);
        fetchHoroscope(initialSign);
    }, [fetchHoroscope]);

    const handleSignSelect = (sign: Rashi) => {
        setSelectedSign(sign);
        localStorage.setItem('selectedZodiacSign', sign);
        fetchHoroscope(sign);
    };
    
    const currentSignDetails = ZODIAC_SIGNS.find(z => z.name === selectedSign);

    return (
        <div className="bg-brand-bg-main min-h-full">
            <header className="mb-6">
                <h1 className="font-serif text-4xl font-bold text-brand-text-primary">Daily Horoscope</h1>
                <p className="text-brand-text-secondary mt-1 text-lg">Your daily dose of cosmic guidance.</p>
            </header>

            <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 mb-6 snap-x">
                {ZODIAC_SIGNS.map(sign => (
                    <button
                        key={sign.name}
                        onClick={() => handleSignSelect(sign.name)}
                        className={`flex-shrink-0 flex flex-col items-center justify-center p-3 w-20 h-24 rounded-xl transition-all duration-300 snap-start ${
                            selectedSign === sign.name
                                ? 'bg-brand-yellow-dark text-black shadow-lg scale-105'
                                : 'bg-brand-card text-brand-text-secondary hover:bg-brand-surface hover:text-brand-text-primary'
                        }`}
                        aria-pressed={selectedSign === sign.name}
                    >
                        <sign.icon className="w-8 h-8 mb-1.5" />
                        <span className="text-xs font-semibold">{sign.name}</span>
                    </button>
                ))}
            </div>

            <div className="space-y-6">
                {loading && <LoadingState />}
                {error && <ErrorState message={error} onRetry={() => selectedSign && fetchHoroscope(selectedSign)} />}
                {horoscope && currentSignDetails && (
                     <div className="animate-fade-in space-y-6">
                        <div className="bg-gradient-to-br from-brand-gold to-brand-yellow-dark text-white rounded-2xl shadow-xl p-6 text-center">
                             <currentSignDetails.icon className="w-16 h-16 mx-auto mb-2 text-brand-yellow"/>
                            <h2 className="font-serif text-4xl font-bold">{currentSignDetails.name}</h2>
                            <p className="text-white/80">{currentSignDetails.dateRange}</p>
                            <p className="mt-4 text-lg max-w-2xl mx-auto">{horoscope.summary}</p>
                        </div>

                         <div className="bg-brand-card rounded-xl shadow-md p-4">
                             <h3 className="font-serif text-center text-xl font-bold text-brand-text-primary mb-3">Today's Lucky Trio</h3>
                             <div className="grid grid-cols-3 gap-4 divide-x divide-brand-surface">
                                 <LuckyItem label="Color" value={horoscope.lucky_color} />
                                 <LuckyItem label="Number" value={horoscope.lucky_number} />
                                 <LuckyItem label="Gemstone" value={horoscope.lucky_gemstone} />
                             </div>
                         </div>

                        <PredictionCard icon={HeartIcon} title="Love" text={horoscope.love} color="text-brand-red" />
                        <PredictionCard icon={BriefcaseIcon} title="Career" text={horoscope.career} color="text-brand-gold" />
                        <PredictionCard icon={HeartbeatIcon} title="Health" text={horoscope.health} color="text-brand-green" />
                    </div>
                )}
            </div>
        </div>
    );
};