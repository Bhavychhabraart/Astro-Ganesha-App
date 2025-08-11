
import React, { useState, useEffect, useMemo } from 'react';
import { MatchmakingFormInput, MatchmakingReportData, Rashi } from '../../types';
import { generateMatchmakingReport } from '../../utils/astrology';
import { PrintIcon, HandshakeIcon, StarIcon } from '../Icons';

interface MatchmakingReportProps {
    formData: MatchmakingFormInput;
    onReset: () => void;
}

const ReportCard: React.FC<{ title?: string, children: React.ReactNode, className?: string, noPadding?: boolean }> = ({ title, children, className = '', noPadding = false }) => (
    <div className={`bg-brand-card rounded-xl shadow-md ${className}`}>
        {title && <h3 className={`font-serif text-xl font-bold text-brand-primary mb-4 border-b border-brand-surface pb-3 pt-4 sm:pt-6 ${noPadding ? 'px-4 sm:px-6' : ''}`}>{title}</h3>}
        <div className={noPadding ? 'pb-2' : 'p-4 sm:p-6 pt-0'}>{children}</div>
    </div>
);

const LoadingState: React.FC<{formData: MatchmakingFormInput}> = ({formData}) => {
    const messages = useMemo(() => [
        "Comparing birth charts...",
        "Calculating Ashtakoota score...",
        "Analyzing planetary influences...",
        "Checking for Mangal Dosha...",
        "Formulating the final verdict...",
        "Crafting your compatibility report..."
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
            <div className="w-20 h-20 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
            <h1 className="font-serif text-3xl font-bold text-brand-text-primary mt-8">Analyzing Compatibility</h1>
            <p className="mt-2 text-lg text-brand-text-secondary">Please wait while we prepare the report for {formData.boy.name} & {formData.girl.name}.</p>
            <div className="mt-4 text-brand-accent font-semibold h-6">{message}</div>
        </div>
    );
};

const ScoreCircle: React.FC<{ score: number, total: number }> = ({ score, total }) => {
    const percentage = total > 0 ? (score / total) * 100 : 0;
    const radius = 60;
    const strokeWidth = 12;
    const innerRadius = radius - strokeWidth / 2;
    const circumference = 2 * Math.PI * innerRadius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative w-40 h-40">
            <svg className="w-full h-full" viewBox="0 0 144 144">
                <circle
                    className="text-brand-surface"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    fill="transparent"
                    r={innerRadius}
                    cx={radius + strokeWidth/2}
                    cy={radius + strokeWidth/2}
                />
                <circle
                    className="text-brand-primary transition-all duration-1000 ease-out"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={innerRadius}
                    cx={radius + strokeWidth/2}
                    cy={radius + strokeWidth/2}
                    style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-brand-text-primary">{score}</span>
                <span className="text-sm text-brand-text-secondary">/ {total} Gunas</span>
            </div>
        </div>
    );
};

export const MatchmakingReport: React.FC<MatchmakingReportProps> = ({ formData, onReset }) => {
    const [reportData, setReportData] = useState<MatchmakingReportData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReportData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await generateMatchmakingReport(formData);
                setReportData(data);
            } catch (err) {
                setError(err.message || 'An unknown error occurred.');
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

    const { compatibilityScore, summary, ashtakoota, mangalDoshaAnalysis, conclusion, boyChartSummary, girlChartSummary } = reportData;

    return (
        <div className="bg-brand-background print:p-0">
            <header className="bg-brand-card rounded-xl p-4 mb-4 flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
                <div className="text-center sm:text-left">
                    <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-text-primary">Compatibility Report</h1>
                    <p className="text-brand-text-secondary">{formData.boy.name} &amp; {formData.girl.name}</p>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => window.print()} className="p-2 bg-brand-surface rounded-md hover:bg-brand-primary/20 transition-colors">
                        <PrintIcon className="w-5 h-5 text-brand-primary" />
                    </button>
                    <button onClick={onReset} className="py-2 px-4 bg-brand-primary text-black font-bold rounded-lg hover:bg-brand-accent transition-colors text-sm">
                        New Match
                    </button>
                </div>
            </header>

            <div className="space-y-4">
                <ReportCard>
                    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                        <HandshakeIcon className="w-16 h-16 text-brand-accent hidden md:block" />
                        <div className="flex-shrink-0">
                            <ScoreCircle score={compatibilityScore.obtained} total={compatibilityScore.total} />
                        </div>
                        <div className="flex-1">
                            <p className="text-brand-accent font-semibold text-lg">{summary}</p>
                            <h2 className="font-serif text-3xl font-bold text-brand-text-primary mt-1">Ashtakoota Milan Score</h2>
                            <p className="text-brand-text-secondary mt-2">
                                Based on the eight-fold test of Vedic astrology, this score represents the core compatibility between {formData.boy.name} and {formData.girl.name}.
                            </p>
                        </div>
                    </div>
                </ReportCard>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ReportCard title="Boy's Details">
                        <p className="font-bold text-xl text-brand-text-primary">{formData.boy.name}</p>
                        <div className="mt-2 text-brand-text-secondary">Moon Sign (Rashi): <span className="font-semibold text-brand-text-primary">{boyChartSummary.moonSign}</span></div>
                        <div className="text-brand-text-secondary">Birth Star (Nakshatra): <span className="font-semibold text-brand-text-primary">{boyChartSummary.nakshatra}</span></div>
                    </ReportCard>
                    <ReportCard title="Girl's Details">
                        <p className="font-bold text-xl text-brand-text-primary">{formData.girl.name}</p>
                        <div className="mt-2 text-brand-text-secondary">Moon Sign (Rashi): <span className="font-semibold text-brand-text-primary">{girlChartSummary.moonSign}</span></div>
                        <div className="text-brand-text-secondary">Birth Star (Nakshatra): <span className="font-semibold text-brand-text-primary">{girlChartSummary.nakshatra}</span></div>
                    </ReportCard>
                </div>

                <ReportCard title="Ashtakoota Milan Details" noPadding>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-brand-surface">
                                <tr>
                                    <th className="p-3 font-semibold text-brand-text-primary">Koota</th>
                                    <th className="p-3 font-semibold text-brand-text-primary">Description</th>
                                    <th className="p-3 text-center font-semibold text-brand-text-primary">Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ashtakoota.map(k => (
                                    <tr key={k.koota} className="border-b border-brand-surface last:border-b-0">
                                        <td className="p-3 font-semibold w-1/5 text-brand-text-dark">{k.koota}</td>
                                        <td className="p-3 w-3/5 text-brand-text-secondary">{k.description}</td>
                                        <td className="p-3 w-1/5 text-center font-bold text-lg text-brand-text-dark">{k.obtained}<span className="text-sm font-normal text-brand-text-secondary">/{k.total}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </ReportCard>

                <ReportCard title="Dosha Analysis">
                    <h4 className="font-bold text-brand-text-primary">{mangalDoshaAnalysis.title}</h4>
                    <p className={`mt-1 font-semibold ${mangalDoshaAnalysis.isCompatible ? 'text-green-500' : 'text-red-500'}`}>
                        {mangalDoshaAnalysis.isCompatible ? 'Compatible' : 'Incompatible'}
                    </p>
                    <p className="text-brand-text-secondary text-sm mt-1">{mangalDoshaAnalysis.description}</p>
                </ReportCard>

                <ReportCard title="Astrologer's Conclusion">
                    <p className="text-brand-text-secondary leading-relaxed">{conclusion}</p>
                </ReportCard>
            </div>
        </div>
    );
};
