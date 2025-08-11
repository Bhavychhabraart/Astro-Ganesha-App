
import React, { useState, FormEvent, useEffect, useMemo } from 'react';
import { KundliFormInput, KundliData } from '../types';
import { generateKundliData } from '../utils/astrology';
import { CalendarIcon } from '../components/Icons';

const LoadingState: React.FC = () => {
    const messages = useMemo(() => [
        "Calculating your planetary timelines...",
        "Mapping your Vimshottari Dasha...",
        "Interpreting your current life phase...",
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
            <div className="w-20 h-20 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
            <h1 className="font-serif text-3xl font-bold text-brand-text-primary mt-8">Calculating Dasha Periods</h1>
            <div className="mt-4 text-brand-accent font-semibold h-6">{message}</div>
        </div>
    );
};

const Report: React.FC<{ data: KundliData, onReset: () => void }> = ({ data, onReset }) => {
    return (
        <div className="max-w-4xl mx-auto mt-6 animate-fade-in space-y-6">
            <div className="bg-brand-card p-6 rounded-xl shadow-md">
                 <h2 className="font-serif text-2xl font-bold text-brand-primary mb-3">Interpretation of Your Current Dasha</h2>
                 <p className="text-brand-text-secondary leading-relaxed">{data.dashaInterpretation}</p>
            </div>
             <div className="bg-brand-card p-6 rounded-xl shadow-md">
                 <h2 className="font-serif text-2xl font-bold text-brand-primary mb-4">Vimshottari Dasha Periods</h2>
                 <div className="overflow-x-auto max-h-96">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-brand-surface sticky top-0">
                            <tr>
                                <th className="p-3 font-semibold text-brand-text-primary">Maha Dasha</th>
                                <th className="p-3 font-semibold text-brand-text-primary">Start Date</th>
                                <th className="p-3 font-semibold text-brand-text-primary">End Date</th>
                            </tr>
                        </thead>
                         <tbody>
                            {data.vimshottariDasha.map(dasha => (
                                <tr key={dasha.planet} className="border-b border-brand-surface last:border-b-0">
                                    <td className="p-3 font-semibold text-brand-text-dark">{dasha.planet}</td>
                                    <td className="p-3 text-brand-text-secondary">{dasha.startDate}</td>
                                    <td className="p-3 text-brand-text-secondary">{dasha.endDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
             <div className="text-center">
                <button onClick={onReset} className="mt-4 py-2 px-4 bg-brand-primary/80 text-black font-bold rounded-lg hover:bg-brand-accent transition-colors text-sm">
                    Check Another Chart
                </button>
            </div>
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
    const inputStyle = "w-full p-3 bg-brand-surface border border-transparent rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition";

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
                    <button type="submit" className="w-full py-3 px-4 bg-brand-primary text-black font-bold rounded-lg hover:bg-brand-accent transition-colors shadow-lg mt-2 flex items-center justify-center gap-2">
                        <CalendarIcon className="w-5 h-5"/>
                        <span>Calculate Dasha Periods</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export const DashaCalculatorPage: React.FC = () => {
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
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-text-primary">Dasha Calculator</h1>
                <p className="text-brand-text-secondary mt-1 max-w-lg mx-auto">Discover your Vimshottari Dasha periods, the planetary cycles that influence the different phases of your life.</p>
            </header>
            
            {isLoading && <LoadingState />}
            {!isLoading && !kundliData && <CalculatorForm onSubmit={handleFormSubmit} />}
            {!isLoading && kundliData && <Report data={kundliData} onReset={() => setKundliData(null)} />}
        </div>
    );
};
