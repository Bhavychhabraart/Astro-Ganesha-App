
import React, { useState, useEffect, useMemo } from 'react';
import { LaalKitabFormInput, LaalKitabReportData, LaalKitabRemedy } from '../../types';
import { generateLaalKitabReport } from '../../utils/astrology';
import { PrintIcon, ShieldAlertIcon } from '../Icons';
import { LaalKitabChart } from './LaalKitabChart';

interface LaalKitabReportProps {
    formData: LaalKitabFormInput;
    onReset: () => void;
}

const ReportCard: React.FC<{ title?: string, children: React.ReactNode, className?: string, noPadding?: boolean }> = ({ title, children, className = '', noPadding = false }) => (
    <div className={`bg-brand-card rounded-xl shadow-md ${className}`}>
        {title && <h3 className={`font-serif text-xl font-bold text-brand-primary mb-4 border-b border-brand-surface pb-3 pt-4 sm:pt-6 ${noPadding ? 'px-4 sm:px-6' : ''}`}>{title}</h3>}
        <div className={noPadding ? 'p-4 sm:p-6' : 'p-4 sm:p-6'}>{children}</div>
    </div>
);

const LoadingState: React.FC<{formData: LaalKitabFormInput}> = ({formData}) => {
    const messages = useMemo(() => [
        "Analyzing planetary placements...",
        "Consulting the red book's wisdom...",
        "Identifying sleeping planets...",
        "Checking for ancestral debts...",
        "Formulating powerful 'upay'...",
        "Preparing your unique report..."
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
        <div className="flex flex-col items-center justify-center h-full p-8 text-center min-h-[70vh]">
            <div className="w-20 h-20 border-4 border-brand-red border-t-transparent rounded-full animate-spin"></div>
            <h1 className="font-serif text-3xl font-bold text-brand-text-primary mt-8">Unlocking Laal Kitab Secrets</h1>
            <p className="mt-2 text-lg text-brand-text-secondary">Please wait while we prepare the report for {formData.name}.</p>
            <div className="mt-4 text-brand-accent font-semibold h-6">{message}</div>
        </div>
    );
};

const RemedyCard: React.FC<{ remedy: LaalKitabRemedy }> = ({ remedy }) => (
    <div className="bg-brand-surface rounded-lg p-4">
        <h4 className="font-bold text-brand-text-primary">{remedy.title}</h4>
        <p className="text-sm text-brand-text-secondary mt-1">{remedy.description}</p>
        <p className="text-xs text-brand-red font-semibold uppercase mt-2">{remedy.category}</p>
    </div>
);

export const LaalKitabReport: React.FC<LaalKitabReportProps> = ({ formData, onReset }) => {
    const [reportData, setReportData] = useState<LaalKitabReportData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReportData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await generateLaalKitabReport(formData);
                setReportData(data);
            } catch (err) {
                setError((err as Error).message || 'An unknown error occurred.');
            } finally {
                setLoading(false);
            }
        };
        fetchReportData();
    }, [formData]);

    if (loading) {
        return <LoadingState formData={formData} />;
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">Error generating report: {error}</div>;
    }

    if (!reportData) {
        return <div className="p-4 text-center">Could not generate the report. Please try again.</div>;
    }
    
    const { introduction, kundliChakra, planetaryAnalysis, planetStatus, ancestralDebts, keyPlanets, varshphal, remedies, conclusion } = reportData;

    return (
        <div className="bg-brand-background print:p-0">
            <header className="bg-brand-card rounded-xl p-4 mb-4 flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
                <div className="text-center sm:text-left">
                    <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-text-primary">Laal Kitab Report for {formData.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => window.print()} className="p-2 bg-brand-surface rounded-md hover:bg-brand-red/20 transition-colors">
                        <PrintIcon className="w-5 h-5 text-brand-red" />
                    </button>
                    <button onClick={onReset} className="py-2 px-4 bg-brand-red text-white font-bold rounded-lg hover:opacity-90 transition-colors text-sm">
                        New Report
                    </button>
                </div>
            </header>

            <div className="space-y-4">
                <ReportCard title="Introduction from Lal Shastri">
                    <p className="text-brand-text-secondary leading-relaxed">{introduction}</p>
                </ReportCard>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ReportCard title="Laal Kitab Kundli">
                        <LaalKitabChart chakra={kundliChakra} />
                    </ReportCard>
                    <ReportCard title="Key Planets">
                        <div className="space-y-3">
                            <div>
                                <h4 className="font-semibold text-green-600">Benefic Planets</h4>
                                <ul className="list-disc list-inside text-sm text-brand-text-secondary">
                                    {keyPlanets.benefic.map(p => <li key={p.planet}><strong>{p.planet}:</strong> {p.reason}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-red-600">Malefic Planets</h4>
                                 <ul className="list-disc list-inside text-sm text-brand-text-secondary">
                                    {keyPlanets.malefic.map(p => <li key={p.planet}><strong>{p.planet}:</strong> {p.reason}</li>)}
                                </ul>
                            </div>
                        </div>
                    </ReportCard>
                </div>

                <ReportCard title={`Annual Forecast (Varshphal) for ${varshphal.currentYear}`}>
                     <div className="space-y-3">
                        <p className="text-brand-text-secondary">Ruling Planet: <strong className="text-brand-text-primary">{varshphal.rulingPlanet}</strong></p>
                        <div>
                            <h4 className="font-bold text-brand-text-primary">Overall Outlook</h4>
                            <p className="text-sm text-brand-text-secondary mt-1">{varshphal.overall}</p>
                        </div>
                         <div>
                            <h4 className="font-bold text-brand-text-primary">Career & Finance</h4>
                            <p className="text-sm text-brand-text-secondary mt-1">{varshphal.career}</p>
                        </div>
                         <div>
                            <h4 className="font-bold text-brand-text-primary">Health</h4>
                            <p className="text-sm text-brand-text-secondary mt-1">{varshphal.health}</p>
                        </div>
                         <div>
                            <h4 className="font-bold text-brand-text-primary">Relationships</h4>
                            <p className="text-sm text-brand-text-secondary mt-1">{varshphal.relationships}</p>
                        </div>
                    </div>
                </ReportCard>

                <ReportCard title="Planetary Analysis">
                    <div className="space-y-4">
                        {planetaryAnalysis.map(p => (
                            <div key={p.planet}>
                                <h4 className={`font-bold ${p.isGood ? 'text-green-600' : 'text-red-600'}`}>{p.planet} in House {p.house}</h4>
                                <p className="text-sm text-brand-text-secondary mt-1">{p.effect}</p>
                            </div>
                        ))}
                    </div>
                </ReportCard>

                <ReportCard title="Ancestral Debts (Pitra Rin)">
                    <div className="space-y-4">
                        {ancestralDebts.filter(d => d.isPresent).length > 0 ? (
                            ancestralDebts.filter(d => d.isPresent).map(debt => (
                                <div key={debt.name}>
                                    <h4 className="font-bold text-brand-text-primary flex items-center"><ShieldAlertIcon className="w-5 h-5 mr-2 text-brand-accent"/>{debt.name}</h4>
                                    <p className="text-sm text-brand-text-secondary mt-1">{debt.description}</p>
                                </div>
                            ))
                        ) : <p className="text-brand-text-secondary">No major ancestral debts were identified in this analysis. This is a favorable position.</p>
                        }
                    </div>
                </ReportCard>

                 <ReportCard title="Powerful Remedies (Upay)">
                    <p className="text-sm text-brand-text-secondary mb-4">These remedies are simple but highly effective. Perform them with faith for best results.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {remedies.map((remedy, index) => <RemedyCard key={index} remedy={remedy} />)}
                    </div>
                </ReportCard>
                
                 <ReportCard title="Conclusion">
                    <p className="text-brand-text-secondary leading-relaxed">{conclusion}</p>
                </ReportCard>

            </div>
        </div>
    );
};
