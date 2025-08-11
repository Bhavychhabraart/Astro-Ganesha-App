
import React, { useState, FormEvent, useEffect, useMemo } from 'react';
import { KundliFormInput, KundliData } from '../types';
import { generateKundliData } from '../utils/astrology';
import { ShieldAlertIcon } from '../components/Icons';

const LoadingState: React.FC = () => {
    const messages = useMemo(() => [
        "Analyzing Mars's position...",
        "Checking key houses for affliction...",
        "Preparing your Dosha analysis...",
    ], []);
    const [message, setMessage] = useState(messages[0]);
    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            index = (index + 1) % messages.length;
            setMessage(messages[index]);
        }, 2000);
        return () => clearInterval(intervalId);
    }, [messages]);

    return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center min-h-[60vh]">
            <div className="w-20 h-20 border-4 border-brand-red border-t-transparent rounded-full animate-spin"></div>
            <h1 className="font-serif text-3xl font-bold text-brand-text-primary mt-8">Checking for Mangal Dosha</h1>
            <div className="mt-4 text-brand-accent font-semibold h-6">{message}</div>
        </div>
    );
};

const Report: React.FC<{ data: KundliData, onReset: () => void }> = ({ data, onReset }) => {
    const { hasDosha, inWhichHouse, description } = data.mangalDosha;
    return (
        <div className="max-w-2xl mx-auto bg-brand-card p-8 rounded-xl shadow-md mt-6 text-center animate-fade-in">
             <ShieldAlertIcon className={`w-20 h-20 mx-auto ${hasDosha ? 'text-red-500' : 'text-green-500'}`} />
            <h2 className={`font-serif text-4xl font-bold my-2 ${hasDosha ? 'text-red-500' : 'text-green-500'}`}>
                {hasDosha ? 'Mangal Dosha Present' : 'No Mangal Dosha'}
            </h2>
            {hasDosha && <p className="text-brand-text-secondary">in house {inWhichHouse}</p>}
            
            <div className="text-left mt-6 bg-brand-surface p-4 rounded-lg">
                <h3 className="font-bold text-brand-text-primary mb-2">Astrologer's Analysis:</h3>
                <p className="text-brand-text-secondary leading-relaxed">{description}</p>
            </div>
             <p className="text-xs text-brand-text-secondary mt-4">Note: This is a preliminary check. For marriage compatibility, a full chart analysis is recommended.</p>
            <button onClick={onReset} className="mt-6 py-2 px-4 bg-brand-primary/80 text-black font-bold rounded-lg hover:bg-brand-accent transition-colors text-sm">
                Check Another Chart
            </button>
        </div>
    );
};

const CalculatorForm: React.FC<{ onSubmit: (data: KundliFormInput) => void }> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<KundliFormInput>({
        name: 'Ganesha', dob: '1995-08-22', tob: '10:30', pob: 'Mumbai, India'
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };
    const inputStyle = "w-full p-3 bg-brand-surface border border-transparent rounded-lg focus:ring-2 focus:ring-brand-red focus:outline-none transition";

    return (
        <div className="max-w-lg mx-auto bg-brand-card p-6 sm:p-8 rounded-xl shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="dob" className="block text-sm font-medium text-brand-text-secondary mb-2">Date of Birth</label>
                        <input type="date" name="dob" id="dob" required className={inputStyle} value={formData.dob} onChange={handleChange} max={new Date().toISOString().split("T")[0]} />
                    </div>
                    <div>
                        <label htmlFor="tob" className="block text-sm font-medium text-brand-text-secondary mb-2">Time of Birth</label>
                        <input type="time" name="tob" id="tob" required className={inputStyle} value={formData.tob} onChange={handleChange} />
                    </div>
                </div>
                <div>
                    <label htmlFor="pob" className="block text-sm font-medium text-brand-text-secondary mb-2">Place of Birth (City, Country)</label>
                    <input type="text" name="pob" id="pob" placeholder="e.g. Delhi, India" required className={inputStyle} value={formData.pob} onChange={handleChange} />
                </div>
                <div>
                    <button type="submit" className="w-full py-3 px-4 bg-brand-red text-white font-bold rounded-lg hover:opacity-90 transition-colors shadow-lg mt-2 flex items-center justify-center gap-2">
                        <ShieldAlertIcon className="w-5 h-5"/>
                        <span>Check for Mangal Dosha</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export const MangalDoshaCalculatorPage: React.FC = () => {
    const [kundliData, setKundliData] = useState<KundliData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = async (data: KundliFormInput) => {
        setIsLoading(true);
        setKundliData(null);
        const report = await generateKundliData(data);
        setKundliData(report);
        setIsLoading(false);
    };

    return (
        <div>
            <header className="mb-6 text-center">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-text-primary">Mangal Dosha Calculator</h1>
                <p className="text-brand-text-secondary mt-1 max-w-lg mx-auto">Check for the presence of Mangal Dosha (or Kuja Dosha), an astrological combination that can affect marital life.</p>
            </header>
            
            {isLoading && <LoadingState />}
            {!isLoading && !kundliData && <CalculatorForm onSubmit={handleFormSubmit} />}
            {!isLoading && kundliData && <Report data={kundliData} onReset={() => setKundliData(null)} />}
        </div>
    );
};
