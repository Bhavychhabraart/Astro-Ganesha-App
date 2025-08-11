import React, { useEffect } from 'react';

interface OmChantAnimationProps {
    onAnimationComplete: () => void;
}

export const OmChantAnimation: React.FC<OmChantAnimationProps> = ({ onAnimationComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onAnimationComplete();
        }, 1200); // Corresponds to animation duration

        return () => clearTimeout(timer);
    }, [onAnimationComplete]);

    return (
        <div className="absolute top-2 right-24 w-10 h-10 pointer-events-none z-50 flex items-center justify-center">
            {/* Main Icon */}
            <div className="absolute w-8 h-8 bg-brand-red rounded-full flex items-center justify-center text-white font-bold text-lg chant-glow-scale">
                ॐ
            </div>
            {/* Ripples */}
            <div className="absolute w-full h-full rounded-full border-2 border-brand-red chant-ripple" style={{ animationDelay: '0s' }}></div>
            <div className="absolute w-full h-full rounded-full border-2 border-brand-red chant-ripple" style={{ animationDelay: '0.3s' }}></div>
        </div>
    );
};
