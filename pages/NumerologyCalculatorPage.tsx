
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { HashIcon } from '../components/Icons';
import { NumerologyReport } from '../components/numerology/NumerologyReport';
import { NumerologyFormInput } from '../types';

const NumerologyForm: React.FC<{ onSubmit: (data: NumerologyFormInput) => void }> = ({ onSubmit }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<NumerologyFormInput>({ name: 'Ganesha', dob: '1995-08-22' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };
    
    const inputStyle = "w-full p-3 bg-brand-surface border border-transparent rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition";
    const maxDate = new Date().toISOString().split("T")[0];

    return (
        <div>
            <header className="mb-6 text-center">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-text-primary">Numerology Calculator</h1>
                <p className="text-brand-text-secondary mt-1 max-w-lg mx-auto">Uncover the hidden meanings in your name and birth date to reveal your personality, destiny, and life path.</p>
            </header>
            
            <div className="max-w-md mx-auto bg-brand-card p-8 rounded-xl shadow-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-brand-text-secondary mb-2">Full Name (as on birth certificate)</label>
                        <input type="text" name="name" id="name" required className={inputStyle} value={formData.name} onChange={handleChange} />
                    </div>
                     <div>
                        <label htmlFor="dob" className="block text-sm font-medium text-brand-text-secondary mb-2">Date of Birth</label>
                        <input type="date" name="dob" id="dob" required className={inputStyle} value={formData.dob} onChange={handleChange} max={maxDate} />
                    </div>
                    <div>
                        <button type="submit" className="w-full py-3 px-4 bg-brand-primary text-black font-bold rounded-lg hover:bg-brand-accent transition-colors shadow-lg flex items-center justify-center gap-2 mt-2">
                            <HashIcon className="w-5 h-5"/>
                            <span>Calculate My Numbers</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const NumerologyCalculatorPage: React.FC = () => {
    const [reportRequest, setReportRequest] = useState<NumerologyFormInput | null>(null);

    if (reportRequest) {
        return <NumerologyReport formData={reportRequest} onReset={() => setReportRequest(null)} />;
    }

    return <NumerologyForm onSubmit={setReportRequest} />;
};
