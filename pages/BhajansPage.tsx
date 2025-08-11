import React, { useState } from 'react';
import { BHAJANS, DEITIES } from '../constants';
import { Deity } from '../types';
import { useMusicPlayer } from '../hooks/useMusicPlayer';
import { PlayIcon } from '../components/Icons';

const BhajanListItem: React.FC<{ bhajan: typeof BHAJANS[0]; onPlay: () => void }> = ({ bhajan, onPlay }) => {
    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex items-center p-3 rounded-xl hover:bg-brand-surface transition-colors duration-200 group">
            <div className="relative flex-shrink-0">
                <img src={bhajan.coverArt} alt={bhajan.title} className="w-16 h-16 rounded-lg object-cover" />
                <button 
                    onClick={onPlay}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-label={`Play ${bhajan.title}`}
                >
                    <PlayIcon className="w-8 h-8 text-white" />
                </button>
            </div>
            <div className="flex-1 mx-4 overflow-hidden">
                <p className="font-semibold text-brand-text-primary truncate">{bhajan.title}</p>
                <p className="text-sm text-brand-text-secondary truncate">{bhajan.artist}</p>
            </div>
            <p className="text-sm text-brand-text-secondary font-mono">{formatDuration(bhajan.duration)}</p>
        </div>
    );
};


export const BhajansPage: React.FC = () => {
    const [selectedDeity, setSelectedDeity] = useState<Deity | 'All'>('All');
    const { playPlaylist } = useMusicPlayer();

    const handlePlay = (index: number) => {
        playPlaylist(BHAJANS, index);
    };

    const filterButtonStyle = (isActive: boolean) => 
        `px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
            isActive ? 'bg-brand-primary text-black shadow-sm' : 'bg-brand-card text-brand-text-secondary hover:bg-brand-surface'
        }`;

    return (
        <div>
            <header className="mb-6">
                <h1 className="font-serif text-4xl font-bold text-brand-text-primary">Bhajans</h1>
                <p className="text-brand-text-secondary mt-1 text-lg">Sacred music for the soul.</p>
            </header>

            <div className="mb-6">
                <div className="flex space-x-3 overflow-x-auto pb-3 -mx-4 px-4">
                    <button
                        onClick={() => setSelectedDeity('All')}
                        className={filterButtonStyle(selectedDeity === 'All')}
                    >
                        All
                    </button>
                    {DEITIES.map(deity => (
                        <button
                            key={deity}
                            onClick={() => setSelectedDeity(deity)}
                            className={filterButtonStyle(selectedDeity === deity)}
                        >
                            {deity}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                {BHAJANS.map((bhajan, index) => (
                    <BhajanListItem key={bhajan.id} bhajan={bhajan} onPlay={() => handlePlay(index)} />
                ))}
            </div>
        </div>
    );
};