import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoneyCalculatorIcon } from '../components/Icons';
import { MoneyReport } from '../components/calculators/MoneyReport';
import { MoneyFormInput } from '../types';

const MoneyForm: React.FC<{ onSubmit: (data: MoneyFormInput) => void }> = ({ onSubmit }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<MoneyFormInput>({ name: '', dob: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };
    
    const inputStyle = "w-full p-3 bg-brand-surface border border-transparent rounded-lg focus:ring-2 focus:ring-brand-yellow-dark focus:outline-none transition";
    const maxDate = new Date().toISOString().split("T")[0];

    return (
        <div>
            <header className="mb-6 text-center">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-text-primary">Money Calculator</h1>
                <p className="text-brand-text-secondary mt-1 max-w-lg mx-auto">Enter your details to get an AI-powered financial outlook based on astrology.</p>
            </header>
            
            <div className="max-w-md mx-auto bg-brand-card p-8 rounded-xl shadow-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-brand-text-secondary mb-2">Full Name</label>
                        <input type="text" name="name" id="name" required className={inputStyle} value={formData.name} onChange={handleChange} />
                    </div>
                     <div>
                        <label htmlFor="dob" className="block text-sm font-medium text-brand-text-secondary mb-2">Date of Birth</label>
                        <input type="date" name="dob" id="dob" required className={inputStyle} value={formData.dob} onChange={handleChange} max={maxDate} />
                    </div>
                    <div>
                        <button type="submit" className="w-full py-3 px-4 bg-brand-yellow text-black font-bold rounded-lg hover:bg-brand-yellow-dark transition-colors shadow-lg flex items-center justify-center gap-2 mt-2">
                            <MoneyCalculatorIcon className="w-5 h-5"/>
                            <span>Generate Wealth Report</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const MoneyCalculatorPage: React.FC = () => {
    const [moneyRequest, setMoneyRequest] = useState<MoneyFormInput | null>(null);

    if (moneyRequest) {
        return <MoneyReport formData={moneyRequest} onReset={() => setMoneyRequest(null)} />;
    }

    return <MoneyForm onSubmit={setMoneyRequest} />;
};