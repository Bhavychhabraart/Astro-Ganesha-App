import React, { useState, FormEvent, useEffect, useMemo } from 'react';
import { MuhuratFormInput, MuhuratReportData, Muhurat, MuhuratActivity } from '../types';
import { generateMuhuratReport } from '../utils/astrology';
import { ClockIcon } from '../components/Icons';

const MUHURAT_ACTIVITIES: MuhuratActivity[] = [
    "Getting Married",
    "Starting a New Business",
    "Buying a Property",
    "Buying a Vehicle",
    "Griha Pravesh (House Warming)",
    "Starting Education"
];

const LoadingState: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center min-h-[60vh]">
            <div className="w-20 h-20 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
            <h1 className="font-serif text-3xl font-bold text-brand-text-primary mt-8">Finding Auspicious Timings</h1>
            <p className="mt-2 text-lg text-brand-text-secondary">Consulting the cosmos for the perfect moment...</p>
        </div>
    );
};

const MuhuratCard: React.FC<{ muhurat: Muhurat }> = ({ muhurat }) => {
    const getAuspiciousnessColor = (level: 'Excellent' | 'Good' | 'Average') => {
        switch (level) {
            case 'Excellent': return 'bg-green-100 text-green-800';
            case 'Good': return 'bg-blue-100 text-blue-800';
            case 'Average': return 'bg-yellow-100 text-yellow-800';
        }
    };
    
    return (
        <div className="bg-brand-surface rounded-lg p-4">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold text-brand-text-primary text-lg">{new Date(muhurat.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="font-mono text-brand-primary text-xl font-bold">{muhurat.startTime} - {muhurat.endTime}</p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${getAuspiciousnessColor(muhurat.auspiciousness)}`}>
                    {muhurat.auspiciousness}
                </span>
            </div>
            <div className="text-sm text-brand-text-secondary mt-3 border-t border-brand-card pt-3">
                <p><strong>Nakshatra:</strong> {muhurat.nakshatra} | <strong>Tithi:</strong> {muhurat.tithi}</p>
                <p className="mt-2">{muhurat.description}</p>
            </div>
        </div>
    );
};


const Report: React.FC<{ data: MuhuratReportData, onReset: () => void }> = ({ data, onReset }) => {
    return (
        <div className="max-w-3xl mx-auto mt-6 animate-fade-in space-y-6">
            <div className="bg-brand-card p-6 rounded-xl shadow-md">
                 <h2 className="font-serif text-2xl font-bold text-brand-primary mb-3">Astrologer's Summary for {data.activity}</h2>
                 <p className="text-brand-text-secondary leading-relaxed">{data.summary}</p>
            </div>
            
            <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-brand-text-primary ml-1">Recommended Muhurats</h3>
                {data.muhurats.length > 0 ? (
                    data.muhurats.map((muhurat, index) => <MuhuratCard key={index} muhurat={muhurat} />)
                ) : (
                    <p className="text-brand-text-secondary bg-brand-surface rounded-lg p-4">No highly auspicious muhurats found in the selected range. You may want to expand the date range or consult an astrologer for remedial measures.</p>
                )}
            </div>
            
            <div className="text-center">
                <button onClick={onReset} className="mt-4 py-2 px-4 bg-brand-primary/80 text-black font-bold rounded-lg hover:bg-brand-accent transition-colors text-sm">
                    Find Another Muhurat
                </button>
            </div>
        </div>
    );
};


const CalculatorForm: React.FC<{ onSubmit: (data: MuhuratFormInput) => void }> = ({ onSubmit }) => {
    const today = new Date();
    const oneMonthLater = new Date(today);
    oneMonthLater.setMonth(today.getMonth() + 1);

    const [formData, setFormData] = useState<MuhuratFormInput>({
        activity: MUHURAT_ACTIVITIES[0],
        startDate: today.toISOString().split('T')[0],
        endDate: oneMonthLater.toISOString().split('T')[0]
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
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
                <div>
                    <label htmlFor="activity" className="block text-sm font-medium text-brand-text-secondary mb-2">Select Activity</label>
                    <select name="activity" id="activity" required className={inputStyle} value={formData.activity} onChange={handleChange}>
                        {MUHURAT_ACTIVITIES.map(act => <option key={act} value={act}>{act}</option>)}
                    </select>
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-brand-text-secondary mb-2">From Date</label>
                        <input type="date" name="startDate" id="startDate" required className={inputStyle} value={formData.startDate} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-brand-text-secondary mb-2">To Date</label>
                        <input type="date" name="endDate" id="endDate" required className={inputStyle} value={formData.endDate} onChange={handleChange} min={formData.startDate} />
                    </div>
                </div>
                <div>
                    <button type="submit" className="w-full py-3 px-4 bg-brand-primary text-black font-bold rounded-lg hover:bg-brand-accent transition-colors shadow-lg mt-2 flex items-center justify-center gap-2">
                        <ClockIcon className="w-5 h-5"/>
                        <span>Find Auspicious Time</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export const MuhuratTellerPage: React.FC = () => {
    const [reportData, setReportData] = useState<MuhuratReportData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = async (data: MuhuratFormInput) => {
        setIsLoading(true);
        setReportData(null);
        try {
            const report = await generateMuhuratReport(data);
            setReportData(report);
        } catch(e) {
            console.error(e);
            // In a real app, show an error message to the user
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <header className="mb-6 text-center">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-text-primary">Muhurat Teller</h1>
                <p className="text-brand-text-secondary mt-1 max-w-lg mx-auto">Find the most auspicious date and time (Shubh Muhurat) for your important events and ceremonies.</p>
            </header>
            
            {isLoading && <LoadingState />}
            {!isLoading && !reportData && <CalculatorForm onSubmit={handleFormSubmit} />}
            {!isLoading && reportData && <Report data={reportData} onReset={() => setReportData(null)} />}
        </div>
    );
};