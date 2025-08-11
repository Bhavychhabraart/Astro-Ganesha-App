import React, { useState } from 'react';
import { PalmReadingReportData } from '../../types';

interface PalmReportProps {
    reportData: PalmReadingReportData;
    capturedImage: string;
    onReset: () => void;
}

type Tab = 'summary' | 'lines' | 'mounts';

const ReportCard: React.FC<{ title?: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-brand-surface rounded-xl p-5">
        {title && <h3 className="font-serif text-xl font-bold text-brand-text-primary mb-3">{title}</h3>}
        {children}
    </div>
);

export const PalmReport: React.FC<PalmReportProps> = ({ reportData, capturedImage, onReset }) => {
    const [activeTab, setActiveTab] = useState<Tab>('summary');

    const TabButton: React.FC<{ tab: Tab; label: string }> = ({ tab, label }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === tab ? 'bg-brand-primary text-black shadow-md' : 'bg-brand-card text-brand-text-secondary hover:bg-brand-surface'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="animate-fade-in space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <img src={capturedImage} alt="Captured palm" className="w-full rounded-xl shadow-lg" />
                    <button onClick={onReset} className="mt-4 w-full py-2 px-4 bg-brand-primary/80 text-black font-bold rounded-lg hover:bg-brand-accent transition-colors text-sm">
                        Scan Another Palm
                    </button>
                </div>
                <div className="md:col-span-2">
                    <ReportCard title={`Hand Shape: ${reportData.handShape.shape}`}>
                        <p className="text-brand-text-secondary leading-relaxed">{reportData.handShape.analysis}</p>
                    </ReportCard>
                </div>
            </div>

            <div className="bg-brand-card rounded-xl shadow-md p-4">
                <div className="flex space-x-2 overflow-x-auto pb-3 mb-4 border-b border-brand-surface">
                    <TabButton tab="summary" label="Overall Summary" />
                    <TabButton tab="lines" label="Major Lines" />
                    <TabButton tab="mounts" label="Mounts" />
                </div>
                
                <div className="space-y-4">
                    {activeTab === 'summary' && (
                        <div className="animate-fade-in">
                            <p className="text-brand-text-secondary leading-relaxed">{reportData.overallSummary}</p>
                        </div>
                    )}
                    {activeTab === 'lines' && (
                         <div className="space-y-4 animate-fade-in">
                            {reportData.lines.map(line => (
                                <ReportCard key={line.lineName} title={line.lineName}>
                                     <p className="text-brand-text-secondary leading-relaxed">{line.analysis}</p>
                                </ReportCard>
                            ))}
                        </div>
                    )}
                    {activeTab === 'mounts' && (
                        <div className="space-y-4 animate-fade-in">
                            {reportData.mounts.map(mount => (
                                <ReportCard key={mount.mountName} title={`Mount of ${mount.mountName}`}>
                                     <p className="text-brand-text-secondary leading-relaxed">{mount.analysis}</p>
                                </ReportCard>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
