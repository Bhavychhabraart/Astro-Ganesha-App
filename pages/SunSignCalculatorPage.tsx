
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { SunIcon } from '../components/Icons';
import { Rashi } from '../types';
import { getSunSign } from '../utils/astrology';
import { ZODIAC_SIGNS } from '../constants';

export const SunSignCalculatorPage: React.FC = () => {
    const navigate = useNavigate();
    const [dob, setDob] = useState('');
    const [result, setResult] = useState<{ sign: Rashi, dateRange: string } | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const signInfo = getSunSign(dob);
        setResult(signInfo);
    };
    
    const inputStyle = "w-full p-3 bg-brand-surface border border-transparent rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition";
    const maxDate = new Date().toISOString().split("T")[0];
    
    const SignDisplay = () => {
        if (!result) return null;
        const signDetails = ZODIAC_SIGNS.find(s => s.name === result.sign);
        if (!signDetails) return null;
        
        return (
             <div className="max-w-md mx-auto bg-brand-card p-8 rounded-xl shadow-md mt-6 text-center animate-fade-in">
                <p className="text-brand-text-secondary">Your Sun Sign is</p>
                <div className="my-4">
                    <signDetails.icon className="w-24 h-24 text-brand-primary mx-auto"/>
                </div>
                <h2 className="font-serif text-4xl font-bold text-brand-primary">{result.sign}</h2>
                <p className="text-brand-text-secondary mt-1">{result.dateRange}</p>
                 <button onClick={() => setResult(null)} className="mt-6 py-2 px-4 bg-brand-primary/80 text-black font-bold rounded-lg hover:bg-brand-accent transition-colors text-sm">
                    Check Another
                </button>
            </div>
        )
    }

    return (
        <div>
            <header className="mb-6 text-center">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-text-primary">Sun Sign Calculator</h1>
                <p className="text-brand-text-secondary mt-1 max-w-lg mx-auto">Find your Western zodiac sign simply by entering your date of birth.</p>
            </header>
            
            {!result ? (
                <div className="max-w-md mx-auto bg-brand-card p-8 rounded-xl shadow-md">
                    <form onSubmit={handleSubmit} className="space-y-6">
                         <div>
                            <label htmlFor="dob" className="block text-sm font-medium text-brand-text-secondary mb-2">Date of Birth</label>
                            <input type="date" name="dob" id="dob" required className={inputStyle} value={dob} onChange={(e) => setDob(e.target.value)} max={maxDate} />
                        </div>
                        <div>
                            <button type="submit" className="w-full py-3 px-4 bg-brand-primary text-black font-bold rounded-lg hover:bg-brand-accent transition-colors shadow-lg flex items-center justify-center gap-2 mt-2">
                                <SunIcon className="w-5 h-5"/>
                                <span>Find My Sign</span>
                            </button>
                        </div>
                    </form>
                </div>
            ) : <SignDisplay />}
        </div>
    );
};
