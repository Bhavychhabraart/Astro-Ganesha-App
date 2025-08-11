import React, { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMusicPlayer } from '../hooks/useMusicPlayer';
import { ChevronDownIcon, HeartIcon, NextIcon, PauseIcon, PlayIcon, PrevIcon, QueueIcon } from '../components/Icons';

export const MusicPlayerPage: React.FC = () => {
    const {
        currentTrack,
        isPlaying,
        togglePlayPause,
        playNext,
        playPrev,
        progress,
        duration,
        seek,
    } = useMusicPlayer();
    const navigate = useNavigate();

    if (!currentTrack) {
        // Redirect back if no track is playing. This shouldn't happen if navigated correctly.
        navigate(-1);
        return null;
    }

    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
    
    const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
        seek(Number(e.target.value));
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-b from-brand-card to-brand-background z-50 flex flex-col p-6 text-brand-text-primary">
            <header className="flex justify-between items-center w-full">
                <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-brand-surface">
                    <ChevronDownIcon className="w-7 h-7" />
                </button>
                <h2 className="font-semibold uppercase text-sm text-brand-text-secondary tracking-wider">Now Playing</h2>
                <button className="p-2 rounded-full hover:bg-brand-surface opacity-50">
                    <QueueIcon className="w-6 h-6" />
                </button>
            </header>

            <main className="flex-1 flex flex-col justify-center items-center px-4 pt-8 pb-4">
                <div className="w-full max-w-sm aspect-square mb-10">
                    <img
                        src={currentTrack.coverArt}
                        alt={currentTrack.title}
                        className="w-full h-full object-cover rounded-2xl shadow-2xl"
                    />
                </div>

                <div className="w-full text-center mb-8">
                    <div className="h-10 overflow-hidden relative">
                         <h1 className="text-3xl font-bold font-serif absolute w-full"
                           key={currentTrack.id} // Add key to restart animation on track change
                         >
                           <span className={currentTrack.title.length > 20 ? "marquee" : ""}>
                            <span>{currentTrack.title}</span>
                           </span>
                         </h1>
                    </div>
                    <p className="text-lg text-brand-text-secondary mt-1">{currentTrack.artist}</p>
                </div>
                
                <div className="w-full max-w-md">
                    <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        value={progress}
                        onChange={handleSeek}
                        className="w-full h-1.5 bg-brand-surface rounded-lg appearance-none cursor-pointer range-lg accent-brand-primary"
                    />
                    <div className="flex justify-between text-xs font-mono text-brand-text-secondary mt-2">
                        <span>{formatTime(progress)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-8 w-full max-w-xs sm:max-w-sm">
                    <button className="p-2 text-brand-text-secondary hover:text-brand-text-primary transition-colors">
                        <HeartIcon className="w-7 h-7"/>
                    </button>
                    <div className="flex items-center space-x-4">
                        <button onClick={playPrev} className="p-2 text-brand-text-primary">
                            <PrevIcon className="w-10 h-10" />
                        </button>
                        <button
                            onClick={togglePlayPause}
                            className="p-4 bg-gradient-to-br from-brand-primary to-brand-accent rounded-full text-black shadow-lg transform hover:scale-105 transition-transform"
                        >
                            {isPlaying ? <PauseIcon className="w-12 h-12" /> : <PlayIcon className="w-12 h-12" />}
                        </button>
                        <button onClick={playNext} className="p-2 text-brand-text-primary">
                            <NextIcon className="w-10 h-10" />
                        </button>
                    </div>
                    <button className="p-2 text-brand-text-secondary hover:text-brand-text-primary transition-colors opacity-50 cursor-not-allowed">
                        <QueueIcon className="w-7 h-7" />
                    </button>
                </div>
            </main>
        </div>
    );
};