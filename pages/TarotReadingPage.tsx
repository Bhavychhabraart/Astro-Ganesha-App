
import React, { useState, useEffect, useMemo } from 'react';
import { TAROT_DECK } from '../constants';
import { TarotCardData, TarotReadingData } from '../types';
import { TarotCard } from '../components/tarot/TarotCard';
import { TarotReport } from '../components/tarot/TarotReport';
import { generateTarotReading } from '../utils/astrology';

const shuffleDeck = (deck: TarotCardData[]): TarotCardData[] => {
    return [...deck].sort(() => Math.random() - 0.5);
};

export const TarotReadingPage: React.FC = () => {
    const [shuffledDeck, setShuffledDeck] = useState<TarotCardData[]>([]);
    const [selectedCards, setSelectedCards] = useState<{ card: TarotCardData, position: string }[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [reading, setReading] = useState<TarotReadingData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setShuffledDeck(shuffleDeck(TAROT_DECK));
    }, []);

    const positions = ['Past', 'Present', 'Future'];

    const handleCardSelect = (card: TarotCardData, index: number) => {
        if (selectedCards.length >= 3 || flippedIndices.includes(index)) return;

        setFlippedIndices(prev => [...prev, index]);
        setTimeout(() => {
            setSelectedCards(prev => [...prev, { card, position: positions[prev.length] }]);
        }, 300); // Wait for flip animation
    };

    useEffect(() => {
        if (selectedCards.length === 3) {
            const fetchReading = async () => {
                setIsLoading(true);
                setError(null);
                try {
                    const readingData = await generateTarotReading(selectedCards);
                    setReading(readingData);
                } catch (err) {
                    setError((err as Error).message || 'Failed to generate reading. Please try again.');
                } finally {
                    setIsLoading(false);
                }
            };
            fetchReading();
        }
    }, [selectedCards]);

    const handleReset = () => {
        setShuffledDeck(shuffleDeck(TAROT_DECK));
        setSelectedCards([]);
        setFlippedIndices([]);
        setReading(null);
        setIsLoading(false);
        setError(null);
    };

    const instructionText = useMemo(() => {
        if (reading) return "Your reading is complete.";
        if (isLoading) return "Your reading is being prepared...";
        if (selectedCards.length === 0) return "Select a card for your Past.";
        if (selectedCards.length === 1) return "Now, a card for your Present.";
        if (selectedCards.length === 2) return "Finally, a card for your Future.";
        return "Your reading is being prepared...";
    }, [selectedCards.length, isLoading, reading]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center">
                <div className="w-20 h-20 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
                <h2 className="font-serif text-3xl font-bold text-brand-text-primary mt-8">Consulting the Cosmos</h2>
                <p className="mt-2 text-lg text-brand-text-secondary">Madame Divina is interpreting the cards for you...</p>
            </div>
        );
    }
    
    if (error) {
        return (
             <div className="flex flex-col items-center justify-center h-[70vh] text-center">
                 <h2 className="font-serif text-3xl font-bold text-brand-red">A Cosmic Disturbance</h2>
                 <p className="mt-2 text-lg text-brand-text-secondary">{error}</p>
                 <button onClick={handleReset} className="mt-6 py-2 px-6 bg-brand-primary text-black font-bold rounded-lg hover:bg-brand-accent">Try Again</button>
             </div>
        );
    }
    
    if (reading) {
        return <TarotReport readingData={reading} selectedCards={selectedCards} onReset={handleReset} />;
    }

    return (
        <div className="min-h-[80vh] flex flex-col items-center">
            <header className="text-center mb-6">
                <h1 className="font-serif text-4xl font-bold text-brand-text-primary">Tarot Reading</h1>
                <p className="text-brand-text-secondary mt-1 text-lg">Trust your intuition. Select three cards.</p>
            </header>

            {/* Selected Card Slots */}
            <div className="w-full max-w-2xl flex justify-around items-center mb-8 h-48">
                {positions.map((pos, index) => (
                    <div key={pos} className="flex flex-col items-center w-32">
                        <div className="w-28 h-40 border-2 border-dashed border-brand-primary/30 rounded-lg bg-brand-surface flex items-center justify-center">
                            {selectedCards[index] && (
                                 <div className="w-full h-full p-1 animate-fade-in">
                                    <TarotCard
                                        cardData={selectedCards[index].card}
                                        isFlipped={true}
                                        isSelectable={false}
                                    />
                                </div>
                            )}
                        </div>
                        <p className="font-semibold text-brand-text-primary mt-2">{pos}</p>
                    </div>
                ))}
            </div>

            <p className="text-brand-accent font-semibold text-xl mb-8 h-8 transition-opacity">{instructionText}</p>

            {/* Deck */}
            <div className="w-full grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {shuffledDeck.map((card, index) => (
                    <div key={card.name + index} className="aspect-[2/3.5]">
                        <TarotCard
                            cardData={card}
                            isFlipped={flippedIndices.includes(index)}
                            isSelectable={selectedCards.length < 3 && !flippedIndices.includes(index)}
                            onClick={() => handleCardSelect(card, index)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
