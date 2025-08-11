

import React, { useState, useEffect } from 'react';
import { LifePathFormInput, LifePathReportData } from '../../types';
import { generateLifePathReport } from '../../utils/astrology';
import { CompassIcon, HeartIcon, BriefcaseIcon, StarIcon, SparkleIcon, ShieldAlertIcon } from '../Icons';

interface LifePathReportProps {
    formData: LifePathFormInput;
    onReset: () => void;
}

const LoadingState: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center min-h-[60vh]">
        <CompassIcon className="w-20 h-20 text-brand-gold animate-spin" />
        <h1 className="font-serif text-3xl font-bold text-brand-text-primary mt-8">Calculating Your Life Path</h1>
        <p className="mt-2 text-lg text-brand-text-secondary">The universe is revealing your unique number...</p>
    </div>
);

const ReportSection: React.FC<{ icon: React.FC<any>, title: string, children: React.ReactNode }> = ({ icon: Icon, title, children }) => (
    <div className="bg-brand-card rounded-xl shadow-md p-5">
        <div className="flex items-center mb-3">
            <Icon className="w-7 h-7 text-brand-gold mr-3"/>
            <h3 className="font-serif text-xl font-bold text-brand-text-primary">{title}</h3>
        </div>
        <div className="text-brand-text-secondary leading-relaxed">
            {children}
        </div>
    </div>
);


export const LifePathReport: React.FC<LifePathReportProps> = ({ formData, onReset }) => {
    const [reportData, setReportData] = useState<LifePathReportData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReportData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await generateLifePathReport(formData);
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
    
    const { lifePathNumber, title, introduction, coreStrengths, potentialChallenges, careerPath, loveAndRelationships, famousPeople, conclusion } = reportData;

    return (
        <div className="bg-brand-background print:p-0">
             <header className="bg-brand-card/50 backdrop-blur-sm rounded-xl p-4 mb-4 flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden sticky top-16 z-10">
                <div className="text-center sm:text-left">
                    <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-text-primary">Your Life Path Report</h1>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={onReset} className="py-2 px-4 bg-brand-gold text-white font-bold rounded-lg hover:opacity-90 transition-colors text-sm">
                        Calculate Another
                    </button>
                </div>
            </header>

            <div className="space-y-6 max-w-3xl mx-auto p-4 sm:p-0">
                <div className="bg-gradient-to-br from-brand-gold to-brand-yellow-dark text-white rounded-xl shadow-lg p-6 text-center">
                    <p className="text-lg">Your Life Path Number Is</p>
                    <p className="font-bold text-7xl my-2">{lifePathNumber}</p>
                    <h2 className="font-serif text-3xl font-bold">{title}</h2>
                    <p className="mt-4 text-white/80 max-w-xl mx-auto">{introduction}</p>
                </div>

                <ReportSection icon={StarIcon} title="Your Core Strengths">
                     <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 list-disc list-inside">
                        {coreStrengths.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                </ReportSection>

                 <ReportSection icon={ShieldAlertIcon} title="Potential Challenges">
                     <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 list-disc list-inside">
                        {potentialChallenges.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                </ReportSection>

                <ReportSection icon={BriefcaseIcon} title="Best Career Paths">
                    <p>{careerPath}</p>
                </ReportSection>
                
                <ReportSection icon={HeartIcon} title="Love & Relationships">
                    <p>{loveAndRelationships}</p>
                </ReportSection>

                 <ReportSection icon={SparkleIcon} title="Famous People With Your Number">
                    <p>{famousPeople.join(', ')}</p>
                </ReportSection>

                <div className="bg-brand-card rounded-xl shadow-md p-6">
                     <h3 className="font-serif text-xl font-bold text-brand-gold mb-2">A Final Word of Guidance</h3>
                     <p className="text-brand-text-secondary leading-relaxed">{conclusion}</p>
                </div>
            </div>
        </div>
    );
};