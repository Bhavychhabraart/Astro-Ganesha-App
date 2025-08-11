import React from 'react';
import { FaceReadingReportData } from '../../types';

interface FaceReportProps {
    reportData: FaceReadingReportData;
    capturedImage: string;
    onReset: () => void;
}

const ReportCard: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-brand-surface rounded-xl p-5">
        <h3 className="font-serif text-xl font-bold text-brand-text-primary mb-3">{title}</h3>
        <p className="text-brand-text-secondary leading-relaxed">{children}</p>
    </div>
);

export const FaceReport: React.FC<FaceReportProps> = ({ reportData, capturedImage, onReset }) => {
    return (
        <div className="animate-fade-in space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <img src={capturedImage} alt="Captured face" className="w-full rounded-xl shadow-lg" />
                    <button onClick={onReset} className="mt-4 w-full py-2 px-4 bg-brand-primary/80 text-black font-bold rounded-lg hover:bg-brand-accent transition-colors text-sm">
                        Scan Another Face
                    </button>
                </div>
                <div className="md:col-span-2 space-y-4">
                    <ReportCard title={`Face Shape: ${reportData.faceShape.shape}`}>
                        {reportData.faceShape.analysis}
                    </ReportCard>
                     <ReportCard title="Overall Personality">
                        {reportData.overallPersonality}
                    </ReportCard>
                </div>
            </div>

            <div className="bg-brand-card rounded-xl shadow-md p-4">
                 <h2 className="font-serif text-2xl font-bold text-brand-text-primary px-2 pb-3 mb-3 border-b border-brand-surface">Feature Analysis</h2>
                <div className="space-y-4">
                     {reportData.features.map(feature => (
                        <div key={feature.featureName} className="p-2">
                             <h4 className="font-bold text-lg text-brand-primary">{feature.featureName}</h4>
                             <p className="text-brand-text-secondary leading-relaxed mt-1">{feature.analysis}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
