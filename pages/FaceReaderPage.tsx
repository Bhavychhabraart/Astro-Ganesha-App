import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageCapture } from '../components/ImageCapture';
import { FaceReport } from '../components/facereading/FaceReport';
import { FaceReadingReportData } from '../types';
import { generateFaceReadingReport } from '../utils/astrology';
import { ScanFaceIcon } from '../components/Icons';

const LoadingState: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center min-h-[70vh]">
        <div className="relative w-24 h-24">
            <ScanFaceIcon className="w-24 h-24 text-brand-primary" />
            <div className="absolute inset-0 border-2 border-brand-primary/50 rounded-full animate-ping"></div>
        </div>
        <h1 className="font-serif text-3xl font-bold text-brand-text-primary mt-8">Reading Your Facial Features</h1>
        <p className="mt-2 text-lg text-brand-text-secondary">Uncovering the story your face tells...</p>
    </div>
);

export const FaceReaderPage: React.FC = () => {
    const navigate = useNavigate();
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [reportData, setReportData] = useState<FaceReadingReportData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showCamera, setShowCamera] = useState(true);

    const handleCapture = async (base64Image: string) => {
        setShowCamera(false);
        setIsLoading(true);
        setError(null);
        setCapturedImage(`data:image/jpeg;base64,${base64Image}`);
        
        try {
            const report = await generateFaceReadingReport(base64Image);
            setReportData(report);
        } catch (err) {
            setError(err.message || 'An unknown error occurred while analyzing the face.');
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

    const FaceOverlay = () => (
        <div className="w-full h-auto max-w-xs aspect-[3/4] border-4 border-dashed border-white/70 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] opacity-70" />
    );

    if (showCamera) {
        return (
            <ImageCapture 
                onCapture={handleCapture} 
                onClose={() => navigate(-1)} 
                overlay={<FaceOverlay />}
                instructions="Position your face inside the oval and ensure good lighting."
            />
        );
    }
    
    return (
        <div>
            <header className="mb-6 text-center">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-text-primary">AI Face Reading</h1>
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
                <FaceReport
                    reportData={reportData} 
                    capturedImage={capturedImage} 
                    onReset={handleReset} 
                />
            )}
        </div>
    );
};
