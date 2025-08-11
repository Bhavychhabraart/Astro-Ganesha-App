


import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, CompassIcon } from '../components/Icons';
import { LifePathReport } from '../components/numerology/LifePathReport';
import { LifePathFormInput } from '../types';

const LifePathForm: React.FC<{ onSubmit: (data: LifePathFormInput) => void }> = ({ onSubmit }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LifePathFormInput>({ dob: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const inputStyle = "w-full p-3 bg-brand-surface border border-brand-card rounded-lg focus:ring-2 focus:ring-brand-gold focus:outline-none transition";
    const maxDate = new Date().toISOString().split("T")[0];

    return (
        <div>
            <header className="flex items-center mb-6">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 mr-2 rounded-full hover:bg-brand-surface">
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="font-serif text-3xl font-bold text-brand-text-primary">Life Path Calculator</h1>
            </header>

            <div className="max-w-md mx-auto bg-brand-card p-8 rounded-xl shadow-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <p className="text-center text-brand-text-secondary">Your Life Path Number reveals your life's purpose and the path you will walk. Enter your date of birth to uncover your number.</p>
                    <div>
                        <label htmlFor="dob" className="block text-sm font-medium text-brand-text-secondary mb-2">Your Full Date of Birth</label>
                        <input type="date" name="dob" id="dob" required className={inputStyle} value={formData.dob} onChange={handleChange} max={maxDate} />
                    </div>
                    <div>
                        <button type="submit" className="w-full py-3 px-4 bg-brand-gold text-white font-bold rounded-lg hover:bg-brand-gold/90 transition-colors shadow-lg flex items-center justify-center gap-2 mt-2">
                            <CompassIcon className="w-5 h-5"/>
                            <span>Reveal My Life Path</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const LifePathCalculatorPage: React.FC = () => {
    const [lifePathRequest, setLifePathRequest] = useState<LifePathFormInput | null>(null);

    if (lifePathRequest) {
        return <LifePathReport formData={lifePathRequest} onReset={() => setLifePathRequest(null)} />;
    }

    return <LifePathForm onSubmit={setLifePathRequest} />;
};