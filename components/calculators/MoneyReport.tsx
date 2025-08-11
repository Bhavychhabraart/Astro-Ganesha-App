import React, { useState, useEffect } from 'react';
import { MoneyFormInput, MoneyReportData } from '../../types';
import { generateMoneyReport } from '../../utils/astrology';
import { BriefcaseIcon, GemstoneIcon, MoneyCalculatorIcon, TrendingUpIcon } from '../Icons';

interface MoneyReportProps {
    formData: MoneyFormInput;
    onReset: () => void;
}

const LoadingState: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center min-h-[60vh]">
        <MoneyCalculatorIcon className="w-20 h-20 text-brand-yellow-dark animate-pulse" />
        <h1 className="font-serif text-3xl font-bold text-brand-text-primary mt-8">Analyzing Your Financial Karma</h1>
        <p className="mt-2 text-lg text-brand-text-secondary">Calculating your path to prosperity...</p>
    </div>
);

const ReportSection: React.FC<{ icon: React.FC<any>, title: string, children: React.ReactNode }> = ({ icon: Icon, title, children }) => (
    <div className="bg-brand-card rounded-xl shadow-md p-5">
        <div className="flex items-center mb-3">
            <Icon className="w-7 h-7 text-brand-yellow-dark mr-3"/>
            <h3 className="font-serif text-xl font-bold text-brand-text-primary">{title}</h3>
        </div>
        <div className="text-brand-text-secondary leading-relaxed">
            {children}
        </div>
    </div>
);

export const MoneyReport: React.FC<MoneyReportProps> = ({ formData, onReset }) => {
    const [reportData, setReportData] = useState<MoneyReportData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReportData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await generateMoneyReport(formData);
                setReportData(data);
            } catch (err) {
                setError(err.message || 'An unknown error occurred.');
            } finally {
                setLoading(false);
            }
        };
        fetchReportData();
    }, [formData]);

    if (loading) return <LoadingState />;
    if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;
    if (!reportData) return <div className="p-4 text-center">Could not generate the report.</div>;

    const { financialProfile, careerSuggestions, investmentGuidance, remedies } = reportData;

    return (
        <div className="bg-brand-bg-main print:p-0">
            <header className="bg-brand-card/50 backdrop-blur-sm rounded-xl p-4 mb-4 flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden sticky top-16 z-10">
                <div className="text-center sm:text-left">
                    <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-text-primary">Financial Outlook for {formData.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={onReset} className="py-2 px-4 bg-brand-yellow text-black font-bold rounded-lg hover:bg-brand-yellow-dark transition-colors text-sm">
                        New Report
                    </button>
                </div>
            </header>

            <div className="space-y-6 max-w-3xl mx-auto p-4 sm:p-0">
                <div className="bg-gradient-to-br from-brand-yellow to-brand-yellow-dark text-black rounded-xl shadow-lg p-6 text-center">
                    <h2 className="font-serif text-3xl font-bold">{financialProfile.title}</h2>
                    <p className="mt-2 text-black/80">{financialProfile.description}</p>
                </div>

                <ReportSection icon={BriefcaseIcon} title={careerSuggestions.title}>
                    <ul className="list-disc list-inside space-y-1 pl-2">
                        {careerSuggestions.suggestions.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                </ReportSection>

                <ReportSection icon={TrendingUpIcon} title={investmentGuidance.title}>
                    <p>{investmentGuidance.guidance}</p>
                </ReportSection>
                
                <ReportSection icon={GemstoneIcon} title={remedies.title}>
                     <ul className="list-disc list-inside space-y-1 pl-2">
                        {remedies.remedies.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                </ReportSection>

            </div>
        </div>
    );
};