
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMusicPlayer } from '../../hooks/useMusicPlayer';
import { PlayIcon, PauseIcon, NextIcon, XIcon } from '../Icons';

export const MiniPlayer: React.FC = () => {
    const { currentTrack, isPlaying, togglePlayPause, playNext, progress, duration, closePlayer } = useMusicPlayer();
    const navigate = useNavigate();

    if (!currentTrack) {
        return null;
    }

    const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;

    return (
        <div className="fixed bottom-[57px] md:bottom-0 left-0 right-0 z-50 bg-brand-card/80 backdrop-blur-md">
            <div className="relative w-full h-1 bg-brand-surface">
                <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-secondary to-brand-primary transition-all duration-100 ease-linear"
                    style={{ width: `${progressPercentage}%`}}
                ></div>
            </div>
            <div className="flex items-center p-2 h-16">
                <img
                    src={currentTrack.coverArt}
                    alt={currentTrack.title}
                    className="w-12 h-12 rounded-md cursor-pointer"
                    onClick={() => navigate('/music-player')}
                />
                <div className="flex-1 mx-3 overflow-hidden cursor-pointer" onClick={() => navigate('/music-player')}>
                    <p className="font-bold truncate text-brand-text-primary">{currentTrack.title}</p>
                    <p className="text-sm truncate text-brand-text-secondary">{currentTrack.artist}</p>
                </div>
                <div className="flex items-center space-x-2 text-brand-text-primary">
                    <button onClick={(e) => { e.stopPropagation(); togglePlayPause(); }} className="p-2">
                        {isPlaying ? <PauseIcon className="w-7 h-7" /> : <PlayIcon className="w-7 h-7" />}
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); playNext(); }} className="p-2 hidden sm:block">
                        <NextIcon className="w-6 h-6" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); closePlayer(); }} className="p-2">
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};
