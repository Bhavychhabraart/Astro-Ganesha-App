import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageCapture } from '../components/ImageCapture';
import { PalmReport } from '../components/palmistry/PalmReport';
import { PalmReadingReportData } from '../types';
import { generatePalmReadingReport } from '../utils/astrology';
import { HandIcon } from '../components/Icons';

const LoadingState: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center min-h-[70vh]">
        <div className="relative w-24 h-24">
            <HandIcon className="w-24 h-24 text-brand-primary" />
            <div className="absolute inset-0 border-2 border-brand-primary/50 rounded-full animate-ping"></div>
        </div>
        <h1 className="font-serif text-3xl font-bold text-brand-text-primary mt-8">Analyzing Your Palm</h1>
        <p className="mt-2 text-lg text-brand-text-secondary">Reading the secrets held in your hand...</p>
    </div>
);

export const PalmReaderPage: React.FC = () => {
    const navigate = useNavigate();
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [reportData, setReportData] = useState<PalmReadingReportData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showCamera, setShowCamera] = useState(true);

    const handleCapture = async (base64Image: string) => {
        setShowCamera(false);
        setIsLoading(true);
        setError(null);
        setCapturedImage(`data:image/jpeg;base64,${base64Image}`);
        
        try {
            const report = await generatePalmReadingReport(base64Image);
            setReportData(report);
        } catch (err) {
            setError(err.message || 'An unknown error occurred while analyzing the palm.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setCapturedImage(null);
        setReportData(null);
        setIsLoading(false);
        setError(null);
        setShowCamera(true);
    };

    const PalmOverlay = () => (
        <svg viewBox="0 0 500 500" className="w-full h-auto max-w-sm opacity-50">
            <path d="M261.2,46.1c-14.7-11.8-33.3-17.6-53.1-17.6c-17.7,0-34.5,4.7-49.2,13.2c-15.9,9.1-28.7,22.2-37.1,38.1 c-4.8,9.1-8.2,18.9-10.2,29.1c-3.2,16.2-2.7,32.7,1.4,48.7c2.4,9.2,6.1,18,10.9,26.2c-2.4-0.1-4.8-0.2-7.2-0.2 c-12.7,0-25.1,1.9-36.5,5.5c-15.9,5-29.6,13.2-40.4,24.1c-6.8,6.8-12.5,14.7-16.7,23.3c-7.9,16.1-11.3,34-9.8,51.8 c1.8,20.4,10.1,39.6,23.8,55.5c22.1,25.6,54.8,39.6,89.5,39.6c2.8,0,5.6-0.1,8.3-0.4c3.1-0.3,6.2-0.8,9.3-1.4 c13.4-2.8,26.5-7.4,38.6-13.8c11.3-5.9,21.9-13.3,31.4-21.8c25.4-22.6,41-55,44.7-89.9c1.4-13,0.9-26-1.3-38.8 c-4.5-26-16.9-49.7-35.4-68.5C305.8,97.1,286.1,65.6,261.2,46.1z" fill="none" stroke="#FFF" strokeWidth="4" strokeMiterlimit="10"/>
        </svg>
    );

    if (showCamera) {
        return (
            <ImageCapture 
                onCapture={handleCapture} 
                onClose={() => navigate(-1)} 
                overlay={<PalmOverlay />}
                instructions="Place your entire palm inside the outline."
            />
        );
    }
    
    return (
        <div>
            <header className="mb-6 text-center">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-text-primary">AI Palm Reading</h1>
            </header>
            {isLoading && <LoadingState />}
            {error && (
                <div className="text-center p-4 bg-red-100 text-red-700 rounded-lg">
                    <p><strong>Analysis Failed:</strong> {error}</p>
                    <button onClick={handleReset} className="mt-4 py-2 px-4 bg-brand-red text-white font-bold rounded-lg hover:opacity-90">
                        Try Again
                    </button>
                </div>
            )}
            {reportData && capturedImage && (
                <PalmReport 
                    reportData={reportData} 
                    capturedImage={capturedImage} 
                    onReset={handleReset} 
                />
            )}
        </div>
    );
};
