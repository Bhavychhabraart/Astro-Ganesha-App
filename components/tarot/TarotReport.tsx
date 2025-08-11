
import React from 'react';
import { TarotReadingData, TarotCardData } from '../../types';
import { TarotCard } from './TarotCard';

interface TarotReportProps {
    readingData: TarotReadingData;
    selectedCards: { card: TarotCardData, position: string }[];
    onReset: () => void;
}

const InterpretationCard: React.FC<{ card: TarotCardData, position: string, interpretation: string }> = ({ card, position, interpretation }) => (
    <div className="bg-brand-card rounded-xl shadow-md p-5 flex flex-col sm:flex-row gap-5 items-center sm:items-start">
        <div className="flex-shrink-0 w-32 h-56">
            <TarotCard cardData={card} isFlipped={true} isSelectable={false} />
        </div>
        <div className="flex-1 text-center sm:text-left">
            <p className="text-brand-accent font-semibold">{position}</p>
            <h3 className="font-serif text-2xl font-bold text-brand-text-primary mb-2">{card.name}</h3>
            <p className="text-brand-text-secondary leading-relaxed">{interpretation}</p>
        </div>
    </div>
);


export const TarotReport: React.FC<TarotReportProps> = ({ readingData, selectedCards, onReset }) => {
    
    return (
        <div className="animate-fade-in space-y-6 max-w-4xl mx-auto">
            <header className="text-center">
                <h1 className="font-serif text-4xl font-bold text-brand-text-primary">Your Tarot Reading</h1>
                <p className="text-brand-text-secondary mt-1 text-lg">Here is the guidance from the cards.</p>
            </header>

            <div className="space-y-6">
                {readingData.interpretations.map((interp) => {
                    const cardData = selectedCards.find(c => c.card.name === interp.cardName)?.card;
                    if (!cardData) return null;
                    return (
                        <InterpretationCard 
                            key={interp.position}
                            card={cardData}
                            position={interp.position}
                            interpretation={interp.interpretation}
                        />
                    );
                })}
            </div>
            
             <div className="bg-brand-card rounded-xl shadow-md p-6">
                 <h3 className="font-serif text-xl font-bold text-brand-primary mb-3">Madame Divina's Summary</h3>
                 <p className="text-brand-text-secondary leading-relaxed">{readingData.summary}</p>
            </div>
            
            <div className="text-center pt-4">
                <button 
                    onClick={onReset}
                    className="py-3 px-8 bg-brand-primary text-black font-bold rounded-lg hover:bg-brand-accent transition-colors shadow-lg"
                >
                    Start a New Reading
                </button>
            </div>
        </div>
    );
};
