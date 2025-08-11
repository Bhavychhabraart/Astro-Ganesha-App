import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { XIcon } from './Icons';

interface ImageCaptureProps {
    onCapture: (imageDataUrl: string) => void;
    onClose: () => void;
    overlay: ReactNode;
    instructions: string;
}

export const ImageCapture: React.FC<ImageCaptureProps> = ({ onCapture, onClose, overlay, instructions }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let stream: MediaStream | null = null;
        
        const startCamera = async () => {
            try {
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    stream = await navigator.mediaDevices.getUserMedia({ 
                        video: { 
                            facingMode: 'user', // prefer front camera
                            width: { ideal: 1280 },
                            height: { ideal: 720 }
                        } 
                    });
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                } else {
                    setError('Camera access is not supported by your browser.');
                }
            } catch (err) {
                console.error("Error accessing camera: ", err);
                if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                    setError('Camera permission was denied. Please allow camera access in your browser settings.');
                } else {
                    setError('Could not access the camera. Please ensure it is not being used by another application.');
                }
            }
        };

        startCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            
            // Set canvas dimensions to match video stream to avoid distortion
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            const context = canvas.getContext('2d');
            if (context) {
                // Flip the image horizontally for a mirror effect
                context.translate(canvas.width, 0);
                context.scale(-1, 1);
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
                onCapture(imageDataUrl.split(',')[1]); // Send only base64 data
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
            <div className="relative w-full h-full max-w-screen-lg">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                    style={{ transform: 'scaleX(-1)' }} // Mirror view for user convenience
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {overlay}
                </div>

                {error && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white p-4 rounded-lg text-center max-w-sm">
                        <h3 className="font-bold text-lg mb-2">Camera Error</h3>
                        <p>{error}</p>
                    </div>
                )}
                
                {/* Controls */}
                <div className="absolute top-4 right-4">
                     <button onClick={onClose} className="p-2 bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center">
                    <p className="text-white text-center mb-4 font-semibold">{instructions}</p>
                    <button
                        onClick={handleCapture}
                        disabled={!!error}
                        className="w-20 h-20 bg-white rounded-full border-4 border-white/50 ring-4 ring-black/30 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                        aria-label="Capture image"
                    />
                </div>
            </div>
            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
};
