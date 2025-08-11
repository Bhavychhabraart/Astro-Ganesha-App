import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { KundliReport } from '../components/kundli/KundliReport';
import { KundliFormInput } from '../types';

const KundliForm: React.FC<{ onSubmit: (data: KundliFormInput) => void }> = ({ onSubmit }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<KundliFormInput>({
        name: 'John Doe',
        dob: '1990-01-01',
        tob: '12:00',
        pob: 'Delhi, India'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };
    
    const inputStyle = "w-full p-3 bg-brand-surface border border-transparent rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition-colors";

    return (
        <div>
            <header className="mb-6 text-center">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-text-primary">Generate Kundli</h1>
                <p className="text-brand-text-secondary mt-1 max-w-lg mx-auto">Enter your birth details to create a detailed astrological chart.</p>
            </header>
            
            <div className="max-w-lg mx-auto bg-brand-card p-6 sm:p-8 rounded-xl shadow-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-brand-text-secondary mb-2">Full Name</label>
                        <input type="text" name="name" id="name" required className={inputStyle} value={formData.name} onChange={handleChange} />
                    </div>
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
                        <button type="submit" className="w-full py-3 px-4 bg-brand-primary text-black font-bold rounded-lg hover:bg-brand-accent transition-colors shadow-lg mt-2">
                            Generate Kundli Chart
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const KundliPage: React.FC = () => {
    const [kundliRequest, setKundliRequest] = useState<KundliFormInput | null>(null);

    if (kundliRequest) {
        return <KundliReport formData={kundliRequest} onReset={() => setKundliRequest(null)} />;
    }

    return <KundliForm onSubmit={setKundliRequest} />;
};