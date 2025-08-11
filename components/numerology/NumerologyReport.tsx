
import React, { useState, useEffect } from 'react';
import { NumerologyFormInput, NumerologyReportData, NumerologyNumberInfo } from '../../types';
import { generateNumerologyReport } from '../../utils/astrology';
import { HashIcon } from '../Icons';

interface NumerologyReportProps {
    formData: NumerologyFormInput;
    onReset: () => void;
}

const LoadingState: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center min-h-[60vh]">
        <HashIcon className="w-20 h-20 text-brand-primary animate-pulse" />
        <h1 className="font-serif text-3xl font-bold text-brand-text-primary mt-8">Calculating Your Core Numbers</h1>
        <p className="mt-2 text-lg text-brand-text-secondary">The universe is crunching the numbers of your life...</p>
    </div>
);

const NumberCard: React.FC<{ numberInfo: NumerologyNumberInfo }> = ({ numberInfo }) => (
    <div className="bg-brand-card rounded-xl shadow-md p-5 flex gap-5">
        <div className="flex-shrink-0 w-20 h-20 bg-brand-primary/20 rounded-full flex flex-col items-center justify-center text-brand-primary">
            <span className="text-4xl font-bold">{numberInfo.number}</span>
        </div>
        <div className="flex-1">
            <h3 className="font-serif text-xl font-bold text-brand-text-primary">{numberInfo.title}</h3>
            <p className="text-brand-text-secondary leading-relaxed mt-1">{numberInfo.description}</p>
        </div>
    </div>
);


export const NumerologyReport: React.FC<NumerologyReportProps> = ({ formData, onReset }) => {
    const [reportData, setReportData] = useState<NumerologyReportData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReportData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await generateNumerologyReport(formData);
                setReportData(data);
            } catch (err) {
                setError((err as Error).message || 'An unknown error occurred.');
            } finally {
                setLoading(false);
            }
        };
        fetchReportData();
    }, [formData]);

    if (loading) return <LoadingState />;
    if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;
    if (!reportData) return <div className="p-4 text-center">Could not generate the report.</div>;

    const { lifePathNumber, expressionNumber, soulUrgeNumber, personalityNumber, birthdayNumber, overallSummary, luckyNumbers, luckyColors, challenges } = reportData;

    return (
        <div className="bg-brand-background print:p-0">
             <header className="bg-brand-card/80 backdrop-blur-sm rounded-xl p-4 mb-4 flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden sticky top-16 z-10">
                <div className="text-center sm:text-left">
                    <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-text-primary">Numerology Report for {formData.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={onReset} className="py-2 px-4 bg-brand-primary text-black font-bold rounded-lg hover:bg-brand-accent transition-colors text-sm">
                        New Report
                    </button>
                </div>
            </header>

            <div className="space-y-6 max-w-4xl mx-auto p-4 sm:p-0">
                <NumberCard numberInfo={lifePathNumber} />
                <NumberCard numberInfo={expressionNumber} />
                <NumberCard numberInfo={soulUrgeNumber} />
                <NumberCard numberInfo={personalityNumber} />
                <NumberCard numberInfo={birthdayNumber} />

                 <div className="bg-brand-card rounded-xl shadow-md p-5">
                    <h3 className="font-serif text-xl font-bold text-brand-text-primary">Your Numerology Summary</h3>
                    <p className="text-brand-text-secondary mt-2">{overallSummary}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-brand-card rounded-xl shadow-md p-5 text-center">
                        <h3 className="font-serif text-lg font-bold text-brand-text-primary">Lucky Numbers</h3>
                        <p className="text-3xl font-bold text-brand-primary mt-2">{luckyNumbers.join(', ')}</p>
                    </div>
                     <div className="bg-brand-card rounded-xl shadow-md p-5 text-center">
                        <h3 className="font-serif text-lg font-bold text-brand-text-primary">Lucky Colors</h3>
                        <p className="text-lg font-semibold text-brand-primary mt-2">{luckyColors.join(', ')}</p>
                    </div>
                     <div className="bg-brand-card rounded-xl shadow-md p-5 text-center">
                        <h3 className="font-serif text-lg font-bold text-brand-text-primary">Key Challenge</h3>
                        <p className="text-md text-brand-text-secondary mt-2">{challenges}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};
