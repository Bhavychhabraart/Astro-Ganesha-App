import React, { useState, useEffect, useMemo } from 'react';
import { KundliData, KundliFormInput, Planet, Prediction, Remedy } from '../../types';
import { generateKundliData } from '../../utils/astrology';
import { PrintIcon, GemstoneIcon, HandshakeIcon, SoundWaveIcon, DiyaIcon, StarIcon } from '../Icons';
import { BirthChart } from './BirthChart';

interface KundliReportProps {
    formData: KundliFormInput;
    onReset: () => void;
}

type Tab = 'overview' | 'predictions' | 'life_path' | 'remedies';

const PLANET_ORDER: Planet[] = ['Ascendant', 'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];

const ReportCard: React.FC<{ title?: string, children: React.ReactNode, className?: string, noPadding?: boolean }> = ({ title, children, className = '', noPadding = false }) => (
    <div className={`bg-brand-card rounded-xl shadow-md ${className}`}>
        {title && <h3 className={`font-serif text-xl font-bold text-brand-primary mb-4 border-b border-brand-surface pb-3 pt-4 sm:pt-6 ${noPadding ? 'px-4 sm:px-6' : ''}`}>{title}</h3>}
        <div className={noPadding ? 'pb-2' : 'p-4 sm:p-6 pt-0'}>{children}</div>
    </div>
);

const DetailItem: React.FC<{ label: string, value: string | number }> = ({ label, value }) => (
    <div className="flex justify-between py-2.5 border-b border-brand-surface">
        <span className="text-sm text-brand-text-secondary">{label}</span>
        <span className="font-semibold text-brand-text-primary text-sm text-right">{value}</span>
    </div>
);

const LoadingState: React.FC<{formData: KundliFormInput}> = ({formData}) => {
    const messages = useMemo(() => [
        "Calculating planetary positions...",
        "Aligning the cosmic energies...",
        "Consulting the stars for insights...",
        "Generating personalized predictions...",
        "Compiling your unique remedies...",
        "Almost there..."
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
            <h1 className="font-serif text-3xl font-bold text-brand-text-primary mt-8">Generating Your Cosmic Blueprint</h1>
            <p className="mt-2 text-lg text-brand-text-secondary">Please wait while we prepare the detailed report for {formData.name}.</p>
            <div className="mt-4 text-brand-accent font-semibold h-6">{message}</div>
        </div>
    );
};

const RemedyCard: React.FC<{ remedy: Remedy }> = ({ remedy }) => {
    const Icon = {
        gemstone: GemstoneIcon,
        mantra: SoundWaveIcon,
        charity: HandshakeIcon,
        ritual: DiyaIcon,
    }[remedy.type];

    return (
        <div className="bg-brand-surface rounded-lg p-4 flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-brand-yellow-light rounded-full flex items-center justify-center">
                 <Icon className="w-6 h-6 text-brand-gold" />
            </div>
            <div>
                <h4 className="font-bold text-brand-text-primary">{remedy.title}</h4>
                <p className="text-sm text-brand-text-secondary mt-1">{remedy.description}</p>
            </div>
        </div>
    );
};


export const KundliReport: React.FC<KundliReportProps> = ({ formData, onReset }) => {
    const [kundliData, setKundliData] = useState<KundliData | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>('overview');

    useEffect(() => {
        const fetchKundliData = async () => {
            setLoading(true);
            const data = await generateKundliData(formData);
            setKundliData(data);
            setLoading(false);
        };
        fetchKundliData();
    }, [formData]);

    if (loading) {
        return <LoadingState formData={formData} />;
    }

    if (!kundliData) {
        return <div className="p-4 text-center">Error generating report. Please try again.</div>;
    }

    const { basicDetails, planetaryPositions, navamsaPositions, vimshottariDasha, mangalDosha, yogas, sadeSati, generalCharacteristics, predictions, lifePhases, remedies } = kundliData;
    const ascendantPosition = planetaryPositions.find(p => p.planet === 'Ascendant');
    const navamsaAscendant = navamsaPositions.find(p => p.planet === 'Ascendant');

    const sortedPlanetaryPositions = [...planetaryPositions].sort((a, b) => PLANET_ORDER.indexOf(a.planet) - PLANET_ORDER.indexOf(b.planet));
    
    const TabButton: React.FC<{tab: Tab, label: string}> = ({tab, label}) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${activeTab === tab ? 'bg-brand-primary text-black shadow-md' : 'bg-brand-surface text-brand-text-secondary hover:bg-brand-card'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="bg-brand-background print:p-0">
            <header className="bg-brand-card rounded-xl p-4 mb-4 flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
                <div className="text-center sm:text-left">
                    <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-text-primary">Kundli for {formData.name}</h1>
                    <p className="text-brand-text-secondary">{formData.dob} | {formData.tob} | {formData.pob}</p>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => window.print()} className="p-2 bg-brand-surface rounded-md hover:bg-brand-primary/20 transition-colors">
                        <PrintIcon className="w-5 h-5 text-brand-primary" />
                    </button>
                    <button onClick={onReset} className="py-2 px-4 bg-brand-primary text-black font-bold rounded-lg hover:bg-brand-accent transition-colors text-sm">
                        New Report
                    </button>
                </div>
            </header>
            
            <div className="print:hidden">
                <div className="flex space-x-2 overflow-x-auto pb-4 -mx-4 px-4">
                    <TabButton tab="overview" label="Overview" />
                    <TabButton tab="predictions" label="Predictions" />
                    <TabButton tab="life_path" label="Life Path & Doshas" />
                    <TabButton tab="remedies" label="Remedies" />
                </div>
            </div>

            <div className="mt-4 space-y-4">
                {/* Overview Tab */}
                <div className={`${activeTab === 'overview' ? 'block' : 'hidden'} print:block space-y-4`}>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                        <div className="lg:col-span-3 space-y-4">
                             <ReportCard title="General Characteristics">
                                <p className="text-brand-text-secondary leading-relaxed">{generalCharacteristics}</p>
                            </ReportCard>
                            <ReportCard title="Birth Charts" noPadding>
                                <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {ascendantPosition && <BirthChart title="Lagna Chart (D1)" planetaryPositions={planetaryPositions} ascendantRashi={ascendantPosition.rashi} />}
                                    {navamsaAscendant && <BirthChart title="Navamsa Chart (D9)" planetaryPositions={navamsaPositions} ascendantRashi={navamsaAscendant.rashi} />}
                                </div>
                            </ReportCard>
                        </div>
                        <div className="lg:col-span-2 space-y-4">
                            <ReportCard title="Basic Details" noPadding>
                                <div className="grid grid-cols-1 gap-x-4 px-4 sm:px-6">
                                    <DetailItem label="Sun Sign" value={basicDetails.sunSign} />
                                    <DetailItem label="Moon Sign" value={basicDetails.moonSign} />
                                    <DetailItem label="Nakshatra" value={basicDetails.nakshatra} />
                                    <DetailItem label="Tithi" value={basicDetails.tithi} />
                                    <DetailItem label="Yog" value={basicDetails.yog} />
                                    <DetailItem label="Karan" value={basicDetails.karan} />
                                    <DetailItem label="Gan" value={basicDetails.gan} />
                                    <DetailItem label="Nadi" value={basicDetails.nadi} />
                                    <DetailItem label="Varna" value={basicDetails.varna} />
                                    <DetailItem label="Vashya" value={basicDetails.vashya} />
                                    <DetailItem label="Ayanamsa" value={basicDetails.ayanamsa} />
                                </div>
                            </ReportCard>
                        </div>
                    </div>
                     <ReportCard title="Planetary Positions" noPadding>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-brand-surface">
                                    <tr>
                                        <th className="p-3 font-semibold text-brand-text-primary">Planet</th><th className="p-3 font-semibold text-brand-text-primary">Rashi</th><th className="p-3 font-semibold text-brand-text-primary">Degrees</th>
                                        <th className="p-3 font-semibold text-brand-text-primary">House</th><th className="p-3 font-semibold text-brand-text-primary">Nakshatra</th><th className="p-3 font-semibold text-brand-text-primary">Pada</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedPlanetaryPositions.map(p => (
                                        <tr key={p.planet} className="border-b border-brand-surface last:border-b-0">
                                            <td className={`p-3 font-semibold ${p.isRetrograde ? 'text-red-500' : 'text-brand-text-dark'}`}>{p.planet} {p.isRetrograde ? '(R)' : ''}</td>
                                            <td className="p-3 text-brand-text-secondary">{p.rashi}</td><td className="p-3 text-brand-text-secondary">{p.degrees.toFixed(2)}</td>
                                            <td className="p-3 text-brand-text-secondary">{p.house}</td><td className="p-3 text-brand-text-secondary">{p.nakshatra}</td>
                                            <td className="p-3 text-brand-text-secondary">{p.nakshatraPada}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ReportCard>
                </div>

                {/* Predictions Tab */}
                <div className={`${activeTab === 'predictions' ? 'block' : 'hidden'} print:block print:pt-8 space-y-4`}>
                    <ReportCard title="Yearly Predictions">
                        <div className="space-y-4">
                            {predictions.yearly.map(p => <div key={p.title}><h4 className="font-bold text-brand-text-primary">{p.title}</h4><p className="text-sm text-brand-text-secondary mt-1">{p.prediction}</p></div>)}
                        </div>
                    </ReportCard>
                     <ReportCard title="Monthly Predictions">
                        <div className="space-y-4">
                            {predictions.monthly.map(p => <div key={p.title}><h4 className="font-bold text-brand-text-primary">{p.title}</h4><p className="text-sm text-brand-text-secondary mt-1">{p.prediction}</p></div>)}
                        </div>
                    </ReportCard>
                    <ReportCard title="Phases of Life">
                        <div className="space-y-4">
                            {lifePhases.map(p => <div key={p.title}><h4 className="font-bold text-brand-text-primary">{p.title}</h4><p className="text-sm text-brand-text-secondary mt-1">{p.prediction}</p></div>)}
                        </div>
                    </ReportCard>
                </div>
                
                {/* Life Path & Doshas Tab */}
                 <div className={`${activeTab === 'life_path' ? 'block' : 'hidden'} print:block print:pt-8 space-y-4`}>
                    <ReportCard title="Vimshottari Dasha">
                         <div className="overflow-x-auto max-h-96">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-brand-surface sticky top-0">
                                    <tr><th className="p-3 font-semibold text-brand-text-primary">Maha Dasha</th><th className="p-3 font-semibold text-brand-text-primary">Start Date</th><th className="p-3 font-semibold text-brand-text-primary">End Date</th></tr>
                                </thead>
                                 <tbody>
                                    {vimshottariDasha.map(dasha => (
                                        <tr key={dasha.planet} className="border-b border-brand-surface last:border-b-0">
                                            <td className="p-3 font-semibold text-brand-text-dark">{dasha.planet}</td><td className="p-3 text-brand-text-secondary">{dasha.startDate}</td><td className="p-3 text-brand-text-secondary">{dasha.endDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ReportCard>
                    <ReportCard title="Dosha Analysis">
                        <div className="space-y-4">
                             <div>
                                <h4 className="font-bold text-brand-text-primary">Mangal Dosha</h4>
                                <p className={`mt-1 font-semibold ${mangalDosha.hasDosha ? 'text-red-500' : 'text-green-500'}`}>{mangalDosha.hasDosha ? 'Dosha Present' : 'Dosha Not Present'}</p>
                                <p className="text-brand-text-secondary text-sm mt-1">{mangalDosha.description}</p>
                             </div>
                              <div>
                                <h4 className="font-bold text-brand-text-primary">Sade Sati Analysis</h4>
                                <p className={`mt-1 font-semibold ${sadeSati.isUndergoing ? 'text-amber-500' : 'text-green-500'}`}>{sadeSati.isUndergoing ? `Undergoing - ${sadeSati.currentPhase}` : 'Not Undergoing'}</p>
                                <p className="text-brand-text-secondary text-sm mt-1">{sadeSati.description}</p>
                             </div>
                        </div>
                    </ReportCard>
                     <ReportCard title="Key Yogas Present">
                        <div className="space-y-4">
                            {yogas.length > 0 ? yogas.map(yoga => (
                                <div key={yoga.name}>
                                    <h4 className="font-bold text-brand-text-primary flex items-center"><StarIcon className="w-4 h-4 mr-2 text-brand-accent"/> {yoga.name}</h4>
                                    <p className="text-brand-text-secondary text-sm mt-1 pl-6">{yoga.description}</p>
                                </div>
                            )) : <p className="text-brand-text-secondary">No major yogas identified in this mock analysis.</p>}
                        </div>
                     </ReportCard>
                </div>
                
                {/* Remedies Tab */}
                <div className={`${activeTab === 'remedies' ? 'block' : 'hidden'} print:block print:pt-8 space-y-4`}>
                    <ReportCard title="Personalized Remedies">
                        <div className="space-y-4">
                            {remedies.map((remedy, index) => <RemedyCard key={index} remedy={remedy} />)}
                            {remedies.length === 0 && <p className="text-brand-text-secondary">No specific remedies generated by AI. This may be due to a balanced chart or an issue with the AI service.</p>}
                        </div>
                    </ReportCard>
                </div>
            </div>
        </div>
    );
};