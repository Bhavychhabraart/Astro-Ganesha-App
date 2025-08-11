import React, { useState, useEffect } from 'react';
import { LoveFormInput, LoveReportData } from '../../types';
import { generateLoveReport } from '../../utils/astrology';
import { PrintIcon, HeartIcon } from '../Icons';

interface LoveReportProps {
    formData: LoveFormInput;
    onReset: () => void;
}

const LoadingState: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center min-h-[60vh]">
        <HeartIcon className="w-20 h-20 text-brand-red animate-pulse" />
        <h1 className="font-serif text-3xl font-bold text-brand-text-primary mt-8">Calculating Your Love Score</h1>
        <p className="mt-2 text-lg text-brand-text-secondary">Consulting Cupid and the cosmos...</p>
    </div>
);

const LoveMeter: React.FC<{ score: number }> = ({ score }) => {
    const height = `${score}%`;
    return (
        <div className="relative w-48 h-48">
            <HeartIcon className="w-full h-full text-brand-pink-light" fill="currentColor"/>
            <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: '100%' }}>
                <div className="absolute bottom-0 left-0 right-0 bg-brand-red" style={{ height, transition: 'height 1.5s ease-out' }}>
                    <HeartIcon className="w-full h-full text-brand-red" fill="currentColor"/>
                </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-bold text-white" style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>{score}%</span>
            </div>
        </div>
    );
};

const AnalysisCard: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-brand-surface rounded-lg p-4">
        <h4 className="font-bold text-brand-gold text-lg">{title}</h4>
        <p className="text-brand-text-secondary mt-1">{children}</p>
    </div>
);


export const LoveReport: React.FC<LoveReportProps> = ({ formData, onReset }) => {
    const [reportData, setReportData] = useState<LoveReportData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReportData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await generateLoveReport(formData);
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

    const { score, summary, analysis, conclusion } = reportData;

    return (
        <div className="bg-brand-pink-light/50 print:p-0">
             <header className="bg-brand-card/50 backdrop-blur-sm rounded-xl p-4 mb-4 flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden sticky top-16 z-10">
                <div className="text-center sm:text-left">
                    <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-text-primary">Love Report</h1>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={onReset} className="py-2 px-4 bg-brand-red text-white font-bold rounded-lg hover:opacity-90 transition-colors text-sm">
                        Check Another Match
                    </button>
                </div>
            </header>

            <div className="space-y-6 max-w-2xl mx-auto p-4 sm:p-0">
                <div className="bg-brand-card rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
                    <LoveMeter score={score} />
                    <h2 className="font-serif text-3xl font-bold text-brand-text-primary mt-4">{formData.name1} + {formData.name2}</h2>
                    <p className="text-xl font-semibold text-brand-red mt-1">"{summary}"</p>
                </div>

                <div className="bg-brand-card rounded-xl shadow-lg p-6 space-y-4">
                    <AnalysisCard title="💖 Overall Compatibility">{analysis.compatibility}</AnalysisCard>
                    <AnalysisCard title="💬 Communication Style">{analysis.communication}</AnalysisCard>
                    <AnalysisCard title="🔥 Passion & Romance">{analysis.passion}</AnalysisCard>
                    <AnalysisCard title="🤔 Potential Challenges">{analysis.challenges}</AnalysisCard>
                </div>

                <div className="bg-brand-card rounded-xl shadow-lg p-6">
                     <h3 className="font-serif text-xl font-bold text-brand-gold mb-2">Final Verdict</h3>
                     <p className="text-brand-text-secondary leading-relaxed">{conclusion}</p>
                </div>
            </div>
        </div>
    );
};