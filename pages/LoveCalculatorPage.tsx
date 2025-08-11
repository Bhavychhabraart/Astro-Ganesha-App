import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartIcon } from '../components/Icons';
import { LoveReport } from '../components/calculators/LoveReport';
import { LoveFormInput } from '../types';

const LoveForm: React.FC<{ onSubmit: (data: LoveFormInput) => void }> = ({ onSubmit }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoveFormInput>({ name1: '', name2: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };
    
    const inputStyle = "w-full p-3 bg-brand-surface border border-transparent rounded-lg focus:ring-2 focus:ring-brand-red focus:outline-none transition";

    return (
        <div>
            <header className="mb-6 text-center">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-text-primary">Love Calculator</h1>
                <p className="text-brand-text-secondary mt-1 max-w-lg mx-auto">Enter two names to calculate their love compatibility. For entertainment purposes only!</p>
            </header>
            
            <div className="max-w-md mx-auto bg-brand-card p-8 rounded-xl shadow-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name1" className="block text-sm font-medium text-brand-text-secondary mb-2">Your Name</label>
                        <input type="text" name="name1" id="name1" required className={inputStyle} value={formData.name1} onChange={handleChange} placeholder="e.g., Romeo" />
                    </div>
                    <div className="flex justify-center my-2 text-brand-red">
                        <HeartIcon className="w-8 h-8"/>
                    </div>
                    <div>
                        <label htmlFor="name2" className="block text-sm font-medium text-brand-text-secondary mb-2">Partner's Name</label>
                        <input type="text" name="name2" id="name2" required className={inputStyle} value={formData.name2} onChange={handleChange} placeholder="e.g., Juliet" />
                    </div>
                    <div>
                        <button type="submit" className="w-full py-3 px-4 bg-brand-red text-white font-bold rounded-lg hover:opacity-90 transition-colors shadow-lg flex items-center justify-center gap-2 mt-2">
                            <HeartIcon className="w-5 h-5"/>
                            <span>Calculate Love</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const LoveCalculatorPage: React.FC = () => {
    const [loveRequest, setLoveRequest] = useState<LoveFormInput | null>(null);

    if (loveRequest) {
        return <LoveReport formData={loveRequest} onReset={() => setLoveRequest(null)} />;
    }

    return <LoveForm onSubmit={setLoveRequest} />;
};