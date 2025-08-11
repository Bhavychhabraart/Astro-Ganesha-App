import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LaalKitabReport } from '../components/laalkitab/LaalKitabReport';
import { LaalKitabFormInput } from '../types';

const LaalKitabForm: React.FC<{ onSubmit: (data: LaalKitabFormInput) => void }> = ({ onSubmit }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LaalKitabFormInput>({
        name: 'Amit Kumar',
        dob: '1985-11-20',
        tob: '04:15',
        pob: 'Jalandhar, India'
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
        <div>
            <header className="mb-6 text-center">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-text-primary">Laal Kitab Report</h1>
                <p className="text-brand-text-secondary mt-1 max-w-xl mx-auto">Discover the unique wisdom of Laal Kitab. Get a detailed analysis and simple yet powerful remedies based on your birth details.</p>
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
                        <input type="text" name="pob" id="pob" placeholder="e.g. Jalandhar, India" required className={inputStyle} value={formData.pob} onChange={handleChange} />
                    </div>
                    <div>
                        <button type="submit" className="w-full py-3 px-4 bg-brand-red text-white font-bold rounded-lg hover:opacity-90 transition-colors shadow-lg mt-2">
                            Generate Laal Kitab Report
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const LaalKitabPage: React.FC = () => {
    const [reportRequest, setReportRequest] = useState<LaalKitabFormInput | null>(null);

    if (reportRequest) {
        return <LaalKitabReport formData={reportRequest} onReset={() => setReportRequest(null)} />;
    }

    return <LaalKitabForm onSubmit={setReportRequest} />;
};