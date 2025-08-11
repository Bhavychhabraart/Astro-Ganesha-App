
import React from 'react';
import { TarotCardData } from '../../types';

interface TarotCardProps {
    cardData: TarotCardData;
    isFlipped: boolean;
    isSelectable: boolean;
    onClick?: () => void;
}

export const TarotCard: React.FC<TarotCardProps> = ({ cardData, isFlipped, isSelectable, onClick }) => {
    return (
        <div 
            className={`tarot-card-container w-full h-full ${isFlipped ? 'flipped' : ''} ${isSelectable ? 'cursor-pointer hover:scale-105 transition-transform duration-200' : 'opacity-50'}`}
            onClick={isSelectable ? onClick : undefined}
            role="button"
            aria-label={isFlipped ? cardData.name : 'Face-down tarot card'}
            aria-pressed={isFlipped}
        >
            <div className="tarot-card-inner">
                {/* Face-down view */}
                <div className="tarot-card-front bg-gradient-to-br from-indigo-800 via-purple-800 to-indigo-900 p-1 shadow-lg">
                     <div className="w-full h-full border-2 border-yellow-300/50 rounded-md flex items-center justify-center relative overflow-hidden">
                        <div className="text-yellow-300 text-5xl font-serif opacity-70">A</div>
                        <div className="absolute top-4 left-4 text-yellow-300/50 text-xs">✦</div>
                        <div className="absolute top-8 right-6 text-yellow-300/50 text-md">✧</div>
                        <div className="absolute bottom-6 left-8 text-yellow-300/50 text-lg">✶</div>
                        <div className="absolute bottom-10 right-10 text-yellow-300/50 text-sm">✨</div>
                    </div>
                </div>
                
                {/* Face-up view (revealed on flip) */}
                <div className="tarot-card-back bg-brand-card shadow-lg">
                     <img src={cardData.image} alt={cardData.name} className="w-full h-full object-cover"/>
                     <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1 text-center">
                        <p className="text-white font-semibold text-xs truncate">{cardData.name}</p>
                     </div>
                </div>
            </div>
        </div>
    );
};
